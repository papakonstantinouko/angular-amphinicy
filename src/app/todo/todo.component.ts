import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { TodoService } from '../shared/data-access/todo.service';
import { TodoItemHeaderComponent } from './ui/todo-item-header.component';
import { TodoItemAddComponent } from './ui/todo-item-add.component';
import { TodoItemListComponent } from './ui/todo-item-list.component';
import { TodoItemService } from './data-access/todo-item.service';

@Component({
  selector: 'app-todo',
  imports: [
    TodoItemHeaderComponent,
    TodoItemAddComponent,
    TodoItemListComponent,
  ],
  template: `
    @if (todo(); as todo) {
    <app-todo-item-header [todo]="todo" />
    <app-todo-item-add (itemSaved)="addItemToTodo($event)" />
    <app-todo-item-list
      (itemToggled)="toggleItem($event)"
      [todoItems]="todoItems()"
    />
    }
  `,
})
export default class TodoComponent {
  #route = inject(ActivatedRoute);
  #todoSrv = inject(TodoService);
  #paramMap = toSignal(this.#route.paramMap);
  #todoItemSrv = inject(TodoItemService);

  todo = computed(() =>
    this.#todoSrv.state().find((t) => t.id === this.#paramMap()?.get('id'))
  );

  todoItems = computed(() =>
    this.todo()
      ? this.#todoItemSrv.state().filter((x) => x.todoId === this.todo()!.id)
      : []
  );

  addItemToTodo(title: string) {
    this.#todoItemSrv.add$.next({ todoId: this.todo()?.id!, title });
  }

  toggleItem(todoItemId: string) {
    this.#todoItemSrv.toggle$.next(todoItemId);
  }
}
