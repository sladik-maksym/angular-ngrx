import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '@src/app/core/services/auth.service';
import { ERROR_MESSAGES } from '@src/app/shared/constants/error-messages';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { authActionsGroup } from '../actions/auth.actions';
import { Router } from '@angular/router';

export const signUpEffect$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const authService = inject(AuthService);

    return actions$.pipe(
      ofType(authActionsGroup.signUp),
      switchMap((payload) => {
        return authService.signUp(payload).pipe(
          map((user) => {
            localStorage.setItem('firebase-user', JSON.stringify(user));
            return authActionsGroup.success({
              user: JSON.parse(JSON.stringify(user)),
            });
          }),
          catchError(() => {
            return of(
              authActionsGroup.failed({ error: ERROR_MESSAGES.SOMETHING_WRONG })
            );
          })
        );
      })
    );
  },
  { functional: true }
);

export const signInEffect$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const authService = inject(AuthService);

    return actions$.pipe(
      ofType(authActionsGroup.signIn),
      switchMap((payload) => {
        return authService.signIn(payload).pipe(
          map((user) => {
            localStorage.setItem('firebase-user', JSON.stringify(user));
            return authActionsGroup.success({
              user: JSON.parse(JSON.stringify(user)),
            });
          }),
          catchError((e) => {
            const isInvalidCredential =
              e.message ===
              'FirebaseError: Firebase: Error (auth/invalid-credential).';
            const error = isInvalidCredential
              ? ERROR_MESSAGES.INVALID_CREDENTIAL
              : ERROR_MESSAGES.SOMETHING_WRONG;

            return of(authActionsGroup.failed({ error }));
          })
        );
      })
    );
  },
  { functional: true }
);

export const logOutEffect$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const authService = inject(AuthService);

    return actions$.pipe(
      ofType(authActionsGroup.logOut),
      switchMap(() => {
        return authService.logOut().pipe(
          tap(() => {
            localStorage.removeItem('firebase-user');
          })
        );
      })
    );
  },
  { functional: true, dispatch: false }
);

export const authSuccessEffect$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const router = inject(Router);

    return actions$.pipe(
      ofType(authActionsGroup.success),
      tap(() => router.navigate(['/dashboard']))
    );
  },
  {
    functional: true,
    dispatch: false,
  }
);

export const logOutSuccessEffect$ = createEffect(
  () => {
    const actions$ = inject(Actions);
    const router = inject(Router);

    return actions$.pipe(
      ofType(authActionsGroup.logOut),
      tap(() => router.navigate(['/auth/sign-in']))
    );
  },
  {
    functional: true,
    dispatch: false,
  }
);
