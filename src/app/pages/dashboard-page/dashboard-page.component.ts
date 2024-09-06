import {
  AsyncPipe,
  KeyValuePipe,
  TitleCasePipe
} from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { spotifyActionsGroup } from '@src/app/core/store/actions/spotify.actions';
import {
  selectSpotifyCatalogFeature,
  selectSpotifyFailedFeature,
  selectSpotifyLoadingFeature,
} from '@src/app/core/store/selectors/spotify.selectors';
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
  activatedRoute = inject(ActivatedRoute);
  store = inject(Store);

  catalog$ = this.store.select(selectSpotifyCatalogFeature);
  loading$ = this.store.select(selectSpotifyLoadingFeature);
  error$ = this.store.select(selectSpotifyFailedFeature);

  ngOnInit() {
    this.activatedRoute.fragment.subscribe((fragment) => {
      this.store.dispatch(
        spotifyActionsGroup.setAccessToken({
          accessToken: getURLSearchParams(fragment),
        })
      );
    });
  }
}
