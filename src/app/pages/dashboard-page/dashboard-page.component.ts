import { AsyncPipe, KeyValuePipe, TitleCasePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { spotifyActionsGroup } from '@src/app/core/store/actions/spotify.actions';
import {
  selectSpotifyCatalogFeature,
  selectSpotifyFailedFeature,
  selectSpotifyLoadingFeature,
  selectSpotifySearchValueFeature,
  selectSpotifySelectedTypesFeature,
} from '@src/app/core/store/selectors/spotify.selectors';
import { SPOTIFY_TYPES } from '@src/app/shared/constants/spotify';
import { combineLatest, take, tap } from 'rxjs';
import { CalculatorComponent } from './shared/components/calculator/calculator.component';
import { ThemeSwitcherComponent } from './shared/components/theme-switcher/theme-switcher.component';

const getURLSearchParams = (
  fragment: ActivatedRouteSnapshot['fragment']
): ReturnType<URLSearchParams['get']> => {
  if (!fragment) return null;
  return new URLSearchParams(fragment).get('access_token');
};

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    KeyValuePipe,
    AsyncPipe,
    TitleCasePipe,
    CalculatorComponent,
    ThemeSwitcherComponent,
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly store = inject(Store);

  public readonly catalog$ = this.store.select(selectSpotifyCatalogFeature);
  public readonly loading$ = this.store.select(selectSpotifyLoadingFeature);
  public readonly error$ = this.store.select(selectSpotifyFailedFeature);
  public readonly selectedTypes$ = this.store.select(
    selectSpotifySelectedTypesFeature
  );
  public readonly searchValue$ = this.store.select(
    selectSpotifySearchValueFeature
  );

  public readonly spotifyTypes = SPOTIFY_TYPES;

  ngOnInit() {
    this.activatedRoute.fragment.subscribe((fragment) => {
      this.store.dispatch(
        spotifyActionsGroup.setAccessToken({
          accessToken: getURLSearchParams(fragment),
        })
      );
    });
  }

  public submit() {
    combineLatest([this.searchValue$, this.selectedTypes$])
      .pipe(
        take(1),
        tap(([searchValue, selectedTypes]) => {
          this.store.dispatch(
            spotifyActionsGroup.getCatalog({ searchValue, selectedTypes })
          );
        })
      )
      .subscribe();
  }

  public handleSelectedTypes(selectedType: string) {
    this.store.dispatch(
      spotifyActionsGroup.changeSelectedTypes({ selectedType })
    );
  }
}
