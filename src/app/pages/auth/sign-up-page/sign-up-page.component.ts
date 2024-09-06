import { AsyncPipe, NgClass } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { authActionsGroup } from '@src/app/core/store/actions/auth.actions';
import {
  selectAuthFailedFeature,
  selectAuthLoadingFeature,
} from '@src/app/core/store/selectors/auth.selectors';
import { filter, take, tap } from 'rxjs';
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
    AsyncPipe,
  ],
  templateUrl: './sign-up-page.component.html',
  styleUrl: './sign-up-page.component.scss',
})
export class SignUpPageComponent implements OnDestroy {
  private readonly store = inject(Store);

  public readonly loading$ = this.store.select(selectAuthLoadingFeature);
  public readonly error$ = this.store.select(selectAuthFailedFeature);

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
    this.store.dispatch(authActionsGroup.resetError());
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
    this.error$
      .pipe(
        take(1),
        filter((error) => !!error),
        tap(() => this.store.dispatch(authActionsGroup.resetError()))
      )
      .subscribe();

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
    this.store.dispatch(
      authActionsGroup.signUp({
        email: formValues.userDetails.email,
        password: formValues.userDetails.password,
      })
    );
  }
}
