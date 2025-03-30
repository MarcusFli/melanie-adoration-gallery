
import React from 'react';
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GameControlsProps {
  showControls: boolean;
  setShowControls: (show: boolean) => void;
  handleButtonMove: (direction: string) => void;
  soundEnabled: boolean;
  toggleSound: () => void;
}

const GameControls: React.FC<GameControlsProps> = ({ 
  showControls, 
  setShowControls, 
  handleButtonMove,
  soundEnabled,
  toggleSound
}) => {
  return (
    <>
      {/* Sound toggle */}
      <div className="absolute top-2 right-2 z-10">
        <Button 
          variant="outline" 
          size="icon"
          className="bg-black/40 border-melanie-purple/30 hover:bg-melanie-purple/30 h-8 w-8"
          onClick={toggleSound}
        >
          {soundEnabled ? 
            <Volume2 className="h-4 w-4 text-white" /> : 
            <VolumeX className="h-4 w-4 text-white" />
          }
        </Button>
      </div>
      
      {/* Controls */}
      <div className="mt-4">
        <button 
          className="text-white text-sm mb-2 hover:text-melanie-purple"
          onClick={() => setShowControls(!showControls)}
        >
          {showControls ? "Ocultar controles" : "Mostrar controles"}
        </button>
        
        {showControls && (
          <div className="flex flex-col items-center gap-2">
            <div className="flex justify-center">
              <Button 
                variant="outline" 
                size="icon"
                className="bg-black/40 border-melanie-purple/30 hover:bg-melanie-purple/30"
                onClick={() => handleButtonMove('up')}
              >
                <ArrowUp className="h-4 w-4 text-white" />
              </Button>
            </div>
            <div className="flex justify-center gap-2">
              <Button 
                variant="outline" 
                size="icon"
                className="bg-black/40 border-melanie-purple/30 hover:bg-melanie-purple/30"
                onClick={() => handleButtonMove('left')}
              >
                <ArrowLeft className="h-4 w-4 text-white" />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                className="bg-black/40 border-melanie-purple/30 hover:bg-melanie-purple/30"
                onClick={() => handleButtonMove('down')}
              >
                <ArrowDown className="h-4 w-4 text-white" />
              </Button>
              <Button 
                variant="outline" 
                size="icon"
                className="bg-black/40 border-melanie-purple/30 hover:bg-melanie-purple/30"
                onClick={() => handleButtonMove('right')}
              >
                <ArrowRight className="h-4 w-4 text-white" />
              </Button>
            </div>
            <p className="text-xs text-gray-400 mt-1">También puedes usar las teclas de dirección</p>
          </div>
        )}
      </div>
    </>
  );
};

export default GameControls;
