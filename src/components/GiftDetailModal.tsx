import React, { useState, useEffect } from 'react';
import { Gift } from '../data/giftsData';
import { GiftVisual } from './GiftVisual';
import { soundEngine } from '../utils/audio';
import { Sparkles, Heart, CheckCircle2, ChevronRight, X, Home, Activity, Compass, Feather, Zap, HeartPulse, Moon, Thermometer, Award, Utensils, Wine, ShieldCheck, HelpCircle, AlertCircle, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';

/**
 * Detail cards sit on a 6-column track, 3 per row (span 2 each). When the last
 * row is short, its cards widen to fill it so the grid never shows a hole:
 * 2 leftovers span 3 each, a lone leftover spans the full width.
 */
const getCardSpan = (idx: number, total: number): string => {
  const remainder = total % 3;
  if (remainder === 0 || idx < total - remainder) return 'md:col-span-2';
  return remainder === 2 ? 'md:col-span-3' : 'md:col-span-6';
};

interface Props {
  gift: Gift;
  onClose: () => void;
  onSolved: (solvedRank: number) => void;
  isUnlocked: boolean;
  isCompleted: boolean;
  isLastGift: boolean;
  focusedModalIndex: number;
}

export const GiftDetailModal: React.FC<Props> = ({
  gift,
  onClose,
  onSolved,
  isCompleted: initialCompleted,
  isLastGift,
  focusedModalIndex
}) => {
  const [isRevealed, setIsRevealed] = useState<boolean>(initialCompleted);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showError, setShowError] = useState<boolean>(false);

  useEffect(() => {
    setIsRevealed(initialCompleted);
    setSelectedOption(null);
    setShowError(false);
  }, [gift, initialCompleted]);

  const handleOptionSelect = (optionIdx: number) => {
    soundEngine.playSelect();
    setSelectedOption(optionIdx);

    if (optionIdx === gift.challenge.correctOptionIndex) {
      setShowError(false);
      soundEngine.playFanfare();
      setIsRevealed(true);

      // Unlock the next level right away; Jess still has to pick it from the map.
      onSolved(gift.importanceRank);

      if (gift.importanceRank === 3) {
        confetti({
          particleCount: 180,
          spread: 110,
          origin: { y: 0.6 }
        });
      }
    } else {
      setShowError(true);
      soundEngine.playFocus();
    }
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Activity': return <Activity className="w-6 h-6 text-emerald-400" />;
      case 'Compass': return <Compass className="w-6 h-6 text-emerald-400" />;
      case 'Feather': return <Feather className="w-6 h-6 text-emerald-400" />;
      case 'Zap': return <Zap className="w-6 h-6 text-amber-400" />;
      case 'HeartPulse': return <HeartPulse className="w-6 h-6 text-rose-400" />;
      case 'Moon': return <Moon className="w-6 h-6 text-indigo-400" />;
      case 'Thermometer': return <Thermometer className="w-6 h-6 text-amber-400" />;
      case 'Award': return <Award className="w-6 h-6 text-amber-300" />;
      case 'Utensils': return <Utensils className="w-6 h-6 text-rose-400" />;
      case 'Wine': return <Wine className="w-6 h-6 text-purple-400" />;
      case 'Flame': return <Flame className="w-6 h-6 text-amber-400" />;
      case 'Heart': return <Heart className="w-6 h-6 text-rose-400 fill-rose-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-6 h-6 text-blue-400" />;
      default: return <Sparkles className="w-6 h-6 text-amber-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/92 backdrop-blur-2xl animate-fade-in">
      {/* Modal Container - FULL SCREEN 100% UTILIZATION, NO SCROLLBAR */}
      <div 
        className="relative w-full max-w-7xl h-[94vh] overflow-hidden bg-slate-900/95 border-2 rounded-3xl p-6 md:p-8 shadow-[0_0_90px_rgba(0,0,0,0.95)] text-slate-100 flex flex-col justify-between"
        style={{ borderColor: gift.accentColor }}
      >
        {/* Top Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-3">
            <span
              className="tv-text-base font-bold uppercase tracking-widest px-4 py-1.5 rounded-full border"
              style={{ backgroundColor: `${gift.accentColor}20`, borderColor: gift.accentColor, color: gift.accentColor }}
            >
              {gift.stageName} • {gift.category}
            </span>
            <span className="text-slate-400 tv-text-base font-medium">
              Regalo {gift.importanceRank} de 3
            </span>
          </div>

          <button
            onClick={() => {
              soundEngine.playSelect();
              onClose();
            }}
            className={`p-3 rounded-full bg-slate-800 hover:bg-slate-700 transition-all cursor-pointer ${
              focusedModalIndex === 2 ? 'ring-4 ring-amber-400 scale-110' : ''
            }`}
            title="Cerrar modal (ESC)"
          >
            <X className="w-8 h-8 text-slate-300" />
          </button>
        </div>

        {/* Modal Main Content */}
        {!isRevealed ? (
          /* STAGE 1: Interactive Riddle & Challenge */
          <div className="flex flex-col items-center justify-center text-center my-auto py-6 px-4 space-y-5">
            <div 
              className="w-16 h-16 rounded-full flex items-center justify-center border-2 animate-bounce"
              style={{ backgroundColor: `${gift.accentColor}25`, borderColor: gift.accentColor }}
            >
              <HelpCircle className="w-8 h-8 text-amber-300" />
            </div>

            <h2 className="text-2xl md:text-3xl font-black text-amber-300 tracking-wide max-w-3xl leading-tight">
              Reto de Salud #{gift.importanceRank}: {gift.mysteryTitle}
            </h2>

            <p className="text-slate-300 text-base md:text-lg font-medium max-w-2xl">
              "{gift.shortRiddle}"
            </p>

            {/* Interactive Question Card */}
            <div className="max-w-3xl w-full bg-slate-950/80 border border-slate-800 p-5 md:p-6 rounded-2xl shadow-inner space-y-4 text-left">
              <h3 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>Pregunta del Reto: {gift.challenge.question}</span>
              </h3>

              {/* Options list */}
              <div className="space-y-2.5">
                {gift.challenge.options.map((optionText, optIdx) => (
                  <button
                    key={optIdx}
                    onClick={() => handleOptionSelect(optIdx)}
                    className={`w-full p-3.5 md:p-4 rounded-xl border-2 font-bold text-base md:text-lg text-left transition-all flex items-center justify-between cursor-pointer ${
                      selectedOption === optIdx
                        ? optIdx === gift.challenge.correctOptionIndex
                          ? 'bg-emerald-950/90 border-emerald-400 text-emerald-200'
                          : 'bg-rose-950/90 border-rose-500 text-rose-200'
                        : 'bg-slate-900/90 border-slate-700 text-slate-200 hover:border-amber-400 hover:bg-slate-800'
                    }`}
                  >
                    <span>{optIdx + 1}. {optionText}</span>
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  </button>
                ))}
              </div>

              {showError && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-950/60 border border-rose-500/50 text-rose-300 text-xs animate-pulse">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span>Casi... ¡Inténtalo de nuevo! {gift.challenge.hint}</span>
                </div>
              )}
            </div>

            <p className="text-slate-400 text-xs">
              Selecciona la respuesta correcta con el mando a distancia para desbloquear el regalo.
            </p>
          </div>
        ) : (
          /* STAGE 2: Full Revealed Content - PERFECTLY FILLED SCREEN, ZERO EMPTY SPACE, NO SCROLLBAR */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 my-auto items-stretch h-[calc(100%-75px)]">
            {/* Left Column (5 cols): Visual Graphic, Title & Husband's Note */}
            <div className="lg:col-span-5 flex flex-col justify-between bg-slate-950/80 border border-slate-800 rounded-2xl p-5 relative overflow-hidden h-full">
              <div className="relative z-10 space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 tv-text-sm font-bold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>¡RETO RESUELTO! REGALO DESBLOQUEADO</span>
                </div>
                <h3 className="tv-text-3xl font-extrabold text-white">
                  {gift.title}
                </h3>
                <p className="tv-text-base text-slate-400 font-medium">
                  {gift.subtitle}
                </p>
              </div>

              {/* The story, kept on this side so the data grid owns the right column.
                  Gifts with a real photo skip it: the photo needs that height more,
                  and their story only repeats what the detail cards already say. */}
              {!gift.photoSrc && (
                <div className="relative z-10 mt-3 space-y-1">
                  <h4 className="tv-text-base font-black text-amber-300 flex items-center gap-2 uppercase tracking-wider">
                    <Sparkles className="w-5 h-5 text-amber-400" />
                    <span>La Ciencia Detrás del Regalo</span>
                  </h4>
                  <p className="tv-text-base text-slate-300">
                    {gift.intriguingStory}
                  </p>
                </div>
              )}

              {/* What this gift actually changes for her */}
              <div
                className="relative z-10 mt-3 rounded-xl border-l-4 bg-slate-900/70 px-4 py-3 space-y-1"
                style={{ borderColor: gift.accentColor }}
              >
                <div className="tv-text-sm font-black uppercase tracking-widest" style={{ color: gift.accentColor }}>
                  Impacto en tu salud
                </div>
                <p className="tv-text-base text-slate-100 font-semibold">
                  {gift.healthImpact}
                </p>
              </div>

              {/* Real photo when we have one, else the SVG illustration */}
              <div className="grow my-3 flex flex-col items-center justify-center gap-2 relative min-h-0">
                <div
                  className="absolute inset-0 rounded-full blur-2xl opacity-20 animate-pulse"
                  style={{ backgroundColor: gift.accentColor }}
                />
                {gift.photoSrc ? (
                  <>
                    {gift.photoLabel && (
                      <p
                        className="relative z-10 tv-text-lg font-black text-center tracking-wide"
                        style={{ color: gift.accentColor }}
                      >
                        {gift.photoLabel}
                      </p>
                    )}
                    <img
                      src={gift.photoSrc}
                      alt={gift.title}
                      className={`relative z-10 flex-1 min-h-0 w-full shadow-[0_20px_60px_rgba(0,0,0,0.85)] ${
                        gift.photoFit === 'contain'
                          ? 'object-contain rounded-lg'
                          : 'object-cover rounded-2xl border-2'
                      }`}
                      style={gift.photoFit === 'contain' ? undefined : { borderColor: `${gift.accentColor}88` }}
                    />
                  </>
                ) : (
                  <GiftVisual visualType={gift.visualType} accentColor={gift.accentColor} className="max-h-[34vh] relative z-10" />
                )}
              </div>

              {/* Husband's Note Highlight */}
              <div className="relative z-10 bg-slate-900/90 border border-amber-500/30 p-5 rounded-xl flex items-start gap-3">
                <Heart className="w-6 h-6 shrink-0 mt-1 fill-amber-400 text-amber-400" />
                <p className="text-slate-200 italic tv-text-lg">
                  "{gift.husbandNote}"
                </p>
              </div>
            </div>

            {/* Right Column (7 cols): PERFECTLY BALANCED STACK FILLING THE HEIGHT */}
            <div className="lg:col-span-7 flex flex-col justify-between gap-3 h-full overflow-hidden">
              {/* SECTION 1: Health Detail Grid — 3 per row on a 6-column track.
                  A short last row widens its cards instead of leaving a hole.
                  Nothing is clamped here: the copy in giftsData is length-capped
                  instead, so Jess always reads the full sentence. */}
              <div className="space-y-2">
                <div className="flex items-baseline justify-between gap-4">
                  <h4 className="tv-text-lg font-black text-white flex items-center gap-2 uppercase tracking-wider">
                    <Activity className="w-6 h-6 text-emerald-400" />
                    <span>{gift.factsHeading}</span>
                  </h4>
                  {gift.sourceNote && (
                    <span className="text-slate-400 tv-text-xs whitespace-nowrap">{gift.sourceNote}</span>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-6 gap-2.5">
                  {gift.scientificFacts.map((fact, idx) => (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2 flex flex-col ${getCardSpan(idx, gift.scientificFacts.length)}`}
                      style={{ borderColor: `${gift.accentColor}55` }}
                    >
                      <div className="flex items-center justify-between gap-2">
                        {getIcon(fact.iconName)}
                        {fact.stat && (
                          <span
                            className="tv-text-sm font-black px-2.5 py-0.5 rounded whitespace-nowrap border"
                            style={{
                              backgroundColor: `${gift.accentColor}22`,
                              borderColor: `${gift.accentColor}88`,
                              color: gift.accentColor
                            }}
                          >
                            {fact.stat}
                          </span>
                        )}
                      </div>
                      {fact.pillar && (
                        <div className="tv-text-xs font-black uppercase tracking-tight text-amber-400 whitespace-nowrap">
                          {fact.pillar}
                        </div>
                      )}
                      <h5 className="tv-text-lg font-black text-white">{fact.title}</h5>
                      <p className="text-slate-300 tv-text-sm">{fact.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 3: DATO BRUTAL CARD — grows to absorb any leftover
                  height so the column fills the screen without a scrollbar */}
              <div
                className="grow flex flex-col justify-center p-5 rounded-xl border-2 space-y-2 transition-all shadow-lg animate-pulse-glow"
                style={{
                  backgroundColor: `${gift.accentColor}12`,
                  borderColor: gift.accentColor
                }}
              >
                <div className="flex items-center justify-between gap-3">
                  <h5 className="tv-text-lg font-black flex items-center gap-2" style={{ color: gift.accentColor }}>
                    {getIcon(gift.brutalFact.iconName)}
                    <span>{gift.brutalFact.title}</span>
                  </h5>
                  <span className="tv-text-base font-black px-3 py-1 rounded-full bg-amber-400 text-slate-950 shadow whitespace-nowrap">
                    {gift.brutalFact.highlight}
                  </span>
                </div>
                <p className="text-slate-200 tv-text-base font-medium">
                  {gift.brutalFact.description}
                </p>
              </div>

              {/* Action Bar: single exit back to the map, never a jump to the next gift */}
              <div className={`flex items-center pt-3 border-t border-slate-800 gap-5 ${isLastGift ? 'justify-between' : 'justify-end'}`}>
                {isLastGift && (
                  <p className="text-slate-400 tv-text-base max-w-md">
                    ¡Ya has descubierto los 3 regalos! Feliz cumpleaños, mi amor. ❤️
                  </p>
                )}

                <button
                  onClick={() => {
                    soundEngine.playSelect();
                    onClose();
                  }}
                  className={`px-8 py-4 rounded-xl font-black tv-text-xl shadow-xl transition-all flex items-center gap-3 cursor-pointer whitespace-nowrap ${
                    focusedModalIndex === 1 ? 'scale-105 ring-8 ring-amber-300 shadow-[0_0_40px_rgba(245,158,11,0.9)]' : ''
                  }`}
                  style={{
                    backgroundColor: gift.accentColor,
                    color: '#090a0f'
                  }}
                >
                  {isLastGift ? (
                    <Heart className="w-7 h-7 fill-current" />
                  ) : (
                    <Home className="w-7 h-7 stroke-[3]" />
                  )}
                  <span>{isLastGift ? '¡DISFRUTÉMOSLO!' : 'SIGUIENTE PARIDI'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
