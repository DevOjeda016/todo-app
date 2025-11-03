import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private html = document.documentElement;
  currentTheme = signal<'light' | 'dark' | 'auto'>(this.getStoredTheme());

  constructor() {
    this.applyTheme(this.currentTheme());
    this.listenSystemThemeChange();
  }

  private getStoredTheme(): 'light' | 'dark' | 'auto' {
    return (localStorage.getItem('hs_theme') as 'light' | 'dark' | 'auto') || 'auto';
  }

  private listenSystemThemeChange() {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (this.currentTheme() === 'auto') this.applyTheme('auto');
    });
  }

  setTheme(theme: 'light' | 'dark' | 'auto') {
    localStorage.setItem('hs_theme', theme);
    this.currentTheme.set(theme);
    this.applyTheme(theme);
  }

  getCurrentTheme() {
    return this.currentTheme();
  }

  private applyTheme(theme: 'light' | 'dark' | 'auto') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const forceDark = theme === 'dark' || (theme === 'auto' && prefersDark);

    if (forceDark) this.html.classList.add('dark');
    else this.html.classList.remove('dark');
  }
}
