import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import HeartBackground from '../components/HeartBackground';
import { usePlaylist } from '../context/PlaylistContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Music, VideoIcon, Upload, Share, Loader2, Playlist } from 'lucide-react';

interface UploadResponse {
  id: string;
  url: string;
  name: string;
}

const MediaUploadPage: React.FC = () => {
  const [audioFiles, setAudioFiles] = useState<File[]>([]);
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  const [audioUrls, setAudioUrls] = useState<string[]>([]);
  const [videoUrls, setVideoUrls] = useState<string[]>([]);
  const [activeAudio, setActiveAudio] = useState<string | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [uploadingAudio, setUploadingAudio] = useState<boolean>(false);
  const [uploadingVideo, setUploadingVideo] = useState<boolean>(false);
  const audioRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { addToPlaylist, isInPlaylist } = usePlaylist();

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      setAudioFiles(prev => [...prev, ...fileArray]);
      
      const newUrls = fileArray.map(file => URL.createObjectURL(file));
      setAudioUrls(prev => [...prev, ...newUrls]);
      
      toast({
        title: "Archivo de audio subido",
        description: `${fileArray.length} archivo(s) subido(s) correctamente.`,
      });
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      setVideoFiles(prev => [...prev, ...fileArray]);
      
      const newUrls = fileArray.map(file => URL.createObjectURL(file));
      setVideoUrls(prev => [...prev, ...newUrls]);
      
      toast({
        title: "Archivo de video subido",
        description: `${fileArray.length} archivo(s) subido(s) correctamente.`,
      });
    }
  };

  const handleAudioDelete = (index: number) => {
    URL.revokeObjectURL(audioUrls[index]);
    setAudioFiles(prev => prev.filter((_, i) => i !== index));
    setAudioUrls(prev => prev.filter((_, i) => i !== index));
    if (audioUrls[index] === activeAudio) {
      setActiveAudio(null);
    }
  };

  const handleVideoDelete = (index: number) => {
    URL.revokeObjectURL(videoUrls[index]);
    setVideoFiles(prev => prev.filter((_, i) => i !== index));
    setVideoUrls(prev => prev.filter((_, i) => i !== index));
    if (videoUrls[index] === activeVideo) {
      setActiveVideo(null);
    }
  };

  const uploadToStorage = async (file: File, type: 'audio' | 'video'): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    
    const response = await fetch('https://lovable-supabase-functions.vercel.app/api/upload-media', {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`Error uploading ${type} file`);
    }
    
    return response.json();
  };

  const handleShareAudio = async () => {
    if (audioFiles.length === 0) {
      toast({
        title: "Error",
        description: "No hay archivos de audio para compartir",
        variant: "destructive",
      });
      return;
    }
    
    setUploadingAudio(true);
    
    try {
      for (const file of audioFiles) {
        await uploadToStorage(file, 'audio');
      }
      
      toast({
        title: "¡Éxito!",
        description: `${audioFiles.length} archivo(s) de audio compartido(s) correctamente.`,
      });
      
      audioFiles.forEach((_, index) => {
        URL.revokeObjectURL(audioUrls[index]);
      });
      
      setAudioFiles([]);
      setAudioUrls([]);
      setActiveAudio(null);
      
      navigate('/shared-media');
    } catch (error) {
      console.error("Error sharing audio files:", error);
      toast({
        title: "Error",
        description: "No se pudieron compartir los archivos de audio",
        variant: "destructive",
      });
    } finally {
      setUploadingAudio(false);
    }
  };

  const handleShareVideo = async () => {
    if (videoFiles.length === 0) {
      toast({
        title: "Error",
        description: "No hay archivos de video para compartir",
        variant: "destructive",
      });
      return;
    }
    
    setUploadingVideo(true);
    
    try {
      for (const file of videoFiles) {
        await uploadToStorage(file, 'video');
      }
      
      toast({
        title: "¡Éxito!",
        description: `${videoFiles.length} archivo(s) de video compartido(s) correctamente.`,
      });
      
      videoFiles.forEach((_, index) => {
        URL.revokeObjectURL(videoUrls[index]);
      });
      
      setVideoFiles([]);
      setVideoUrls([]);
      setActiveVideo(null);
      
      navigate('/shared-media');
    } catch (error) {
      console.error("Error sharing video files:", error);
      toast({
        title: "Error",
        description: "No se pudieron compartir los archivos de video",
        variant: "destructive",
      });
    } finally {
      setUploadingVideo(false);
    }
  };

  const goToSharedMedia = () => {
    navigate('/shared-media');
  };

  const goToPlaylist = () => {
    navigate('/playlist');
  };

  const addAudioToPlaylist = (file: File, url: string, index: number) => {
    const fileId = `local-${file.name}-${file.lastModified}`;
    
    const mediaFile = {
      id: fileId,
      name: file.name,
      url: url,
      type: 'audio' as const
    };
    
    addToPlaylist(mediaFile);
    
    toast({
      title: "¡Añadido a la playlist!",
      description: `${file.name} ha sido añadido a tu playlist.`,
    });
  };

  const isAudioInPlaylist = (file: File) => {
    const fileId = `local-${file.name}-${file.lastModified}`;
    return isInPlaylist(fileId);
  };

  return (
    <div className="min-h-screen pb-20">
      <HeartBackground />
      <NavBar />
      
      <header className="pt-32 pb-12 px-4 sm:px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-allura mb-6 text-white animate-fade-in">
          Tus Medios
        </h1>
        <p className="text-xl md:text-2xl text-melanie-purple font-light max-w-2xl mx-auto animate-fade-in opacity-80">
          Sube y comparte tus audios y videos favoritos
        </p>
        <div className="flex flex-wrap gap-4 justify-center mt-6">
          <Button 
            onClick={goToSharedMedia}
            className="bg-melanie-purple hover:bg-melanie-purple/80"
          >
            Ver Medios Compartidos
          </Button>
          <Button 
            onClick={goToPlaylist}
            variant="outline"
            className="border-melanie-purple/50 text-white"
          >
            <Playlist className="mr-2 h-4 w-4" /> Mi Playlist
          </Button>
        </div>
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
            <div className="bg-black/30 backdrop-blur-md p-6 rounded-xl border border-melanie-purple/20">
              <h2 className="text-2xl font-allura mb-4 text-white">Subir Audio</h2>
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <Input 
                  ref={audioRef} 
                  type="file" 
                  accept="audio/*" 
                  onChange={handleAudioUpload} 
                  className="hidden" 
                  multiple
                />
                <Button 
                  onClick={() => audioRef.current?.click()} 
                  className="w-full md:w-auto bg-melanie-purple hover:bg-melanie-purple/80"
                >
                  <Upload className="mr-2 h-4 w-4" /> Seleccionar Archivos de Audio
                </Button>
                <p className="text-sm text-white/70">
                  Formatos soportados: MP3, WAV, OGG, etc.
                </p>
              </div>
              
              {audioFiles.length > 0 && (
                <div className="mt-4">
                  <Button 
                    onClick={handleShareAudio}
                    className="w-full md:w-auto bg-green-600 hover:bg-green-700"
                    disabled={uploadingAudio}
                  >
                    {uploadingAudio ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Compartiendo...
                      </>
                    ) : (
                      <>
                        <Share className="mr-2 h-4 w-4" /> Compartir {audioFiles.length} Archivo(s)
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
            
            {audioUrls.length > 0 ? (
              <div className="grid grid-cols-1 gap-4">
                <h2 className="text-2xl font-allura text-white">Mis Audios</h2>
                
                {audioUrls.map((url, index) => (
                  <div key={index} className="bg-black/40 backdrop-blur-md p-4 rounded-lg border border-melanie-purple/30 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Music className="h-8 w-8 text-melanie-purple" />
                      <span className="text-white truncate max-w-[200px]">
                        {audioFiles[index].name}
                      </span>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                      <audio 
                        src={url} 
                        controls 
                        className="w-full md:w-auto"
                      />
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="outline"
                          size="sm" 
                          onClick={() => addAudioToPlaylist(audioFiles[index], url, index)}
                          className="border-melanie-purple/50 text-white"
                          disabled={isAudioInPlaylist(audioFiles[index])}
                        >
                          <Playlist className="mr-1 h-4 w-4" /> 
                          {isAudioInPlaylist(audioFiles[index]) ? 'En Playlist' : 'Añadir a Playlist'}
                        </Button>
                        
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={() => handleAudioDelete(index)}
                        >
                          Eliminar
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-white/70">No hay archivos de audio subidos</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="video" className="space-y-8">
            <div className="bg-black/30 backdrop-blur-md p-6 rounded-xl border border-melanie-purple/20">
              <h2 className="text-2xl font-allura mb-4 text-white">Subir Video</h2>
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <Input 
                  ref={videoRef} 
                  type="file" 
                  accept="video/*" 
                  onChange={handleVideoUpload} 
                  className="hidden" 
                  multiple
                />
                <Button 
                  onClick={() => videoRef.current?.click()} 
                  className="w-full md:w-auto bg-melanie-purple hover:bg-melanie-purple/80"
                >
                  <Upload className="mr-2 h-4 w-4" /> Seleccionar Archivos de Video
                </Button>
                <p className="text-sm text-white/70">
                  Formatos soportados: MP4, WebM, MOV, etc.
                </p>
              </div>
              
              {videoFiles.length > 0 && (
                <div className="mt-4">
                  <Button 
                    onClick={handleShareVideo}
                    className="w-full md:w-auto bg-green-600 hover:bg-green-700"
                    disabled={uploadingVideo}
                  >
                    {uploadingVideo ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Compartiendo...
                      </>
                    ) : (
                      <>
                        <Share className="mr-2 h-4 w-4" /> Compartir {videoFiles.length} Archivo(s)
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
            
            {videoUrls.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                <h2 className="text-2xl font-allura text-white">Mis Videos</h2>
                
                {videoUrls.map((url, index) => (
                  <div key={index} className="bg-black/40 backdrop-blur-md p-4 rounded-lg border border-melanie-purple/30">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <VideoIcon className="h-6 w-6 text-melanie-purple" />
                        <span className="text-white truncate max-w-[300px]">
                          {videoFiles[index].name}
                        </span>
                      </div>
                      
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => handleVideoDelete(index)}
                      >
                        Eliminar
                      </Button>
                    </div>
                    
                    <div className="rounded-lg overflow-hidden bg-black aspect-video">
                      <video 
                        src={url} 
                        controls 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-white/70">No hay archivos de video subidos</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
};

export default MediaUploadPage;
