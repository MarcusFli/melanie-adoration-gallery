
import React from 'react';
import NavBar from '../components/NavBar';
import HeartBackground from '../components/HeartBackground';
import Gallery from '../components/Gallery';
import EasterEgg from '../components/EasterEgg';
import EasterEggHuntStatus from '../components/EasterEggHuntStatus';

const images = [
  "/lovable-uploads/b94290fa-5e3d-42eb-9b0d-f040b603405d.png",
  "/lovable-uploads/f5b3bbfc-3579-4eca-9d82-5ba501a05c5e.png",
  "/lovable-uploads/a0268073-2503-4c82-ac84-2f21e5046d7e.png",
  "/lovable-uploads/96810cc3-ece9-40aa-a367-58cbb3b7935d.png",
  "/lovable-uploads/d2a01df5-c429-4e0f-ba11-bfb61badfc72.png",
  "/lovable-uploads/65a62939-dd10-4c6b-b41e-9be37c8636a8.png",
  "/lovable-uploads/35d3af99-e932-4ca2-89bf-7b180d43ea08.png",
  "/lovable-uploads/b72b9344-689b-48a7-9990-562dd63b9942.png",
  "/lovable-uploads/621fbc8f-1243-49b5-8655-9231de15957e.png",
  "/lovable-uploads/7378dcc0-60e4-4c3d-be52-08f05c443cb2.png",
  "/lovable-uploads/11dba437-2f1d-4fe6-90f7-5e6ca7e2b2c1.png",
  "/lovable-uploads/07fae02c-848c-440d-a76b-29f146f66e7c.png",
  "/lovable-uploads/d318f69c-a83b-4c27-be7c-fad26417a224.png",
  "/lovable-uploads/ba440401-d042-4384-95d7-a48b36262627.png",
  "/lovable-uploads/c933c249-c927-447f-8e72-a4c08a0764e9.png",
  "/lovable-uploads/ceb7c044-2aba-4809-a29d-5dc40e115c76.png"
];

const GalleryPage: React.FC = () => {
  return (
    <div className="min-h-screen pb-20">
      <HeartBackground />
      <NavBar />
      <EasterEggHuntStatus />
      
      <header className="pt-32 pb-16 px-4 sm:px-6 text-center relative">
        <EasterEgg id="egg13" className="top-40 right-20" pattern={2} />
        <EasterEgg id="egg14" className="top-40 left-20" pattern={3} />
        
        <h1 className="text-5xl md:text-7xl font-allura mb-6 text-white animate-fade-in">
          Galería de Belleza
        </h1>
        <p className="text-xl md:text-2xl text-melanie-purple font-light max-w-2xl mx-auto animate-fade-in opacity-80">
          Una colección de momentos que capturan tu esencia
        </p>
      </header>

      <section className="py-8 container mx-auto relative">
        <EasterEgg id="egg15" className="top-1/3 right-5 md:right-20" pattern={4} />
        <EasterEgg id="egg16" className="top-1/2 left-5 md:left-20" pattern={0} />
        <EasterEgg id="egg17" className="bottom-1/4 right-1/4" pattern={1} />
        
        <Gallery images={images} />
      </section>
    </div>
  );
};

export default GalleryPage;
