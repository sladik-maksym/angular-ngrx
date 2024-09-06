import { AsyncPipe, NgClass } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAuthUserFeature } from '@src/app/core/store/selectors/auth.selectors';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgClass, RouterLink, AsyncPipe, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  @Input({ required: true }) public collapsed!: boolean;
  @Output() private toggle = new EventEmitter<boolean>();

  private readonly store = inject(Store);

  public readonly user$ = this.store.select(selectAuthUserFeature);

  public handleSidebar() {
    this.toggle.emit();
  }
}
