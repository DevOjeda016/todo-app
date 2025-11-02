import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArchive,
  faDesktop,
  faMoon,
  faPlus,
  faSearch,
  faSun,
} from '@fortawesome/free-solid-svg-icons';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
})
export class App {
  title = signal('frontend');

  private themeService = inject(ThemeService);
  currentTheme = this.themeService.currentTheme;
  openThemeMenu = false;

  faPlus = faPlus;
  faSearch = faSearch;
  faArchive = faArchive;
  faMoon = faMoon;
  faSun = faSun;
  faDesktop = faDesktop;

  changeTheme(mode: 'light' | 'dark' | 'auto') {
    this.themeService.setTheme(mode);
  }

  selectTheme(mode: 'light' | 'dark' | 'auto') {
    this.changeTheme(mode);
    this.openThemeMenu = false;
  }
}
