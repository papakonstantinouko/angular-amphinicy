import { Component, effect, inject, signal } from '@angular/core';
import { ModalComponent } from '../shared/ui/modal.component';
import { FormComponent } from '../shared/ui/form.component';
import { FormBuilder, Validators } from '@angular/forms';
import { TodoService } from '../shared/data-access/todo.service';
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
  #fb = inject(FormBuilder);
  todoSrv = inject(TodoService);

  openModal = signal(false);
  todoForm = this.#fb.nonNullable.group({
    title: ['', Validators.required],
  });

  resetForm = effect(() => !this.openModal() && this.todoForm.reset());

  handleSave() {
    this.todoSrv.add$.next(this.todoForm.getRawValue());
    this.openModal.set(false);
  }
}
