import { UserCredential } from '@angular/fire/auth';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const authActionsGroup = createActionGroup({
  source: 'Auth',
  events: {
    signUp: props<{ email: string; password: string }>(),
    signIn: props<{ email: string; password: string }>(),
    success: props<{ user: UserCredential }>(),
    failed: props<{ error: string | null }>(),
    logOut: emptyProps(),
    resetError: emptyProps(),
  },
});
