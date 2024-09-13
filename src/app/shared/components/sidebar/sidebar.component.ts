import { NgClass } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { AuthStore } from '@src/app/core/store/auth.store';
import { SpotifyStore } from '@src/app/core/store/spotify.store';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgClass, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Input({ required: true }) public collapsed!: boolean;
  @Output() private toggle = new EventEmitter<void>();

  public readonly authStore = inject(AuthStore);
  public readonly spotifyStore = inject(SpotifyStore);

  public handleSidebar() {
    this.toggle.emit();
  }
}
