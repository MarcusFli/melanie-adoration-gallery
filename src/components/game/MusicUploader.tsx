import React, { useState, useRef, useCallback } from 'react';
import { Music, Upload, X, FolderOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { usePlaylist } from '@/context/PlaylistContext';

interface GameMusicFile {
  id: string;
  name: string;
  url: string;
  type: 'audio';
}

const MusicUploader: React.FC<{ onSelectMusic: (url: string) => void }> = ({ onSelectMusic }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [uploadedMusic, setUploadedMusic] = useState<GameMusicFile[]>([]);
  const [currentMusic, setCurrentMusic] = useState<string | null>(null);
  const { playlist, addToPlaylist } = usePlaylist();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);
  
  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    let validCount = 0;
    let invalidCount = 0;
    const newTracks: GameMusicFile[] = [];
    
    Array.from(files).forEach(file => {
      if (!file.type.startsWith('audio/')) {
        invalidCount++;
        return;
      }
      
      // Create object URL for local playback
      const url = URL.createObjectURL(file);
      const newMusic: GameMusicFile = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        name: file.name,
        url: url,
        type: 'audio'
      };
      
      newTracks.push(newMusic);
      addToPlaylist(newMusic);
      validCount++;
    });
    
    if (newTracks.length > 0) {
      setUploadedMusic(prev => [...prev, ...newTracks]);
      
      // Select the first track if we don't have one selected
      if (!currentMusic) {
        setCurrentMusic(newTracks[0].url);
        onSelectMusic(newTracks[0].url);
      }
      
      toast({
        title: "Music uploaded",
        description: `${validCount} audio files added to your playlist`,
      });
    }
    
    if (invalidCount > 0) {
      toast({
        title: "Some files skipped",
        description: `${invalidCount} files were not audio files and were skipped`,
        variant: "destructive"
      });
    }
    
    // Reset the input
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (folderInputRef.current) folderInputRef.current.value = '';
  }, [currentMusic, onSelectMusic, addToPlaylist]);
  
  const selectMusic = (url: string) => {
    setCurrentMusic(url);
    onSelectMusic(url);
    setIsOpen(false);
  };
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="absolute bottom-6 left-6 z-10">
      <Button 
        variant="outline" 
        size="icon"
        className="bg-black/70 backdrop-blur-sm rounded-full border border-melanie-purple/50 shadow-lg hover:bg-melanie-purple/20 hover:border-melanie-purple"
        onClick={toggleMenu}
      >
        <Upload className="h-5 w-5 text-melanie-purple" />
      </Button>
      
      {isOpen && (
        <div className="absolute bottom-full mb-2 left-0 w-64 bg-black/90 backdrop-blur-sm rounded-lg border border-melanie-purple/50 shadow-lg shadow-melanie-purple/20 p-3 text-white">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-semibold">Upload Music</h3>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6 text-gray-400 hover:text-white"
              onClick={toggleMenu}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex gap-2 mb-3">
            <label className="flex-1 flex items-center justify-center p-2 border border-dashed border-melanie-purple/50 rounded-lg cursor-pointer hover:bg-melanie-purple/10">
              <input 
                ref={fileInputRef}
                type="file" 
                accept="audio/*" 
                className="hidden" 
                onChange={handleFileChange}
                multiple
              />
              <Upload className="h-4 w-4 mr-2 text-melanie-purple" />
              <span className="text-xs">Files</span>
            </label>
            
            <label className="flex-1 flex items-center justify-center p-2 border border-dashed border-melanie-purple/50 rounded-lg cursor-pointer hover:bg-melanie-purple/10">
              <input 
                ref={folderInputRef}
                type="file" 
                accept="audio/*" 
                className="hidden" 
                onChange={handleFileChange}
                multiple
                webkitdirectory={true}
                directory={true}
              />
              <FolderOpen className="h-4 w-4 mr-2 text-melanie-purple" />
              <span className="text-xs">Folder</span>
            </label>
          </div>
          
          <div className="max-h-40 overflow-y-auto mb-2">
            <h4 className="text-xs text-gray-400 mb-1">Your Uploads</h4>
            {uploadedMusic.length > 0 ? (
              <ul className="space-y-1">
                {uploadedMusic.map(music => (
                  <li 
                    key={music.id}
                    className={`text-xs p-1.5 rounded flex items-center cursor-pointer ${currentMusic === music.url ? 'bg-melanie-purple/40' : 'hover:bg-melanie-purple/20'}`}
                    onClick={() => selectMusic(music.url)}
                  >
                    <Music className="h-3 w-3 mr-2 text-melanie-purple" />
                    <span className="truncate">{music.name}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-gray-500 italic">No music uploaded yet</p>
            )}
            
            {playlist.filter(item => item.type === 'audio').length > 0 && (
              <>
                <h4 className="text-xs text-gray-400 mt-3 mb-1">From Your Playlist</h4>
                <ul className="space-y-1">
                  {playlist.filter(item => item.type === 'audio').map(audio => (
                    <li 
                      key={audio.id}
                      className={`text-xs p-1.5 rounded flex items-center cursor-pointer ${currentMusic === audio.url ? 'bg-melanie-purple/40' : 'hover:bg-melanie-purple/20'}`}
                      onClick={() => selectMusic(audio.url)}
                    >
                      <Music className="h-3 w-3 mr-2 text-melanie-purple" />
                      <span className="truncate">{audio.name}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MusicUploader;
