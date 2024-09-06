import { createActionGroup, props } from '@ngrx/store';
import { Catalog } from '@src/app/shared/interfaces/catalog.interfaces';

export const spotifyActionsGroup = createActionGroup({
  source: 'Spotify',
  events: {
    setAccessToken: props<{ accessToken: string | null }>(),
    getCatalog: props<{ searchValue: string }>(),
    success: props<{ catalog: Catalog }>(),
    failed: props<{ error: string }>(),
  },
});
