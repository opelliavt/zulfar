import React from 'react';

interface Petal {
  id: number;
  left: number;
  animationDuration: number;
  animationDelay: number;
  size: number;
  rotate: number;
  color: string;
}

export const RomanticPetals: React.FC = () => {
  // Pre-generated calm romantic petals
  const petals: Petal[] = [
    { id: 1, left: 8, animationDuration: 14, animationDelay: 0, size: 14, rotate: 20, color: 'bg-rose-200/50' },
    { id: 2, left: 22, animationDuration: 18, animationDelay: 4, size: 18, rotate: -35, color: 'bg-amber-100/60' },
    { id: 3, left: 38, animationDuration: 12, animationDelay: 2, size: 12, rotate: 45, color: 'bg-pink-200/40' },
    { id: 4, left: 52, animationDuration: 16, animationDelay: 7, size: 16, rotate: -15, color: 'bg-rose-100/50' },
    { id: 5, left: 68, animationDuration: 20, animationDelay: 1, size: 20, rotate: 60, color: 'bg-amber-200/40' },
    { id: 6, left: 82, animationDuration: 15, animationDelay: 5, size: 14, rotate: -40, color: 'bg-pink-100/50' },
    { id: 7, left: 93, animationDuration: 17, animationDelay: 3, size: 16, rotate: 25, color: 'bg-rose-200/40' },
    { id: 8, left: 15, animationDuration: 19, animationDelay: 9, size: 15, rotate: -55, color: 'bg-amber-100/50' },
    { id: 9, left: 45, animationDuration: 13, animationDelay: 6, size: 13, rotate: 30, color: 'bg-pink-200/40' },
    { id: 10, left: 75, animationDuration: 22, animationDelay: 11, size: 17, rotate: -20, color: 'bg-rose-100/60' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden" aria-hidden="true">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className={`absolute rounded-full blur-[0.5px] border border-white/20 shadow-sm ${petal.color}`}
          style={{
            left: `${petal.left}%`,
            width: `${petal.size}px`,
            height: `${petal.size * 1.3}px`,
            borderRadius: '50% 0 50% 50%',
            animation: `romanticFall ${petal.animationDuration}s linear infinite`,
            animationDelay: `${petal.animationDelay}s`,
            transform: `rotate(${petal.rotate}deg)`,
          }}
        />
      ))}
    </div>
  );
};
