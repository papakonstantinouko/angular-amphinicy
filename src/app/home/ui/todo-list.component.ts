import { Component, input, output } from '@angular/core';
import { RemoveTodo, Todo } from '../../shared/interfaces/todo';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-todo-list',
  imports: [RouterLink],
  template: `
    <ul>
      @for (todo of todos(); track todo.id) {
      <li routerLink="/todo/{{ todo.id }}">
        id: {{ todo.id }}, title: {{ todo.title }}
      </li>
      <button (click)="todoDeleted.emit({ id: todo.id })">delete me</button>
      } @empty {
      <li>No todos, add one!</li>
      }
    </ul>
  `,
  styles: ``,
})
export class TodoListComponent {
  todos = input.required<Todo[]>();
  todoDeleted = output<RemoveTodo>();
}
