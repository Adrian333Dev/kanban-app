import { PartialType } from '@nestjs/mapped-types';
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty()
  name: string;
}

export class UpdateBoardDto extends PartialType(CreateBoardDto) {}

export class BoardResponseDto {
  boardId: number;
  userId: number;
  name: string;
  constructor(board: any) {
    this.boardId = board.board_id;
    this.userId = board.user_id;
    this.name = board.name;
  }
}
