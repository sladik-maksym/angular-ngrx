import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { SpotifyStore } from '@src/app/core/store/spotify.store';

export const spotifyInterceptor: HttpInterceptorFn = (req, next) => {
  const spotifyStore = inject(SpotifyStore);
  const accessToken = spotifyStore.accessToken();

  if (!!accessToken) {
    return next(
      req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    );
  }

  return next(req);
};
