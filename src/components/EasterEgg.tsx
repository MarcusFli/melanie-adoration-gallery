
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

  // Return null only if hunt is not active
  if (!isHuntActive) return null;

  const isCollected = collectedEggs.includes(id);
  
  // Use the pattern parameter to determine which Easter egg image to display
  const eggImages = [
    "/lovable-uploads/86725216-6cf5-4a29-9ae8-7cacbd2fe856.png", // Striped colorful egg
    "/lovable-uploads/49df229f-042a-4565-9faa-756a2079a202.png", // Leaf pattern egg
    "/lovable-uploads/9d2148e1-f049-41f0-a1b6-55f8c108dc5e.png", // Flower pattern egg (orange/pink)
    "/lovable-uploads/ce7b8437-8251-4e94-9175-a0004a70f4c7.png", // Blue flower pattern egg
    "/lovable-uploads/24684d37-fca4-4116-ab45-376044d9cbd3.png"  // Striped/dotted pattern egg
  ];
  
  const patternIndex = pattern % eggImages.length;
  const eggImage = eggImages[patternIndex];
  
  return (
    <div 
      className={cn(
        "absolute cursor-pointer transition-all duration-300 z-50",
        isCollected ? "opacity-50 pointer-events-none" : "opacity-100 hover:scale-125",
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
          "w-12 h-16 bg-contain bg-no-repeat bg-center",
          isCollected ? "opacity-60" : "opacity-100"
        )} 
        style={{
          backgroundImage: `url('${eggImage}')`,
          filter: isCollected ? 'grayscale(1)' : 'none'
        }}
      />
    </div>
  );
};

export default EasterEgg;
