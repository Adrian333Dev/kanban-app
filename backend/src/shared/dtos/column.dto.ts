import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateColumnDto {
  @IsNotEmpty()
  name: string;

  @IsOptional()
  color: string;
}

export class UpdateColumnDto extends PartialType(CreateColumnDto) {
  @IsOptional()
  @IsNumber()
  order: number;
}

export class ColumnResponseDto {
  columnId: number;
  boardId: number;
  name: string;
  order: number;
  color: string;

  constructor(column: any) {
    this.columnId = column.column_id;
    this.boardId = column.board_id;
    this.name = column.name;
    this.order = column.order;
    this.color = column.color;
  }
}
