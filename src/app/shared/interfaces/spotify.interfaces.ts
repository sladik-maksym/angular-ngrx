export type SpotifyError = {
  status: number;
  message: string;
};

export type SpotifyType =
  | 'album'
  | 'artist'
  | 'audiobook'
  | 'episode'
  | 'playlist'
  | 'show'
  | 'track';
