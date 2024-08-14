import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';


describe('TodosController', () => {
  let controller: TodosController;
  let todosService: TodosService
  let app: INestApplication;

  const mockTodoService = {
    getToDoList: jest.fn(),
    getTodo: jest.fn(),
    createToDo: jest.fn(),
    updateTodo: jest.fn(),
    deleteTodo: jest.fn(),
  };

  beforeEach(async () => {
    
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(TodosService)
      .useValue(mockTodoService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    controller = moduleFixture.get<TodosController>(TodosController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('GET: todos', () => {
    beforeEach(() => {
      jest.spyOn(mockTodoService, 'getToDoList');
    });
    
    it('should be defined', () => {
      expect(mockTodoService.getToDoList).toBeDefined();
    });
 
    it('should return OK', async () => {
      await request(app.getHttpServer()).get('/todos').expect(200);
    });
  });

  

  describe('POST: todos', () => {
    beforeEach(() => {
      jest.spyOn(mockTodoService, 'createToDo');
    });
    
    it('should be defined', () => {
      expect(mockTodoService.createToDo).toBeDefined();
    });
 
    it('should return OK', async () => {
      await request(app.getHttpServer()).post('/todos').expect(201);
    });
  });
  
  describe('PUT: todos', () => {
    beforeEach(() => {
      jest.spyOn(mockTodoService, 'updateTodo');
    });
    
    it('should be defined', () => {
      expect(mockTodoService.updateTodo).toBeDefined();
    });
 
    it('should return OK', async () => {
      await request(app.getHttpServer()).put('/todos/0').expect(200);
    });
  });
  
  describe('DELETE: todos', () => {
    beforeEach(() => {
      jest.spyOn(mockTodoService, 'deleteTodo');
    });
    
    it('should be defined', () => {
      expect(mockTodoService.deleteTodo).toBeDefined();
    });
 
    it('should return OK', async () => {
      await request(app.getHttpServer()).delete('/todos/0').expect(200);
    });
  });
  
});
