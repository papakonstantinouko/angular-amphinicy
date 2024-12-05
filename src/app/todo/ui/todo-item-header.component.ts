import { Component, input } from '@angular/core';
import { Todo } from '../../shared/interfaces/todo';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-todo-item-header',
  imports: [RouterLink],
  template: `
    <h2 routerLink="/home">back</h2>
    <h3>{{ todo().title }}</h3>
  `,
})
export class TodoItemHeaderComponent {
  todo = input.required<Todo>();
}
