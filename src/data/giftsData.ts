/**
 * One card in the gift's detail grid.
 * Copy rules for the 10-foot TV layout — the modal never scrolls, so text that
 * does not fit gets clipped, not scrolled:
 *   - `stat`   max ~14 chars: it sits on one line next to the icon.
 *   - `title`  max ~30 chars: wraps to 2 lines at most.
 *   - `description` max ~60 chars: one punchy benefit sentence, 2 lines at most.
 * Keep them short and high-impact instead of truncating them at render time.
 */
export interface ScienceFact {
  pillar?: string; // Short emoji + category label shown above the title
  title: string;
  description: string;
  stat?: string;
  iconName: string;
}

export interface GiftChallenge {
  question: string;
  options: string[];
  correctOptionIndex: number;
  hint: string;
}

export interface BrutalFact {
  title: string;
  highlight: string;
  description: string;
  iconName: string;
}

import ouraRingBlack from '../assets/oura-ring-black.jpg';
import casaMarcialReserva from '../assets/casa-marcial-reserva.png';

export interface Gift {
  id: number;
  stageName: string;
  mysteryTitle: string;
  mysterySubtitle: string;
  category: 'SALUD & ANATOMÍA' | 'TECNOLOGÍA DE SALUD' | 'EXPERIENCIA DE LUJO';
  title: string;
  subtitle: string;
  shortRiddle: string;
  challenge: GiftChallenge;
  intriguingStory: string;
  factsHeading: string; // Impact-tuned heading above the detail grid
  scientificFacts: ScienceFact[]; // 3 cards (one row) or 6 cards (two rows)
  sourceNote?: string; // Optional credibility source shown next to the heading
  brutalFact: BrutalFact; // High impact secret insight
  healthImpact: string;
  husbandNote: string;
  badgeText: string;
  accentColor: string;
  bgGlow: string;
  icon: string;
  importanceRank: number; // 1 to 3
  visualType: 'footwear' | 'ring' | 'michelin';
  photoSrc?: string; // Real photo; replaces the SVG illustration
  photoFit?: 'cover' | 'contain'; // 'contain' for documents that must not be cropped
  photoLabel?: string; // Headline shown above the photo
}

