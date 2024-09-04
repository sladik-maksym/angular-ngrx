import { Routes } from '@angular/router';

import { canActivateAuthRoutes } from '@src/app/core/guards/can-activate-auth-routes';
import { canActivateMainRoutes } from '@src/app/core/guards/can-activate-main-routes';
import { AuthLayoutComponent } from '@src/app/core/layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from '@src/app/core/layouts/main-layout/main-layout.component';
import { SignInPageComponent } from '@src/app/pages/auth/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from '@src/app/pages/auth/sign-up-page/sign-up-page.component';
import { DashboardPageComponent } from '@src/app/pages/dashboard-page/dashboard-page.component';
import { NotFoundPageComponent } from '@src/app/pages/not-found-page/not-found-page.component';
import { UserPageComponent } from '@src/app/pages/user-page/user-page.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: AuthLayoutComponent,
    children: [
      { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
      { path: 'sign-in', title: 'SignIn', component: SignInPageComponent },
      { path: 'sign-up', title: 'SignUp', component: SignUpPageComponent },
    ],
    canActivate: [canActivateAuthRoutes],
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        title: 'Dashboard',
        component: DashboardPageComponent,
      },
      {
        path: 'user/:id',
        title: 'User',
        component: UserPageComponent,
      },
    ],
    canActivate: [canActivateMainRoutes],
  },
  { path: '**', component: NotFoundPageComponent },
];
