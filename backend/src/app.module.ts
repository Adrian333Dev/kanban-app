import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './resources/user/user.module';
import { SharedModule } from './shared/shared.module';
import { BoardModule } from './resources/board/board.module';
import { ColumnModule } from './resources/column/column.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UserInterceptor } from './shared/interceptors/user.interceptor';

@Module({
  imports: [UserModule, SharedModule, BoardModule, ColumnModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: UserInterceptor,
    },
  ],
})
export class AppModule {}
