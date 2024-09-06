import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../reducers/auth.reducers';

export type AuthFeatureState = AuthState;

export const selectFeature = createFeatureSelector<AuthFeatureState>('auth');

export const selectAuthUserFeature = createSelector(
  selectFeature,
  (state: AuthFeatureState) => state.user
);

export const selectAuthLoadingFeature = createSelector(
  selectFeature,
  (state: AuthFeatureState) => state.loading
);

export const selectAuthFailedFeature = createSelector(
  selectFeature,
  (state: AuthFeatureState) => state.error
);
