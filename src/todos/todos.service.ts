import { HttpStatus, Injectable, Res } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoStatus, UpdateTodoDto } from './dto/update-todo.dto';
import { isObject } from 'util';

@Injectable()
export class TodosService {
        private dir: string = path.dirname(path.basename(__dirname))
        private fileName: string = path.join(this.dir, "", "data.json")

        constructor(){
            fs.writeFile(this.fileName, '', { flag: 'wx' }, function (err) {
                if (err) console.log("file already exist");
            });
        }
    
    getToDoList(): Object {
        const content: string = fs.readFileSync(this.fileName, 'utf8')
        return JSON.parse(JSON.stringify(content));
    }

    getTodo(index: number): any {
        const content: string = fs.readFileSync(this.fileName, 'utf8')
        const todos = JSON.parse(JSON.stringify(content));
        return todos[index]? todos[index]:null
    }

    createToDo(body: CreateTodoDto): string {
        
        const fileName:string = this.fileName
        const content: string = fs.readFileSync(this.fileName, 'utf8')
        let todos = JSON.parse(content)
        if(!Array.isArray(todos)){
            todos = new Array()
        }
        const todo: object = 
            {
                "title": body.title,
                "description": body.description,
                "status": TodoStatus.TODO
            }

        todos.push(todo)

        fs.writeFileSync(fileName, JSON.stringify(todos))
        return 'success'
    }

    updateTodo(id: number, body: UpdateTodoDto): string {
        
        const fileName:string = this.fileName
        const content: string = fs.readFileSync(this.fileName, 'utf8')
        let todos = JSON.parse(content)||[];
        if(!todos[id]){
            return 'fail'
        }
        todos[id] = {
            "title": body.title,
            "description": body.description,
            "status": body.status
        }

        fs.writeFileSync(fileName, JSON.stringify(todos))
        return 'success'
    }

    deleteTodo(id: number): string {
        
        const fileName:string = this.fileName
        const content: string = fs.readFileSync(this.fileName, 'utf8')
        let todos = JSON.parse(content)||[];
        if(!todos[id]){
            return 'fail'
        }
        todos.splice(id,1)
        
        fs.writeFileSync(fileName, JSON.stringify(todos))

        return 'success'
    }
}
