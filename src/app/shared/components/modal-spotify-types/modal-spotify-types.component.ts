import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { spotifyActionsGroup } from '@src/app/core/store/actions/spotify.actions';
import {
  selectSpotifySearchValueFeature,
  selectSpotifySelectedTypesFeature,
} from '@src/app/core/store/selectors/spotify.selectors';
import { SPOTIFY_TYPES } from '@src/app/shared/constants/spotify';
import { combineLatest, take, tap } from 'rxjs';

@Component({
  selector: 'app-modal-spotify-types',
  standalone: true,
  imports: [TitleCasePipe, AsyncPipe],
  templateUrl: './modal-spotify-types.component.html',
  styleUrl: './modal-spotify-types.component.scss',
})
export class ModalSpotifyTypesComponent {
  private readonly store = inject(Store);

  public readonly searchValue$ = this.store.select(
    selectSpotifySearchValueFeature
  );
  public readonly selectedTypes$ = this.store.select(
    selectSpotifySelectedTypesFeature
  );

  public readonly spotifyTypes = SPOTIFY_TYPES;

  public handleSelectedTypes(selectedType: string) {
    this.store.dispatch(
      spotifyActionsGroup.changeSelectedTypes({ selectedType })
    );
  }

  public submit() {
    combineLatest([this.searchValue$, this.selectedTypes$])
      .pipe(
        take(1),
        tap(([searchValue, selectedTypes]) => {
          this.store.dispatch(
            spotifyActionsGroup.getCatalog({ searchValue, selectedTypes })
          );
          this.store.dispatch(spotifyActionsGroup.handleModal());
        })
      )
      .subscribe();
  }

  public close() {
    this.store.dispatch(spotifyActionsGroup.handleModal());
  }
}
