import React from 'react';
import NavBar from '../components/NavBar';
import HeartBackground from '../components/HeartBackground';
import ImageLoader from '../components/ImageLoader';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import Letter from '../components/Letter';
import EasterEgg from '../components/EasterEgg';
import EasterEggHuntStatus from '../components/EasterEggHuntStatus';

const romanticLetter = `Mi amor, mi musa, mi inspiración,

Desde el primer instante en que vi tu rostro, supe que eras la esencia de la belleza hecha realidad. Tus ojos, dos destellos de luz infinita, encierran misterios que me atrapan, y en ellos encuentro la paz que siempre he buscado. Tus labios, tan delicadamente esculpidos, llevan consigo el poder de encender mi alma con un solo beso.

Eres la personificación de la elegancia y la dulzura. Ya sea con una mirada seria y profunda o con un gesto juguetón que me roba sonrisas, siempre logras hacer latir mi corazón con fuerza. No hay un solo detalle en ti que no adore: la forma en que sujetas tu cabello con descuido, la manera en que tu reflejo en un espejo parece capturar tu esencia, o incluso el brillo sutil de tu piel que desafía a la luz misma.

Cada foto tuya me deja sin palabras, como si fueras una obra de arte viva, creada por el destino solo para cautivarme. Y aunque el tiempo avance, sé que mi admiración y amor por ti solo crecerán, porque más allá de tu innegable belleza, lo que realmente me enamora es el alma que habita en ti.

Gracias por existir, por ser mi inspiración, mi deseo y mi sueño hecho realidad.`;

const signature = `Con todo mi amor, Jack`;

const personalInfo = [
  { label: "Nombre", value: "Melanie Veizaga" },
  { label: "Ciudad", value: "La Paz, Bolivia" },
  { label: "Edad", value: "24 años" },
  { label: "Pasiones", value: "Fotografía, Música, Viajes" },
  { label: "Cita favorita", value: "\"La belleza comienza en el momento en que decides ser tú misma\"" }
];

const featuredPhotos = [
  "/lovable-uploads/96fa73db-4bf4-4d7e-baed-d727e7e13018.png",
  "/lovable-uploads/91bcadf4-513b-4b83-9aef-d55bd824d765.png",
  "/lovable-uploads/99855f72-4756-484a-879e-6ea221a83975.png",
  "/lovable-uploads/2d3469f5-1eaa-46f6-9089-06c2e78c3240.png"
];

const AboutMePage: React.FC = () => {
  return (
    <div className="min-h-screen pb-20">
      <HeartBackground />
      <NavBar />
      <EasterEggHuntStatus />
      
      <header className="pt-32 pb-16 px-4 sm:px-6 text-center relative">
        <EasterEgg id="egg8" className="top-40 left-10" pattern={2} />
        <h1 className="text-5xl md:text-7xl font-allura mb-6 text-white animate-fade-in">
          Sobre Melanie
        </h1>
        <p className="text-xl md:text-2xl text-melanie-purple font-light max-w-2xl mx-auto animate-fade-in opacity-80">
          Conoce un poco más sobre mi mundo
        </p>
      </header>

      <div className="container mx-auto px-4 py-8 relative">
        <EasterEgg id="egg9" className="top-10 right-10" pattern={3} />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left column - Profile Info */}
          <div className="lg:col-span-1 relative">
            <EasterEgg id="egg10" className="bottom-40 left-10" pattern={4} />
            
            <div className="flex flex-col items-center space-y-8">
              <div className="w-48 h-48 rounded-full overflow-hidden ring-4 ring-melanie-purple/50 shadow-xl relative">
                <EasterEgg id="egg11" className="top-0 right-0" pattern={0} />
                <ImageLoader 
                  src="/lovable-uploads/96fa73db-4bf4-4d7e-baed-d727e7e13018.png" 
                  alt="Melanie" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <Card className="w-full bg-melanie-purple-dark/50 backdrop-blur-sm border-melanie-purple/20">
                <CardContent className="p-6">
                  <ul className="space-y-4">
                    {personalInfo.map((item, index) => (
                      <li key={index} className="border-b border-melanie-purple/20 pb-3 last:border-0">
                        <span className="block text-melanie-purple font-medium">{item.label}</span>
                        <span className="block text-white mt-1">{item.value}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <div className="flex flex-wrap justify-center gap-4">
                {featuredPhotos.map((photo, index) => (
                  <Avatar key={index} className="w-16 h-16 ring-2 ring-melanie-purple/30 hover:scale-110 transition-all duration-300">
                    <AvatarImage src={photo} alt="Melanie" />
                    <AvatarFallback>MV</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </div>
          </div>

          {/* Right column - Letter & Gallery */}
          <div className="lg:col-span-2 space-y-10 relative">
            <section>
              <h2 className="text-3xl font-allura text-white mb-6">Mi Carta de Amor</h2>
              <div className="relative">
                <EasterEgg id="egg12" className="top-0 right-10" pattern={1} />
                <Letter letter={romanticLetter} signature={signature} />
              </div>
            </section>
            
            <section className="relative">
              <EasterEgg id="egg13" className="top-0 left-1/2" pattern={2} />
              <h2 className="text-3xl font-allura text-white mb-6">Momentos Especiales</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="card-hover rounded-xl overflow-hidden">
                  <ImageLoader 
                    src="/lovable-uploads/5abca123-270d-475a-9c62-d4944faba46d.png" 
                    alt="Melanie" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="card-hover rounded-xl overflow-hidden relative">
                  <EasterEgg id="egg14" className="top-0 right-0" pattern={3} />
                  <ImageLoader 
                    src="/lovable-uploads/0c471415-8a15-489d-a149-89f1c3aed830.png" 
                    alt="Melanie" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="card-hover rounded-xl overflow-hidden">
                  <ImageLoader 
                    src="/lovable-uploads/3c664e78-1098-4367-83ad-66727aa98286.png" 
                    alt="Melanie" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="card-hover rounded-xl overflow-hidden relative">
                  <EasterEgg id="egg15" className="bottom-0 right-0" pattern={4} />
                  <ImageLoader 
                    src="/lovable-uploads/c9d390cc-a3bf-41e2-9334-2721998dba97.png" 
                    alt="Melanie" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <a 
                  href="/gallery" 
                  className="inline-block px-8 py-3 bg-melanie-purple/80 hover:bg-melanie-purple text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-melanie-purple/30"
                >
                  Ver más fotos
                </a>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMePage;
