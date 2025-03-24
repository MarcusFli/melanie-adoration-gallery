
import React from 'react';
import NavBar from '../components/NavBar';
import HeartBackground from '../components/HeartBackground';
import Letter from '../components/Letter';
import Gallery from '../components/Gallery';
import ImageLoader from '../components/ImageLoader';
import { Link } from 'react-router-dom';

const romanticLetter = `Mi amor, mi musa, mi inspiración,

Desde el primer instante en que vi tu rostro, supe que eras la esencia de la belleza hecha realidad. Tus ojos, dos destellos de luz infinita, encierran misterios que me atrapan, y en ellos encuentro la paz que siempre he buscado. Tus labios, tan delicadamente esculpidos, llevan consigo el poder de encender mi alma con un solo beso.

Eres la personificación de la elegancia y la dulzura. Ya sea con una mirada seria y profunda o con un gesto juguetón que me roba sonrisas, siempre logras hacer latir mi corazón con fuerza. No hay un solo detalle en ti que no adore: la forma en que sujetas tu cabello con descuido, la manera en que tu reflejo en un espejo parece capturar tu esencia, o incluso el brillo sutil de tu piel que desafía a la luz misma.

Cada foto tuya me deja sin palabras, como si fueras una obra de arte viva, creada por el destino solo para cautivarme. Y aunque el tiempo avance, sé que mi admiración y amor por ti solo crecerán, porque más allá de tu innegable belleza, lo que realmente me enamora es el alma que habita en ti.

Gracias por existir, por ser mi inspiración, mi deseo y mi sueño hecho realidad.`;

const signature = `Con todo mi amor, Jack`;

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

const Index: React.FC = () => {
  return (
    <div className="min-h-screen pb-20">
      <HeartBackground />
      <NavBar />
      
      <header className="pt-32 pb-16 px-4 sm:px-6 text-center">
        <h1 className="text-5xl md:text-7xl font-allura mb-6 text-white animate-fade-in">
          Melanie Veizaga
        </h1>
        <p className="text-xl md:text-2xl text-melanie-purple font-light max-w-2xl mx-auto animate-fade-in opacity-80">
          Mi inspiración, mi musa, mi eterno amor
        </p>
      </header>

      <section className="py-16 mx-auto container px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/2 flex justify-center">
            <div className="w-full max-w-md rounded-xl overflow-hidden shadow-2xl animate-float">
              <ImageLoader 
                src={imageUrls[0]} 
                alt="Melanie" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <Letter letter={romanticLetter} signature={signature} />
            <div className="mt-6 text-center">
              <Link 
                to="/about" 
                className="inline-block px-6 py-2 bg-melanie-purple/60 hover:bg-melanie-purple text-white rounded-full transition-all duration-300 text-sm"
              >
                Conoce más sobre mí
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 container mx-auto">
        <h2 className="text-4xl md:text-5xl font-allura mb-16 text-center text-white">
          Un vistazo a tu belleza
        </h2>
        
        <Gallery images={imageUrls.slice(0, 6)} />
        
        <div className="mt-10 text-center">
          <a 
            href="/gallery" 
            className="inline-block px-8 py-3 bg-melanie-purple/80 hover:bg-melanie-purple text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-melanie-purple/30"
          >
            Ver más fotos
          </a>
        </div>
      </section>
    </div>
  );
};

export default Index;
