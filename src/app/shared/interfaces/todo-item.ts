import { Todo } from './todo';

export interface TodoItem extends Todo {
  todoId: string;
  completed: boolean;
}
