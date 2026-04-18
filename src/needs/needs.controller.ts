import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateNeedDto } from './dto/create-need.dto';
import { SortNeedsDto } from './dto/sort-needs.dto';
import { UpdateNeedDto } from './dto/update-need.dto';
import { NeedsService } from './needs.service';

@Controller('needs')
export class NeedsController {
  constructor(private readonly needsService: NeedsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateNeedDto) {
    return this.needsService.create(dto);
  }

  @Get()
  async findAll(@Query() sort: SortNeedsDto) {
    return this.needsService.findAll(sort);
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.needsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateNeedDto,
  ) {
    return this.needsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.needsService.remove(id);
  }
}
