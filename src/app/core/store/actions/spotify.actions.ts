import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Catalog } from '@src/app/shared/interfaces/catalog.interfaces';

export const spotifyActionsGroup = createActionGroup({
  source: 'Spotify',
  events: {
    setAccessToken: props<{ accessToken: string | null }>(),
    getCatalog: props<{ searchValue: string; selectedTypes: string[] }>(),
    success: props<{ catalog: Catalog }>(),
    failed: props<{ error: string }>(),
    handleModal: emptyProps(),
    changeSearchValue: props<{ searchValue: string }>(),
    changeSelectedTypes: props<{ selectedType: string }>(),
  },
});
