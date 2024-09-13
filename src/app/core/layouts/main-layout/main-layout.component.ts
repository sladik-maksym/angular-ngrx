import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { SpotifyStore } from '@src/app/core/store/spotify.store';
import { HeaderComponent } from '@src/app/shared/components/header/header.component';
import { ModalSpotifyTypesComponent } from '@src/app/shared/components/modal-spotify-types/modal-spotify-types.component';
import { SidebarComponent } from '@src/app/shared/components/sidebar/sidebar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    NgClass,
    HeaderComponent,
    SidebarComponent,
    ModalSpotifyTypesComponent,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  public readonly spotifyStore = inject(SpotifyStore);

  public collapsed = true;
}
