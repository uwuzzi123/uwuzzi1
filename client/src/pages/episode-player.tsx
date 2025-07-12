import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useLocation, useParams } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ArrowLeft, Server, Download, AlertCircle } from 'lucide-react';
import Header from '@/components/header';
import LoadingSpinner from '@/components/loading-spinner';
import { fetchEpisodeDetail } from '@/lib/api';
import { EpisodeServer } from '@/lib/types';

export default function EpisodePlayer() {
  const [, setLocation] = useLocation();
  const { slug } = useParams<{ slug: string }>();
  const [selectedServer, setSelectedServer] = useState<EpisodeServer | null>(null);
  const [iframeError, setIframeError] = useState(false);

  const { data: episode, isLoading, error } = useQuery({
    queryKey: ['/api/anime-api/episode', slug],
    queryFn: () => fetchEpisodeDetail(slug!),
    enabled: !!slug,
  });

  const handleBack = () => {
    setLocation('/');
  };

  const handleServerSelect = (server: EpisodeServer) => {
    setSelectedServer(server);
    setIframeError(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header onSearch={() => {}} searchQuery="" />
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !episode) {
    return (
      <div className="min-h-screen bg-background">
        <Header onSearch={() => {}} searchQuery="" />
        <div className="container mx-auto px-4 py-8">
          <Alert className="border-destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Error al cargar el episodio. Por favor, intenta nuevamente.
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

        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              {episode.title} - Episodio {episode.number}
            </h1>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Card className="anime-card">
                <CardContent className="p-4">
                  <h2 className="text-xl font-semibold text-white mb-4">Servidores disponibles</h2>
                  {episode.servers && episode.servers.length > 0 ? (
                    <div className="space-y-2">
                      {episode.servers.map((server, index) => (
                        <Button
                          key={index}
                          onClick={() => handleServerSelect(server)}
                          variant={selectedServer === server ? "default" : "outline"}
                          className="w-full justify-start"
                        >
                          <Server className="w-4 h-4 mr-2" />
                          {server.name}
                        </Button>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400">No hay servidores disponibles</p>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-2">
              <Card className="anime-card">
                <CardContent className="p-0">
                  <div className="aspect-video bg-black rounded-lg overflow-hidden">
                    {selectedServer ? (
                      selectedServer.embed && !iframeError ? (
                        <div className="w-full h-full relative">
                          <iframe
                            src={selectedServer.embed}
                            className="w-full h-full"
                            allowFullScreen
                            title={`${episode.title} - Episodio ${episode.number}`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="no-referrer"
                            onLoad={() => {
                              // Check if iframe loaded successfully
                              setTimeout(() => {
                                const iframe = document.querySelector('iframe');
                                if (iframe) {
                                  try {
                                    // Try to access iframe content to detect if it's blocked
                                    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
                                    if (!iframeDoc) {
                                      console.log('Iframe content not accessible, may be blocked');
                                    }
                                  } catch (e) {
                                    console.log('Iframe access blocked:', e);
                                  }
                                }
                              }, 2000);
                            }}
                          />

                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <div className="text-center max-w-md">
                            <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-4" />
                            <p className="text-white mb-2">Servidor: {selectedServer.name}</p>
                            <p className="text-gray-400 mb-4">Este servidor no puede reproducirse dentro del sitio debido a restricciones de seguridad.</p>
                            <div className="flex flex-col gap-2">
                              {selectedServer.download && (
                                <Button variant="outline" asChild>
                                  <a
                                    href={selectedServer.download}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <Download className="w-4 h-4 mr-2" />
                                    Descargar episodio
                                  </a>
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    ) : (
                      <div className="flex items-center justify-center h-full">
                        <div className="text-center">
                          <Server className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                          <p className="text-white mb-2">Selecciona un servidor</p>
                          <p className="text-gray-400">Elige un servidor de la lista para ver el episodio</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
