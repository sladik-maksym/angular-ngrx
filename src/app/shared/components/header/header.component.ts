import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { authActionsGroup } from '@src/app/core/store/actions/auth.actions';
import { spotifyActionsGroup } from '@src/app/core/store/actions/spotify.actions';
import { selectSpotifyAccessTokenFeature } from '@src/app/core/store/selectors/spotify.selectors';
import { spotifyAuthUrl } from '@src/app/shared/constants/spotify';
import { take, tap } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly store = inject(Store);

  private readonly accessToken$ = this.store.select(
    selectSpotifyAccessTokenFeature
  );

  public searchValue: string = '';

  public handleSpotify() {
    this.accessToken$
      .pipe(
        take(1),
        tap((accessToken) => {
          if (accessToken) {
            this.store.dispatch(
              spotifyActionsGroup.getCatalog({ searchValue: this.searchValue })
            );
          } else {
            window.open(spotifyAuthUrl, '_parent')?.focus();
          }
        })
      )
      .subscribe();
  }

  public handleSearch(event: Event) {
    this.searchValue = (event.target as HTMLInputElement).value;
  }

  public logOut() {
    this.store.dispatch(authActionsGroup.logOut());
  }
}
