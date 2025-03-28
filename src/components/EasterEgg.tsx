
import React, { useState } from 'react';
import { useEasterEggs } from '../context/EasterEggContext';
import { cn } from "@/lib/utils";

interface EasterEggProps {
  id: string;
  className?: string;
  pattern?: number;
}

const EasterEgg: React.FC<EasterEggProps> = ({ id, className, pattern = 0 }) => {
  const { collectEgg, collectedEggs, isHuntActive } = useEasterEggs();
  const [isHovering, setIsHovering] = useState(false);

  if (!isHuntActive) return null;

  const isCollected = collectedEggs.includes(id);
  
  // Use the pattern parameter to determine which Easter egg image to display
  const patternIndex = pattern % 5; // 5 patterns in our image
  
  return (
    <div 
      className={cn(
        "absolute cursor-pointer transition-all duration-300 z-50",
        isCollected ? "opacity-50 pointer-events-none" : "hover:scale-125",
        isHovering && !isCollected ? "animate-bounce" : "",
        className
      )}
      onClick={() => collectEgg(id)}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{ 
        pointerEvents: isCollected ? 'none' : 'auto'
      }}
    >
      <div 
        className={cn(
          "w-10 h-12 bg-contain bg-no-repeat bg-center",
          isCollected ? "opacity-60" : "opacity-100"
        )} 
        style={{
          backgroundImage: `url('/lovable-uploads/fef539b8-780c-4b49-86d8-f8c748205325.png')`,
          backgroundPosition: patternIndex === 0 ? 'top left' : 
                              patternIndex === 1 ? 'top right' : 
                              patternIndex === 2 ? 'center left' : 
                              patternIndex === 3 ? 'center right' : 'bottom center',
          backgroundSize: '500%', // Divide the image to show just one egg
          filter: isCollected ? 'grayscale(1)' : 'none'
        }}
      />
    </div>
  );
};

export default EasterEgg;
