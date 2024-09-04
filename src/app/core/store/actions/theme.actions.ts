import { createAction, props } from '@ngrx/store';
import { Theme } from '@src/app/pages/dashboard-page/shared/components/theme-switcher/shared/interfaces/theme-switcher.interfaces';

export const changeTheme = createAction(
  '[Theme Switcher Component] Change Theme',
  props<{ theme: Theme }>()
);
