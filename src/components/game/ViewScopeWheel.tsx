
import React from 'react';
import { RotateCcw, Eye, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';

interface ViewScopeWheelProps {
  onRotate: (direction: 'left' | 'right' | 'up' | 'down') => void;
}

const ViewScopeWheel: React.FC<ViewScopeWheelProps> = ({ onRotate }) => {
  return (
    <div className="absolute bottom-6 right-6 z-10">
      <div className="bg-black/50 backdrop-blur-sm rounded-full p-2 border border-melanie-purple/30">
        <div className="relative flex items-center justify-center w-28 h-28">
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Eye className="w-8 h-8 text-melanie-purple/70" />
          </div>
          
          {/* Up button */}
          <button 
            className="absolute top-0 left-1/2 -translate-x-1/2 bg-black/30 hover:bg-melanie-purple/40 rounded-full p-1.5 transition-all"
            onClick={() => onRotate('up')}
          >
            <ArrowUp className="w-5 h-5 text-white" />
          </button>
          
          {/* Right button */}
          <button 
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-melanie-purple/40 rounded-full p-1.5 transition-all"
            onClick={() => onRotate('right')}
          >
            <ArrowRight className="w-5 h-5 text-white" />
          </button>
          
          {/* Down button */}
          <button 
            className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-black/30 hover:bg-melanie-purple/40 rounded-full p-1.5 transition-all"
            onClick={() => onRotate('down')}
          >
            <ArrowDown className="w-5 h-5 text-white" />
          </button>
          
          {/* Left button */}
          <button 
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-melanie-purple/40 rounded-full p-1.5 transition-all"
            onClick={() => onRotate('left')}
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          
          {/* Rotating connection lines */}
          <div className="absolute inset-0 w-full h-full rounded-full border-2 border-dashed border-melanie-purple/30 animate-spin-slow pointer-events-none" style={{ animationDuration: '15s' }}></div>
        </div>
        
        <div className="mt-2 text-xs text-center text-white">
          <span className="flex items-center justify-center gap-1 text-melanie-purple">
            <RotateCcw className="w-3 h-3" /> 3D Scope
          </span>
        </div>
      </div>
    </div>
  );
};

export default ViewScopeWheel;
