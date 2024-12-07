import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Todo } from '@interfaces/todo';

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
