import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AuthStore } from '@src/app/core/store/auth.store';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './not-found-page.component.html',
  styleUrl: './not-found-page.component.scss',
})
export class NotFoundPageComponent {
  public readonly authStore = inject(AuthStore);
}
