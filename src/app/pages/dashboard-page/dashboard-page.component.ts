import { KeyValuePipe, TitleCasePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

import { SpotifyStore } from '@src/app/core/store/spotify.store';
import { SPOTIFY_TYPES } from '@src/app/shared/constants/spotify';
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
    TitleCasePipe,
    CalculatorComponent,
    ThemeSwitcherComponent,
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
})
export class DashboardPageComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  public readonly spotifyStore = inject(SpotifyStore);

  public readonly spotifyTypes = SPOTIFY_TYPES;

  ngOnInit() {
    this.activatedRoute.fragment.subscribe((fragment) => {
      this.spotifyStore.setAccessToken(getURLSearchParams(fragment));
    });
  }

  public submit() {
    this.spotifyStore.setCatalog({
      searchValue: this.spotifyStore.searchValue(),
      selectedTypes: this.spotifyStore.selectedTypes(),
    });
  }

  public handleSelectedTypes(selectedType: string) {
    this.spotifyStore.setSelectedTypes(selectedType);
  }
}
