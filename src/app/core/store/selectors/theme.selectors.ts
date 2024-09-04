import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ThemeState } from '../reducers/theme.reducers';

export type ThemeFeatureState = ThemeState;

export const selectFeature = createFeatureSelector<ThemeFeatureState>('theme');

export const selectThemeFeature = createSelector(
  selectFeature,
  (state: ThemeFeatureState) => state.theme
);
