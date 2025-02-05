import { TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { SpotifyStore } from '@src/app/core/store/spotify.store';
import { SPOTIFY_TYPES } from '@src/app/shared/constants/spotify';
import { SpotifyType } from '@src/app/shared/interfaces/spotify.interfaces';

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

  public handleSelectedTypes(selectedType: SpotifyType) {
    this.spotifyStore.setSelectedTypes(selectedType);
  }

  public submit() {
    this.spotifyStore.setCatalog();

    this.spotifyStore.setIsModalOpened();
  }

  public close() {
    this.spotifyStore.setIsModalOpened();
  }
}
