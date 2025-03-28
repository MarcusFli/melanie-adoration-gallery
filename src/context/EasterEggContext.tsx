
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "@/components/ui/use-toast";

interface EasterEggContextType {
  collectedEggs: string[];
  totalEggs: number;
  timeRemaining: number | null;
  isHuntActive: boolean;
  hasCompletedHunt: boolean;
  collectEgg: (eggId: string) => void;
  startHunt: () => void;
  resetHunt: () => void;
}

const EasterEggContext = createContext<EasterEggContextType | undefined>(undefined);

export const TOTAL_EGGS = 20; // Updated to 20 eggs
const HUNT_TIME = 600; // 10 minutes in seconds (increased time for more eggs)

export function EasterEggProvider({ children }: { children: React.ReactNode }) {
  const [collectedEggs, setCollectedEggs] = useState<string[]>([]);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);
  const [isHuntActive, setIsHuntActive] = useState(false);
  const [hasCompletedHunt, setHasCompletedHunt] = useState(false);

  useEffect(() => {
    let timer: number;
    if (isHuntActive && timeRemaining !== null && timeRemaining > 0) {
      timer = window.setInterval(() => {
        setTimeRemaining((prev) => (prev !== null && prev > 0 ? prev - 1 : null));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isHuntActive, timeRemaining]);

  useEffect(() => {
    if (timeRemaining === 0) {
      toast({
        title: "¡Tiempo agotado!",
        description: `Has encontrado ${collectedEggs.length} de ${TOTAL_EGGS} huevos.`,
        variant: "destructive"
      });
      resetHunt();
    }
  }, [timeRemaining, collectedEggs.length]);

  useEffect(() => {
    if (collectedEggs.length === TOTAL_EGGS) {
      toast({
        title: "¡Felicidades!",
        description: "Has encontrado todos los huevos. ¡La galería secreta ha sido desbloqueada!",
        variant: "default",
        className: "bg-green-500 text-white"
      });
      setHasCompletedHunt(true);
      setIsHuntActive(false);
      setTimeRemaining(null);
    } else if (collectedEggs.length > 0 && isHuntActive) {
      toast({
        title: "¡Huevo encontrado!",
        description: `${collectedEggs.length} de ${TOTAL_EGGS} huevos encontrados.`,
        variant: "default",
        className: "bg-melanie-purple text-white"
      });
    }
  }, [collectedEggs]);

  const startHunt = () => {
    setCollectedEggs([]);
    setTimeRemaining(HUNT_TIME);
    setIsHuntActive(true);
    setHasCompletedHunt(false);
    toast({
      title: "¡Búsqueda de huevos iniciada!",
      description: `Encuentra ${TOTAL_EGGS} huevos en ${Math.floor(HUNT_TIME / 60)} minutos.`,
      variant: "default",
      className: "bg-melanie-purple text-white"
    });
  };

  const resetHunt = () => {
    setCollectedEggs([]);
    setTimeRemaining(null);
    setIsHuntActive(false);
  };

  const collectEgg = (eggId: string) => {
    if (!collectedEggs.includes(eggId) && isHuntActive) {
      setCollectedEggs((prev) => [...prev, eggId]);
    }
  };

  return (
    <EasterEggContext.Provider
      value={{
        collectedEggs,
        totalEggs: TOTAL_EGGS,
        timeRemaining,
        isHuntActive,
        hasCompletedHunt,
        collectEgg,
        startHunt,
        resetHunt,
      }}
    >
      {children}
    </EasterEggContext.Provider>
  );
}

export function useEasterEggs() {
  const context = useContext(EasterEggContext);
  if (context === undefined) {
    throw new Error('useEasterEggs must be used within an EasterEggProvider');
  }
  return context;
}
