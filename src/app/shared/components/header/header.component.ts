import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { authActionsGroup } from '@src/app/core/store/actions/auth.actions';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  private readonly store = inject(Store);

  public logOut() {
    this.store.dispatch(authActionsGroup.logOut());
  }
}
