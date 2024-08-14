import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { AppModule } from '../app.module';
import * as fs from 'fs'
import { UpdateTodoDto } from './dto/update-todo.dto';
import { CreateTodoDto } from './dto/create-todo.dto';

describe('TodosService', () => {
  let service: TodosService;

  beforeEach(async () => {
    
   const module: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .compile();

  service = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('#getToDoList', () => {
    beforeEach(() => {
      let fs = require('fs')
      jest.spyOn(fs, 'readFileSync').mockResolvedValue(jest.fn());
    });
 
    it('should be defined', () => {
      expect(service.getToDoList).toBeDefined();
    });
 
    it('should call the file system', () => {
      service.getToDoList();
      expect(fs.readFileSync).toHaveBeenCalledTimes(1);
    });

    afterEach(() => {
      jest.clearAllMocks();
    });
  });

  describe('#getTodo', () => {
    beforeEach(() => {
      let fs = require('fs')
      jest.spyOn(fs, 'readFileSync').mockResolvedValue(JSON.stringify([{}]));
    });
 
    it('should be defined', () => {
      expect(service.getTodo).toBeDefined();
    });
 
    it('should call the file system', () => {
      service.getTodo(0);
      expect(fs.readFileSync).toHaveBeenCalledTimes(1);
    });
    afterEach(() => {
      jest.clearAllMocks();
    });
  });

  describe('#createToDo', () => {
    beforeEach(() => {
      let fs = require('fs')
      jest.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify([]));
      jest.spyOn(fs, 'writeFileSync').mockResolvedValue(jest.fn());
    });
 
    it('should be defined', () => {
      expect(service.createToDo).toBeDefined();
    });
 
    it('should call the file system', () => {
      service.createToDo(new CreateTodoDto());
      expect(fs.readFileSync).toHaveBeenCalledTimes(1);
      expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
    });
    afterEach(() => {
      jest.clearAllMocks();
    });
  });

  describe('#updateTodo', () => {
    beforeEach(() => {
      let fs = require('fs')
      jest.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify([{}]));
      jest.spyOn(fs, 'writeFileSync').mockResolvedValue(jest.fn());
    });
 
    it('should be defined', () => {
      expect(service.updateTodo).toBeDefined();
    });
 
    it('should call the file system', () => {
      service.updateTodo(0, new UpdateTodoDto());
      expect(fs.readFileSync).toHaveBeenCalledTimes(1);
      expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
    });
    afterEach(() => {
      jest.clearAllMocks();
    });
  });

  describe('#deleteTodo', () => {
    beforeEach(() => {
      let fs = require('fs')
      jest.spyOn(fs, 'readFileSync').mockReturnValue(JSON.stringify([{}]));
      jest.spyOn(fs, 'writeFileSync').mockResolvedValue(jest.fn());
    });
 
    it('should be defined', () => {
      expect(service.deleteTodo).toBeDefined();
    });
 
    it('should call the file system', () => {
      service.deleteTodo(0);
      expect(fs.readFileSync).toHaveBeenCalledTimes(1);
      expect(fs.writeFileSync).toHaveBeenCalledTimes(1);
    });
    afterEach(() => {
      jest.clearAllMocks();
    });
  });
});