export const GIFTS_DATA: Gift[] = [
  {
    id: 1,
    stageName: 'NIVEL 1',
    mysteryTitle: 'Misión 1: La Raíz del Movimiento',
    mysterySubtitle: 'Reto de Anatomía & Libertad Natural',
    category: 'SALUD & ANATOMÍA',
    title: 'Zapatillas Barefoot',
    subtitle: 'Conexión Biomecánica & Postura Natural',
    shortRiddle: '¿Sabías que el pie humano tiene 26 huesos y +200,000 terminaciones nerviosas para sentir la tierra, pero el calzado rígido los encarcela?',
    challenge: {
      question: '¿Qué estructura biológica posee 26 huesos, 33 articulaciones y +200,000 terminaciones nerviosas para conectar con el suelo?',
      options: [
        'La columna vertebral',
        'La planta del pie (Pies libres)',
        'La articulación de la cadera'
      ],
      correctOptionIndex: 1,
      hint: 'Pista: Es la base biológica sobre la que caminamos cada día...'
    },
    intriguingStory: 'La arquitectura del pie humano es una obra maestra de ingeniería natural para la postura y la columna, debilitada por el calzado convencional.',
    factsHeading: 'Los 6 Pilares de Tu Pisada Natural',
    scientificFacts: [
      {
        pillar: '👣 Propiocepción',
        title: 'Estímulo Propioceptivo',
        description: 'Reconecta 200.000 nervios del pie con tu cerebro.',
        stat: '+200k nervios',
        iconName: 'Activity'
      },
      {
        pillar: '📐 Postura',
        title: 'Cero Desnivel (Zero-Drop)',
        description: 'Alinea talón y puntera: tu lumbar recupera su curva.',
        stat: '0 mm drop',
        iconName: 'Compass'
      },
      {
        pillar: '🦶 Anatomía',
        title: 'Puntera Ancha (Toe Box)',
        description: 'Tus dedos se expanden y el arco gana fuerza real.',
        stat: '100% libertad',
        iconName: 'Feather'
      },
      {
        pillar: '💪 Fuerza',
        title: 'Musculatura Despierta',
        description: 'Los músculos del pie vuelven a sostener tu arco.',
        stat: '+57% fuerza',
        iconName: 'Flame'
      },
      {
        pillar: '⚖️ Equilibrio',
        title: 'Estabilidad en Cada Paso',
        description: 'Más señal del suelo: mejor equilibrio y control.',
        stat: 'Control total',
        iconName: 'ShieldCheck'
      },
      {
        pillar: '🌿 Circulación',
        title: 'Pies Que Respiran',
        description: 'Sin compresión: mejor riego y menos fatiga al día.',
        stat: 'Sin compresión',
        iconName: 'HeartPulse'
      }
    ],
    brutalFact: {
      title: '⚡ DATO BRUTAL DE BIOMECÁNICA',
      highlight: '-40% Impacto Articular',
      description: 'El 80% de los dolores de espalda y rodilla provienen del calzado rígido. Al caminar barefoot, la fascia plantar absorbe el impacto de forma natural y reduce la compresión articular un 40% al instante.',
      iconName: 'Flame'
    },
    healthImpact: 'Alineación postural impecable, fuerza muscular en pies y ligereza natural en cada paso.',
    husbandNote: 'Quiero que camines por la vida con la máxima libertad, ligereza y salud desde las raíces. ¡Disfruta de caminar como la naturaleza diseñó!',
    badgeText: 'Paso 1: Fundamentos de la Salud',
    accentColor: '#10b981',
    bgGlow: 'rgba(16, 185, 129, 0.25)',
    icon: 'Footprints',
    importanceRank: 1,
    visualType: 'footwear'
  },
  {
    id: 2,
    stageName: 'NIVEL 2',
    mysteryTitle: 'Misión 2: El Guardián Biomédico',
    mysterySubtitle: 'Reto de Alta Tecnología & Diagnóstico',
    category: 'TECNOLOGÍA DE SALUD',
    title: 'Oura Ring 5',
    subtitle: 'Black Edition · El Anillo de Salud Más Avanzado del Mundo',
    shortRiddle: '¿Sabías que tu corazón late 100.000 veces al día y que el tiempo entre latido y latido delata tu estrés antes de que tú lo notes?',
    challenge: {
      question: '¿En qué punto del cuerpo la señal del pulso infrarrojo es hasta 100 veces más nítida para medir la frecuencia cardíaca y el HRV con precisión médica?',
      options: [
        'En el lóbulo de la oreja',
        'En la muñeca derecha',
        'En las arterias digitales de los dedos (Anillo Inteligente)'
      ],
      correctOptionIndex: 2,
      hint: 'Pista: Es donde las arterias están más cerca de la superficie cutánea y se lleva una joya...'
    },
    intriguingStory: 'Validado por +130 estudios biomédicos (UCSF, Harvard) y 30 Ph.D., Oura mide las arterias digitales con precisión de grado clínico.',
    factsHeading: 'Los 6 Pilares Científicos de Tu Oura',
    // Two rows of three, ordered by what matters most to Jess: estrés y
    // resiliencia, edad cardiovascular y metabolismo primero.
    scientificFacts: [
      {
        pillar: '🧘 Estrés Diurno',
        title: 'Resiliencia en Tiempo Real',
        description: 'Mapea tus zonas de estrés y tu capacidad de recuperación.',
        stat: 'Score Resiliencia',
        iconName: 'Activity'
      },
      {
        pillar: '❤️ Edad Cardiovascular',
        title: 'La Edad Real de Tu Corazón',
        description: 'Calcula tu rigidez arterial y la compara con tu edad.',
        stat: 'PWV + VO₂ Max',
        iconName: 'HeartPulse'
      },
      {
        pillar: '⚡ Metabolismo',
        title: 'Energía y +40 Ejercicios',
        description: 'Detecta tus entrenos y une descanso, glucosa y nutrición.',
        stat: 'AAD + Glucosa',
        iconName: 'Zap'
      },
      {
        pillar: '🌺 Ciclo Femenino',
        title: 'Predicción Hormonal NTC',
        description: 'Microtermometría que anticipa tus fases y ventana fértil.',
        stat: '±0,05 °C',
        iconName: 'Thermometer'
      },
      {
        pillar: '🌙 Sueño y SpO₂',
        title: 'Arquitectura del Descanso',
        description: 'Fases REM y profundo, oxígeno en sangre y tu cronotipo.',
        stat: 'REM + SpO₂',
        iconName: 'Moon'
      },
      {
        pillar: '🔬 Ciencia Clínica',
        title: 'Precisión de Hospital',
        description: '99% en pulso y 98% en HRV frente a un ECG hospitalario.',
        stat: '99% vs ECG',
        iconName: 'ShieldCheck'
      }
    ],
    sourceNote: '30 Ph.D. · +130 estudios · UCSF & Harvard',
    brutalFact: {
      title: '⚡ DATO BRUTAL DE BIOMEDICINA',
      highlight: 'Predicción 3 Días Antes',
      description: 'Oura lee tus arterias digitales 250 veces por segundo. Gracias a la microtermometría NTC, puede detectar el inicio de un proceso febril o bajada de defensas hasta 72 horas antes de que sientas el primer síntoma.',
      iconName: 'Activity'
    },
    healthImpact: 'Autoconocimiento biomédico total, seguimiento circadiano de precisión y salud preventiva de lujo.',
    husbandNote: '¡El regalo tecnológico definitivo! El Oura Ring 5 te acompañará como una joya elegante mientras descifra los secretos de tu salud.',
    badgeText: 'Paso 2: Tecnología Biomédica de Vanguardia',
    accentColor: '#f59e0b',
    bgGlow: 'rgba(245, 158, 11, 0.3)',
    icon: 'Sparkles',
    importanceRank: 2,
    visualType: 'ring',
    photoSrc: ouraRingBlack
  },
  {
    id: 3,
    stageName: 'NIVEL 3 - REGALO PRINCIPAL',
    mysteryTitle: 'Misión 3: El Templo de los Sentidos',
    mysterySubtitle: 'Reto de Alta Gastronomía & Paisajes del Norte',
    category: 'EXPERIENCIA DE LUJO',
    title: 'Cena en Casa Marcial',
    subtitle: 'El Templo Culinario de Asturias (2 Estrellas Michelin / 3 Soles Repsol)',
    shortRiddle: 'En lo alto de las montañas de Asturias existe un santuario de 2 Estrellas Michelin galardonado mundialmente...',
    challenge: {
      question: 'Este santuario de la cocina asturiana sigue en la aldea donde creció su chef, y su arroz con pitu de caleya es un plato de culto mundial. ¿Cuál es?',
      options: [
        'Casa Gerardo (Prendes)',
        'El Corral del Indianu (Arriondas)',
        'Casa Marcial (Arriondas)'
      ],
      correctOptionIndex: 2,
      hint: 'Pista: el restaurante sigue en la misma casa familiar donde su chef se crió, en la aldea de La Salgar...'
    },
    intriguingStory: 'Creado por Nacho y Esther Manzano, Casa Marcial es un homenaje sensorial a la naturaleza asturiana, la tradición y la alta vanguardia culinaria.',
    factsHeading: 'Las 6 Joyas de la Experiencia',
    scientificFacts: [
      {
        pillar: '⭐ Michelin',
        title: '2 Estrellas y 3 Soles',
        description: 'Reconocimiento mundial a la cocina de Nacho Manzano.',
        stat: '⭐⭐ Michelin',
        iconName: 'Award'
      },
      {
        pillar: '🍽️ Menú',
        title: 'Viaje Sensorial de Autor',
        description: 'Degustación larga que se recuerda plato a plato.',
        stat: 'Alta cocina',
        iconName: 'Utensils'
      },
      {
        pillar: '🏔️ Entorno',
        title: 'Arriondas, Asturias',
        description: 'Una casa de aldea entre montañas y verde infinito.',
        stat: 'Asturias pura',
        iconName: 'Compass'
      },
      {
        pillar: '🌱 Producto',
        title: 'Huerta, Mar y Montaña',
        description: 'Producto asturiano de temporada llevado al límite.',
        stat: 'Km 0 puro',
        iconName: 'Feather'
      },
      {
        pillar: '💛 Recuerdo',
        title: 'Una Noche Para los Dos',
        description: 'La celebración de tus 39, juntos.',
        stat: 'Para los dos',
        iconName: 'Heart'
      }
    ],
    brutalFact: {
      title: '⚡ DATO BRUTAL DE NEUROGASTRONOMÍA',
      highlight: 'Pico de Dopamina & Oxitocina',
      description: 'La neurociencia demuestra que una experiencia gastronómica de 2 Estrellas Michelin estimula las mismas áreas emocionales del cerebro que el arte sublime, fijando un recuerdo feliz indestructible en la memoria a largo plazo.',
      iconName: 'Heart'
    },
    healthImpact: 'Nutrición para la mente y el alma, liberación de dopamina y la creación de un recuerdo imborrable.',
    husbandNote: '¡El broche de oro para tu cumpleaños! Una noche mágica disfrutando la mejor gastronomía del planeta solo para los dos.',
    badgeText: 'Paso 3: Experiencia Suprema & Celebración',
    accentColor: '#f43f5e',
    bgGlow: 'rgba(244, 63, 94, 0.35)',
    icon: 'Crown',
    importanceRank: 3,
    visualType: 'michelin',
    photoSrc: casaMarcialReserva,
    photoFit: 'contain', // It is a confirmation document: never crop it on screen
    photoLabel: '✅ ¡RESERVA YA CONFIRMADA!'
  }
];
