export interface AnimeMedia {
  title: string;
  cover: string;
  synopsis: string;
  rating: string;
  slug: string;
  type: string;
  url: string;
}

export interface AnimeDetail {
  title: string;
  alternative_titles: string[];
  status: string;
  rating: string;
  type: string;
  cover: string;
  synopsis: string;
  genres: string[];
  next_airing_episode?: string;
  episodes: AnimeEpisode[];
  url: string;
  related: AnimeRelated[];
}

export interface AnimeEpisode {
  number: number;
  slug: string;
  url: string;
}

export interface AnimeRelated {
  title: string;
  relation: string;
  slug: string;
  url: string;
}

export interface EpisodeDetail {
  title: string;
  number: number;
  servers: EpisodeServer[];
}

export interface EpisodeServer {
  name: string;
  download: string;
  embed: string;
}

export interface LatestEpisode {
  title: string;
  number: number;
  cover: string;
  url: string;
}

export interface OnAirAnime {
  title: string;
  type: string;
  slug: string;
  url: string;
}

export interface SearchResult {
  currentPage: number;
  hasNextPage: boolean;
  previousPage?: string;
  nextPage?: string;
  foundPages: number;
  media: AnimeMedia[];
}

export interface SearchFilters {
  types?: string[];
  genres?: string[];
  statuses?: number[];
}

export interface APIResponse<T> {
  success: boolean;
  data: T;
}
