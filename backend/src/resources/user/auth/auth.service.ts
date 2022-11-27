import { Injectable, ConflictException, HttpException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { PrismaService } from 'src/shared/prisma/prisma.service';

interface SignupParams {
  email: string;
  password: string;
  username: string;
}

interface SigninParams {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async signup({ email, username, password }: SignupParams) {
    const emailInUse = await this.prisma.user.findUnique({ where: { email } });
    const usernameInUse = await this.prisma.user.findUnique({
      where: { username },
    });
    if (emailInUse) throw new ConflictException('Email already in use');
    if (usernameInUse) throw new ConflictException('Username already in use');
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: { email, username, password: hashedPassword },
    });
    return await this.generateJWT(user.username, user.userId);
  }

  async signin({ email, password }: SigninParams) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new HttpException('Invalid credentials', 400);
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new HttpException('Invalid credentials', 400);
    return await this.generateJWT(user.username, user.userId);
  }

  private async generateJWT(name: string, id: number) {
    return jwt.sign({ name, id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });
  }
}
