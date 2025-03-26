
import React from 'react';
import { useEasterEggs } from '../context/EasterEggContext';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import HeartBackground from '../components/HeartBackground';
import Gallery from '../components/Gallery';
import { Button } from '@/components/ui/button';
import { Award } from 'lucide-react';

const secretImages = [
  "photo-1618160702438-9b02ab6515c9",
  "photo-1582562124811-c09040d0a901",
  "photo-1472396961693-142e6e269027",
  "photo-1535268647677-300dbf3d78d1",
  "photo-1501286353178-1ec881214838"
].map(id => `https://images.unsplash.com/${id}`);

const SecretGallery: React.FC = () => {
  const { hasCompletedHunt } = useEasterEggs();
  const navigate = useNavigate();

  if (!hasCompletedHunt) {
    navigate('/');
    return null;
  }

  return (
    <div className="min-h-screen pb-20">
      <HeartBackground />
      <NavBar />
      
      <header className="pt-32 pb-16 px-4 sm:px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-allura mb-6 text-white animate-fade-in">
          Galería Secreta
        </h1>
        <p className="text-xl md:text-2xl text-melanie-purple font-light max-w-2xl mx-auto animate-fade-in opacity-80">
          ¡Felicitaciones por encontrar todos los huevos!
        </p>
        <Button 
          onClick={() => navigate('/gallery')}
          className="mt-6 bg-melanie-purple hover:bg-melanie-purple/80"
        >
          <Award className="mr-2 h-4 w-4" />
          Volver a la Galería Principal
        </Button>
      </header>

      <section className="py-8 container mx-auto">
        <Gallery images={secretImages} columnLayout={3} />
      </section>
    </div>
  );
};

export default SecretGallery;
