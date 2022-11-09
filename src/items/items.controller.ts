import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { createItemDto } from './dto/create-item.dto';
import { ItemsService } from './items.service';
import { Item } from './interface/item.interface';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemService: ItemsService) {}
  @Get()
  findAll(): Promise<Item[]> {
    return this.itemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id): Promise<Item> {
    // throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
    return this.itemService.findOne(id);
  }

  @Post()
  create(@Body() createDto: createItemDto): Promise<Item> {
    return this.itemService.create(createDto);
  }

  @Delete(':id')
  deleteItem(@Param('id') id): Promise<Item> {
    return this.itemService.deleteItem(id);
  }

  @Put(':id')
  update(@Body() updateDto: createItemDto, @Param('id') id): Promise<Item> {
    return this.itemService.updateItem(id, updateDto);
  }
}
