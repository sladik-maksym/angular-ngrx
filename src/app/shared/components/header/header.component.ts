import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { spotifyActionsGroup } from '@src/app/core/store/actions/spotify.actions';
import { AuthStore } from '@src/app/core/store/auth.store';
import {
  selectSpotifyAccessTokenFeature,
  selectSpotifySearchValueFeature,
} from '@src/app/core/store/selectors/spotify.selectors';
import { spotifyAuthUrl } from '@src/app/shared/constants/spotify';
import { combineLatest, take, tap } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly store = inject(Store);
  private readonly authStore = inject(AuthStore);

  private readonly accessToken$ = this.store.select(
    selectSpotifyAccessTokenFeature
  );
  public readonly searchValue$ = this.store.select(
    selectSpotifySearchValueFeature
  );

  public handleSpotify() {
    combineLatest([this.accessToken$, this.searchValue$])
      .pipe(
        take(1),
        tap(([accessToken, searchValue]) => {
          if (!searchValue) return;

          if (accessToken) {
            this.store.dispatch(spotifyActionsGroup.handleModal());
          } else {
            window.open(spotifyAuthUrl, '_parent')?.focus();
          }
        })
      )
      .subscribe();
  }

  public handleSearch(event: Event) {
    const searchValue = (event.target as HTMLInputElement).value;
    this.store.dispatch(spotifyActionsGroup.changeSearchValue({ searchValue }));
  }

  public logOut() {
    this.authStore.signOut();
  }
}
