import { AsyncPipe, NgClass } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { authActionsGroup } from '@src/app/core/store/actions/auth.actions';
import {
  selectAuthFailedFeature,
  selectAuthLoadingFeature,
} from '@src/app/core/store/selectors/auth.selectors';
import { ERROR_MESSAGES } from '@src/app/shared/constants/error-messages';
import { SignInForm } from './shared/interfaces/sign-in-page.interfaces';

@Component({
  selector: 'app-sign-in-page',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgClass, AsyncPipe],
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.scss',
})
export class SignInPageComponent implements OnDestroy {
  private readonly store = inject(Store);

  public readonly loading$ = this.store.select(selectAuthLoadingFeature);
  public readonly error$ = this.store.select(selectAuthFailedFeature);

  public readonly signInForm = new FormGroup<SignInForm>({
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8)],
    }),
  });

  ngOnDestroy() {
    this.store.dispatch(authActionsGroup.resetError());
  }

  get emailError() {
    const email = this.signInForm.controls.email;
    const isInvalidFieldTouched = email.invalid && email.touched;

    if (isInvalidFieldTouched && email.errors?.['required']) {
      return ERROR_MESSAGES.REQUIRED_FIELD;
    }

    if (isInvalidFieldTouched && email.errors?.['email']) {
      return ERROR_MESSAGES.INVALID_FORMAT;
    }

    return null;
  }

  get passwordError() {
    const password = this.signInForm.controls.password;
    const isInvalidFieldTouched = password.invalid && password.touched;

    if (isInvalidFieldTouched && password.errors?.['required']) {
      return ERROR_MESSAGES.REQUIRED_FIELD;
    }

    if (isInvalidFieldTouched && !password.errors?.['minLength']) {
      return ERROR_MESSAGES.MIN_LENGTH(8);
    }

    return null;
  }

  public onSubmit() {
    if (this.signInForm.invalid) {
      this.signInForm.markAllAsTouched();
      return;
    }

    this.store.dispatch(authActionsGroup.signIn(this.signInForm.getRawValue()));
  }
}
