import { NgClass } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

import { AuthStore } from '@src/app/core/store/auth.store';
import { FirstStepComponent } from './shared/components/first-step/first-step.component';
import { SecondStepComponent } from './shared/components/second-step/second-step.component';
import {
  email,
  matchPasswords,
  password,
  required,
} from './shared/helper/sign-up-page.validators';
import { SignUpForm } from './shared/interfaces/sign-up-page.interfaces';

@Component({
  selector: 'app-sign-up-page',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    NgClass,
    SecondStepComponent,
    FirstStepComponent,
  ],
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.scss',
})
export class SignUpPageComponent implements OnDestroy {
  public readonly authStore = inject(AuthStore);

  public readonly signUpForm = new FormGroup<SignUpForm>({
    userDetails: new FormGroup(
      {
        email: new FormControl('', {
          nonNullable: true,
          validators: [required.bind(this), email.bind(this)],
        }),
        firstName: new FormControl('', {
          nonNullable: true,
          validators: [required.bind(this)],
        }),
        lastName: new FormControl('', {
          nonNullable: true,
          validators: [required.bind(this)],
        }),
        password: new FormControl('', {
          nonNullable: true,
          validators: [password.bind(this)],
        }),
        repeatPassword: new FormControl('', {
          nonNullable: true,
        }),
      },
      { validators: matchPasswords.bind(this) }
    ),
    organizationDetails: new FormGroup({
      accountType: new FormControl('', {
        nonNullable: true,
        validators: [required.bind(this)],
      }),
      organizationName: new FormControl('', {
        nonNullable: true,
        validators: [required.bind(this)],
      }),
      iotProvider: new FormControl('', {
        nonNullable: true,
        validators: [required.bind(this)],
      }),
    }),
  });
  public currentStep = 1;

  ngOnDestroy() {
    this.authStore.resetError();
  }

  public setNextStep() {
    const isUserDetailsInvalid = this.signUpForm.controls.userDetails.invalid;

    if (isUserDetailsInvalid) {
      this.signUpForm.controls.userDetails.markAllAsTouched();
      return;
    }

    this.currentStep = 2;
  }

  public setPrevStep() {
    this.authStore.resetError();

    this.currentStep = 1;
  }

  public onSubmit() {
    const isOrganizationDetailsInvalid =
      this.signUpForm.controls.organizationDetails.invalid;

    if (isOrganizationDetailsInvalid) {
      this.signUpForm.controls.organizationDetails.markAllAsTouched();
      return;
    }

    const formValues = this.signUpForm.getRawValue();
    this.authStore.signUp({
      email: formValues.userDetails.email,
      password: formValues.userDetails.password,
    });
  }
}
