
import React, { createContext, useContext, useState, useEffect } from 'react';

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

export const TOTAL_EGGS = 5;
const HUNT_TIME = 300; // 5 minutes in seconds

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
      resetHunt();
    }
  }, [timeRemaining]);

  useEffect(() => {
    if (collectedEggs.length === TOTAL_EGGS) {
      setHasCompletedHunt(true);
      setIsHuntActive(false);
      setTimeRemaining(null);
    }
  }, [collectedEggs]);

  const startHunt = () => {
    setCollectedEggs([]);
    setTimeRemaining(HUNT_TIME);
    setIsHuntActive(true);
    setHasCompletedHunt(false);
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
