
import React, { useEffect, useRef } from 'react';

interface LetterProps {
  letter: string;
  signature: string;
}

const Letter: React.FC<LetterProps> = ({ letter, signature }) => {
  const letterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      {
        threshold: 0.1
      }
    );

    if (letterRef.current) {
      observer.observe(letterRef.current);
    }

    return () => {
      if (letterRef.current) {
        observer.unobserve(letterRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={letterRef} 
      className="max-w-3xl mx-auto p-8 glass rounded-xl shadow-xl transition-all duration-1000 opacity-0 translate-y-10"
    >
      <div className="font-allura text-2xl md:text-3xl text-white leading-relaxed">
        {letter.split('\n\n').map((paragraph, index) => (
          <p key={index} className="mb-6">
            {paragraph}
          </p>
        ))}
        <div className="flex justify-end mt-10 items-center">
          <p className="italic text-right">
            {signature} <span className="text-melanie-heart text-3xl">💜</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Letter;
