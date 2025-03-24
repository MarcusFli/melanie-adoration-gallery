
import React from 'react';
import NavBar from '../components/NavBar';
import HeartBackground from '../components/HeartBackground';
import Gallery from '../components/Gallery';

const imageUrls = [
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
  "/lovable-uploads/ceb7c044-2aba-4809-a29d-5dc40e115c76.png",
  "/lovable-uploads/3a61898a-222f-4f13-bd6f-7ca84930e572.png",
  "/lovable-uploads/ef5dc348-7156-42a7-9513-15f29303d3a1.png"
];

const GalleryPage: React.FC = () => {
  return (
    <div className="min-h-screen pb-20">
      <HeartBackground />
      <NavBar />
      
      <header className="pt-32 pb-16 px-4 sm:px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-allura mb-6 text-white animate-fade-in">
          Galería de Melanie
        </h1>
        <p className="text-xl md:text-2xl text-melanie-purple font-light max-w-2xl mx-auto animate-fade-in opacity-80">
          Cada imagen captura un momento de tu belleza eterna
        </p>
      </header>

      <section className="py-8 container mx-auto">
        <Gallery images={imageUrls} columnLayout={3} />
      </section>
    </div>
  );
};

export default GalleryPage;
