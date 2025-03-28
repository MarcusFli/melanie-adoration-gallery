
import React from 'react';
import { useEasterEggs } from '../context/EasterEggContext';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import HeartBackground from '../components/HeartBackground';
import Gallery from '../components/Gallery';
import { Button } from '@/components/ui/button';
import { Award, LockOpen } from 'lucide-react';
import { motion } from 'framer-motion';

// Use more interesting unsplash photos for the secret gallery
const secretImages = [
  "photo-1618160702438-9b02ab6515c9",
  "photo-1582562124811-c09040d0a901",
  "photo-1472396961693-142e6e269027",
  "photo-1535268647677-300dbf3d78d1",
  "photo-1501286353178-1ec881214838",
  "photo-1593642634443-44adaa06623a",
  "photo-1519052537078-e6302a4968d4",
  "photo-1514888286974-6c03e2ca1dba",
  "photo-1573865526739-10659fec78a5",
  "photo-1548366086-7f1b76106622"
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
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <LockOpen className="w-20 h-20 mx-auto text-green-500 mb-6" />
          <h1 className="text-5xl md:text-7xl font-allura mb-6 text-white animate-fade-in">
            Galería Secreta
          </h1>
          <p className="text-xl md:text-2xl text-green-400 font-light max-w-2xl mx-auto animate-fade-in opacity-80">
            ¡Felicitaciones por encontrar todos los huevos!
          </p>
        </motion.div>
        <Button 
          onClick={() => navigate('/gallery')}
          className="mt-6 bg-melanie-purple hover:bg-melanie-purple/80"
        >
          <Award className="mr-2 h-4 w-4" />
          Volver a la Galería Principal
        </Button>
      </header>

      <section className="py-8 container mx-auto">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Gallery images={secretImages} columnLayout={3} />
        </motion.div>
      </section>
    </div>
  );
};

export default SecretGallery;
