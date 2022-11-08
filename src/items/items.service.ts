import { Injectable } from '@nestjs/common';
import { Item } from './interface/item.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ItemsService {
  constructor(@InjectModel('Item') private readonly itemModel: Model<Item>) {}

  async findAll(): Promise<Item[]> {
    return await this.itemModel.find();
  }

  async findOne(id: string): Promise<Item> {
    return this.itemModel.findById(id);
  }

  async create(item: Item): Promise<Item> {
    const newItem = new this.itemModel(item);
    return newItem.save();
  }

  async deleteItem(id: string): Promise<Item> {
    return this.itemModel.findByIdAndRemove(id);
  }

  async updateItem(id: string, updatedItem: Item): Promise<Item> {
    return this.itemModel.findByIdAndUpdate(id, updatedItem);
  }
}
