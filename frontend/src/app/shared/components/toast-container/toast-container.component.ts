import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCircleCheck,
  faCircleInfo,
  faTriangleExclamation,
} from '@fortawesome/free-solid-svg-icons';
import { ToastService } from '../../../core/services';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './toast-container.component.html',
})
export class ToastContainerComponent {
  toastService = inject(ToastService);

  faCircleCheck = faCircleCheck;
  faCircleInfo = faCircleInfo;
  faTriangleExclamation = faTriangleExclamation;

  iconFor(type: 'success' | 'error' | 'info') {
    return type === 'success'
      ? this.faCircleCheck
      : type === 'error'
        ? this.faTriangleExclamation
        : this.faCircleInfo;
  }
}
