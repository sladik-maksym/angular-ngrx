import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  watchState,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

import { SpotifyService } from '@src/app/core/services/spotify.service';
import { ERROR_MESSAGES } from '@src/app/shared/constants/error-messages';
import { Catalog } from '@src/app/shared/interfaces/catalog.interfaces';
import { SpotifyError } from '@src/app/shared/interfaces/spotify.interfaces';

interface SpotifyState {
  accessToken: string | null;
  catalog: Catalog | null;
  loading: boolean;
  error: null | string;
  isModalOpened: boolean;
  searchValue: string;
  selectedTypes: string[];
}

const initialState: SpotifyState = {
  accessToken: null,
  catalog: null,
  loading: false,
  error: null,
  isModalOpened: false,
  searchValue: '',
  selectedTypes: [],
};

export const SpotifyStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(
    (
      store,
      spotifyService = inject(SpotifyService),
      router = inject(Router)
    ) => ({
      setAccessToken(accessToken: SpotifyState['accessToken']) {
        patchState(store, { accessToken });
      },
      setSearchValue(searchValue: SpotifyState['searchValue']) {
        patchState(store, { searchValue });
      },
      setSelectedTypes(selectedType: SpotifyState['selectedTypes'][number]) {
        patchState(store, (state) => {
          const isSelected = state.selectedTypes.includes(selectedType);
          const nextSelectedTypes = isSelected
            ? [...state.selectedTypes.filter((v) => v !== selectedType)]
            : [...state.selectedTypes, selectedType];
          return { selectedTypes: nextSelectedTypes };
        });
      },
      setIsModalOpened() {
        patchState(store, (state) => ({ isModalOpened: !state.isModalOpened }));
      },
      setCatalog: rxMethod<{
        searchValue: SpotifyState['searchValue'];
        selectedTypes: SpotifyState['selectedTypes'];
      }>(
        pipe(
          tap(() => patchState(store, { loading: true, error: null })),
          switchMap(({ searchValue, selectedTypes }) => {
            return spotifyService.getCatalog(searchValue, selectedTypes).pipe(
              tapResponse({
                next: (catalog) => patchState(store, { catalog }),
                error: (e: SpotifyError) => {
                  const isAccessTokenExpired = e.status === 401;

                  if (isAccessTokenExpired) {
                    router.navigate(['/dashboard']);
                  }

                  const error = isAccessTokenExpired
                    ? ERROR_MESSAGES.ACCESS_TOKEN_EXPIRED
                    : ERROR_MESSAGES.SOMETHING_WRONG;

                  patchState(store, { error });
                },
                finalize: () => patchState(store, { loading: false }),
              })
            );
          })
        )
      ),
    })
  ),
  withHooks({
    onInit(store) {
      watchState(store, (state) => {
        console.log('[WatchState] SpotifyStore', state);
      });
    },
  })
);
