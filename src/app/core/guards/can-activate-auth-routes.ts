import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { AuthStore } from '@src/app/core/store/auth.store';

export const canActivateAuthRoutes: CanActivateFn = () => {
  const router = inject(Router);
  const authStore = inject(AuthStore);

  if (!!authStore.user()) {
    router.navigate(['/dashboard']);
    return false;
  }

  return true;
};
