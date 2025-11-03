import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { Main } from './components/main/main';
import { ToastContainerComponent } from './shared/components/toast-container/toast-container.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  imports: [CommonModule, Header, Footer, Main, ToastContainerComponent],
})
export class App {
  title = signal('frontend');
}
