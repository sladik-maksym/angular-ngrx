import { NgClass } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

import { AuthStore } from '@src/app/core/store/auth.store';
import { ERROR_MESSAGES } from '@src/app/shared/constants/error-messages';
import { SignInForm } from './shared/interfaces/sign-in-page.interfaces';

@Component({
  selector: 'app-sign-in-page',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, NgClass],
  templateUrl: './sign-in-page.component.html',
  styleUrl: './sign-in-page.component.scss',
})
export class SignInPageComponent implements OnDestroy {
  public readonly authStore = inject(AuthStore);

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
    this.authStore.resetError();
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

    this.authStore.signIn(this.signInForm.getRawValue());
  }
}
