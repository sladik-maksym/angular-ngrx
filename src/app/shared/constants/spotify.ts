import { SpotifyType } from '@src/app/shared/interfaces/spotify.interfaces';
import { environment } from '@src/environments/environment';

export const spotifyAuthUrl = `https://accounts.spotify.com/authorize?response_type=${environment.spotify.responseType}&client_id=${environment.spotify.clientId}&redirect_uri=${environment.spotify.redirectUri}`;
export const spotifySearchUrl = 'https://api.spotify.com/v1/search';
export const SPOTIFY_TYPES: SpotifyType[] = [
  'album',
  'artist',
  'audiobook',
  'episode',
  'playlist',
  'show',
  'track',
];
