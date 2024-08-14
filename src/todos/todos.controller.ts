import { Body, Controller, Delete, Get, Header, HttpStatus, Param, Post, Put, Res } from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todos')
export class TodosController {
    constructor(private readonly todosService: TodosService){}
    
  @Get()
  @Header('content-type', 'application/json')
  getToDoList(): Object {
    return this.todosService.getToDoList();
  }

  @Get(':id')
  @Header('content-type', 'application/json')
  getToDo(@Param('id') id: number): string {
    return this.todosService.getTodo(id);
  }

  @Post()
  createToDo(@Body() createDto: CreateTodoDto): string {
    return this.todosService.createToDo(createDto);
  }

  @Put(':id')
  updateToDo(@Body() updateDto: UpdateTodoDto, @Param('id') id: number): string {
    return this.todosService.updateTodo(id, updateDto);
  }

  @Delete(':id')
  deleteToDo(@Param('id') id: number): string {
    return this.todosService.deleteTodo(id);
  }
}
