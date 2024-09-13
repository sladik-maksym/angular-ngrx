import { TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { SpotifyStore } from '@src/app/core/store/spotify.store';
import { SPOTIFY_TYPES } from '@src/app/shared/constants/spotify';

@Component({
  selector: 'app-modal-spotify-types',
  standalone: true,
  imports: [TitleCasePipe],
  templateUrl: './modal-spotify-types.component.html',
  styleUrl: './modal-spotify-types.component.scss',
})
export class ModalSpotifyTypesComponent {
  public readonly spotifyStore = inject(SpotifyStore);

  public readonly spotifyTypes = SPOTIFY_TYPES;

  public handleSelectedTypes(selectedType: string) {
    this.spotifyStore.setSelectedTypes(selectedType);
  }

  public submit() {
    this.spotifyStore.setCatalog({
      searchValue: this.spotifyStore.searchValue(),
      selectedTypes: this.spotifyStore.selectedTypes(),
    });

    this.spotifyStore.setIsModalOpened();
  }

  public close() {
    this.spotifyStore.setIsModalOpened();
  }
}
