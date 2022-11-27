import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CreateColumnDto, UpdateColumnDto } from 'src/shared/dtos/column.dto';
import { ColumnService } from './column.service';

@Controller('column')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @Post('board/:boardId')
  create(
    @Param('boardId') boardId: string,
    @Body() createColumnDto: CreateColumnDto,
  ) {
    return this.columnService.create(+boardId, createColumnDto);
  }

  @Get('board/:boardId')
  findAllByBoard(@Param('boardId') boardId: string) {
    return this.columnService.findAllByBoard(+boardId);
  }

  @Get(':columnId')
  findOne(@Param('columnId') columnId: string) {
    return this.columnService.findOne(+columnId);
  }

  @Patch(':columnId')
  update(
    @Param('columnId') columnId: string,
    @Body() updateColumnDto: UpdateColumnDto,
  ) {
    return this.columnService.update(+columnId, updateColumnDto);
  }

  // Drag and drop //TODO: Not working
  @Patch('move/:columnId')
  replaceColumn(
    @Param('columnId') columnId: string,
    @Query('newOrder') newOrder: string,
    @Query('boardId') boardId: string,
  ) {
    return this.columnService.moveColumn(
      +columnId,
      +boardId || null,
      +newOrder || null,
    );
  }

  @Delete(':columnId')
  remove(@Param('columnId') columnId: string) {
    return this.columnService.remove(+columnId);
  }
}
