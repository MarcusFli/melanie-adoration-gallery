
import { useRef, useState, useEffect } from 'react';

export function useAudioManager() {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [customMusicUrl, setCustomMusicUrl] = useState<string | null>(null);
  const [currentTrack, setCurrentTrack] = useState<string | null>(null);
  const backgroundAudioRef = useRef<HTMLAudioElement | null>(null);
  const effectsAudioRef = useRef<HTMLAudioElement | null>(null);
  
  // Initialize audio
  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audio.volume = 0.4;
    backgroundAudioRef.current = audio;
    
    const effectsAudio = new Audio();
    effectsAudio.volume = 0.6;
    effectsAudioRef.current = effectsAudio;
    
    // Clean up audio on component unmount
    return () => {
      if (backgroundAudioRef.current) {
        backgroundAudioRef.current.pause();
        backgroundAudioRef.current.src = '';
      }
      
      if (effectsAudioRef.current) {
        effectsAudioRef.current.pause();
        effectsAudioRef.current.src = '';
      }
    };
  }, []);

  // Toggle sound
  const toggleSound = () => {
    if (backgroundAudioRef.current) {
      if (soundEnabled) {
        backgroundAudioRef.current.pause();
      } else {
        backgroundAudioRef.current.play().catch(err => {
          console.error("Audio playback failed:", err);
        });
      }
      setSoundEnabled(!soundEnabled);
    }
  };

  // Change background music
  const changeBackgroundMusic = (url: string) => {
    if (backgroundAudioRef.current) {
      const wasPlaying = !backgroundAudioRef.current.paused;
      
      // Pause current audio
      backgroundAudioRef.current.pause();
      
      // Set new source
      backgroundAudioRef.current.src = url;
      setCustomMusicUrl(url);
      setCurrentTrack(url);
      
      // Auto-play new music
      if (soundEnabled) {
        backgroundAudioRef.current.play().catch(err => {
          console.error("Audio playback failed:", err);
          setSoundEnabled(false);
        });
      }
    }
  };

  // Play soundtrack when customMusicUrl changes
  useEffect(() => {
    if (backgroundAudioRef.current && soundEnabled && customMusicUrl) {
      // If we have custom music, use that
      if (backgroundAudioRef.current.src !== customMusicUrl) {
        backgroundAudioRef.current.src = customMusicUrl;
      }
      
      backgroundAudioRef.current.play().catch(err => {
        console.error("Audio playback failed:", err);
        setSoundEnabled(false);
      });
    }
  }, [soundEnabled, customMusicUrl]);

  // Play sound effects
  const playSound = (type: 'move' | 'wall' | 'win' | 'lose') => {
    if (!soundEnabled || !effectsAudioRef.current) return;
    
    let soundUrl = '';
    switch(type) {
      case 'move':
        soundUrl = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAADwAD///////////////////////////////////////////8AAAA8TEFNRTMuMTAwAc0AAAAAAAAAABSAJAJAQgAAgAAAA8DcwePbAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//sQZAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=';
        effectsAudioRef.current.volume = 0.3;
        break;
      case 'wall':
        soundUrl = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAADwAD///////////////////////////////////////////8AAAA8TEFNRTMuMTAwAc0AAAAAAAAAABSAJAJAQgAAgAAAA8DI8Y/UAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//sQZAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=';
        effectsAudioRef.current.volume = 0.4;
        break;
      case 'win':
        soundUrl = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAAEAAAGLwCEhISEhISEhISEhISEhISEhKurq6urq6urq6urq6urq6ur0dHR0dHR0dHR0dHR0dHR0dH///////////////////8AAAA8TEFNRTMuMTAwAc0AAAAAAAAAABSAJAJAQgAAgAAABi9CTsEIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//sQZAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=';
        effectsAudioRef.current.volume = 0.6;
        break;
      case 'lose':
        soundUrl = 'data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4Ljc2LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAAEAAAGvQCbm5ubm5ubm5ubm5ubm5ubm8PDw8PDw8PDw8PDw8PDw8PD5OTk5OTk5OTk5OTk5OTk5OT///////////////////8AAAA8TEFNRTMuMTAwAc0AAAAAAAAAABSAJAJAQgAAgAAABr125J/jAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//sQZAAP8AAAaQAAAAgAAA0gAAABAAABpAAAACAAADSAAAAETEFNRTMuMTAwVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVU=';
        effectsAudioRef.current.volume = 0.5;
        break;
    }
    
    if (soundUrl) {
      effectsAudioRef.current.src = soundUrl;
      effectsAudioRef.current.play().catch(err => {
        console.error("Sound effect failed:", err);
      });
    }
  };

  return {
    soundEnabled,
    toggleSound,
    playSound,
    changeBackgroundMusic,
    currentTrack
  };
}
