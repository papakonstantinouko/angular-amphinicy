import { effect, inject, Injectable, signal } from '@angular/core';
import { AddTodo, RemoveTodo, Todo } from '../interfaces/todo';
import { Subject, take } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  #storageSrv = inject(StorageService);
  #state = signal<Todo[]>([]);
  state = this.#state.asReadonly();
  add$ = new Subject<AddTodo>();
  remove$ = new Subject<RemoveTodo>();

  constructor() {
    this.#storageSrv
      .getTodos()
      .pipe(take(1))
      .subscribe((todos) => todos?.length && this.#state.set(todos));

    this.add$.pipe(takeUntilDestroyed()).subscribe((value: AddTodo) => {
      this.#state.update((oldState) => [...oldState, this.addIdToTodo(value)]);
    });

    this.remove$.pipe(takeUntilDestroyed()).subscribe((value: RemoveTodo) => {
      this.#state.update((oldState) =>
        oldState.filter((x) => x.id !== value.id)
      );
    });

    effect(() => this.#storageSrv.saveTodos(this.#state()));
  }

  private addIdToTodo(value: AddTodo): Todo {
    let slug = value.title.toLowerCase().replace(/\s+/g, '-');
    if (this.#state().find((c) => c.id === slug)) {
      slug = `${slug}-${Date.now()}`;
    }
    return {
      id: slug,
      title: value.title,
    };
  }
}
