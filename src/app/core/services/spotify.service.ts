import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { spotifySearchUrl } from '@src/app/shared/constants/spotify';
import { Catalog } from '@src/app/shared/interfaces/catalog.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  private readonly http = inject(HttpClient);

  public getCatalog(search: string): Observable<Catalog> {
    return this.http.get<Catalog>(
      `${spotifySearchUrl}${search}&type=album,artist,playlist,track,show,episode,audiobook`
    );
  }
}
