import { JsonPipe, KeyValuePipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, KeyValuePipe],
  template: `
    <h2>{{ title() }}</h2>
    <form [formGroup]="formGroup()" (ngSubmit)="save.emit()">
      @for (control of formGroup().controls | keyvalue; track control.key) {
      <div>
        <label [for]="control.key">{{ control.key }}</label>
        <input [id]="control.key" type="text" [formControlName]="control.key" />
      </div>
      }
      <button type="submit">Save</button>
    </form>
    >
  `,
})
export class FormComponent {
  title = input.required<string>();
  formGroup = input.required<FormGroup>();
  save = output();
}
