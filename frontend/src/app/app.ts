import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { Footer } from './components/footer/footer';
import { Header } from './components/header/header';
import { Main } from './components/main/main';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  imports: [CommonModule, Header, Footer, Main],
})
export class App {
  title = signal('frontend');
}
