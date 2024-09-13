import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthStore } from '@src/app/core/store/auth.store';

export const canActivateMainRoutes: CanActivateFn = () => {
  const router = inject(Router);
  const authStore = inject(AuthStore);

  if (!!authStore.user()) {
    return true;
  }

  router.navigate(['/auth/sign-in']);
  return false;
};
