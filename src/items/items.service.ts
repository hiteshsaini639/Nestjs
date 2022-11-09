import { Injectable } from '@nestjs/common';
import { Item } from './interface/item.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { RequestService } from './request.service';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel('Item') private readonly itemModel: Model<Item>,
    private readonly requestService: RequestService,
  ) {}

  async findAll(): Promise<Item[]> {
    const userId = this.requestService.getUserId();
    console.log('UserId', userId, 'In find All service');
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
