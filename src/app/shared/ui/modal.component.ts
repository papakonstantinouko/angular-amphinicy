import { Dialog } from '@angular/cdk/dialog';
import {
  Component,
  contentChild,
  input,
  TemplateRef,
  inject,
  effect,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  template: ``,
})
export class ModalComponent {
  dialog = inject(Dialog);
  isOpen = input(false);
  template = contentChild.required(TemplateRef);

  toggleModal = effect(() => {
    if (this.isOpen()) {
      this.dialog.open(this.template(), {
        panelClass: 'dialog-container',
        hasBackdrop: true,
      });
    } else {
      this.dialog.closeAll();
    }
  });
}
