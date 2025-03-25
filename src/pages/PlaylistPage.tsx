
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import HeartBackground from '../components/HeartBackground';
import { usePlaylist } from '../context/PlaylistContext';
import { Button } from '@/components/ui/button';
import { useToast } from "@/components/ui/use-toast";
import { 
  Music, 
  Trash2, 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  Volume2, 
  VolumeX, 
  ListMusic 
} from 'lucide-react';

const PlaylistPage: React.FC = () => {
  const { playlist, removeFromPlaylist, clearPlaylist } = usePlaylist();
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(-1);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Handle play/pause
  const togglePlayPause = () => {
    if (playlist.length === 0) {
      toast({
        title: "No hay canciones",
        description: "Tu playlist está vacía",
        variant: "destructive",
      });
      return;
    }

    if (currentSongIndex === -1) {
      // If no song is selected, play the first one
      setCurrentSongIndex(0);
      setIsPlaying(true);
    } else {
      // Toggle play/pause for current song
      setIsPlaying(!isPlaying);
    }
  };

  // Play specific song
  const playSong = (index: number) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
  };

  // Handle next song
  const playNextSong = () => {
    if (playlist.length === 0) return;
    
    const nextIndex = (currentSongIndex + 1) % playlist.length;
    setCurrentSongIndex(nextIndex);
    setIsPlaying(true);
  };

  // Handle previous song
  const playPreviousSong = () => {
    if (playlist.length === 0) return;
    
    const prevIndex = currentSongIndex <= 0 ? playlist.length - 1 : currentSongIndex - 1;
    setCurrentSongIndex(prevIndex);
    setIsPlaying(true);
  };

  // Toggle mute
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  // Handle end of song
  const handleSongEnd = () => {
    playNextSong();
  };

  // Effect to control audio playback
  React.useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error("Error playing audio:", error);
          toast({
            title: "Error",
            description: "No se pudo reproducir el audio",
            variant: "destructive",
          });
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSongIndex, toast]);

  // Effect to handle muted state
  React.useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  // Handle removing a song from playlist with confirmation
  const handleRemoveSong = (id: string, index: number) => {
    // If removing currently playing song, pause it
    if (index === currentSongIndex) {
      setIsPlaying(false);
      if (playlist.length <= 1) {
        setCurrentSongIndex(-1);
      } else {
        setCurrentSongIndex(index === playlist.length - 1 ? index - 1 : index);
      }
    } else if (index < currentSongIndex) {
      // If removing a song before the current one, adjust the current index
      setCurrentSongIndex(currentSongIndex - 1);
    }
    
    removeFromPlaylist(id);
    toast({
      title: "Canción eliminada",
      description: "La canción ha sido eliminada de tu playlist",
    });
  };

  // Handle clearing playlist with confirmation
  const handleClearPlaylist = () => {
    setIsPlaying(false);
    setCurrentSongIndex(-1);
    clearPlaylist();
    toast({
      title: "Playlist borrada",
      description: "Tu playlist ha sido vaciada completamente",
    });
  };

  const goToMediaUpload = () => {
    navigate('/media');
  };

  return (
    <div className="min-h-screen pb-20">
      <HeartBackground />
      <NavBar />
      
      <header className="pt-32 pb-12 px-4 sm:px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-allura mb-6 text-white animate-fade-in">
          Tu Playlist
        </h1>
        <p className="text-xl md:text-2xl text-melanie-purple font-light max-w-2xl mx-auto animate-fade-in opacity-80">
          Disfruta de tus canciones favoritas
        </p>
        <Button 
          onClick={goToMediaUpload}
          className="mt-6 bg-melanie-purple hover:bg-melanie-purple/80"
        >
          Agregar Más Canciones
        </Button>
      </header>

      <section className="container mx-auto px-4 py-8">
        {/* Player controls */}
        <div className="bg-black/40 backdrop-blur-md p-6 rounded-xl border border-melanie-purple/30 mb-8">
          <div className="flex flex-col items-center">
            {currentSongIndex >= 0 && playlist[currentSongIndex] && (
              <div className="text-center mb-4">
                <h2 className="text-white text-xl font-semibold truncate max-w-full">
                  {playlist[currentSongIndex].name}
                </h2>
              </div>
            )}
            
            <div className="flex items-center justify-center gap-4 my-4">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={playPreviousSong}
                className="rounded-full border-melanie-purple/50 text-white"
                disabled={playlist.length === 0}
              >
                <SkipBack className="h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="icon" 
                onClick={togglePlayPause}
                className="rounded-full h-12 w-12 border-melanie-purple/50 text-white"
                disabled={playlist.length === 0}
              >
                {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
              </Button>
              
              <Button 
                variant="outline" 
                size="icon" 
                onClick={playNextSong}
                className="rounded-full border-melanie-purple/50 text-white"
                disabled={playlist.length === 0}
              >
                <SkipForward className="h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="icon" 
                onClick={toggleMute}
                className="rounded-full border-melanie-purple/50 text-white"
                disabled={playlist.length === 0 || currentSongIndex === -1}
              >
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>
            </div>
            
            {/* Hidden audio element */}
            {currentSongIndex >= 0 && playlist[currentSongIndex] && (
              <audio 
                ref={audioRef}
                src={playlist[currentSongIndex].url}
                onEnded={handleSongEnd}
                className="hidden"
              />
            )}
          </div>
        </div>
        
        {/* Playlist */}
        <div className="bg-black/30 backdrop-blur-md p-6 rounded-xl border border-melanie-purple/20">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <ListMusic className="h-5 w-5 text-melanie-purple" />
              <h2 className="text-2xl font-allura text-white">Mi Playlist ({playlist.length}/10)</h2>
            </div>
            
            {playlist.length > 0 && (
              <Button 
                variant="destructive" 
                size="sm" 
                onClick={handleClearPlaylist}
              >
                <Trash2 className="mr-2 h-4 w-4" /> Borrar Playlist
              </Button>
            )}
          </div>
          
          {playlist.length > 0 ? (
            <div className="space-y-3">
              {playlist.map((song, index) => (
                <div 
                  key={song.id} 
                  className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                    currentSongIndex === index 
                      ? 'bg-melanie-purple/30 border border-melanie-purple' 
                      : 'bg-black/20 hover:bg-black/30'
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1">
                    <div className="flex-shrink-0 w-8 text-center">
                      <span className="text-white/70">{index + 1}</span>
                    </div>
                    <Music className="h-5 w-5 text-melanie-purple flex-shrink-0" />
                    <span className="text-white truncate max-w-[200px]">
                      {song.name}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => playSong(index)}
                      className="text-white"
                    >
                      {currentSongIndex === index && isPlaying ? (
                        <Pause className="h-4 w-4" />
                      ) : (
                        <Play className="h-4 w-4" />
                      )}
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleRemoveSong(song.id, index)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-900/20"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-white/70">Tu playlist está vacía</p>
              <Button 
                onClick={goToMediaUpload}
                className="mt-4 bg-melanie-purple hover:bg-melanie-purple/80"
              >
                Agregar Canciones
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default PlaylistPage;
