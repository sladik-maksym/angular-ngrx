import { createFeature, createReducer, on } from '@ngrx/store';
import { Catalog } from '@src/app/shared/interfaces/catalog.interfaces';
import { spotifyActionsGroup } from '../actions/spotify.actions';

export interface SpotifyState {
  accessToken: string | null;
  catalog: Catalog | null;
  loading: boolean;
  error: null | string;
  isModalOpened: boolean;
  searchValue: string;
  selectedTypes: string[];
}

export const initialState: SpotifyState = {
  accessToken: null,
  catalog: null,
  loading: false,
  error: null,
  isModalOpened: false,
  searchValue: '',
  selectedTypes: [],
};

export const spotifyFeature = createFeature({
  name: 'spotify',
  reducer: createReducer(
    initialState,
    on(spotifyActionsGroup.setAccessToken, (state, { accessToken }) => ({
      ...state,
      accessToken,
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
      catalog: null,
      loading: false,
      error,
    })),
    on(spotifyActionsGroup.handleModal, (state) => ({
      ...state,
      isModalOpened: !state.isModalOpened,
    })),
    on(spotifyActionsGroup.changeSearchValue, (state, { searchValue }) => ({
      ...state,
      searchValue,
    })),
    on(spotifyActionsGroup.changeSelectedTypes, (state, { selectedType }) => {
      const isSelected = state.selectedTypes.includes(selectedType);
      const nextSelectedTypes = isSelected
        ? [...state.selectedTypes.filter((v) => v !== selectedType)]
        : [...state.selectedTypes, selectedType];

      return {
        ...state,
        selectedTypes: nextSelectedTypes,
      };
    })
  ),
});
