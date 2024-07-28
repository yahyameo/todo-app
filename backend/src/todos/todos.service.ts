import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types, Schema } from 'mongoose';
import { Todo } from './todo.schema';

@Injectable()
export class TodosService {
  constructor(@InjectModel('Todo') private todoModel: Model<Todo>) {}

  async create(text: string, user: string): Promise<Todo> {
    const newTodo = new this.todoModel({
      text,
      user: new Types.ObjectId(user), // Correctly create a new ObjectId
    });
    return newTodo.save();
  }

  async findAll(user: string): Promise<Todo[]> {
    return this.todoModel.find({ user }).exec();
  }

  async findOne(id: string, user: string): Promise<Todo> {
    const todo = await this.todoModel.findOne({ _id: id, user }).exec();
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return todo;
  }

  async update(id: string, text: string, completed: boolean, user: string): Promise<Todo> {
    const todo = await this.todoModel.findOneAndUpdate(
      { _id: id, user },
      { text, completed },
      { new: true },
    ).exec();
    if (!todo) {
      throw new NotFoundException('Todo not found');
    }
    return todo;
  }

  async remove(id: string, user: string): Promise<boolean> {
    const result = await this.todoModel.deleteOne({ _id: id, user }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException('Todo not found');
    }
    return true;
  }
}
