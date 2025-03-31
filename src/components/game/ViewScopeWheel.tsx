
import React, { useState, useRef, useEffect } from 'react';
import { Eye, RotateCcw, ZoomIn } from 'lucide-react';

interface ViewScopeWheelProps {
  onRotate: (direction: 'left' | 'right' | 'up' | 'down') => void;
}

const ViewScopeWheel: React.FC<ViewScopeWheelProps> = ({ onRotate }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [activeDirection, setActiveDirection] = useState<string | null>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const centerX = useRef<number>(0);
  const centerY = useRef<number>(0);
  
  // Initialize center point on mount
  useEffect(() => {
    if (wheelRef.current) {
      const rect = wheelRef.current.getBoundingClientRect();
      centerX.current = rect.width / 2;
      centerY.current = rect.height / 2;
    }
  }, []);
  
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleMouseMove(e);
  };
  
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    handleTouchMove(e);
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
    setActiveDirection(null);
  };
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !wheelRef.current) return;
    
    const rect = wheelRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    determineDirection(x, y);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !wheelRef.current) return;
    
    const touch = e.touches[0];
    const rect = wheelRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    
    determineDirection(x, y);
  };
  
  const determineDirection = (x: number, y: number) => {
    // Calculate direction based on center point and current mouse/touch position
    const deltaX = x - centerX.current;
    const deltaY = y - centerY.current;
    
    // Determine which quadrant the cursor is in
    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);
    
    let direction: 'up' | 'down' | 'left' | 'right' | null = null;
    
    // Only trigger movement if a minimum distance is reached
    const minDistance = 10;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    if (distance < minDistance) {
      setActiveDirection(null);
      return;
    }
    
    if (absX > absY) {
      // Horizontal movement dominates
      direction = deltaX > 0 ? 'right' : 'left';
    } else {
      // Vertical movement dominates
      direction = deltaY > 0 ? 'down' : 'up';
    }
    
    if (direction !== activeDirection) {
      setActiveDirection(direction);
      onRotate(direction);
    }
  };
  
  return (
    <div className="absolute bottom-6 right-6 z-10">
      <div className="bg-black/70 backdrop-blur-sm rounded-full p-2 border border-melanie-purple/50 shadow-lg shadow-melanie-purple/20">
        <div 
          ref={wheelRef}
          className="relative flex items-center justify-center w-32 h-32 cursor-grab active:cursor-grabbing"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleMouseUp}
        >
          {/* Center icon with glowing effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-melanie-purple/20 rounded-full blur-md animate-pulse"></div>
              <Eye className="w-9 h-9 text-melanie-purple" />
            </div>
          </div>
          
          {/* Direction indicators */}
          <div className={`absolute top-4 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full flex items-center justify-center ${activeDirection === 'up' ? 'bg-melanie-purple scale-125' : 'bg-black/50'} transition-all duration-200`}>
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          
          <div className={`absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center ${activeDirection === 'right' ? 'bg-melanie-purple scale-125' : 'bg-black/50'} transition-all duration-200`}>
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          
          <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full flex items-center justify-center ${activeDirection === 'down' ? 'bg-melanie-purple scale-125' : 'bg-black/50'} transition-all duration-200`}>
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          
          <div className={`absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center ${activeDirection === 'left' ? 'bg-melanie-purple scale-125' : 'bg-black/50'} transition-all duration-200`}>
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] rounded-full border border-melanie-purple/30 pointer-events-none"></div>
          
          {/* Interactive circular track */}
          <div className={`absolute inset-0 w-full h-full rounded-full border-2 border-dashed border-melanie-purple/40 animate-spin-slow pointer-events-none ${isDragging ? 'border-melanie-purple animate-spin-fast' : ''}`} style={{ animationDuration: isDragging ? '15s' : '30s' }}></div>
          <div className={`absolute inset-2 w-[calc(100%-1rem)] h-[calc(100%-1rem)] rounded-full border border-dashed border-melanie-purple/20 animate-spin-slow pointer-events-none ${isDragging ? 'border-melanie-purple/60 animate-spin-fast' : ''}`} style={{ animationDuration: isDragging ? '10s' : '15s', animationDirection: 'reverse' }}></div>
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
