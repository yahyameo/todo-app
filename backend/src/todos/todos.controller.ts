import { Controller, Post, Get, Param, Put, Delete, Body, Req, UseGuards } from '@nestjs/common';
import { TodosService } from './todos.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AuthUser } from 'src/utils/auth.user';
import { User } from 'src/utils/user.decorator';
import { CustomMessage } from 'src/utils/custom-message.decorator';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post("create")
  @CustomMessage('Item created successfully')
  @UseGuards(JwtAuthGuard)
  async create(@User() user: AuthUser, @Body() body: { text: string }) {
    return this.todosService.create(body.text,user.userId);
  }

  @Get("getAll")
  @UseGuards(JwtAuthGuard)
  async findAll(@User() user: AuthUser) {
    return this.todosService.findAll(user.userId);
  }

  @Get('getById/:id')
  @UseGuards(JwtAuthGuard)
  async findOne(@User() user: AuthUser,@Param('id') id: string) {
    return this.todosService.findOne(id,user.userId);
  }

  @Put('update/:id')
  @CustomMessage('Item updated successfully')
  @UseGuards(JwtAuthGuard)
  async update(@User() user: AuthUser,@Param('id') id: string, @Body() body: { text: string, completed: boolean }) {
    return this.todosService.update(id, body.text, body.completed,user.userId);
  }

  @Delete('delete/:id')
  @UseGuards(JwtAuthGuard)
  @CustomMessage('Item deleted successfully')
  async delete(@User() user: AuthUser,@Param('id') id: string) {
    return this.todosService.remove(id,user.userId);
  }
}
