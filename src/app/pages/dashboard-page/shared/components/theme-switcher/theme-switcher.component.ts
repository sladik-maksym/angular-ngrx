import { NgClass, UpperCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ThemeStore } from '@src/app/core/store/theme.store';
import { ButtonHoverEffectDirective } from '@src/app/shared/directives/button-hover-effect.directive';
import { THEMES } from './shared/constants/theme-switcher.constants';
import { Themes } from './shared/interfaces/theme-switcher.interfaces';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [UpperCasePipe, NgClass, ButtonHoverEffectDirective],
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.scss',
})
export class ThemeSwitcherComponent {
  public readonly store = inject(ThemeStore);

  public readonly themes: Themes = THEMES;
  public readonly buttons = [
    {
      title: THEMES.LIGHT,
      click: () => this.store.setTheme(THEMES.LIGHT),
    },
    {
      title: THEMES.DARK,
      click: () => this.store.setTheme(THEMES.DARK),
    },
  ];
}
