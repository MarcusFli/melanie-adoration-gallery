import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PlaylistProvider } from "./context/PlaylistContext";
import { EasterEggProvider } from "./context/EasterEggContext";
import Index from "./pages/Index";
import GalleryPage from "./pages/GalleryPage";
import AboutMePage from "./pages/AboutMePage";
import MediaUploadPage from "./pages/MediaUploadPage";
import SharedMediaPage from "./pages/SharedMediaPage";
import PlaylistPage from "./pages/PlaylistPage";
import NotFound from "./pages/NotFound";
import SecretGallery from "./pages/SecretGallery";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <PlaylistProvider>
      <EasterEggProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<AboutMePage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/media" element={<MediaUploadPage />} />
              <Route path="/shared-media" element={<SharedMediaPage />} />
              <Route path="/playlist" element={<PlaylistPage />} />
              <Route path="/secret-gallery" element={<SecretGallery />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </EasterEggProvider>
    </PlaylistProvider>
  </QueryClientProvider>
);

export default App;
