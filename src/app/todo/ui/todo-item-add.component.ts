import { Component, inject, input, output, signal } from '@angular/core';
import { ModalComponent } from '../../shared/ui/modal.component';
import { FormComponent } from '../../shared/ui/form.component';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-todo-item-add',
  imports: [ModalComponent, FormComponent],
  template: `
    <button (click)="openModal.set(true)">Add Items to Todo</button>
    <app-modal [isOpen]="openModal()">
      <ng-template>
        <app-form
          title="Add Items to Todo"
          [formGroup]="itemsForm"
          (save)="handleSave()"
        />
      </ng-template>
    </app-modal>
  `,
})
export class TodoItemAddComponent {
  #fb = inject(FormBuilder);
  itemsForm = this.#fb.nonNullable.group({
    title: ['', Validators.required],
  });
  openModal = signal(false);
  itemSaved = output<string>();

  handleSave() {
    this.itemSaved.emit(this.itemsForm.getRawValue().title);
    this.openModal.set(false);
  }
}
