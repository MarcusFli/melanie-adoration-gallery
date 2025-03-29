
import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import EasterEggHuntStatus from '../components/EasterEggHuntStatus';
import { Ghost, Skull, Moon, Heart, Gamepad } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import EasterEgg from '../components/EasterEgg';
import ImageLoader from '../components/ImageLoader';
import MelanieGame from '../components/MelanieGame';
import { toast } from "@/components/ui/use-toast";

const GamePage: React.FC = () => {
  const [showGame, setShowGame] = useState(false);

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
                    <Button 
                      className="bg-melanie-purple hover:bg-melanie-purple/80 w-full"
                      onClick={() => setShowGame(true)}
                    >
                      <Gamepad className="mr-2" />
                      Jugar Ahora
                    </Button>
                  </CardFooter>
                </Card>
                
                {/* Game screenshot - Using ImageLoader for better error handling */}
                <div className="relative rounded-lg overflow-hidden h-full shadow-lg shadow-melanie-purple/20 flex items-center justify-center">
                  <div className="absolute inset-0 bg-black/40 z-10"></div>
                  <ImageLoader
                    src="/lovable-uploads/907988a3-dd91-483c-ae79-7671727ab1de.png"
                    alt="Melanie en un bosque oscuro"
                    containerClassName="w-full h-full"
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
              
              {/* Melanie's Bio with Zodiac */}
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
                      <h3 className="text-xl font-semibold mb-2">Melanie de Buenos Aires</h3>
                      <p className="mb-3">Nacida el 14 de diciembre de 2000 en Buenos Aires, Argentina</p>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="bg-melanie-purple/20 p-2 rounded-md">
                          <span className="font-semibold">Signo Zodiacal:</span> Sagitario
                        </div>
                      </div>
                      <p className="text-gray-300">
                        Como Sagitario, Melanie es aventurera, optimista y valiente. Estas cualidades la ayudan a enfrentar los terrores de la noche con determinación. Sin embargo, su naturaleza impulsiva a veces la lleva a situaciones peligrosas. En este juego, deberás equilibrar su espíritu intrépido con la cautela necesaria para sobrevivir a los horrores que la acechan mientras busca reunirse con su amado.
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
              
              {/* Play button */}
              <div className="bg-melanie-purple/20 rounded-lg p-8 text-center mb-16 border border-melanie-purple/30">
                <h3 className="text-2xl text-white mb-4 font-semibold">¡Juega Ahora!</h3>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-6">
                  Ayuda a Melanie a encontrar a su amado mientras esquiva fantasmas y fenómenos extraños.
                </p>
                <Button 
                  size="lg" 
                  className="bg-melanie-purple hover:bg-melanie-purple/80"
                  onClick={() => setShowGame(true)}
                >
                  <Gamepad className="mr-2" />
                  Comenzar Aventura
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
