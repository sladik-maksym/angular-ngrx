import { AsyncPipe, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { HeaderComponent } from '@src/app/shared/components/header/header.component';
import { ModalSpotifyTypesComponent } from '@src/app/shared/components/modal-spotify-types/modal-spotify-types.component';
import { SidebarComponent } from '@src/app/shared/components/sidebar/sidebar.component';
import { selectSpotifyIsModalOpenedFeature } from '../../store/selectors/spotify.selectors';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    NgClass,
    HeaderComponent,
    SidebarComponent,
    ModalSpotifyTypesComponent,
    AsyncPipe,
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
})
export class MainLayoutComponent {
  private readonly store = inject(Store);

  public readonly isModalOpened$ = this.store.select(
    selectSpotifyIsModalOpenedFeature
  );

  public collapsed = true;
}
