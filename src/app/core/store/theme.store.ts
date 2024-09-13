import {
  patchState,
  signalStore,
  watchState,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';

import { THEMES } from '@src/app/pages/dashboard-page/shared/components/theme-switcher/shared/constants/theme-switcher.constants';
import { Theme } from '@src/app/pages/dashboard-page/shared/components/theme-switcher/shared/interfaces/theme-switcher.interfaces';

export interface ThemeState {
  theme: Theme;
}

export const initialState: ThemeState = {
  theme: THEMES.LIGHT,
};

export const ThemeStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    setTheme(theme: ThemeState['theme']) {
      patchState(store, { theme });
    },
  })),
  withHooks({
    onInit(store) {
      watchState(store, (state) => {
        console.log('[WatchState] ThemeStore', state);
      });
    },
  })
);
