
import React, { useEffect, useState } from 'react';

interface Heart {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  animationDelay: number;
}

const HeartBackground: React.FC = () => {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    // Crear los corazones iniciales
    const createInitialHearts = () => {
      const numberOfHearts = Math.max(15, Math.floor(window.innerWidth / 100));
      const newHearts: Heart[] = [];
      
      for (let i = 0; i < numberOfHearts; i++) {
        newHearts.push({
          id: i,
          x: Math.random() * 100, // Posición X en porcentaje
          y: Math.random() * 100, // Posición Y en porcentaje
          size: Math.random() * 30 + 20, // Tamaño entre 20px y 50px
          opacity: Math.random() * 0.5 + 0.2, // Opacidad entre 0.2 y 0.7
          speed: Math.random() * 40 + 60, // Velocidad de animación entre 60s y 100s
          animationDelay: Math.random() * -30 // Retraso de animación negativo para iniciar en diferentes puntos
        });
      }
      
      setHearts(newHearts);
    };

    createInitialHearts();

    // Actualizar cuando cambie el tamaño de la ventana
    const handleResize = () => {
      createInitialHearts();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-[-1]">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-float-heart"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            opacity: heart.opacity,
            animationDuration: `${heart.speed}s`,
            animationDelay: `${heart.animationDelay}s`
          }}
        >
          <svg 
            width={heart.size} 
            height={heart.size} 
            viewBox="0 0 24 24" 
            className="heart-svg"
          >
            <path
              className="heart-path"
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default HeartBackground;
