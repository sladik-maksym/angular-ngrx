import { Routes } from '@angular/router';

import { canActivateAuthRoutes } from '@src/app/core/guards/can-activate-auth-routes';
import { canActivateMainRoutes } from '@src/app/core/guards/can-activate-main-routes';

export const routes: Routes = [
  {
    path: 'auth',
    loadComponent: () =>
      import('@src/app/core/layouts/auth-layout/auth-layout.component').then(
        (c) => c.AuthLayoutComponent
      ),
    children: [
      { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
      {
        path: 'sign-in',
        title: 'SignIn',
        loadComponent: () =>
          import(
            '@src/app/pages/auth/sign-in-page/sign-in-page.component'
          ).then((c) => c.SignInPageComponent),
      },
      {
        path: 'sign-up',
        title: 'SignUp',
        loadComponent: () =>
          import(
            '@src/app/pages/auth/sign-up-page/sign-up-page.component'
          ).then((c) => c.SignUpPageComponent),
      },
    ],
    canActivate: [canActivateAuthRoutes],
  },
  {
    path: '',
    loadComponent: () =>
      import('@src/app/core/layouts/main-layout/main-layout.component').then(
        (c) => c.MainLayoutComponent
      ),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        title: 'Dashboard',
        loadComponent: () =>
          import('@src/app/pages/dashboard-page/dashboard-page.component').then(
            (c) => c.DashboardPageComponent
          ),
      },
      {
        path: 'user/:id',
        title: 'User',
        loadComponent: () =>
          import('@src/app/pages/user-page/user-page.component').then(
            (c) => c.UserPageComponent
          ),
      },
    ],
    canActivate: [canActivateMainRoutes],
  },
  {
    path: '**',
    loadComponent: () =>
      import('@src/app/pages/not-found-page/not-found-page.component').then(
        (c) => c.NotFoundPageComponent
      ),
  },
];
