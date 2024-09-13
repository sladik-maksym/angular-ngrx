import { AsyncPipe, NgClass } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthStore } from '@src/app/core/store/auth.store';
import { selectSpotifyAccessTokenFeature } from '@src/app/core/store/selectors/spotify.selectors';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgClass, RouterLink, AsyncPipe, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Input({ required: true }) public collapsed!: boolean;
  @Output() private toggle = new EventEmitter<void>();

  private readonly store = inject(Store);
  public readonly authStore = inject(AuthStore);

  public readonly accessToken$ = this.store.select(
    selectSpotifyAccessTokenFeature
  );

  public handleSidebar() {
    this.toggle.emit();
  }
}
