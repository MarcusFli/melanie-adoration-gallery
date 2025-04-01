
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, Shuffle, Music } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { usePlaylist } from '@/context/PlaylistContext';

interface MusicPlayerProps {
  currentMusic: string | null;
  onSelectMusic: (url: string) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ 
  currentMusic, 
  onSelectMusic, 
  soundEnabled,
  toggleSound 
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(soundEnabled);
  const [showControls, setShowControls] = useState<boolean>(false);
  const [playlist, setPlaylist] = useState<{id: string, name: string, url: string}[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const { playlist: userPlaylist } = usePlaylist();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize playlist from uploaded music and user's playlist
  useEffect(() => {
    const audioItems = userPlaylist.filter(item => item.type === 'audio').map(audio => ({
      id: audio.id,
      name: audio.name,
      url: audio.url
    }));
    
    setPlaylist(audioItems);
    
    // If we have music but no current selection, select the first track
    if (audioItems.length > 0 && !currentMusic) {
      onSelectMusic(audioItems[0].url);
      setCurrentTrackIndex(0);
    }
    
    // Auto-play when new music is added
    if (audioItems.length > 0 && soundEnabled) {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().catch(err => {
          console.error("Auto-play failed:", err);
        });
      }
    }
  }, [userPlaylist, currentMusic, onSelectMusic, soundEnabled]);

  // Update playing state when sound is toggled
  useEffect(() => {
    setIsPlaying(soundEnabled);
  }, [soundEnabled]);

  // Handle play/pause
  const togglePlay = () => {
    if (!soundEnabled) {
      toggleSound();
      return;
    }
    
    setIsPlaying(!isPlaying);
    
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => {
          console.error("Play failed:", err);
        });
      }
    }
  };

  // Skip to next track
  const skipToNext = () => {
    if (playlist.length <= 1) return;
    
    const nextIndex = (currentTrackIndex + 1) % playlist.length;
    setCurrentTrackIndex(nextIndex);
    onSelectMusic(playlist[nextIndex].url);
    
    // Ensure it plays after changing
    if (isPlaying && audioRef.current) {
      setTimeout(() => audioRef.current?.play().catch(err => {
        console.error("Skip next failed:", err);
      }), 100);
    }
  };
  
  // Skip to previous track
  const skipToPrevious = () => {
    if (playlist.length <= 1) return;
    
    const prevIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    setCurrentTrackIndex(prevIndex);
    onSelectMusic(playlist[prevIndex].url);
    
    // Ensure it plays after changing
    if (isPlaying && audioRef.current) {
      setTimeout(() => audioRef.current?.play().catch(err => {
        console.error("Skip previous failed:", err);
      }), 100);
    }
  };

  // Shuffle playlist
  const shufflePlaylist = () => {
    if (playlist.length <= 1) return;
    
    const randomIndex = Math.floor(Math.random() * playlist.length);
    setCurrentTrackIndex(randomIndex);
    onSelectMusic(playlist[randomIndex].url);
    
    // Ensure it plays after changing
    if (isPlaying && audioRef.current) {
      setTimeout(() => audioRef.current?.play().catch(err => {
        console.error("Shuffle failed:", err);
      }), 100);
    }
  };

  // Get current track name
  const getCurrentTrackName = () => {
    if (!currentMusic || playlist.length === 0) return "No music";
    
    const currentTrack = playlist.find(track => track.url === currentMusic);
    return currentTrack ? currentTrack.name : "Unknown";
  };

  return (
    <div className="absolute bottom-6 right-6 z-10">
      <Button 
        variant="outline" 
        size="icon"
        className="bg-black/70 backdrop-blur-sm rounded-full border border-melanie-purple/50 shadow-lg hover:bg-melanie-purple/20 hover:border-melanie-purple"
        onClick={() => setShowControls(!showControls)}
      >
        <Music className="h-5 w-5 text-melanie-purple" />
      </Button>
      
      {showControls && (
        <div className="absolute bottom-full mb-2 right-0 w-64 bg-black/90 backdrop-blur-sm rounded-lg border border-melanie-purple/50 shadow-lg shadow-melanie-purple/20 p-3 text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold truncate max-w-[170px]">{getCurrentTrackName()}</h3>
            <audio 
              ref={audioRef} 
              src={currentMusic || undefined} 
              autoPlay={soundEnabled}
              onEnded={skipToNext}
            />
          </div>
          
          <div className="flex items-center justify-center space-x-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-melanie-purple hover:bg-melanie-purple/20"
              onClick={shufflePlaylist}
              disabled={playlist.length <= 1}
            >
              <Shuffle className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-melanie-purple hover:bg-melanie-purple/20"
              onClick={skipToPrevious}
              disabled={playlist.length <= 1}
            >
              <SkipBack className="h-4 w-4" />
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-10 w-10 text-melanie-purple hover:bg-melanie-purple/20"
              onClick={togglePlay}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-melanie-purple hover:bg-melanie-purple/20"
              onClick={skipToNext}
              disabled={playlist.length <= 1}
            >
              <SkipForward className="h-4 w-4" />
            </Button>
          </div>
          
          {playlist.length > 0 && (
            <div className="mt-3 max-h-32 overflow-y-auto">
              <p className="text-xs text-gray-400 mb-1">Playlist</p>
              <ul className="space-y-1">
                {playlist.map((track, i) => (
                  <li 
                    key={track.id}
                    className={`text-xs p-1.5 rounded flex items-center cursor-pointer 
                      ${i === currentTrackIndex ? 'bg-melanie-purple/40' : 'hover:bg-melanie-purple/20'}`}
                    onClick={() => {
                      setCurrentTrackIndex(i);
                      onSelectMusic(track.url);
                      if (isPlaying && audioRef.current) {
                        setTimeout(() => audioRef.current?.play(), 100);
                      }
                    }}
                  >
                    <Music className="h-3 w-3 mr-2 text-melanie-purple" />
                    <span className="truncate">{track.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
