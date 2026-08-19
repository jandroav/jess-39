import { useState, useEffect, useCallback } from 'react';
import { GIFTS_DATA, Gift } from './data/giftsData';
import { BackgroundParticles } from './components/BackgroundParticles';
import { LevelMap } from './components/LevelMap';
import { GiftDetailModal } from './components/GiftDetailModal';
import { FinalScreen } from './components/FinalScreen';
import { soundEngine } from './utils/audio';
import { Sparkles, Crown, ChevronRight } from 'lucide-react';

export function App() {
  const [currentView, setCurrentView] = useState<'welcome' | 'map' | 'modal' | 'finale'>('welcome');
  const [unlockedLevel, setUnlockedLevel] = useState<number>(1);
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [activeGiftModal, setActiveGiftModal] = useState<Gift | null>(null);

  // Navigation Focus States for TV Remote (D-Pad)
  const [focusedLevelId, setFocusedLevelId] = useState<number>(1); // 1 to 3 for gifts
  const [focusedModalIndex, setFocusedModalIndex] = useState<number>(0); // 0: action, 1: next/close, 2: close x

  const handleOpenGiftModal = (levelId: number) => {
    const gift = GIFTS_DATA.find((g) => g.importanceRank === levelId);
    if (gift && levelId <= unlockedLevel) {
      setActiveGiftModal(gift);
      setFocusedModalIndex(0);
      setCurrentView('modal');
    }
  };

  // Solving a challenge unlocks the next level and pre-focuses it on the map,
  // but never auto-opens it: Jess picks the next gift herself with the D-Pad.
  const handleGiftSolved = (solvedRank: number) => {
    setCompletedLevels((prev) => (prev.includes(solvedRank) ? prev : [...prev, solvedRank]));

    if (solvedRank < 3) {
      const nextLevel = solvedRank + 1;
      setUnlockedLevel((prev) => Math.max(prev, nextLevel));
      setFocusedLevelId(nextLevel);
    } else {
      // Completed all 3 gifts!
      setFocusedLevelId(3);
    }
  };

  const handleReturnHome = () => {
    setActiveGiftModal(null);
    setCurrentView('map');
  };

  // The last gift's "¡DISFRUTÉMOSLO!" button opens the final congrats screen.
  const handleOpenFinale = () => {
    setActiveGiftModal(null);
    setCurrentView('finale');
  };

  // Keyboard / TV Remote D-Pad Navigation Event Listener
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    const key = e.key;

    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(key)) {
      soundEngine.playFocus();
    }

    // WELCOME VIEW CONTROLS
    if (currentView === 'welcome') {
      if (key === 'Enter' || key === ' ' || key === 'ArrowRight' || key === 'ArrowDown') {
        soundEngine.playSelect();
        setCurrentView('map');
      }
      return;
    }

    // MODAL VIEW CONTROLS
    if (currentView === 'modal') {
      if (key === 'Escape' || key === 'Backspace') {
        e.preventDefault();
        soundEngine.playSelect();
        setCurrentView('map');
        setActiveGiftModal(null);
        return;
      }

      if (key === 'ArrowRight' || key === 'ArrowDown') {
        setFocusedModalIndex((prev) => (prev + 1) % 3);
      } else if (key === 'ArrowLeft' || key === 'ArrowUp') {
        setFocusedModalIndex((prev) => (prev - 1 + 3) % 3);
      }
      return;
    }

    // FINALE VIEW CONTROLS
    if (currentView === 'finale') {
      if (key === 'Escape' || key === 'Backspace' || key === 'Enter' || key === ' ') {
        soundEngine.playSelect();
        setCurrentView('map');
      }
      return;
    }

    // MAP VIEW CONTROLS
    if (currentView === 'map') {
      if (key === 'ArrowRight') {
        setFocusedLevelId((prev) => Math.min(prev + 1, 3));
      } else if (key === 'ArrowLeft') {
        setFocusedLevelId((prev) => Math.max(prev - 1, 1));
      } else if (key === 'ArrowDown') {
        setFocusedLevelId((prev) => Math.min(prev + 2, Math.min(3, unlockedLevel)));
      } else if (key === 'ArrowUp') {
        setFocusedLevelId((prev) => Math.max(prev - 2, 1));
      } else if (key === 'Enter' || key === ' ') {
        soundEngine.playSelect();
        if (focusedLevelId <= unlockedLevel) {
          handleOpenGiftModal(focusedLevelId);
        }
      }
    }
  }, [currentView, focusedLevelId, unlockedLevel]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="relative min-h-screen w-full text-slate-100 flex flex-col justify-between tv-safe-zone">
      {/* Dynamic Starfield Particles Canvas */}
      <BackgroundParticles />

      {/* VIEW 1: WELCOME SCREEN */}
      {currentView === 'welcome' && (
        <div className="min-h-screen flex flex-col items-center justify-center text-center my-auto relative z-10 px-6 animate-fade-in">
          <div className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-amber-500/20 border-2 border-amber-500/60 text-amber-300 text-2xl font-bold mb-8 shadow-[0_0_30px_rgba(245,158,11,0.5)]">
            <Crown className="w-8 h-8 text-amber-400" />
            <span>20 DE AGOSTO DE 2026</span>
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-rose-400 tracking-tighter leading-none mb-6">
            JESS treintaytodos
          </h1>

          <p className="text-3xl md:text-4xl font-serif italic text-slate-200 mb-4">
            "La Búsqueda de la Salud, la Energía y las Experiencias Supremas"
          </p>

          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mb-12">
            Prepara el mando la "televisión". Hoy viviremos una aventura interactiva para descubrir tus regalos de cumpleaños paso a paso.
          </p>

          <button
            onClick={() => {
              soundEngine.playSelect();
              setCurrentView('map');
            }}
            className="px-14 py-7 text-3xl font-black rounded-3xl bg-gradient-to-r from-amber-400 via-amber-500 to-rose-400 text-slate-950 shadow-[0_0_60px_rgba(245,158,11,0.8)] hover:scale-105 transition-all flex items-center gap-4 cursor-pointer tv-focused"
          >
            <Sparkles className="w-10 h-10 fill-current" />
            <span>PRESIONA PARA INICIAR LA AVENTURA</span>
            <ChevronRight className="w-10 h-10 stroke-[3]" />
          </button>
        </div>
      )}

      {/* VIEW 2: MAP VIEW */}
      {currentView === 'map' && (
        <LevelMap
          gifts={GIFTS_DATA}
          unlockedLevel={unlockedLevel}
          completedLevels={completedLevels}
          focusedLevelId={focusedLevelId}
          onSelectLevel={handleOpenGiftModal}
        />
      )}

      {/* VIEW 3: GIFT DETAIL MODAL */}
      {currentView === 'modal' && activeGiftModal && (
        <GiftDetailModal
          gift={activeGiftModal}
          onClose={handleReturnHome}
          onSolved={handleGiftSolved}
          onFinale={handleOpenFinale}
          isUnlocked={activeGiftModal.importanceRank <= unlockedLevel}
          isCompleted={completedLevels.includes(activeGiftModal.importanceRank)}
          isLastGift={activeGiftModal.importanceRank === 3}
          focusedModalIndex={focusedModalIndex}
        />
      )}
      {/* VIEW 4: FINAL CONGRATS SCREEN */}
      {currentView === 'finale' && (
        <FinalScreen onClose={handleReturnHome} />
      )}
    </div>
  );
}

export default App;
