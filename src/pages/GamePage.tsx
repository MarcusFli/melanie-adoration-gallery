
import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import EasterEggHuntStatus from '../components/EasterEggHuntStatus';
import { Ghost, Skull, Moon, Heart, Gamepad, Cat, Map } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import EasterEgg from '../components/EasterEgg';
import ImageLoader from '../components/ImageLoader';
import MelanieGame from '../components/MelanieGame';
import { toast } from "@/hooks/use-toast";

const GamePage: React.FC = () => {
  const [showGame, setShowGame] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-melanie-purple/30 pb-20">
      <NavBar />
      <EasterEggHuntStatus />
      
      <div className="container mx-auto px-4 pt-32">
        <header className="mb-10 text-center">
          <h1 className="text-5xl font-allura mb-4 text-white">Melanie's Lost Cat</h1>
          <p className="text-xl text-melanie-purple/80">Una aventura 3D en busca del gato perdido de Melanie</p>
        </header>
        
        <div className="relative">
          {/* Easter eggs placements */}
          <EasterEgg id="game-egg1" className="top-10 right-5" pattern={2} />
          <EasterEgg id="game-egg2" className="bottom-20 left-10" pattern={4} />
          <EasterEgg id="game-egg3" className="top-1/4 left-1/4" pattern={1} />

          {showGame ? (
            <div className="mb-16">
              <MelanieGame />
              <div className="mt-6 text-center">
                <Button 
                  variant="outline" 
                  className="border-melanie-purple/30 text-white hover:bg-melanie-purple/30"
                  onClick={() => setShowGame(false)}
                >
                  Volver a la información
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
                {/* Game intro card */}
                <Card className="bg-black/60 border-melanie-purple/30 text-white shadow-lg shadow-melanie-purple/20">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Cat className="h-6 w-6 text-melanie-purple" />
                      <CardTitle>La Búsqueda del Gato Perdido</CardTitle>
                    </div>
                    <CardDescription className="text-gray-400">Una experiencia de laberinto en 3D</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">
                      El querido gato de Melanie se ha perdido en un misterioso laberinto. Deberás guiar a Melanie a través de 10 niveles de complejidad creciente para encontrarlo.
                    </p>
                    <p className="mb-4">
                      Cada nivel es un nuevo laberinto generado aleatoriamente. A medida que avanzas, los laberintos se vuelven más grandes y desafiantes.
                    </p>
                    <p>
                      Con gráficos 3D y una historia envolvente, esta aventura te mantendrá atrapado mientras ayudas a Melanie a reunirse con su amada mascota.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      className="bg-melanie-purple hover:bg-melanie-purple/80 w-full"
                      onClick={() => setShowGame(true)}
                    >
                      <Gamepad className="mr-2" />
                      Comenzar Aventura
                    </Button>
                  </CardFooter>
                </Card>
                
                {/* Game screenshot */}
                <div className="relative rounded-lg overflow-hidden h-full shadow-lg shadow-melanie-purple/20 flex items-center justify-center">
                  <div className="absolute inset-0 bg-black/40 z-10"></div>
                  <ImageLoader
                    src="/lovable-uploads/907988a3-dd91-483c-ae79-7671727ab1de.png"
                    alt="Laberinto 3D"
                    containerClassName="w-full h-full"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute z-20 inset-0 flex flex-col items-center justify-center">
                    <Map className="w-16 h-16 text-melanie-purple mb-4" />
                    <h3 className="text-2xl font-semibold text-white mb-2">LABERINTO 3D</h3>
                    <p className="text-sm text-gray-300 max-w-xs text-center">
                      Explora un laberinto 3D generado aleatoriamente mientras buscas al gato perdido
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Melanie's Bio */}
              <Card className="bg-black/60 border-melanie-purple/30 text-white shadow-lg shadow-melanie-purple/20 mb-16">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Moon className="h-6 w-6 text-melanie-purple" />
                    <CardTitle>La Protagonista: Melanie</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
                    <div className="w-32 h-32 rounded-full overflow-hidden bg-melanie-purple/20 flex items-center justify-center">
                      <ImageLoader
                        src="/lovable-uploads/3a61898a-222f-4f13-bd6f-7ca84930e572.png"
                        alt="Melanie"
                        containerClassName="w-full h-full"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Melanie y su gato perdido</h3>
                      <p className="mb-3">Melanie comparte un vínculo especial con su gato, que desapareció misteriosamente en un extraño laberinto</p>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="bg-melanie-purple/20 p-2 rounded-md flex items-center">
                          <Cat className="h-4 w-4 mr-2 text-melanie-purple" />
                          <span>Su misión: encontrar a su querida mascota</span>
                        </div>
                      </div>
                      <p className="text-gray-300">
                        Melanie es valiente y determinada, cualidades que necesitará para navegar por los laberintos cada vez más complejos. Su amor por su gato le da la fuerza para superar cualquier obstáculo que se encuentre en su camino.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Game features */}
              <h2 className="text-3xl font-allura text-white mb-6 text-center">Características del Juego</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                <Card className="bg-black/60 border-melanie-purple/30 text-white shadow hover:shadow-melanie-purple/30 transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="text-xl">Laberinto 3D</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Explora un mundo tridimensional donde cada nivel es un nuevo laberinto generado aleatoriamente con mayor complejidad.</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-black/60 border-melanie-purple/30 text-white shadow hover:shadow-melanie-purple/30 transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="text-xl">10 Niveles</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Navega a través de 10 niveles desafiantes, cada uno con un laberinto más grande y complejo que el anterior.</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-black/60 border-melanie-purple/30 text-white shadow hover:shadow-melanie-purple/30 transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <CardTitle className="text-xl">Ambiente Inmersivo</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Disfruta de efectos visuales, música atmosférica y una historia cautivadora mientras ayudas a Melanie a encontrar a su gato.</p>
                  </CardContent>
                </Card>
              </div>
              
              {/* Play button */}
              <div className="bg-melanie-purple/20 rounded-lg p-8 text-center mb-16 border border-melanie-purple/30">
                <h3 className="text-2xl text-white mb-4 font-semibold">¡Comienza la aventura!</h3>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-6">
                  Ayuda a Melanie a encontrar a su gato perdido en el misterioso laberinto 3D.
                </p>
                <Button 
                  size="lg" 
                  className="bg-melanie-purple hover:bg-melanie-purple/80"
                  onClick={() => setShowGame(true)}
                >
                  <Gamepad className="mr-2" />
                  Jugar Ahora
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GamePage;
