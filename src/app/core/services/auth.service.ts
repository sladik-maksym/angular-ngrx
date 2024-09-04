import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from '@angular/fire/auth';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly auth = inject(Auth);

  public signUp(payload: {
    email: string;
    password: string;
  }): Observable<UserCredential> {
    return from(
      createUserWithEmailAndPassword(this.auth, payload.email, payload.password)
    );
  }

  public signIn(payload: {
    email: string;
    password: string;
  }): Observable<UserCredential> {
    return from(
      signInWithEmailAndPassword(this.auth, payload.email, payload.password)
    );
  }

  public logOut(): Observable<void> {
    return from(signOut(this.auth));
  }
}
