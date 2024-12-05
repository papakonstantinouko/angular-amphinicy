import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, InjectionToken, PLATFORM_ID } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Todo } from '../interfaces/todo';
import { TodoItem } from '../interfaces/todo-item';

export const STORAGE_TOKEN = new InjectionToken<Storage>('local storage', {
  providedIn: 'root',
  factory: () => {
    const platformId = inject(PLATFORM_ID);
    if (isPlatformBrowser(platformId)) {
      return window.localStorage;
    }
    return {} as Storage;
  },
});

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  storage = inject(STORAGE_TOKEN);

  getTodos(): Observable<Todo[]> {
    const todos = this.storage.getItem('todos');
    return of(todos ? (JSON.parse(todos) as Todo[]) : []);
  }

  getTodoItems(): Observable<TodoItem[]> {
    const todoItems = this.storage.getItem('todoItems');
    return of(todoItems ? (JSON.parse(todoItems) as TodoItem[]) : []);
  }

  saveTodos(todos: Todo[]) {
    this.storage.setItem('todos', JSON.stringify(todos));
  }

  saveTodoItems(todoItems: TodoItem[]) {
    this.storage.setItem('todoItems', JSON.stringify(todoItems));
  }
}
