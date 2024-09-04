import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAuthFeatureUser } from '@src/app/core/store/selectors/auth.selectors';
import { map } from 'rxjs';

export const canActivateAuthRoutes: CanActivateFn = () => {
  const router = inject(Router);
  const store = inject(Store);
  const user$ = store.select(selectAuthFeatureUser);

  return user$.pipe(
    map((user) => {
      if (user) {
        router.navigate(['/dashboard']);
        return false;
      }

      return true;
    })
  );
};
