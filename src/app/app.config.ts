import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, isDevMode } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { spotifyInterceptor } from '@src/app/core/interceptors/spotify.interceptor';
import {
  authSuccessEffect$,
  logOutEffect$,
  logOutSuccessEffect$,
  signInEffect$,
  signUpEffect$,
} from '@src/app/core/store/effects/auth.effects';
import { spotifyEffect$ } from '@src/app/core/store/effects/spotify.effects';
import { spotifyFeature } from '@src/app/core/store/reducers//spotify.reducers';
import { authFeature } from '@src/app/core/store/reducers/auth.reducers';
import { themeFeature } from '@src/app/core/store/reducers/theme.reducers';
import { environment } from '@src/environments/environment';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([spotifyInterceptor])),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideStore({
      [themeFeature.name]: themeFeature.reducer,
      [authFeature.name]: authFeature.reducer,
      [spotifyFeature.name]: spotifyFeature.reducer,
    }),
    provideEffects({
      signUpEffect$,
      signInEffect$,
      logOutEffect$,
      authSuccessEffect$,
      logOutSuccessEffect$,
      spotifyEffect$,
    }),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
  ],
};
