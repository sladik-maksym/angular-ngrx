import { AsyncPipe, NgClass, UpperCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ThemeSwitcherActions from '@src/app/core/store/actions/theme.actions';
import { selectThemeFeature } from '@src/app/core/store/selectors/theme.selectors';
import { ButtonHoverEffectDirective } from '@src/app/shared/directives/button-hover-effect.directive';
import { THEMES } from './shared/constants/theme-switcher.constants';
import { Themes } from './shared/interfaces/theme-switcher.interfaces';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [UpperCasePipe, NgClass, ButtonHoverEffectDirective, AsyncPipe],
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.scss',
})
export class ThemeSwitcherComponent {
  private readonly store = inject(Store);
  public readonly theme$ = this.store.select(selectThemeFeature);
  public readonly themes: Themes = THEMES;
  public readonly buttons = [
    {
      title: THEMES.LIGHT,
      click: () =>
        this.store.dispatch(
          ThemeSwitcherActions.changeTheme({ theme: THEMES.LIGHT })
        ),
    },
    {
      title: THEMES.DARK,
      click: () =>
        this.store.dispatch(
          ThemeSwitcherActions.changeTheme({ theme: THEMES.DARK })
        ),
    },
  ];
}
