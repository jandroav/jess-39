import React from 'react';
import { Home, Ruler, Thermometer, HeartPulse, Activity } from 'lucide-react';
import { soundEngine } from '../utils/audio';
import ouraRingBlack from '../assets/oura-ring-black.jpg';

interface Props {
  onClose: () => void;
}

/**
 * Shown right after the Oura gift is revealed, while Jess is handed the
 * physical sizing kit: it explains why the ring itself is not here yet.
 * Full-screen like FinalScreen, and like every TV view it must fit in one
 * screen without scrolling.
 */
export const SizingNote: React.FC<Props> = ({ onClose }) => {
  const datos = [
    { icon: <Activity className="w-6 h-6 text-amber-400" />, stat: '250 / seg', text: 'Lecturas de tus arterias cada segundo.' },
    { icon: <Thermometer className="w-6 h-6 text-amber-400" />, stat: '±0,05 °C', text: 'Detecta fiebre 72 h antes del síntoma.' },
    { icon: <HeartPulse className="w-6 h-6 text-amber-400" />, stat: '99 % vs ECG', text: 'Precisión de electrocardiograma de hospital.' }
  ];

  const pasos = [
    { num: '01', titulo: 'AHORA', texto: 'Ya tienes el kit de tallaje en tus manos.' },
    { num: '02', titulo: '24 HORAS', texto: 'Lo llevas un día y una noche completos.' },
    { num: '03', titulo: 'TU MEDIDA', texto: 'Confirmamos la talla exacta de tu dedo.' },
    { num: '04', titulo: 'EN CAMINO', texto: 'Se fabrica y llega tu Oura Ring 5 negro.' }
  ];

  return (
    <div className="flex flex-col items-center justify-center my-auto relative z-10 w-full max-w-7xl mx-auto px-6 animate-fade-in">
      <div className="inline-flex items-center gap-3 px-7 py-2 rounded-full bg-amber-500/20 border-2 border-amber-500/60 text-amber-300 tv-text-lg font-bold mb-4 shadow-[0_0_30px_rgba(245,158,11,0.5)]">
        <Ruler className="w-7 h-7 text-amber-400" />
        <span>OURA RING 5 · BLACK EDITION</span>
      </div>

      <h1 className="tv-text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-rose-300 tracking-tight text-center mb-2">
        Tu anillo no está hoy aquí
      </h1>

      <p className="tv-text-xl font-serif italic text-slate-300 text-center mb-6">
        Y es exactamente por eso que merece la pena esperarlo.
      </p>

      {/* Foto del anillo + la precisión que justifica el tallaje */}
      <div className="flex items-stretch gap-8 w-full mb-6">
        <img
          src={ouraRingBlack}
          alt="Oura Ring 5 en negro"
          className="h-[28vh] w-auto object-cover rounded-2xl border-2 border-amber-400/60 shadow-[0_0_40px_rgba(245,158,11,0.3)]"
        />

        <div className="flex-1 flex flex-col justify-center gap-2.5">
          {datos.map((d, idx) => (
            <div key={idx} className="flex items-center gap-4 border-b border-slate-800 pb-2.5 last:border-0">
              {d.icon}
              <span className="tv-text-xl font-black text-amber-300 min-w-[9rem]">{d.stat}</span>
              <span className="tv-text-base text-slate-300">{d.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full space-y-3 mb-6">
        <p className="tv-text-lg text-slate-200 leading-snug">
          El Oura Ring no viene en tallas aproximadas. Es una joya de titanio que vas a llevar día y
          noche, así que se elige <strong className="text-white">tu medida exacta</strong> para que se
          sienta como si no llevaras nada puesto.
        </p>
        <p className="tv-text-lg text-slate-200 leading-snug">
          Por eso Oura empieza siempre por ese <strong className="text-white">kit de tallaje</strong> que
          acabas de recibir: ocho anillos de prueba para encontrar tu talla perfecta. Se lleva un día
          entero, con su noche, y con esa medida se prepara el tuyo.
        </p>
        <p className="tv-text-xl font-bold text-amber-200 border-l-4 border-amber-400 pl-5">
          Así que hoy no te regalo un anillo. Te regalo el principio de uno hecho a tu medida.
        </p>
      </div>

      {/* Los cuatro pasos hasta que llegue */}
      <div className="grid grid-cols-4 gap-6 w-full mb-6">
        {pasos.map((p) => (
          <div key={p.num}>
            <div className="tv-text-2xl font-black text-slate-700 leading-none">{p.num}</div>
            <h3 className="tv-text-base font-black text-amber-400 uppercase tracking-wide mt-1">{p.titulo}</h3>
            <p className="tv-text-base text-slate-300 leading-snug">{p.texto}</p>
          </div>
        ))}
      </div>

      <button
        onClick={() => {
          soundEngine.playSelect();
          onClose();
        }}
        className="px-12 py-4 tv-text-xl font-black rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-rose-400 text-slate-950 shadow-[0_0_50px_rgba(245,158,11,0.7)] hover:scale-105 transition-all flex items-center gap-3 cursor-pointer tv-focused"
      >
        <Home className="w-7 h-7 stroke-[3]" />
        <span>SIGUIENTE PARIDI</span>
      </button>
    </div>
  );
};
