
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import HeartBackground from '../components/HeartBackground';
import { usePlaylist } from '../context/PlaylistContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import { Music, VideoIcon, Download, ListMusic } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

// Types for our media files
interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: 'audio' | 'video';
  created_at: string;
  user_id?: string;
}

const fetchMedia = async (type: 'audio' | 'video'): Promise<MediaFile[]> => {
  const response = await fetch(`https://lovable-supabase-functions.vercel.app/api/get-media?type=${type}`);
  if (!response.ok) {
    throw new Error('Failed to fetch media files');
  }
  return response.json();
};

const SharedMediaPage: React.FC = () => {
  const [activeAudio, setActiveAudio] = useState<string | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { addToPlaylist, isInPlaylist } = usePlaylist();

  // Fetch audio files
  const { 
    data: audioFiles = [], 
    isLoading: isLoadingAudio,
    error: audioError
  } = useQuery({
    queryKey: ['media', 'audio'],
    queryFn: () => fetchMedia('audio'),
  });

  // Fetch video files
  const { 
    data: videoFiles = [], 
    isLoading: isLoadingVideo,
    error: videoError
  } = useQuery({
    queryKey: ['media', 'video'],
    queryFn: () => fetchMedia('video'),
  });

  useEffect(() => {
    if (audioError) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los archivos de audio",
        variant: "destructive"
      });
    }
    
    if (videoError) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los archivos de video",
        variant: "destructive"
      });
    }
  }, [audioError, videoError, toast]);

  // Handle download
  const handleDownload = (url: string, filename: string) => {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    toast({
      title: "Descarga iniciada",
      description: `Descargando ${filename}`,
    });
  };

  // Add to playlist
  const handleAddToPlaylist = (file: MediaFile) => {
    addToPlaylist(file);
    
    toast({
      title: "¡Añadido a la playlist!",
      description: `${file.name} ha sido añadido a tu playlist.`,
    });
  };

  const goToPlaylist = () => {
    navigate('/playlist');
  };

  return (
    <div className="min-h-screen pb-20">
      <HeartBackground />
      <NavBar />
      
      <header className="pt-32 pb-12 px-4 sm:px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-allura mb-6 text-white animate-fade-in">
          Medios Compartidos
        </h1>
        <p className="text-xl md:text-2xl text-melanie-purple font-light max-w-2xl mx-auto animate-fade-in opacity-80">
          Explora los audios y videos compartidos por todos los usuarios
        </p>
        <Button 
          onClick={goToPlaylist}
          className="mt-6 bg-melanie-purple hover:bg-melanie-purple/80"
        >
          <ListMusic className="mr-2 h-4 w-4" /> Ver Mi Playlist
        </Button>
      </header>

      <section className="container mx-auto px-4 py-8">
        <Tabs defaultValue="audio" className="w-full">
          <TabsList className="grid w-full md:w-[400px] mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="audio" className="flex items-center gap-2">
              <Music className="h-4 w-4" /> Audio
            </TabsTrigger>
            <TabsTrigger value="video" className="flex items-center gap-2">
              <VideoIcon className="h-4 w-4" /> Video
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="audio" className="space-y-8">
            {isLoadingAudio ? (
              <div className="text-center py-12">
                <p className="text-white/70">Cargando archivos de audio...</p>
              </div>
            ) : audioFiles.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                <h2 className="text-2xl font-allura text-white">Audios Compartidos</h2>
                
                {audioFiles.map((file) => (
                  <div key={file.id} className="bg-black/40 backdrop-blur-md p-4 rounded-lg border border-melanie-purple/30 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Music className="h-8 w-8 text-melanie-purple" />
                      <span className="text-white truncate max-w-[200px]">
                        {file.name}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                      <audio 
                        src={file.url} 
                        controls 
                        className="w-full md:w-auto"
                      />
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleAddToPlaylist(file)}
                          className="border-melanie-purple/50 text-white"
                          disabled={isInPlaylist(file.id)}
                        >
                          <ListMusic className="mr-1 h-4 w-4" />
                          {isInPlaylist(file.id) ? 'En Playlist' : 'Añadir a Playlist'}
                        </Button>
                        
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleDownload(file.url, file.name)}
                          className="border-melanie-purple/50 text-white"
                        >
                          <Download className="h-4 w-4 mr-2" /> Descargar
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-white/70">No hay archivos de audio compartidos</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="video" className="space-y-8">
            {isLoadingVideo ? (
              <div className="text-center py-12">
                <p className="text-white/70">Cargando archivos de video...</p>
              </div>
            ) : videoFiles.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                <h2 className="text-2xl font-allura text-white">Videos Compartidos</h2>
                
                {videoFiles.map((file) => (
                  <div key={file.id} className="bg-black/40 backdrop-blur-md p-4 rounded-lg border border-melanie-purple/30">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <VideoIcon className="h-6 w-6 text-melanie-purple" />
                        <span className="text-white truncate max-w-[300px]">
                          {file.name}
                        </span>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleDownload(file.url, file.name)}
                        className="border-melanie-purple/50 text-white"
                      >
                        <Download className="h-4 w-4 mr-2" /> Descargar
                      </Button>
                    </div>
                    
                    <div className="rounded-lg overflow-hidden bg-black aspect-video">
                      <video 
                        src={file.url} 
                        controls 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-white/70">No hay archivos de video compartidos</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default SharedMediaPage;
