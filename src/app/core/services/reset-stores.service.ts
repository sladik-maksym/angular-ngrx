import { inject, Injectable } from '@angular/core';

import { SpotifyStore } from '@src/app/core/store/spotify.store';
import { ThemeStore } from '@src/app/core/store/theme.store';

@Injectable({
  providedIn: 'root',
})
export class ResetStoresService {
  private readonly spotifyStore = inject(SpotifyStore);
  private readonly themeStore = inject(ThemeStore);

  public resetStores() {
    this.spotifyStore.resetStore();
    this.themeStore.resetStore();
  }
}
