import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play } from 'lucide-react';
import { LatestEpisode } from '@/lib/types';

interface EpisodeCardProps {
  episode: LatestEpisode;
  onClick: () => void;
}

export default function EpisodeCard({ episode, onClick }: EpisodeCardProps) {
  const coverImage = episode.cover ? `/api/proxy-image?url=${encodeURIComponent(episode.cover)}` : 'https://via.placeholder.com/300x400/1f2937/10b981?text=Episode';
  
  return (
    <Card className="anime-card group" onClick={onClick}>
      <div className="relative">
        <img
          src={coverImage}
          alt={episode.title}
          className="w-full h-80 object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/300x400/1f2937/10b981?text=Episode';
          }}
        />
        <div className="absolute top-2 right-2">
          <Badge className="bg-primary text-white">
            EP {episode.number}
          </Badge>
        </div>
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Play className="w-12 h-12 text-white" />
        </div>
      </div>
      
      <CardContent className="p-4">
        <h3 className="font-semibold text-white mb-2 line-clamp-2">{episode.title}</h3>
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-sm">Episodio {episode.number}</span>
          <Play className="w-5 h-5 text-primary" />
        </div>
      </CardContent>
    </Card>
  );
}
