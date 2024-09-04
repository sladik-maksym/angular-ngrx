import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../reducers/auth.reducers';

export type AuthFeatureState = AuthState;

export const selectFeature = createFeatureSelector<AuthFeatureState>('auth');

export const selectAuthFeatureUser = createSelector(
  selectFeature,
  (state: AuthFeatureState) => state.user
);

export const selectAuthFeatureLoading = createSelector(
  selectFeature,
  (state: AuthFeatureState) => state.loading
);

export const selectAuthFeatureFailed = createSelector(
  selectFeature,
  (state: AuthFeatureState) => state.error
);
