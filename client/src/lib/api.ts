import { APIResponse, AnimeDetail, AnimeMedia, EpisodeDetail, LatestEpisode, OnAirAnime, SearchResult, SearchFilters } from './types';

const API_BASE = '/api/anime-api';

export async function fetchOnAirAnimes(): Promise<OnAirAnime[]> {
  const response = await fetch(`${API_BASE}/list/animes-on-air`);
  if (!response.ok) {
    throw new Error('Failed to fetch on-air animes');
  }
  const data: APIResponse<OnAirAnime[]> = await response.json();
  return data.data;
}

export async function fetchLatestEpisodes(): Promise<LatestEpisode[]> {
  const response = await fetch(`${API_BASE}/list/latest-episodes`);
  if (!response.ok) {
    throw new Error('Failed to fetch latest episodes');
  }
  const data: APIResponse<LatestEpisode[]> = await response.json();
  return data.data;
}

export async function searchAnime(query: string, page: number = 1): Promise<SearchResult> {
  const response = await fetch(`${API_BASE}/search?query=${encodeURIComponent(query)}&page=${page}`);
  if (!response.ok) {
    throw new Error('Failed to search anime');
  }
  const data: APIResponse<SearchResult> = await response.json();
  return data.data;
}

export async function searchAnimeByFilters(filters: SearchFilters, page: number = 1, order: string = 'default'): Promise<SearchResult> {
  const response = await fetch(`${API_BASE}/search/by-filter?page=${page}&order=${order}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(filters),
  });
  if (!response.ok) {
    throw new Error('Failed to search anime by filters');
  }
  const data: APIResponse<SearchResult> = await response.json();
  return data.data;
}

export async function fetchAnimeDetail(slug: string): Promise<AnimeDetail> {
  const response = await fetch(`${API_BASE}/anime/${slug}`);
  if (!response.ok) {
    throw new Error('Failed to fetch anime detail');
  }
  const data: APIResponse<AnimeDetail> = await response.json();
  return data.data;
}

export async function fetchEpisodeDetail(slug: string): Promise<EpisodeDetail> {
  const response = await fetch(`${API_BASE}/anime/episode/${slug}`);
  if (!response.ok) {
    throw new Error('Failed to fetch episode detail');
  }
  const data: APIResponse<EpisodeDetail> = await response.json();
  return data.data;
}

export async function fetchEpisodeByAnimeAndNumber(animeSlug: string, episodeNumber: number): Promise<EpisodeDetail> {
  const response = await fetch(`${API_BASE}/anime/${animeSlug}/episode/${episodeNumber}`);
  if (!response.ok) {
    throw new Error('Failed to fetch episode detail');
  }
  const data: APIResponse<EpisodeDetail> = await response.json();
  return data.data;
}
