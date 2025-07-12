import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Star } from 'lucide-react';
import { AnimeMedia, OnAirAnime } from '@/lib/types';

interface AnimeCardProps {
  anime: AnimeMedia | OnAirAnime;
  onClick: () => void;
}

export default function AnimeCard({ anime, onClick }: AnimeCardProps) {
  const hasRating = 'rating' in anime;
  const hasSynopsis = 'synopsis' in anime;
  const originalCover = ('cover' in anime ? anime.cover : undefined);
  const coverImage = originalCover ? `/api/proxy-image?url=${encodeURIComponent(originalCover)}` : 'https://via.placeholder.com/300x400/1f2937/10b981?text=Anime';

  return (
    <Card className="anime-card group" onClick={onClick}>
      <div className="relative">
        <img
          src={coverImage}
          alt={anime.title}
          className="w-full h-80 object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/300x400/1f2937/10b981?text=Anime';
          }}
        />
        <div className="absolute top-2 right-2">
          <Badge className="bg-primary text-white">
            {anime.type?.toUpperCase() || 'ANIME'}
          </Badge>
        </div>
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Play className="w-12 h-12 text-white" />
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-white mb-2 line-clamp-2">{anime.title}</h3>
        {hasSynopsis && (
          <p className="text-gray-400 text-sm mb-3 line-clamp-3">
            {(anime as AnimeMedia).synopsis || 'Sin descripción disponible'}
          </p>
        )}
        <div className="flex items-center justify-between">
          {hasRating && (
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-primary font-medium">
                {(anime as AnimeMedia).rating || 'N/A'}
              </span>
            </div>
          )}
          <Play className="w-5 h-5 text-primary" />
        </div>
      </CardContent>
    </Card>
  );
}
