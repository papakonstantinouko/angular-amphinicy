import { effect, inject, Injectable, signal } from '@angular/core';
import { Subject, take } from 'rxjs';
import { TodoItem } from '@interfaces/todo-item';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StorageService } from '@data-access/storage.service';
import { TodoService } from '@data-access/todo.service';
import { RemoveTodo } from '@interfaces/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoItemService {
  #storageSrv = inject(StorageService);
  #remove$ = inject(TodoService).remove$;
  #state = signal<TodoItem[]>([]);
  state = this.#state.asReadonly();

  // adds a new item to state
  add$ = new Subject<{ todoId: string; title: string }>();

  // change the completed property of an item
  toggle$ = new Subject<string>();

  constructor() {
    this.#storageSrv
      .getTodoItems()
      .pipe(take(1))
      .subscribe((todoItems) => this.#state.set(todoItems));

    this.add$.pipe(takeUntilDestroyed()).subscribe((item) => {
      this.#state.update((oldState) => [
        ...oldState,
        {
          id: Date.now().toString(),
          completed: false,
          todoId: item.todoId,
          title: item.title,
        },
      ]);
    });

    this.toggle$.pipe(takeUntilDestroyed()).subscribe((todoItemId) => {
      this.#state.update((oldState) => {
        return oldState.map((item: TodoItem) => {
          if (item.id === todoItemId) item.completed = !item.completed;

          return item;
        });
      });
    });

    this.#remove$.pipe(takeUntilDestroyed()).subscribe((value: RemoveTodo) => {
      this.#state.update((oldState) =>
        oldState.filter((x) => x.todoId !== value.id)
      );
    });

    effect(() => this.#storageSrv.saveTodoItems(this.#state()));
  }
}
