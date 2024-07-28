import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './todo.schema';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { JwtStrategy } from '../auth/jwt.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Todo", schema: TodoSchema }])],
  providers: [TodosService, JwtStrategy],
  controllers: [TodosController],
})
export class TodosModule {}
