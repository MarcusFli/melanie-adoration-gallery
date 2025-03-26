
import React from 'react';
import { useEasterEggs } from '../context/EasterEggContext';
import { Egg } from 'lucide-react';
import { cn } from "@/lib/utils";

interface EasterEggProps {
  id: string;
  className?: string;
}

const EasterEgg: React.FC<EasterEggProps> = ({ id, className }) => {
  const { collectEgg, collectedEggs, isHuntActive } = useEasterEggs();

  if (!isHuntActive) return null;

  const isCollected = collectedEggs.includes(id);

  return (
    <div 
      className={cn(
        "absolute cursor-pointer transition-all duration-300",
        isCollected ? "opacity-50 pointer-events-none" : "hover:scale-125",
        className
      )}
      onClick={() => collectEgg(id)}
    >
      <Egg 
        className={cn(
          "w-6 h-6",
          isCollected ? "text-gray-400" : "text-melanie-purple animate-pulse"
        )} 
      />
    </div>
  );
};

export default EasterEgg;
