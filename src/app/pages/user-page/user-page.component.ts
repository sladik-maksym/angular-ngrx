import { JsonPipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { AuthStore } from '@src/app/core/store/auth.store';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss',
})
export class UserPageComponent {
  @Input() public readonly id: string | null = null;

  public readonly authStore = inject(AuthStore);
}
