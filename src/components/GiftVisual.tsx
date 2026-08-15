import React from 'react';

interface Props {
  visualType: 'footwear' | 'ring' | 'michelin';
  accentColor: string;
  className?: string;
}

export const GiftVisual: React.FC<Props> = ({ visualType, accentColor, className = '' }) => {
  switch (visualType) {
    case 'footwear':
      return (
        <div className={`relative flex items-center justify-center w-full h-full min-h-[280px] p-6 ${className}`}>
          {/* Glowing background aura */}
          <div 
            className="absolute inset-0 rounded-full blur-3xl opacity-30 animate-pulse"
            style={{ backgroundColor: accentColor }}
          />

          <svg viewBox="0 0 500 300" className="w-full h-auto max-h-[320px] drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]">
            <defs>
              <linearGradient id="footGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="50%" stopColor="#059669" />
                <stop offset="100%" stopColor="#064e3b" />
              </linearGradient>
              <linearGradient id="soleGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#34d399" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#059669" stopOpacity="0.2" />
              </linearGradient>
              <filter id="glowGreen" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Pedestal / Ground plate */}
            <ellipse cx="250" cy="260" rx="180" ry="25" fill="rgba(255,255,255,0.04)" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="2" />
            <ellipse cx="250" cy="260" rx="140" ry="16" fill="rgba(16, 185, 129, 0.15)" filter="url(#glowGreen)" />

            {/* Futuristic Barefoot Shoe Outline */}
            <path
              d="M 120,220 C 90,210 70,180 85,150 C 100,120 150,110 200,115 C 240,120 280,125 330,120 C 370,115 410,130 425,160 C 435,180 430,210 400,225 C 360,240 280,245 200,240 Z"
              fill="url(#footGradient)"
              stroke="#6ee7b7"
              strokeWidth="4"
              className="transition-all duration-700 hover:scale-105"
            />

            {/* Wide Toe-Box Highlight */}
            <path
              d="M 330,120 C 370,115 415,135 425,165 C 435,190 415,220 380,230 C 340,235 310,235 310,235 Z"
              fill="rgba(52, 211, 153, 0.25)"
              stroke="#a7f3d0"
              strokeWidth="2"
              strokeDasharray="4,4"
            />
            <text x="365" y="100" fill="#a7f3d0" fontSize="14" fontWeight="bold" textAnchor="middle">
              Wide Toe Box (Anatomía Libre)
            </text>
            <line x1="365" y1="106" x2="365" y2="130" stroke="#a7f3d0" strokeWidth="1.5" markerEnd="url(#arrow)" />

            {/* Flexible Thin Sole Line */}
            <path
              d="M 85,225 C 150,238 270,242 410,228"
              fill="none"
              stroke="#34d399"
              strokeWidth="8"
              strokeLinecap="round"
              filter="url(#glowGreen)"
            />

            {/* Nerve Sensors / Proprioception Points */}
            <circle cx="130" cy="205" r="7" fill="#6ee7b7" className="animate-ping" />
            <circle cx="130" cy="205" r="5" fill="#ffffff" />

            <circle cx="210" cy="215" r="7" fill="#6ee7b7" className="animate-ping" />
            <circle cx="210" cy="215" r="5" fill="#ffffff" />

            <circle cx="300" cy="215" r="7" fill="#6ee7b7" className="animate-ping" />
            <circle cx="300" cy="215" r="5" fill="#ffffff" />

            <circle cx="380" cy="200" r="7" fill="#6ee7b7" className="animate-ping" />
            <circle cx="380" cy="200" r="5" fill="#ffffff" />

            {/* Labels */}
            <text x="130" y="275" fill="#6ee7b7" fontSize="13" fontWeight="bold" textAnchor="middle">0mm Drop</text>
            <text x="250" y="275" fill="#6ee7b7" fontSize="13" fontWeight="bold" textAnchor="middle">Propiocepción +200k</text>
            <text x="380" y="275" fill="#6ee7b7" fontSize="13" fontWeight="bold" textAnchor="middle">Flexibilidad 360°</text>
          </svg>
        </div>
      );

    case 'ring':
      return (
        <div className={`relative flex items-center justify-center w-full h-full min-h-[280px] p-6 ${className}`}>
          {/* Glowing background aura */}
          <div 
            className="absolute inset-0 rounded-full blur-3xl opacity-35 animate-pulse"
            style={{ backgroundColor: accentColor }}
          />

          <svg viewBox="0 0 500 300" className="w-full h-auto max-h-[320px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
            <defs>
              <linearGradient id="titaniumGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="30%" stopColor="#f59e0b" />
                <stop offset="70%" stopColor="#b45309" />
                <stop offset="100%" stopColor="#78350f" />
              </linearGradient>
              <linearGradient id="innerRing" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1e1b4b" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>
              <filter id="glowGold" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="7" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Glowing Base Halo */}
            <ellipse cx="250" cy="245" rx="160" ry="20" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="6,6" opacity="0.6" />

            {/* Outer Titanium Ring Outer Oval */}
            <ellipse cx="250" cy="140" rx="140" ry="75" fill="none" stroke="url(#titaniumGrad)" strokeWidth="32" filter="url(#glowGold)" />
            <ellipse cx="250" cy="140" rx="140" ry="75" fill="none" stroke="#fef08a" strokeWidth="4" opacity="0.9" />

            {/* Inner Ring Opening */}
            <ellipse cx="250" cy="140" rx="108" ry="52" fill="url(#innerRing)" stroke="#f59e0b" strokeWidth="2" />

            {/* Biometric LED Sensors inside the ring */}
            {/* Green Sensor LED 1 */}
            <circle cx="210" cy="170" r="6" fill="#10b981" className="animate-ping" />
            <circle cx="210" cy="170" r="4" fill="#ffffff" />
            <text x="170" y="210" fill="#34d399" fontSize="12" fontWeight="bold">Sensores PPG (Pulso)</text>
            <line x1="210" y1="176" x2="190" y2="198" stroke="#34d399" strokeWidth="1.5" />

            {/* Red/IR Sensor LED 2 */}
            <circle cx="250" cy="178" r="6" fill="#ef4444" className="animate-ping" />
            <circle cx="250" cy="178" r="4" fill="#ffffff" />
            <text x="250" y="225" fill="#fca5a5" fontSize="12" fontWeight="bold" textAnchor="middle">Temp NTC (±0.05°C)</text>

            {/* Green Sensor LED 3 */}
            <circle cx="290" cy="170" r="6" fill="#06b6d4" className="animate-ping" />
            <circle cx="290" cy="170" r="4" fill="#ffffff" />
            <text x="330" y="210" fill="#67e8f9" fontSize="12" fontWeight="bold">HRV & Sleep REM</text>
            <line x1="290" y1="176" x2="310" y2="198" stroke="#67e8f9" strokeWidth="1.5" />

            {/* Specular Metallic Reflections */}
            <path d="M 140,110 C 180,85 220,80 250,80" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" opacity="0.6" />

            {/* Product Badge Header */}
            <text x="250" y="45" fill="#fef08a" fontSize="20" fontWeight="bold" textAnchor="middle" letterSpacing="3">
              OURA RING 5 • TITANIUM EDITION
            </text>
          </svg>
        </div>
      );

    case 'michelin':
      return (
        <div className={`relative flex items-center justify-center w-full h-full min-h-[280px] p-6 ${className}`}>
          {/* Glowing background aura */}
          <div 
            className="absolute inset-0 rounded-full blur-3xl opacity-35 animate-pulse"
            style={{ backgroundColor: accentColor }}
          />

          <svg viewBox="0 0 500 300" className="w-full h-auto max-h-[320px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
            <defs>
              <linearGradient id="roseGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fda4af" />
                <stop offset="50%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#9f1239" />
              </linearGradient>
              <linearGradient id="starGold" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fef08a" />
                <stop offset="100%" stopColor="#eab308" />
              </linearGradient>
              <filter id="glowRose" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Asturian Mountain Silhouette Backdrop */}
            <path d="M 30,220 L 110,130 L 170,180 L 250,110 L 330,175 L 400,125 L 470,220 Z" fill="rgba(244, 63, 94, 0.12)" stroke="rgba(244, 63, 94, 0.3)" strokeWidth="1.5" />

            {/* Luxury Gourmet Cloche (Plate Cover) */}
            <path d="M 160,200 C 160,110 340,110 340,200 Z" fill="url(#roseGoldGrad)" stroke="#fecdd3" strokeWidth="4" filter="url(#glowRose)" />
            {/* Cloche Knob */}
            <circle cx="250" cy="115" r="14" fill="url(#starGold)" stroke="#ffffff" strokeWidth="3" />
            {/* Serving Platter Base */}
            <rect x="130" y="200" width="240" height="16" rx="8" fill="#fda4af" stroke="#ffffff" strokeWidth="3" />
            <ellipse cx="250" cy="216" rx="140" ry="12" fill="rgba(244, 63, 94, 0.2)" />

            {/* Wine Glasses Outline */}
            <path d="M 100,160 L 100,200 M 85,200 L 115,200 M 85,160 C 85,140 115,140 115,160 Z" stroke="#fecdd3" strokeWidth="3" fill="rgba(253, 164, 175, 0.2)" />
            <path d="M 400,160 L 400,200 M 385,200 L 415,200 M 385,160 C 385,140 415,140 415,160 Z" stroke="#fecdd3" strokeWidth="3" fill="rgba(253, 164, 175, 0.2)" />

            {/* Michelin Stars */}
            {/* Star 1 */}
            <g transform="translate(190, 50) scale(1.2)">
              <polygon points="12,0 15,8 24,9 17,15 19,24 12,19 5,24 7,15 0,9 9,8" fill="url(#starGold)" filter="url(#glowRose)" />
            </g>
            {/* Star 2 */}
            <g transform="translate(280, 50) scale(1.2)">
              <polygon points="12,0 15,8 24,9 17,15 19,24 12,19 5,24 7,15 0,9 9,8" fill="url(#starGold)" filter="url(#glowRose)" />
            </g>

            {/* Title Header */}
            <text x="250" y="30" fill="#fecdd3" fontSize="20" fontWeight="bold" textAnchor="middle" letterSpacing="4">
              CASA MARCIAL • ARRIONDAS
            </text>
            <text x="250" y="260" fill="#ffe4e6" fontSize="16" fontWeight="bold" textAnchor="middle">
              2 Estrellas Michelin • 3 Soles Repsol
            </text>
          </svg>
        </div>
      );

    default:
      return null;
  }
};
