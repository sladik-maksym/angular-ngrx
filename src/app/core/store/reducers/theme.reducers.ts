import { createFeature, createReducer, on } from '@ngrx/store';
import { THEMES } from '@src/app/pages/dashboard-page/shared/components/theme-switcher/shared/constants/theme-switcher.constants';
import { Theme } from '@src/app/pages/dashboard-page/shared/components/theme-switcher/shared/interfaces/theme-switcher.interfaces';
import * as ThemeSwitcherActions from '../actions/theme.actions';

export interface ThemeState {
  theme: Theme;
}

export const initialState: ThemeState = {
  theme: THEMES.LIGHT,
};

export const themeFeature = createFeature({
  name: 'theme',
  reducer: createReducer(
    initialState,
    on(ThemeSwitcherActions.changeTheme, (state, { theme }) => ({
      ...state,
      theme,
    }))
  ),
});
