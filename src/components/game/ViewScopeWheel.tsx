
import React, { useState } from 'react';
import { RotateCcw, Eye, ArrowUp, ArrowDown, ArrowLeft, ArrowRight, ZoomIn } from 'lucide-react';

interface ViewScopeWheelProps {
  onRotate: (direction: 'left' | 'right' | 'up' | 'down') => void;
}

const ViewScopeWheel: React.FC<ViewScopeWheelProps> = ({ onRotate }) => {
  const [activeButton, setActiveButton] = useState<string | null>(null);
  
  const handleButtonPress = (direction: 'left' | 'right' | 'up' | 'down') => {
    setActiveButton(direction);
    onRotate(direction);
    
    // Reset active state after animation
    setTimeout(() => setActiveButton(null), 200);
  };
  
  return (
    <div className="absolute bottom-6 right-6 z-10">
      <div className="bg-black/70 backdrop-blur-sm rounded-full p-2 border border-melanie-purple/50 shadow-lg shadow-melanie-purple/20">
        <div className="relative flex items-center justify-center w-32 h-32">
          {/* Center icon with glowing effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-melanie-purple/20 rounded-full blur-md animate-pulse"></div>
              <Eye className="w-9 h-9 text-melanie-purple" />
            </div>
          </div>
          
          {/* Up button */}
          <button 
            className={`absolute top-1 left-1/2 -translate-x-1/2 ${
              activeButton === 'up' 
                ? 'bg-melanie-purple text-white' 
                : 'bg-black/50 hover:bg-melanie-purple/60'
            } rounded-full p-2 transition-all duration-200 transform hover:scale-110 border border-melanie-purple/30`}
            onClick={() => handleButtonPress('up')}
          >
            <ArrowUp className="w-6 h-6 text-white" />
          </button>
          
          {/* Right button */}
          <button 
            className={`absolute right-1 top-1/2 -translate-y-1/2 ${
              activeButton === 'right' 
                ? 'bg-melanie-purple text-white' 
                : 'bg-black/50 hover:bg-melanie-purple/60'
            } rounded-full p-2 transition-all duration-200 transform hover:scale-110 border border-melanie-purple/30`}
            onClick={() => handleButtonPress('right')}
          >
            <ArrowRight className="w-6 h-6 text-white" />
          </button>
          
          {/* Down button */}
          <button 
            className={`absolute bottom-1 left-1/2 -translate-x-1/2 ${
              activeButton === 'down' 
                ? 'bg-melanie-purple text-white' 
                : 'bg-black/50 hover:bg-melanie-purple/60'
            } rounded-full p-2 transition-all duration-200 transform hover:scale-110 border border-melanie-purple/30`}
            onClick={() => handleButtonPress('down')}
          >
            <ArrowDown className="w-6 h-6 text-white" />
          </button>
          
          {/* Left button */}
          <button 
            className={`absolute left-1 top-1/2 -translate-y-1/2 ${
              activeButton === 'left' 
                ? 'bg-melanie-purple text-white' 
                : 'bg-black/50 hover:bg-melanie-purple/60'
            } rounded-full p-2 transition-all duration-200 transform hover:scale-110 border border-melanie-purple/30`}
            onClick={() => handleButtonPress('left')}
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          
          {/* Decorative elements */}
          <div className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] rounded-full border border-melanie-purple/30 pointer-events-none"></div>
          
          {/* Rotating connection lines */}
          <div className="absolute inset-0 w-full h-full rounded-full border-2 border-dashed border-melanie-purple/40 animate-spin-slow pointer-events-none" style={{ animationDuration: '30s' }}></div>
          <div className="absolute inset-2 w-[calc(100%-1rem)] h-[calc(100%-1rem)] rounded-full border border-dashed border-melanie-purple/20 animate-spin-slow pointer-events-none" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
        </div>
        
        <div className="mt-2 text-xs text-center text-white">
          <span className="flex items-center justify-center gap-1 text-melanie-purple">
            <ZoomIn className="w-3 h-3" /> <RotateCcw className="w-3 h-3" /> 3D Navigation
          </span>
        </div>
      </div>
    </div>
  );
};

export default ViewScopeWheel;
