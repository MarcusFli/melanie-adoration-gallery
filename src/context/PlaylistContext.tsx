import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the MediaFile type
interface MediaFile {
  id: string;
  name: string;
  url: string;
  type: 'audio' | 'video';
  created_at?: string;
  user_id?: string;
}

// Define the PlaylistContextType
interface PlaylistContextType {
  playlist: MediaFile[];
  addToPlaylist: (file: MediaFile) => void;
  removeFromPlaylist: (id: string) => void;
  clearPlaylist: () => void;
  isInPlaylist: (id: string) => boolean;
}

// Create the context with default values
const PlaylistContext = createContext<PlaylistContextType>({
  playlist: [],
  addToPlaylist: () => {},
  removeFromPlaylist: () => {},
  clearPlaylist: () => {},
  isInPlaylist: () => false,
});

// Custom hook to use the playlist context
export const usePlaylist = () => useContext(PlaylistContext);

// PlaylistProvider component
export const PlaylistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize state from localStorage if available
  const [playlist, setPlaylist] = useState<MediaFile[]>(() => {
    const savedPlaylist = localStorage.getItem('audioPlaylist');
    return savedPlaylist ? JSON.parse(savedPlaylist) : [];
  });

  // Save to localStorage whenever playlist changes
  useEffect(() => {
    localStorage.setItem('audioPlaylist', JSON.stringify(playlist));
  }, [playlist]);

  // Add a file to the playlist if it doesn't exist already
  const addToPlaylist = (file: MediaFile) => {
    if (!isInPlaylist(file.id)) {
      setPlaylist(prev => {
        // Only keep up to 10 songs in the playlist
        const updated = [...prev, file];
        if (updated.length > 10) {
          return updated.slice(updated.length - 10);
        }
        return updated;
      });
    }
  };

  // Remove a file from the playlist by ID
  const removeFromPlaylist = (id: string) => {
    setPlaylist(prev => prev.filter(file => file.id !== id));
  };

  // Clear the entire playlist
  const clearPlaylist = () => {
    setPlaylist([]);
  };

  // Check if a file is already in the playlist
  const isInPlaylist = (id: string) => {
    return playlist.some(file => file.id === id);
  };

  return (
    <PlaylistContext.Provider
      value={{
        playlist,
        addToPlaylist,
        removeFromPlaylist,
        clearPlaylist,
        isInPlaylist,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};
