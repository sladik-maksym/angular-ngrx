import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAuthUserFeature } from '@src/app/core/store/selectors/auth.selectors';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  templateUrl: './not-found-page.component.html',
  styleUrl: './not-found-page.component.scss',
})
export class NotFoundPageComponent {
  private readonly store = inject(Store);

  public readonly user$ = this.store.select(selectAuthUserFeature);
}
