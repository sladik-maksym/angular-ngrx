import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAuthFeatureUser } from '@src/app/core/store/selectors/auth.selectors';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [JsonPipe, AsyncPipe],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
})
export class UserPageComponent {
  @Input() public readonly id: string | null = null;

  private readonly store = inject(Store);
  public readonly user$ = this.store.select(selectAuthFeatureUser);
}
