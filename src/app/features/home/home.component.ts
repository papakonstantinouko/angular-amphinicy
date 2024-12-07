import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ModalComponent } from '@ui/modal.component';
import { FormComponent } from '@ui/form.component';
import { TodoService } from '@data-access/todo.service';
import { TodoListComponent } from './ui/todo-list.component';

@Component({
  selector: 'app-home',
  imports: [ModalComponent, FormComponent, TodoListComponent],
  template: `
    <header>
      <h1>Todo App</h1>
      <button (click)="openModal.set(true)">Add Todo</button>
    </header>

    <app-todo-list
      [todos]="todoSrv.state()"
      (todoDeleted)="todoSrv.remove$.next($event)"
    />

    <app-modal [isOpen]="openModal()">
      <ng-template>
        <app-form
          [formGroup]="todoForm"
          title="Add Todo"
          (save)="handleSave()"
        />
      </ng-template>
    </app-modal>
  `,
  styles: ``,
})
export default class HomeComponent {
  todoSrv = inject(TodoService);
  todoForm = inject(FormBuilder).nonNullable.group({
    title: ['', Validators.required],
  });
  openModal = signal(false);

  resetForm = effect(() => !this.openModal() && this.todoForm.reset());

  handleSave() {
    this.todoSrv.add$.next(this.todoForm.getRawValue());
    this.openModal.set(false);
  }
}
