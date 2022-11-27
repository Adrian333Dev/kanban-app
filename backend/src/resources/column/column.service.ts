import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateColumnDto, UpdateColumnDto } from 'src/shared/dtos/column.dto';
import { PrismaService } from 'src/shared/prisma/prisma.service';

@Injectable()
export class ColumnService {
  constructor(private readonly prisma: PrismaService) {}

  async create(boardId: number, createColumnDto: CreateColumnDto) {
    const columns = await this.prisma.column.findMany({ where: { boardId } });
    const column = await this.prisma.column.create({
      data: { ...createColumnDto, order: columns.length + 1, boardId },
    });
    return column;
  }

  async findAllByBoard(boardId: number) {
    const columns = await this.prisma.column.findMany({
      where: { boardId },
      orderBy: { order: 'desc' },
    });
    return columns;
  }

  async findOne(columnId: number) {
    const column = await this.prisma.column.findUnique({
      where: { columnId },
    });
    if (!column) throw new NotFoundException('Column not found');
    return column;
  }

  async update(columnId: number, updateColumnDto: UpdateColumnDto) {
    const column = await this.prisma.column.update({
      where: { columnId },
      data: updateColumnDto,
    });
    return column;
  }

  async remove(columnId: number) {
    const column = await this.prisma.column.delete({ where: { columnId } });
    return column;
  }

  // Drag and drop //TODO: Not sure if this is right way to do it
  async moveColumn(columnId: number, boardId: number, newOrder: number) {
    const colToMove = await this.prisma.column.findUnique({
      where: { columnId },
    });
    const currBoardCols = await this.prisma.column.findMany({
      where: { boardId: colToMove.boardId },
      orderBy: { order: 'asc' },
    });
    const newBoardCols = boardId
      ? await this.prisma.column.findMany({
          where: { boardId },
          orderBy: { order: 'asc' },
        })
      : null;
    if (colToMove.boardId !== boardId) {
      await this.prisma.column.update({
        where: { columnId },
        data: { boardId, order: newBoardCols.length + 1 },
      });
      currBoardCols.splice(colToMove.order - 1, 1);
      currBoardCols.forEach(
        async (c, i) =>
          await this.prisma.column.update({
            where: { columnId: c.columnId },
            data: { order: i + 1 },
          }),
      );
    }
    let colIndex = currBoardCols.findIndex((c) => c.columnId === columnId);
    let newColIndex = currBoardCols.findIndex((c) => c.order === newOrder);
    currBoardCols.splice(colIndex, 1);
    currBoardCols.splice(newColIndex, 0, colToMove);
    currBoardCols.forEach(
      async (c, i) =>
        await this.prisma.column.update({
          where: { columnId: c.columnId },
          data: { order: i + 1 },
        }),
    );
  }
}
