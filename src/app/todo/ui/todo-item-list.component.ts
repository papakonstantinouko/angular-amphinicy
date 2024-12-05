import { Component, input, output } from '@angular/core';
import { TodoItem } from '../../shared/interfaces/todo-item';

@Component({
  selector: 'app-todo-item-list',
  template: `
    <ul>
      @for (item of todoItems(); track item.id) {
      <li
        title="click to toggle!"
        (click)="itemToggled.emit(item.id)"
        [class.completed]="item.completed"
      >
        title: {{ item.title }}, completed: {{ item.completed }}
      </li>
      } @empty {
      <li>No items on this todo, add one!</li>
      }
    </ul>
  `,
  styles: [
    `
      .completed {
        text-decoration: line-through;
      }
    `,
  ],
})
export class TodoItemListComponent {
  todoItems = input.required<TodoItem[]>();
  itemToggled = output<string>();
}
