import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';

type Variant = 'primary' | 'warning' | 'danger';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-dialog.component.html',
})
export class ConfirmDialogComponent {
  @ViewChild('confirmModal', { static: true }) dialogRef!: ElementRef<HTMLDialogElement>;

  message = '¿Estás seguro?';
  confirmText = 'Confirmar';
  cancelText = 'Cancelar';
  variant: Variant = 'primary';

  private resolver?: (value: boolean) => void;

  open(
    message: string,
    options?: { confirmText?: string; cancelText?: string; variant?: Variant },
  ): Promise<boolean> {
    this.message = message;
    this.confirmText = options?.confirmText ?? 'Confirmar';
    this.cancelText = options?.cancelText ?? 'Cancelar';
    this.variant = options?.variant ?? 'primary';
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
