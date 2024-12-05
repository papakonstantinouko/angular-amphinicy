export interface Todo {
  id: string;
  title: string;
}

export type AddTodo = Omit<Todo, 'id'>;

export type RemoveTodo = Omit<Todo, 'title'>;
