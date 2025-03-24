
import React, { useState, useRef } from 'react';
import NavBar from '../components/NavBar';
import HeartBackground from '../components/HeartBackground';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Music, VideoIcon, Upload } from 'lucide-react';

const MediaUploadPage: React.FC = () => {
  const [audioFiles, setAudioFiles] = useState<File[]>([]);
  const [videoFiles, setVideoFiles] = useState<File[]>([]);
  const [audioUrls, setAudioUrls] = useState<string[]>([]);
  const [videoUrls, setVideoUrls] = useState<string[]>([]);
  const [activeAudio, setActiveAudio] = useState<string | null>(null);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const audioRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      setAudioFiles(prev => [...prev, ...fileArray]);
      
      // Create URLs for the audio files
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
      
      // Create URLs for the video files
      const newUrls = fileArray.map(file => URL.createObjectURL(file));
      setVideoUrls(prev => [...prev, ...newUrls]);
      
      toast({
        title: "Archivo de video subido",
        description: `${fileArray.length} archivo(s) subido(s) correctamente.`,
      });
    }
  };

  const handleAudioDelete = (index: number) => {
    // Revoke the URL to prevent memory leaks
    URL.revokeObjectURL(audioUrls[index]);
    
    // Remove the file and URL from their respective arrays
    setAudioFiles(prev => prev.filter((_, i) => i !== index));
    setAudioUrls(prev => prev.filter((_, i) => i !== index));
    
    // If the active audio is deleted, set activeAudio to null
    if (audioUrls[index] === activeAudio) {
      setActiveAudio(null);
    }
  };

  const handleVideoDelete = (index: number) => {
    // Revoke the URL to prevent memory leaks
    URL.revokeObjectURL(videoUrls[index]);
    
    // Remove the file and URL from their respective arrays
    setVideoFiles(prev => prev.filter((_, i) => i !== index));
    setVideoUrls(prev => prev.filter((_, i) => i !== index));
    
    // If the active video is deleted, set activeVideo to null
    if (videoUrls[index] === activeVideo) {
      setActiveVideo(null);
    }
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
          Sube y guarda tus audios y videos favoritos
        </p>
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
                      
                      <Button 
                        variant="destructive" 
                        size="sm" 
                        onClick={() => handleAudioDelete(index)}
                      >
                        Eliminar
                      </Button>
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
