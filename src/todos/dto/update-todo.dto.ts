import { IsNotEmpty } from "class-validator";

export class UpdateTodoDto {
    readonly id: number;

    @IsNotEmpty()
    readonly title: string;

    @IsNotEmpty()
    readonly description: string;

    @IsNotEmpty()
    readonly status: TodoStatus;
}

export enum TodoStatus {
    TODO = 'todo',
    PENDING = 'pending',
    DONE = 'done'
}