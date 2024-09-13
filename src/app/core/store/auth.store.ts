import { inject } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { UserCredential } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  watchState,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { ERROR_MESSAGES } from '@src/app/shared/constants/error-messages';
import { pipe, switchMap, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

type AuthState = {
  user: UserCredential | null;
  loading: boolean;
  error: string | null;
};

const firebaseUser = localStorage.getItem('firebase-user');
const initialUser: AuthState['user'] = firebaseUser
  ? JSON.parse(firebaseUser)
  : null;

const initialState: AuthState = {
  user: initialUser,
  loading: false,
  error: null,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(
    (store, authService = inject(AuthService), router = inject(Router)) => ({
      signUp: rxMethod<{ email: string; password: string }>(
        pipe(
          tap(() => patchState(store, { loading: true, error: null })),
          switchMap((payload) => {
            return authService.signUp(payload).pipe(
              tapResponse({
                next: (user) => {
                  patchState(store, { user });
                  localStorage.setItem('firebase-user', JSON.stringify(user));
                  router.navigate(['/dashboard']);
                },
                error: () =>
                  patchState(store, { error: ERROR_MESSAGES.SOMETHING_WRONG }),
                finalize: () => patchState(store, { loading: false }),
              })
            );
          })
        )
      ),
      signIn: rxMethod<{ email: string; password: string }>(
        pipe(
          tap(() => patchState(store, { loading: true, error: null })),
          switchMap((payload) => {
            return authService.signIn(payload).pipe(
              tapResponse({
                next: (user) => {
                  patchState(store, { user });
                  localStorage.setItem('firebase-user', JSON.stringify(user));
                  router.navigate(['/dashboard']);
                },
                error: (e: FirebaseError) => {
                  const isInvalidCredential =
                    e.message ===
                    'FirebaseError: Firebase: Error (auth/invalid-credential).';
                  const error = isInvalidCredential
                    ? ERROR_MESSAGES.INVALID_CREDENTIAL
                    : ERROR_MESSAGES.SOMETHING_WRONG;

                  patchState(store, { error });
                },
                finalize: () => patchState(store, { loading: false }),
              })
            );
          })
        )
      ),
      signOut: rxMethod<void>(
        pipe(
          switchMap(() => {
            return authService.logOut().pipe(
              tapResponse({
                next: () => {
                  patchState(store, { user: null });
                  localStorage.removeItem('firebase-user');
                  router.navigate(['/auth/sign-in']);
                },
                error: (e) => {
                  console.log('Sign Out Error', e);
                },
              })
            );
          })
        )
      ),
      resetError() {
        if (store.error()) {
          patchState(store, { error: null });
        }
      },
    })
  ),
  withHooks({
    onInit(store) {
      watchState(store, (state) => {
        console.log('[WatchState] AuthStore', state);
      });
    },
  })
);
