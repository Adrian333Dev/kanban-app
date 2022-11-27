import { Injectable } from '@nestjs/common';
import { CreateBoardDto, UpdateBoardDto } from 'src/shared/dtos/board.dto';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class BoardService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, createBoardDto: CreateBoardDto) {
    const board = await this.prisma.board.create({
      data: { ...createBoardDto, userId },
    });
    return board;
  }

  async findAllByUser(userId: number) {
    const boards = await this.prisma.board.findMany({ where: { userId } });
    return boards;
  }

  findOne(boardId: number) {
    const board = this.prisma.board.findUnique({ where: { boardId } });
    return board;
  }

  async update(boardId: number, updateBoardDto: UpdateBoardDto) {
    const board = await this.prisma.board.update({
      where: { boardId },
      data: updateBoardDto,
    });
    return board;
  }

  async remove(boardId: number) {
    const board = await this.prisma.board.delete({ where: { boardId } });
    return board;
  }
}
