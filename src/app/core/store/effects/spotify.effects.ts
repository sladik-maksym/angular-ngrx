import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SpotifyService } from '@src/app/core/services/spotify.service';
import { ERROR_MESSAGES } from '@src/app/shared/constants/error-messages';
import { catchError, map, of, switchMap } from 'rxjs';
import { spotifyActionsGroup } from '../actions/spotify.actions';

export const spotifyEffect$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const spotifyService = inject(SpotifyService);
    const router = inject(Router);

    return actions$.pipe(
      ofType(spotifyActionsGroup.getCatalog),
      switchMap(({ searchValue, selectedTypes }) => {
        return spotifyService.getCatalog(searchValue, selectedTypes).pipe(
          map((catalog) => {
            return spotifyActionsGroup.success({ catalog });
          }),
          catchError((e) => {
            const isAccessTokenExpired = (e.status = 401);

            if (isAccessTokenExpired) {
              router.navigate(['/dashboard']);
            }

            const error = isAccessTokenExpired
              ? ERROR_MESSAGES.ACCESS_TOKEN_EXPIRED
              : ERROR_MESSAGES.SOMETHING_WRONG;

            return of(spotifyActionsGroup.failed({ error }));
          })
        );
      })
    );
  },
  { functional: true }
);
