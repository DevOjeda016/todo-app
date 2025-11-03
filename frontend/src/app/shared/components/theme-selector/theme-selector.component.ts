import { Component, inject } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faDesktop, faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { ThemeService } from '../../../core/services';

@Component({
  selector: 'app-theme-selector',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './theme-selector.component.html',
})
export class ThemeSelectorComponent {
  private themeService = inject(ThemeService);

  currentTheme = this.themeService.currentTheme;
  openThemeMenu = false;

  // Íconos
  faMoon = faMoon;
  faSun = faSun;
  faDesktop = faDesktop;

  selectTheme(mode: 'light' | 'dark' | 'auto') {
    this.themeService.setTheme(mode);
    this.openThemeMenu = false;
  }
}
