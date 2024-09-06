import { createFeature, createReducer, on } from '@ngrx/store';
import { Catalog } from '@src/app/shared/interfaces/catalog.interfaces';
import { spotifyActionsGroup } from '../actions/spotify.actions';

export interface SpotifyState {
  accessToken: string | null;
  catalog: Catalog | null;
  loading: boolean;
  error: null | string;
}

export const initialState: SpotifyState = {
  accessToken: null,
  catalog: null,
  loading: false,
  error: null,
};

export const spotifyFeature = createFeature({
  name: 'spotify',
  reducer: createReducer(
    initialState,
    on(spotifyActionsGroup.setAccessToken, (state, { accessToken }) => ({
      ...state,
      accessToken,
      catalog: null,
      loading: false,
    })),
    on(spotifyActionsGroup.getCatalog, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(spotifyActionsGroup.success, (state, { catalog }) => ({
      ...state,
      catalog,
      loading: false,
    })),
    on(spotifyActionsGroup.failed, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    }))
  ),
});
