import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-dialog.component.html',
})
export class ConfirmDialogComponent {
  @ViewChild('confirmModal', { static: true }) dialogRef!: ElementRef<HTMLDialogElement>;

  message = '¿Estás seguro?';
  private resolver?: (value: boolean) => void;

  open(message: string): Promise<boolean> {
    this.message = message;
    this.dialogRef.nativeElement.showModal();
    return new Promise<boolean>((resolve) => {
      this.resolver = resolve;
    });
  }

  close() {
    this.dialogRef.nativeElement.close();
  }

  onConfirm() {
    this.resolver?.(true);
    this.close();
  }

  onCancel() {
    this.resolver?.(false);
    this.close();
  }
}
