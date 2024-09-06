import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { switchMap, take } from 'rxjs';
import { selectSpotifyAccessTokenFeature } from '../store/selectors/spotify.selectors';

export const spotifyInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);

  const accessToken$ = store.select(selectSpotifyAccessTokenFeature);

  return accessToken$.pipe(
    take(1),
    switchMap((accessToken) => {
      if (accessToken) {
        return next(
          req.clone({
            setHeaders: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
        );
      }
      return next(req);
    })
  );
};
