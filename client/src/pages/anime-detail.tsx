import { useQuery } from '@tanstack/react-query';
import { useLocation, useParams } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Play, Star, Calendar, AlertCircle } from 'lucide-react';
import Header from '@/components/header';
import LoadingSpinner from '@/components/loading-spinner';
import { fetchAnimeDetail } from '@/lib/api';

export default function AnimeDetail() {
  const [, setLocation] = useLocation();
  const { slug } = useParams<{ slug: string }>();

  const { data: anime, isLoading, error } = useQuery({
    queryKey: ['/api/anime-api/anime', slug],
    queryFn: () => fetchAnimeDetail(slug!),
    enabled: !!slug,
  });

  const handleBack = () => {
    setLocation('/');
  };

  const handleEpisodeClick = (episodeSlug: string) => {
    setLocation(`/episode/${episodeSlug}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header onSearch={() => {}} searchQuery="" />
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !anime) {
    return (
      <div className="min-h-screen bg-background">
        <Header onSearch={() => {}} searchQuery="" />
        <div className="container mx-auto px-4 py-8">
          <Alert className="border-destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Error al cargar los detalles del anime. Por favor, intenta nuevamente.
            </AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={() => {}} searchQuery="" />
      
      <main className="container mx-auto px-4 py-8">
        <Button 
          onClick={handleBack} 
          variant="outline" 
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver al catálogo
        </Button>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Card className="anime-card">
              <CardContent className="p-0">
                <img
                  src={anime.cover ? `/api/proxy-image?url=${encodeURIComponent(anime.cover)}` : 'https://via.placeholder.com/400x600/1f2937/10b981?text=Anime'}
                  alt={anime.title}
                  className="w-full h-auto rounded-lg"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/400x600/1f2937/10b981?text=Anime';
                  }}
                />
              </CardContent>
            </Card>
            
            <Card className="anime-card mt-4">
              <CardContent className="p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Tipo:</span>
                  <Badge>{anime.type?.toUpperCase() || 'N/A'}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Estado:</span>
                  <span className="text-white">{anime.status || 'N/A'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Rating:</span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-primary">{anime.rating || 'N/A'}</span>
                  </div>
                </div>
                {anime.next_airing_episode && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Próximo episodio:</span>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="text-white text-sm">{anime.next_airing_episode}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{anime.title}</h1>
                {anime.alternative_titles && anime.alternative_titles.length > 0 && (
                  <div className="text-gray-400 text-sm">
                    <strong>Títulos alternativos:</strong> {anime.alternative_titles.join(', ')}
                  </div>
                )}
              </div>

              <div>
                <h2 className="text-xl font-semibold text-white mb-3">Sinopsis</h2>
                <p className="text-gray-300 leading-relaxed">
                  {anime.synopsis || 'Sin descripción disponible'}
                </p>
              </div>

              {anime.genres && anime.genres.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-white mb-3">Géneros</h2>
                  <div className="flex flex-wrap gap-2">
                    {anime.genres.map((genre) => (
                      <Badge key={genre} variant="secondary" className="bg-primary/20 text-primary">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h2 className="text-xl font-semibold text-white mb-3">Episodios</h2>
                {anime.episodes && anime.episodes.length > 0 ? (
                  <div className="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 max-h-96 overflow-y-auto">
                    {anime.episodes.map((episode) => (
                      <Button
                        key={episode.slug}
                        onClick={() => handleEpisodeClick(episode.slug)}
                        variant="outline"
                        size="sm"
                        className="hover:bg-primary hover:text-white"
                      >
                        {episode.number}
                      </Button>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400">No hay episodios disponibles</p>
                )}
              </div>

              {anime.related && anime.related.length > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-white mb-3">Relacionados</h2>
                  <div className="space-y-2">
                    {anime.related.map((related) => (
                      <Card key={related.slug} className="anime-card">
                        <CardContent className="p-3">
                          <div className="flex justify-between items-center">
                            <span className="text-white">{related.title}</span>
                            <Badge variant="secondary">{related.relation}</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
