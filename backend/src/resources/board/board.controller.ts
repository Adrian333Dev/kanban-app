import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { IRequestUser, User } from 'src/shared/decorators/user.decorator';
import { CreateBoardDto, UpdateBoardDto } from 'src/shared/dtos/board.dto';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { BoardService } from './board.service';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  create(@Body() createBoardDto: CreateBoardDto, @User() user: IRequestUser) {
    return this.boardService.create(user.id, createBoardDto);
  }

  @UseGuards(AuthGuard)
  @Get('user/:userId')
  findAllByUser(@Param('userId') userId: string) {
    // return this.boardService.findAllByUser(+userId);
    return 'findAllByUser';
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
