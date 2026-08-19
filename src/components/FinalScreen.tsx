import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Crown, Heart, Home } from 'lucide-react';
import { soundEngine } from '../utils/audio';
import cat1 from '../assets/cats/cat-1.jpg';
import cat2 from '../assets/cats/cat-2.jpg';
import cat3 from '../assets/cats/cat-3.jpg';

interface Props {
  onClose: () => void;
}

export const FinalScreen: React.FC<Props> = ({ onClose }) => {
  // One celebratory burst on entry; the finale stays on screen afterwards.
  useEffect(() => {
    confetti({ particleCount: 220, spread: 120, origin: { y: 0.6 } });
  }, []);

  const cats = [cat1, cat2, cat3];

  return (
    <div className="flex flex-col items-center justify-center text-center my-auto relative z-10 px-6 animate-fade-in">
      <div className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-rose-500/20 border-2 border-rose-400/60 text-rose-300 text-2xl font-bold mb-6 shadow-[0_0_30px_rgba(244,63,94,0.5)]">
        <Crown className="w-8 h-8 text-rose-300" />
        <span>MISIÓN COMPLETADA</span>
      </div>

      <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-rose-400 tracking-tighter leading-none mb-6">
        ¡FELIZ CUMPLEAÑOS!
      </h1>

      <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mb-6 font-medium">
        Has descubierto todos los páridis, pero el mejor regalo es tenerte con nosotros.
        Te queremos más de lo que las palabras pueden decir.
      </p>

      <div className="flex items-center justify-center gap-6 mb-6">
        {cats.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Nuestro gato ${idx + 1}`}
            className="h-[28vh] aspect-[3/4] object-cover rounded-3xl border-2 border-amber-400/60 shadow-[0_0_40px_rgba(245,158,11,0.35)]"
          />
        ))}
      </div>

      <p className="text-lg md:text-xl text-amber-200/90 font-bold mb-8 flex items-center gap-2">
        <Heart className="w-6 h-6 fill-rose-400 text-rose-400" />
         🐾
        <Heart className="w-6 h-6 fill-rose-400 text-rose-400" />
      </p>

      <button
        onClick={() => {
          soundEngine.playSelect();
          onClose();
        }}
        className="px-12 py-5 text-2xl font-black rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-rose-400 text-slate-950 shadow-[0_0_50px_rgba(245,158,11,0.7)] hover:scale-105 transition-all flex items-center gap-3 cursor-pointer tv-focused"
      >
        <Home className="w-8 h-8 stroke-[3]" />
        <span>VOLVER AL MAPA</span>
      </button>
    </div>
  );
};
