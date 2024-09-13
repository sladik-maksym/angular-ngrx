import { Component, inject } from '@angular/core';

import { AuthStore } from '@src/app/core/store/auth.store';
import { SpotifyStore } from '@src/app/core/store/spotify.store';
import { spotifyAuthUrl } from '@src/app/shared/constants/spotify';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly authStore = inject(AuthStore);
  public readonly spotifyStore = inject(SpotifyStore);

  public handleSpotify() {
    if (!this.spotifyStore.searchValue()) return;

    if (!!this.spotifyStore.accessToken()) {
      this.spotifyStore.setIsModalOpened();
    } else {
      window.open(spotifyAuthUrl, '_parent')?.focus();
    }
  }

  public handleSearch(event: Event) {
    const searchValue = (event.target as HTMLInputElement).value;
    this.spotifyStore.setSearchValue(searchValue);
  }

  public logOut() {
    this.authStore.signOut();
  }
}
