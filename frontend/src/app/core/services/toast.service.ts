import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'info';
export interface Toast {
  id: number;
  message: string;
  type: ToastType;
  timeout?: number;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  private counter = 0;
  toasts = signal<Toast[]>([]);

  show(message: string, type: ToastType = 'info', duration = 3000) {
    const id = ++this.counter;
    const toast: Toast = { id, message, type };
    this.toasts.update((prev) => [...prev, toast]);
    if (duration > 0) {
      window.setTimeout(() => this.dismiss(id), duration);
    }
  }

  dismiss(id: number) {
    this.toasts.update((prev) => prev.filter((t) => t.id !== id));
  }

  clear() {
    this.toasts.set([]);
  }
}
