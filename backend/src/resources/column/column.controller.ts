import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ColumnService } from './column.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { UpdateColumnDto } from './dto/update-column.dto';

@Controller('column')
export class ColumnController {
  constructor(private readonly columnService: ColumnService) {}

  @Post('board/:boardId')
  create(@Body() createColumnDto: CreateColumnDto) {
    return this.columnService.create(createColumnDto);
  }

  @Get('board/:boardId')
  findAll() {
    return this.columnService.findAll();
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

  @Delete(':columnId')
  remove(@Param('columnId') columnId: string) {
    return this.columnService.remove(+columnId);
  }
}
