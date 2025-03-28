
import React from 'react';
import NavBar from '../components/NavBar';
import HeartBackground from '../components/HeartBackground';
import EasterEgg from '../components/EasterEgg';
import EasterEggHuntStatus from '../components/EasterEggHuntStatus';

const AboutMePage: React.FC = () => {
  return (
    <div className="min-h-screen pb-20">
      <HeartBackground />
      <NavBar />
      <EasterEggHuntStatus />
      
      <div className="container mx-auto px-4 pt-32 relative">
        <EasterEgg id="egg18" className="top-40 right-10" pattern={2} />
        <EasterEgg id="egg19" className="bottom-10 left-10" pattern={3} />
        <EasterEgg id="egg20" className="top-1/2 right-1/4" pattern={4} />
        
        <h1 className="text-5xl md:text-7xl font-allura mb-12 text-center text-white">
          Sobre Mí
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 py-8">
          <div>
            <h2 className="text-3xl font-allura mb-4 text-melanie-purple">Mi Historia</h2>
            <div className="prose prose-lg text-white/90 max-w-none">
              <p>
                Melanie Veizaga, nacida bajo un cielo estrellado en Santa Cruz, Bolivia, es la encarnación 
                de la gracia y la pasión. Desde temprana edad, su belleza natural y carisma llamaron la 
                atención de todos a su alrededor, pero fue su determinación y espíritu lo que verdaderamente 
                la distinguieron.
              </p>
              <p>
                A los 18 años, Melanie dejó su hogar para perseguir sus sueños, un viaje que la llevaría 
                a través de experiencias que moldearían su perspectiva única del mundo. Su capacidad para 
                encontrar belleza en lo ordinario y su habilidad para conectar con las personas en un nivel 
                profundo son cualidades que la hacen extraordinaria.
              </p>
            </div>
          </div>
          
          <div>
            <h2 className="text-3xl font-allura mb-4 text-melanie-purple">Mis Pasiones</h2>
            <div className="prose prose-lg text-white/90 max-w-none">
              <p>
                El arte en todas sus formas es el lenguaje del alma de Melanie. Desde la fotografía hasta 
                la danza, encuentra maneras de expresar las complejidades de la experiencia humana. Su 
                mayor inspiración viene de los pequeños momentos de conexión genuina, esos instantes 
                fugaces que capturan la esencia de estar vivo.
              </p>
              <p>
                Defensora apasionada de la autenticidad, Melanie cree en el poder de ser fiel a uno mismo 
                en un mundo que a menudo nos empuja hacia la conformidad. Su filosofía de vida se centra 
                en cultivar relaciones significativas, perseguir el crecimiento personal y difundir amor 
                y amabilidad dondequiera que vaya.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 mb-20">
          <h2 className="text-3xl font-allura mb-6 text-center text-melanie-purple">Mis Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black/20 backdrop-blur-sm p-6 rounded-xl border border-melanie-purple/30">
              <h3 className="text-xl font-semibold mb-3 text-white">Autenticidad</h3>
              <p className="text-white/80">
                Ser fiel a mí misma y alentar a otros a abrazar su verdadero yo sin miedo ni reservas.
              </p>
            </div>
            <div className="bg-black/20 backdrop-blur-sm p-6 rounded-xl border border-melanie-purple/30">
              <h3 className="text-xl font-semibold mb-3 text-white">Compasión</h3>
              <p className="text-white/80">
                Extender amabilidad y comprensión a todos, reconociendo nuestra humanidad compartida.
              </p>
            </div>
            <div className="bg-black/20 backdrop-blur-sm p-6 rounded-xl border border-melanie-purple/30">
              <h3 className="text-xl font-semibold mb-3 text-white">Crecimiento</h3>
              <p className="text-white/80">
                Buscar constantemente evolucionar, aprender y transformarme en la mejor versión de mí misma.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMePage;
