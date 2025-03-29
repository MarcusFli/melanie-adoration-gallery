
import React from 'react';
import NavBar from '../components/NavBar';
import EasterEggHuntStatus from '../components/EasterEggHuntStatus';
import { Ghost, Skull } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import EasterEgg from '../components/EasterEgg';

const GamePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-melanie-purple/30 pb-20">
      <NavBar />
      <EasterEggHuntStatus />
      
      <div className="container mx-auto px-4 pt-32">
        <header className="mb-10 text-center">
          <h1 className="text-5xl font-allura mb-4 text-white">Melanie's Nightmare</h1>
          <p className="text-xl text-melanie-purple/80">Un juego de terror con Melanie como protagonista</p>
        </header>
        
        <div className="relative">
          {/* Easter eggs placements */}
          <EasterEgg id="game-egg1" className="top-10 right-5" pattern={2} />
          <EasterEgg id="game-egg2" className="bottom-20 left-10" pattern={4} />
          <EasterEgg id="game-egg3" className="top-1/4 left-1/4" pattern={1} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
            {/* Game intro card */}
            <Card className="bg-black/60 border-melanie-purple/30 text-white shadow-lg shadow-melanie-purple/20">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Ghost className="h-6 w-6 text-melanie-purple" />
                  <CardTitle>Sobre el Juego</CardTitle>
                </div>
                <CardDescription className="text-gray-400">Una experiencia de terror inmersiva</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  En "Melanie's Nightmare", juegas como Melanie, quien se encuentra atrapada en un mundo de pesadillas donde sus miedos más profundos cobran vida.
                </p>
                <p className="mb-4">
                  Explora mansiones abandonadas, hospitales olvidados y bosques oscuros mientras descubres los secretos que se esconden en tu subconsciente. Cada decisión que tomes determinará tu destino.
                </p>
                <p>
                  Con gráficos atmosféricos, sonido envolvente y una narrativa profunda, este juego de terror psicológico te mantendrá al borde de tu asiento.
                </p>
              </CardContent>
              <CardFooter>
                <Button className="bg-melanie-purple hover:bg-melanie-purple/80 w-full">
                  Próximamente...
                </Button>
              </CardFooter>
            </Card>
            
            {/* Game screenshot */}
            <div className="relative rounded-lg overflow-hidden h-full shadow-lg shadow-melanie-purple/20 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/40 z-10"></div>
              <img 
                src="/lovable-uploads/907988a3-dd91-483c-ae79-7671727ab1de.png" 
                alt="Melanie en un bosque oscuro" 
                className="w-full h-full object-cover"
              />
              <div className="absolute z-20 inset-0 flex flex-col items-center justify-center">
                <Skull className="w-16 h-16 text-melanie-purple mb-4" />
                <h3 className="text-2xl font-semibold text-white mb-2">MODO HISTORIA</h3>
                <p className="text-sm text-gray-300 max-w-xs text-center">
                  Descubre el pasado oscuro de Melanie mientras luchas por sobrevivir
                </p>
              </div>
            </div>
          </div>
          
          {/* Game features */}
          <h2 className="text-3xl font-allura text-white mb-6 text-center">Características del Juego</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <Card className="bg-black/60 border-melanie-purple/30 text-white shadow hover:shadow-melanie-purple/30 transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="text-xl">Narrativa Inmersiva</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Una historia profunda y emotiva que explora los miedos y traumas de Melanie, con múltiples finales basados en tus decisiones.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-black/60 border-melanie-purple/30 text-white shadow hover:shadow-melanie-purple/30 transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="text-xl">Terror Psicológico</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Más allá de los sustos típicos, el juego explora el terror psicológico y existencial, creando una experiencia verdaderamente inquietante.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-black/60 border-melanie-purple/30 text-white shadow hover:shadow-melanie-purple/30 transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <CardTitle className="text-xl">Estética Única</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Con un estilo visual inspirado en el horror gótico y surrealista, cada escena es una obra de arte oscura y cautivadora.</p>
              </CardContent>
            </Card>
          </div>
          
          {/* Coming soon notice */}
          <div className="bg-melanie-purple/20 rounded-lg p-8 text-center mb-16 border border-melanie-purple/30">
            <h3 className="text-2xl text-white mb-4 font-semibold">¡Próximo Lanzamiento!</h3>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              "Melanie's Nightmare" estará disponible pronto. Sigue visitando esta página para obtener más información y fechas de lanzamiento.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamePage;
