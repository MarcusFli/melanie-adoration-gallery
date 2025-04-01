
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, Shuffle, Music } from 'lucide-react';
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
  }, [userPlaylist, currentMusic, onSelectMusic]);

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
        audioRef.current.play();
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
      setTimeout(() => audioRef.current?.play(), 100);
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
      setTimeout(() => audioRef.current?.play(), 100);
    }
  };

  // Get current track name
  const getCurrentTrackName = () => {
    if (!currentMusic || playlist.length === 0) return "No music";
    
    const currentTrack = playlist.find(track => track.url === currentMusic);
    return currentTrack ? currentTrack.name : "Unknown";
  };

  return (
    <div className="absolute bottom-6 left-6 z-10">
      <Button 
        variant="outline" 
        size="icon"
        className="bg-black/70 backdrop-blur-sm rounded-full border border-melanie-purple/50 shadow-lg hover:bg-melanie-purple/20 hover:border-melanie-purple"
        onClick={() => setShowControls(!showControls)}
      >
        <Music className="h-5 w-5 text-melanie-purple" />
      </Button>
      
      {showControls && playlist.length > 0 && (
        <div className="absolute bottom-full mb-2 left-0 w-64 bg-black/90 backdrop-blur-sm rounded-lg border border-melanie-purple/50 shadow-lg shadow-melanie-purple/20 p-3 text-white">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold truncate max-w-[170px]">{getCurrentTrackName()}</h3>
            <audio ref={audioRef} src={currentMusic || undefined} autoPlay={soundEnabled} />
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
        </div>
      )}
    </div>
  );
};

export default MusicPlayer;
