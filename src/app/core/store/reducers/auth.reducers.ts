import { UserCredential } from '@angular/fire/auth';
import { createFeature, createReducer, on } from '@ngrx/store';
import { authActionsGroup } from '../actions/auth.actions';

export type AuthState = {
  user: UserCredential | null;
  loading: boolean;
  error: string | null;
};

const firebaseUser = localStorage.getItem('firebase-user');
const initialUser: AuthState['user'] = firebaseUser
  ? JSON.parse(firebaseUser)
  : null;

export const initialState: AuthState = {
  user: initialUser,
  loading: false,
  error: null,
};

export const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(authActionsGroup.signUp, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(authActionsGroup.signIn, (state) => ({
      ...state,
      loading: true,
      error: null,
    })),
    on(authActionsGroup.success, (state, { user }) => ({
      ...state,
      user,
      loading: false,
    })),
    on(authActionsGroup.failed, (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })),
    on(authActionsGroup.logOut, (state) => ({
      ...state,
      user: null,
    })),
    on(authActionsGroup.resetError, (state) => ({
      ...state,
      error: null,
    }))
  ),
});
