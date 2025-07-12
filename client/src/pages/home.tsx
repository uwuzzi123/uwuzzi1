import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Radio, Clock, AlertCircle } from 'lucide-react';
import Header from '@/components/header';
import Filters from '@/components/filters';
import AlphabetNav from '@/components/alphabet-nav';
import AnimeCard from '@/components/anime-card';
import EpisodeCard from '@/components/episode-card';
import LoadingSpinner from '@/components/loading-spinner';
import { fetchOnAirAnimes, fetchLatestEpisodes, searchAnime, searchAnimeByFilters } from '@/lib/api';
import { SearchFilters, AnimeMedia, OnAirAnime, LatestEpisode } from '@/lib/types';

export default function Home() {
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFilters, setCurrentFilters] = useState<SearchFilters>({});
  const [selectedLetter, setSelectedLetter] = useState<string>('');
  const [viewMode, setViewMode] = useState<'on-air' | 'latest' | 'search' | 'filters'>('on-air');

  // Fetch popular animes instead of on-air (since on-air doesn't have images)
  const { data: popularAnimes, isLoading: popularLoading, error: popularError } = useQuery({
    queryKey: ['/api/anime-api/search/popular', currentPage],
    queryFn: () => searchAnime('anime', currentPage),
    enabled: viewMode === 'on-air',
  });

  // Fetch latest episodes
  const { data: latestEpisodes, isLoading: latestLoading, error: latestError } = useQuery({
    queryKey: ['/api/anime-api/list/latest-episodes'],
    queryFn: fetchLatestEpisodes,
    enabled: viewMode === 'latest',
  });

  // Search anime
  const { data: searchResults, isLoading: searchLoading, error: searchError } = useQuery({
    queryKey: ['/api/anime-api/search', searchQuery, currentPage],
    queryFn: () => searchAnime(searchQuery, currentPage),
    enabled: viewMode === 'search' && searchQuery.length > 0,
  });

  // Filter anime
  const { data: filterResults, isLoading: filterLoading, error: filterError } = useQuery({
    queryKey: ['/api/anime-api/search/by-filter', currentFilters, currentPage],
    queryFn: () => searchAnimeByFilters(currentFilters, currentPage),
    enabled: viewMode === 'filters' && Object.keys(currentFilters).length > 0,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.length > 0) {
      setViewMode('search');
      setCurrentPage(1);
    } else {
      setViewMode('on-air');
    }
  };

  const handleApplyFilters = (filters: SearchFilters) => {
    setCurrentFilters(filters);
    setViewMode('filters');
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    setCurrentFilters({});
    setViewMode('on-air');
    setCurrentPage(1);
  };

  const handleLetterClick = (letter: string) => {
    setSelectedLetter(letter);
    if (letter && letter !== '#') {
      setSearchQuery(letter);
      setViewMode('search');
      setCurrentPage(1);
    }
  };

  const handleShowOnAir = () => {
    setViewMode('on-air');
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handleShowLatest = () => {
    setViewMode('latest');
    setSearchQuery('');
    setCurrentPage(1);
  };

  const handleAnimeClick = (anime: AnimeMedia | OnAirAnime) => {
    setLocation(`/anime/${anime.slug}`);
  };

  const handleEpisodeClick = (episode: LatestEpisode) => {
    // Extract anime slug from episode URL
    const urlParts = episode.url.split('/');
    const episodeSlug = urlParts[urlParts.length - 1];
    setLocation(`/episode/${episodeSlug}`);
  };

  const isLoading = popularLoading || latestLoading || searchLoading || filterLoading;
  const error = popularError || latestError || searchError || filterError;

  let content;
  let resultsCount = 0;
  let pagination = null;

  if (viewMode === 'on-air' && popularAnimes) {
    content = (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {popularAnimes.media.map((anime) => (
          <AnimeCard key={anime.slug} anime={anime} onClick={() => handleAnimeClick(anime)} />
        ))}
      </div>
    );
    resultsCount = popularAnimes.media.length;
    
    if (popularAnimes.foundPages > 1) {
      pagination = (
        <Pagination className="mt-12">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              />
            </PaginationItem>
            {[...Array(Math.min(5, popularAnimes.foundPages))].map((_, i) => {
              const page = i + 1;
              return (
                <PaginationItem key={page}>
                  <PaginationLink 
                    onClick={() => setCurrentPage(page)}
                    isActive={currentPage === page}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            <PaginationItem>
              <PaginationNext 
                onClick={() => setCurrentPage(Math.min(popularAnimes.foundPages, currentPage + 1))}
                className={currentPage === popularAnimes.foundPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      );
    }
  } else if (viewMode === 'latest' && latestEpisodes) {
    content = (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {latestEpisodes.map((episode, index) => (
          <EpisodeCard key={`${episode.title}-${episode.number}-${index}`} episode={episode} onClick={() => handleEpisodeClick(episode)} />
        ))}
      </div>
    );
    resultsCount = latestEpisodes.length;
  } else if (viewMode === 'search' && searchResults) {
    content = (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {searchResults.media.map((anime) => (
          <AnimeCard key={anime.slug} anime={anime} onClick={() => handleAnimeClick(anime)} />
        ))}
      </div>
    );
    resultsCount = searchResults.media.length;
    
    if (searchResults.foundPages > 1) {
      pagination = (
        <Pagination className="mt-12">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              />
            </PaginationItem>
            {[...Array(Math.min(5, searchResults.foundPages))].map((_, i) => {
              const page = i + 1;
              return (
                <PaginationItem key={page}>
                  <PaginationLink 
                    onClick={() => setCurrentPage(page)}
                    isActive={currentPage === page}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            <PaginationItem>
              <PaginationNext 
                onClick={() => setCurrentPage(Math.min(searchResults.foundPages, currentPage + 1))}
                className={currentPage === searchResults.foundPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      );
    }
  } else if (viewMode === 'filters' && filterResults) {
    content = (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {filterResults.media.map((anime) => (
          <AnimeCard key={anime.slug} anime={anime} onClick={() => handleAnimeClick(anime)} />
        ))}
      </div>
    );
    resultsCount = filterResults.media.length;
    
    if (filterResults.foundPages > 1) {
      pagination = (
        <Pagination className="mt-12">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              />
            </PaginationItem>
            {[...Array(Math.min(5, filterResults.foundPages))].map((_, i) => {
              const page = i + 1;
              return (
                <PaginationItem key={page}>
                  <PaginationLink 
                    onClick={() => setCurrentPage(page)}
                    isActive={currentPage === page}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            <PaginationItem>
              <PaginationNext 
                onClick={() => setCurrentPage(Math.min(filterResults.foundPages, currentPage + 1))}
                className={currentPage === filterResults.foundPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      );
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={handleSearch} searchQuery={searchQuery} />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Filters onApplyFilters={handleApplyFilters} onClearFilters={handleClearFilters} />
          <AlphabetNav onLetterClick={handleLetterClick} selectedLetter={selectedLetter} />
        </div>

        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            <Button
              onClick={handleShowOnAir}
              className={`${viewMode === 'on-air' ? 'bg-primary' : 'bg-muted'} hover:bg-primary/80`}
            >
              <Radio className="w-4 h-4 mr-2" />
              Populares
            </Button>
            <Button
              onClick={handleShowLatest}
              className={`${viewMode === 'latest' ? 'bg-primary' : 'bg-muted'} hover:bg-primary/80`}
            >
              <Clock className="w-4 h-4 mr-2" />
              Últimos Episodios
            </Button>
          </div>
        </div>

        {isLoading && <LoadingSpinner />}

        {error && (
          <Alert className="mb-6 border-destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Error al cargar los datos. Por favor, intenta nuevamente.
            </AlertDescription>
          </Alert>
        )}

        {!isLoading && !error && resultsCount > 0 && (
          <div className="mb-6 text-gray-400">
            {resultsCount} resultados encontrados
          </div>
        )}

        {!isLoading && !error && content}

        {!isLoading && !error && resultsCount === 0 && (
          <div className="text-center py-12 text-gray-400">
            No se encontraron resultados
          </div>
        )}

        {pagination}
      </main>
    </div>
  );
}
