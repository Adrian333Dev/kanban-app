import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {
  BoardResponseDto,
  CreateBoardDto,
  UpdateBoardDto,
} from 'src/shared/dtos/board.dto';
import { BoardService } from './board.service';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post('user/:userId')
  create(
    @Param('userId') userId: string,
    @Body() createBoardDto: CreateBoardDto,
  ) {
    return this.boardService.create(+userId, createBoardDto);
  }

  @Get('user/:userId')
  findAllByUser(@Param('userId') userId: string): Promise<BoardResponseDto[]> {
    return this.boardService.findAllByUser(+userId);
  }

  @Get(':boardId')
  findOne(@Param('boardId') boardId: string) {
    return this.boardService.findOne(+boardId);
  }

  @Patch(':boardId')
  update(
    @Param('boardId') boardId: string,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    return this.boardService.update(+boardId, updateBoardDto);
  }

  @Delete(':boardId')
  remove(@Param('boardId') boardId: string) {
    return this.boardService.remove(+boardId);
  }
}
