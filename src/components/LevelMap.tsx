import React from 'react';
import { Gift } from '../data/giftsData';
import { Lock, Sparkles, CheckCircle2, ChevronRight, Footprints, Utensils, Heart, HelpCircle } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface Props {
  gifts: Gift[];
  unlockedLevel: number;
  completedLevels: number[];
  focusedLevelId: number; // 1 to 3
  onSelectLevel: (levelId: number) => void;
}

export const LevelMap: React.FC<Props> = ({
  gifts,
  unlockedLevel,
  completedLevels,
  focusedLevelId,
  onSelectLevel
}) => {
  const getGiftIcon = (visualType: string, accentColor: string, isCompleted: boolean) => {
    if (!isCompleted) {
      return <HelpCircle className="w-10 h-10 text-amber-300 animate-pulse" />;
    }

    switch (visualType) {
      case 'footwear':
        return <Footprints className="w-10 h-10" style={{ color: accentColor }} />;
      case 'ring':
        return <Sparkles className="w-10 h-10" style={{ color: accentColor }} />;
      case 'michelin':
        return <Utensils className="w-10 h-10" style={{ color: accentColor }} />;
      default:
        return <Sparkles className="w-10 h-10 text-amber-400" />;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-8 flex flex-col justify-between min-h-[85vh] relative z-10">
      {/* Hero Welcome Banner */}
      <div className="text-center space-y-4 mb-8">
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-slate-900/90 border border-amber-500/40 text-amber-300 font-bold text-lg shadow-xl">
          <Heart className="w-5 h-5 fill-amber-400 text-amber-400" />
          <span>FELIZ CUMPLEAÑOS • Treintaytodos • 20 DE AGOSTO DE 2026</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-rose-300 tracking-tight leading-tight">
          El Viaje de Jess: Misión Salud, Bienestar & Experiencias
        </h1>

        <p className="text-slate-300 text-xl md:text-2xl font-medium max-w-3xl mx-auto">
          Resuelve los retos con el mando a distancia para descubrir los regalos ocultos de menor a mayor sorpresa.
        </p>
      </div>

      {/* 3 Level Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-auto">
        {gifts.map((gift) => {
          const isUnlocked = gift.importanceRank <= unlockedLevel;
          const isCompleted = completedLevels.includes(gift.importanceRank);
          const isFocused = focusedLevelId === gift.importanceRank;

          return (
            <div
              key={gift.id}
              onClick={() => {
                if (isUnlocked) {
                  soundEngine.playSelect();
                  onSelectLevel(gift.importanceRank);
                }
              }}
              className={`relative group rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between cursor-pointer min-h-[380px] border-2 shadow-[0_15px_35px_rgba(0,0,0,0.7)] ${
                isUnlocked
                  ? 'bg-slate-900/90 backdrop-blur-md opacity-100'
                  : 'bg-slate-950/60 opacity-60 grayscale border-slate-800'
              } ${
                isFocused
                  ? 'scale-105 ring-8 ring-amber-300 shadow-[0_0_50px_rgba(245,158,11,0.8)] z-30'
                  : ''
              }`}
              style={{
                borderColor: isUnlocked ? gift.accentColor : '#1e293b'
              }}
            >
              {/* Level Top Tag */}
              <div className="flex items-center justify-between">
                <span 
                  className="text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full border"
                  style={{
                    backgroundColor: isUnlocked ? `${gift.accentColor}20` : '#0f172a',
                    borderColor: isUnlocked ? gift.accentColor : '#334155',
                    color: isUnlocked ? gift.accentColor : '#94a3b8'
                  }}
                >
                  {gift.stageName}
                </span>

                {isCompleted ? (
                  <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/40">
                    <CheckCircle2 className="w-3.5 h-3.5" /> REVELADO
                  </span>
                ) : isUnlocked ? (
                  <span className="flex items-center gap-1 text-xs font-bold text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-500/40 animate-pulse">
                    <Sparkles className="w-3.5 h-3.5" /> RETO DISPONIBLE
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-xs font-bold text-slate-400 bg-slate-900 px-2.5 py-1 rounded-full border border-slate-700">
                    <Lock className="w-3.5 h-3.5" /> BLOQUEADO
                  </span>
                )}
              </div>

              {/* Icon & Gift Header */}
              <div className="my-6 space-y-3">
                <div 
                  className="w-20 h-20 rounded-2xl flex items-center justify-center border-2 transition-transform group-hover:scale-110"
                  style={{
                    backgroundColor: isUnlocked ? `${gift.accentColor}25` : '#0f172a',
                    borderColor: isUnlocked ? gift.accentColor : '#334155'
                  }}
                >
                  {isUnlocked ? getGiftIcon(gift.visualType, gift.accentColor, isCompleted) : <Lock className="w-10 h-10 text-slate-500" />}
                </div>

                <div>
                  <h3 className="text-2xl font-black text-white leading-tight">
                    {isCompleted ? gift.title : isUnlocked ? gift.mysteryTitle : '??? Nivel Encriptado'}
                  </h3>
                  <p className="text-sm font-medium text-slate-400 mt-1 line-clamp-2">
                    {isCompleted ? gift.subtitle : isUnlocked ? gift.mysterySubtitle : 'Completa el nivel anterior para desbloquear este reto de salud.'}
                  </p>
                </div>
              </div>

              {/* Card Footer Button */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">
                  {gift.importanceRank === 3 ? '⭐ REGALO SUPREMO' : `Nivel ${gift.importanceRank}`}
                </span>

                {isUnlocked ? (
                  <div 
                    className="flex items-center gap-1 text-sm font-bold px-4 py-2 rounded-xl"
                    style={{ backgroundColor: gift.accentColor, color: '#090a0f' }}
                  >
                    <span>{isCompleted ? 'Ver Regalo' : 'Resolver Reto'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                ) : (
                  <span className="text-xs text-slate-500 font-semibold">Bloqueado</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
