import React from 'react';
import { HeartCrack, Sparkles, Skull, Cat, RotateCcw, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GameState } from '@/hooks/useGameState';
interface GameOverlaysProps {
  gameState: GameState;
  showStory: boolean;
  setShowStory: (show: boolean) => void;
  startGame: () => void;
}
const GameOverlays: React.FC<GameOverlaysProps> = ({
  gameState,
  showStory,
  setShowStory,
  startGame
}) => {
  const {
    gameOver,
    level
  } = gameState;
  return <>
      {/* Story overlay */}
      {showStory && <div className="absolute inset-0 z-20 bg-black/80 flex flex-col items-center justify-center p-6 rounded-lg">
          <div className="mb-6 max-w-md text-center">
            <HeartCrack className="w-12 h-12 text-melanie-purple mb-4 mx-auto" />
            <h3 className="text-2xl font-semibold text-white mb-4">¡El gato de Melanie se ha perdido!</h3>
            <p className="text-gray-300 mb-4">
              Melanie está desesperada por encontrar a su amado gato que se ha perdido en un laberinto
              misterioso. Ayúdala a navegar por los 10 niveles para reunirse con su mascota.
            </p>
            <p className="text-gray-300 mb-4">
              Con cada nivel, el laberinto se vuelve más grande y complejo. ¡Usa las flechas para moverte 
              y encuentra el camino!
            </p>
            <div className="bg-melanie-purple/20 p-4 rounded-lg mb-4">
              <p className="text-white text-sm mb-2">
                <strong>Controles:</strong>
              </p>
              <ul className="text-white text-sm space-y-2">
                <li className="flex items-center mx-[47px]">
                  <RotateCcw className="w-4 h-4 mr-2 text-melanie-purple" />
                  <span className="mx-0">Ahora puedes moverte en 360 grados por el laberinto</span>
                </li>
                <li>
                  <span className="font-semibold">Flecha arriba:</span> Moverse hacia adelante
                </li>
                <li>
                  <span className="font-semibold">Flecha abajo:</span> Moverse hacia atrás
                </li>
                <li>
                  <span className="font-semibold">Flecha izquierda:</span> Girar a la izquierda
                </li>
                <li>
                  <span className="font-semibold">Flecha derecha:</span> Girar a la derecha
                </li>
                <li className="flex items-center mt-3 pt-2 border-t border-melanie-purple/30">
                  <Eye className="w-4 h-4 mr-2 text-melanie-purple" />
                  <span>Usa la rueda 3D en la esquina para cambiar la perspectiva de la cámara</span>
                </li>
              </ul>
            </div>
          </div>
          <Button className="bg-melanie-purple hover:bg-melanie-purple/80" onClick={() => setShowStory(false)}>
            <Sparkles className="w-4 h-4 mr-2" />
            Comenzar Aventura
          </Button>
        </div>}
      
      {/* Game over overlay */}
      {gameOver && <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center rounded">
          <Skull className="w-16 h-16 text-melanie-purple mb-4" />
          <p className="text-xl text-white mb-4">¡Te has perdido en el laberinto!</p>
          <Button className="bg-melanie-purple hover:bg-melanie-purple/80" onClick={startGame}>
            Intentar de nuevo
          </Button>
        </div>}
      
      {/* Game info footer */}
      <div className="mt-6 text-gray-400 text-sm">
        <p>Ayuda a Melanie a encontrar a su gato perdido en este misterioso laberinto.</p>
        <div className="flex items-center justify-center gap-1 mt-2">
          <Cat className="w-4 h-4 text-melanie-purple" />
          <span>Nivel {level}/10</span>
        </div>
      </div>
    </>;
};
export default GameOverlays;