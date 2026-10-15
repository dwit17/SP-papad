import React, { useState } from 'react';
import { sound } from '../utils/audioSynth';

export type MascotVariant =
  | 'hero_dancer'
  | 'moong_mari'
  | 'udad_jeera'
  | 'lasaniya_superhero'
  | 'sindhi_masala'
  | 'rice_khichiya'
  | 'coin_trio'
  | 'floating_buddy';

interface CutePapadMascotProps {
  variant?: MascotVariant;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  interactive?: boolean;
  animate?: boolean;
  badgeText?: string;
  onClick?: () => void;
}

export const CutePapadMascot: React.FC<CutePapadMascotProps> = ({
  variant = 'hero_dancer',
  className = '',
  size = 'md',
  interactive = true,
  animate = true,
  badgeText,
  onClick,
}) => {
  const [isWiggling, setIsWiggling] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);

  const sizeClasses = {
    sm: 'w-20 h-20 sm:w-24 sm:h-24',
    md: 'w-36 h-36 sm:w-44 sm:h-44',
    lg: 'w-48 h-48 sm:w-56 sm:h-56',
    xl: 'w-60 h-60 sm:w-72 sm:h-72',
    hero: 'w-72 h-72 sm:w-96 sm:h-96 lg:w-[440px] lg:h-[440px]',
  }[size];

  const handleClick = (e: React.MouseEvent) => {
    sound.playCrunch();
    setIsWiggling(true);
    setShowSparkles(true);
    setTimeout(() => setIsWiggling(false), 600);
    setTimeout(() => setShowSparkles(false), 900);
    if (onClick) onClick();
  };

  const handleMouseEnter = () => {
    if (interactive) {
      sound.playPop();
    }
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label="Cute Papad Mascot"
      className={`relative inline-flex items-center justify-center select-none ${sizeClasses} ${
        interactive ? 'cursor-pointer group' : ''
      } ${className}`}
    >
      {/* Floating Sparkles Burst on Click */}
      {showSparkles && (
        <div className="absolute inset-0 pointer-events-none z-20 flex items-center justify-center">
          <span className="absolute -top-4 -left-2 text-amber-500 text-lg animate-ping">✨</span>
          <span className="absolute -top-3 right-0 text-red-500 font-bold text-xs bg-white/90 px-2 py-0.5 rounded-full border border-red-300 shadow-sm animate-bounce">
            CRUNCH!
          </span>
          <span className="absolute -bottom-2 -right-2 text-amber-400 text-xl animate-pulse">★</span>
          <span className="absolute bottom-0 -left-3 text-orange-500 text-base animate-ping">✦</span>
        </div>
      )}

      {/* RENDER MASCOT VARIANT */}
      <div
        className={`w-full h-full flex items-center justify-center transition-transform duration-300 ${
          animate ? 'animate-papad-bounce' : ''
        } ${isWiggling ? 'animate-papad-wiggle scale-110' : ''} ${
          interactive ? 'group-hover:scale-105 group-active:scale-95' : ''
        }`}
      >
        {variant === 'hero_dancer' && <HeroDancerSVG />}
        {variant === 'moong_mari' && <MoongMariSVG />}
        {variant === 'udad_jeera' && <UdadJeeraSVG />}
        {variant === 'lasaniya_superhero' && <LasaniyaSuperheroSVG />}
        {variant === 'sindhi_masala' && <SindhiMasalaSVG />}
        {variant === 'rice_khichiya' && <RiceKhichiyaSVG />}
        {variant === 'coin_trio' && <CoinTrioSVG />}
        {variant === 'floating_buddy' && <FloatingBuddySVG />}
      </div>

      {/* Optional Badge below mascot */}
      {badgeText && (
        <div className="absolute -bottom-3 bg-amber-500 text-stone-900 border-2 border-stone-900 font-extrabold text-[10px] sm:text-xs tracking-wider px-2.5 py-0.5 rounded-full shadow-[0_3px_0_#1c1917] whitespace-nowrap z-10 transition-transform group-hover:scale-105">
          {badgeText}
        </div>
      )}
    </div>
  );
};

/* =========================================================================
   1. HERO DANCER SVG: Retro dancing papad with bendy legs, sneakers & white gloves
   ========================================================================= */
const HeroDancerSVG = () => (
  <svg viewBox="0 0 400 400" className="w-full h-full filter drop-shadow-lg" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="papadGoldenGrad" cx="45%" cy="40%" r="55%">
        <stop offset="0%" stopColor="#FFF2D6" />
        <stop offset="60%" stopColor="#F5D79E" />
        <stop offset="100%" stopColor="#E6BD76" />
      </radialGradient>
      <linearGradient id="sneakerRed" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#EF4444" />
        <stop offset="100%" stopColor="#B91C1C" />
      </linearGradient>
    </defs>

    {/* Sparkle Stars around head */}
    <g className="animate-pulse">
      <path d="M 90 90 Q 98 90 98 82 Q 98 90 106 90 Q 98 90 98 98 Q 98 90 90 90 Z" fill="#D97706" />
      <path d="M 310 80 Q 318 80 318 72 Q 318 80 326 80 Q 318 80 318 88 Q 318 80 310 80 Z" fill="#D97706" />
      <circle cx="330" cy="110" r="3" fill="#F59E0B" />
      <circle cx="80" cy="120" r="2.5" fill="#F59E0B" />
    </g>

    {/* Bendy Left Leg (Crossing behind) */}
    <path
      d="M 180 270 Q 200 320 220 340"
      stroke="#1C1917"
      strokeWidth="11"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M 180 270 Q 200 320 220 340"
      stroke="#E6BD76"
      strokeWidth="7"
      strokeLinecap="round"
      fill="none"
    />
    {/* Left Sneaker (Kick pose) */}
    <g transform="translate(205, 325) rotate(20)">
      <rect x="0" y="8" width="42" height="20" rx="8" fill="url(#sneakerRed)" stroke="#1C1917" strokeWidth="3" />
      <rect x="-2" y="24" width="46" height="8" rx="4" fill="#FFFFFF" stroke="#1C1917" strokeWidth="2.5" />
      <circle cx="12" cy="18" r="4" fill="#FFFFFF" />
      <line x1="22" y1="11" x2="32" y2="11" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      <line x1="22" y1="16" x2="32" y2="16" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    </g>

    {/* Bendy Right Leg (Stepping forward) */}
    <path
      d="M 230 265 Q 210 310 160 340"
      stroke="#1C1917"
      strokeWidth="11"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M 230 265 Q 210 310 160 340"
      stroke="#E6BD76"
      strokeWidth="7"
      strokeLinecap="round"
      fill="none"
    />
    {/* Right Sneaker */}
    <g transform="translate(125, 325) rotate(-15)">
      <rect x="0" y="8" width="44" height="20" rx="8" fill="url(#sneakerRed)" stroke="#1C1917" strokeWidth="3" />
      <rect x="-3" y="24" width="48" height="8" rx="4" fill="#FFFFFF" stroke="#1C1917" strokeWidth="2.5" />
      <circle cx="34" cy="18" r="4" fill="#FFFFFF" />
      <line x1="12" y1="11" x2="24" y2="11" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
      <line x1="12" y1="16" x2="24" y2="16" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
    </g>

    {/* Bendy Left Arm (Pointing up joyfully!) */}
    <path
      d="M 125 190 Q 75 160 70 100"
      stroke="#1C1917"
      strokeWidth="11"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M 125 190 Q 75 160 70 100"
      stroke="#E6BD76"
      strokeWidth="7"
      strokeLinecap="round"
      fill="none"
    />
    {/* Left Cartoon Glove (Pointing finger) */}
    <g transform="translate(50, 60)">
      <ellipse cx="22" cy="38" rx="14" ry="10" fill="#FFFFFF" stroke="#1C1917" strokeWidth="3" />
      <rect x="18" y="6" width="10" height="28" rx="5" fill="#FFFFFF" stroke="#1C1917" strokeWidth="3" />
      <rect x="8" y="16" width="9" height="18" rx="4.5" fill="#FFFFFF" stroke="#1C1917" strokeWidth="2.5" />
      <rect x="26" y="18" width="9" height="16" rx="4.5" fill="#FFFFFF" stroke="#1C1917" strokeWidth="2.5" />
      {/* Glove cuff lines */}
      <line x1="14" y1="36" x2="28" y2="36" stroke="#1C1917" strokeWidth="2" />
      <line x1="16" y1="40" x2="26" y2="40" stroke="#1C1917" strokeWidth="2" />
    </g>

    {/* Bendy Right Arm (Up in the air!) */}
    <path
      d="M 275 190 Q 325 160 330 100"
      stroke="#1C1917"
      strokeWidth="11"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M 275 190 Q 325 160 330 100"
      stroke="#E6BD76"
      strokeWidth="7"
      strokeLinecap="round"
      fill="none"
    />
    {/* Right Cartoon Glove */}
    <g transform="translate(315, 60)">
      <ellipse cx="20" cy="38" rx="14" ry="10" fill="#FFFFFF" stroke="#1C1917" strokeWidth="3" />
      <rect x="14" y="6" width="10" height="28" rx="5" fill="#FFFFFF" stroke="#1C1917" strokeWidth="3" />
      <rect x="25" y="16" width="9" height="18" rx="4.5" fill="#FFFFFF" stroke="#1C1917" strokeWidth="2.5" />
      <rect x="6" y="18" width="9" height="16" rx="4.5" fill="#FFFFFF" stroke="#1C1917" strokeWidth="2.5" />
      <line x1="12" y1="36" x2="26" y2="36" stroke="#1C1917" strokeWidth="2" />
      <line x1="14" y1="40" x2="24" y2="40" stroke="#1C1917" strokeWidth="2" />
    </g>

    {/* MAIN ROUND PAPAD BODY */}
    <circle
      cx="200"
      cy="195"
      r="102"
      fill="url(#papadGoldenGrad)"
      stroke="#1C1917"
      strokeWidth="8"
    />
    {/* Crispy wavy inner border */}
    <circle
      cx="200"
      cy="195"
      r="96"
      stroke="#D69E2E"
      strokeWidth="2.5"
      strokeDasharray="6 4"
      fill="none"
    />

    {/* Golden Blister Toast Bubbles */}
    <circle cx="140" cy="155" r="14" fill="#E6BD76" stroke="#D69E2E" strokeWidth="1.5" />
    <circle cx="260" cy="150" r="16" fill="#E6BD76" stroke="#D69E2E" strokeWidth="1.5" />
    <circle cx="255" cy="245" r="18" fill="#E6BD76" stroke="#D69E2E" strokeWidth="1.5" />
    <circle cx="145" cy="240" r="12" fill="#E6BD76" stroke="#D69E2E" strokeWidth="1.5" />

    {/* Coarse Cracked Pepper & Cumin flecks */}
    <circle cx="138" cy="153" r="3" fill="#1C1917" />
    <circle cx="262" cy="148" r="3.2" fill="#1C1917" />
    <circle cx="254" cy="243" r="3.5" fill="#1C1917" />
    <circle cx="145" cy="238" r="2.8" fill="#1C1917" />
    <circle cx="195" cy="120" r="3" fill="#1C1917" />
    <circle cx="215" cy="275" r="3" fill="#1C1917" />
    <ellipse cx="170" cy="130" rx="4" ry="2" transform="rotate(25 170 130)" fill="#78350F" />
    <ellipse cx="230" cy="130" rx="4" ry="2" transform="rotate(-30 230 130)" fill="#78350F" />

    {/* FACIAL EXPRESSION (Cute, Joyful Retro Mascot) */}
    {/* Cheerful Eyebrows */}
    <path d="M 152 148 Q 168 138 180 148" stroke="#1C1917" strokeWidth="4" strokeLinecap="round" fill="none" />
    <path d="M 220 148 Q 232 138 248 148" stroke="#1C1917" strokeWidth="4" strokeLinecap="round" fill="none" />

    {/* Big Kawaii Eyes with Double Sparkles */}
    <g className="animate-papad-blink">
      {/* Left Eye */}
      <ellipse cx="166" cy="175" rx="14" ry="20" fill="#1C1917" />
      <circle cx="161" cy="168" r="6" fill="#FFFFFF" />
      <circle cx="172" cy="184" r="2.5" fill="#FFFFFF" />

      {/* Right Eye */}
      <ellipse cx="234" cy="175" rx="14" ry="20" fill="#1C1917" />
      <circle cx="229" cy="168" r="6" fill="#FFFFFF" />
      <circle cx="240" cy="184" r="2.5" fill="#FFFFFF" />
    </g>

    {/* Rosy Cheeks */}
    <ellipse cx="142" cy="196" rx="12" ry="7" fill="#F87171" opacity="0.8" />
    <ellipse cx="258" cy="196" rx="12" ry="7" fill="#F87171" opacity="0.8" />

    {/* Big Open Joyful Mouth with Tongue */}
    <path
      d="M 172 205 Q 200 242 228 205 Z"
      fill="#991B1B"
      stroke="#1C1917"
      strokeWidth="3.5"
    />
    {/* Pink Tongue */}
    <path
      d="M 184 218 Q 200 212 216 218 Q 200 238 184 218 Z"
      fill="#F472B6"
    />
  </svg>
);

/* =========================================================================
   2. MOONG MARI: Cool sporty papad with backward red cap & black pepper specks
   ========================================================================= */
const MoongMariSVG = () => (
  <svg viewBox="0 0 300 300" className="w-full h-full filter drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="150" cy="150" r="95" fill="#F5E4BE" stroke="#1C1917" strokeWidth="6" />
    {/* Roasted bubbles */}
    <circle cx="110" cy="115" r="12" fill="#E8CE9E" />
    <circle cx="195" cy="185" r="16" fill="#E8CE9E" />
    <circle cx="105" cy="190" r="14" fill="#E8CE9E" />

    {/* Cracked Black Pepper Flecks (Lots of them for Moong Mari!) */}
    <circle cx="110" cy="115" r="3" fill="#1C1917" />
    <circle cx="195" cy="185" r="3.5" fill="#1C1917" />
    <circle cx="105" cy="190" r="3" fill="#1C1917" />
    <circle cx="150" cy="95" r="3" fill="#1C1917" />
    <circle cx="180" cy="110" r="2.8" fill="#1C1917" />
    <circle cx="140" cy="215" r="3" fill="#1C1917" />
    <circle cx="210" cy="140" r="2.5" fill="#1C1917" />
    <circle cx="85" cy="150" r="2.8" fill="#1C1917" />

    {/* Backward Red Snapback Cap */}
    <path
      d="M 95 95 Q 150 45 205 95 L 215 105 Q 150 75 85 105 Z"
      fill="#DC2626"
      stroke="#1C1917"
      strokeWidth="4"
    />
    <ellipse cx="150" cy="65" rx="8" ry="4" fill="#991B1B" />

    {/* Wink Face & Smile */}
    {/* Left Eye: Wink */}
    <path d="M 115 145 Q 130 135 142 148" stroke="#1C1917" strokeWidth="4.5" strokeLinecap="round" fill="none" />
    {/* Right Eye: Big Shiny Anime Eye */}
    <ellipse cx="178" cy="144" rx="12" ry="16" fill="#1C1917" />
    <circle cx="174" cy="138" r="5" fill="#FFFFFF" />
    <circle cx="183" cy="150" r="2" fill="#FFFFFF" />

    {/* Rosy Cheeks */}
    <circle cx="115" cy="162" r="8" fill="#F87171" opacity="0.85" />
    <circle cx="195" cy="162" r="8" fill="#F87171" opacity="0.85" />

    {/* Cool Smirk Smile with Tongue */}
    <path d="M 132 172 Q 155 195 178 172" stroke="#1C1917" strokeWidth="4" strokeLinecap="round" fill="none" />

    {/* Thumbs Up Hand Glove */}
    <g transform="translate(225, 155) rotate(10)">
      <ellipse cx="18" cy="20" rx="14" ry="10" fill="#FFFFFF" stroke="#1C1917" strokeWidth="3" />
      <rect x="14" y="0" width="8" height="20" rx="4" fill="#FFFFFF" stroke="#1C1917" strokeWidth="3" />
    </g>

    {/* Little Red Kicks / Shoes */}
    <g transform="translate(105, 235)">
      <rect x="0" y="4" width="30" height="14" rx="6" fill="#DC2626" stroke="#1C1917" strokeWidth="2.5" />
      <rect x="-2" y="14" width="34" height="6" rx="3" fill="#FFFFFF" stroke="#1C1917" strokeWidth="2" />
    </g>
    <g transform="translate(165, 235)">
      <rect x="0" y="4" width="30" height="14" rx="6" fill="#DC2626" stroke="#1C1917" strokeWidth="2.5" />
      <rect x="-2" y="14" width="34" height="6" rx="3" fill="#FFFFFF" stroke="#1C1917" strokeWidth="2" />
    </g>
  </svg>
);

/* =========================================================================
   3. UDAD JEERA: Cheerful Namaste Papad with Cumin freckles & peaceful smile
   ========================================================================= */
const UdadJeeraSVG = () => (
  <svg viewBox="0 0 300 300" className="w-full h-full filter drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="150" cy="150" r="95" fill="#FDF3DA" stroke="#1C1917" strokeWidth="6" />

    {/* Golden Cumin Seeds everywhere */}
    <ellipse cx="110" cy="100" rx="5" ry="2.2" transform="rotate(35 110 100)" fill="#78350F" />
    <ellipse cx="190" cy="110" rx="5" ry="2.2" transform="rotate(-25 190 110)" fill="#78350F" />
    <ellipse cx="100" cy="180" rx="5" ry="2.2" transform="rotate(60 100 180)" fill="#78350F" />
    <ellipse cx="200" cy="190" rx="5" ry="2.2" transform="rotate(-45 200 190)" fill="#78350F" />
    <ellipse cx="150" cy="90" rx="5" ry="2.2" transform="rotate(15 150 90)" fill="#78350F" />
    <ellipse cx="150" cy="215" rx="5" ry="2.2" transform="rotate(-10 150 215)" fill="#78350F" />

    {/* Happy Crescent Eyes (Smiling ^_^) */}
    <path d="M 112 135 Q 128 118 144 135" stroke="#1C1917" strokeWidth="4.5" strokeLinecap="round" fill="none" />
    <path d="M 156 135 Q 172 118 188 135" stroke="#1C1917" strokeWidth="4.5" strokeLinecap="round" fill="none" />

    {/* Rosy Cheeks */}
    <ellipse cx="108" cy="150" rx="10" ry="6" fill="#FCA5A5" />
    <ellipse cx="192" cy="150" rx="10" ry="6" fill="#FCA5A5" />

    {/* Gentle Cute Smile */}
    <path d="M 136 156 Q 150 174 164 156" stroke="#1C1917" strokeWidth="4" strokeLinecap="round" fill="none" />

    {/* Namaste / Folded Cartoon Hands */}
    <g transform="translate(132, 175)">
      <ellipse cx="10" cy="16" rx="9" ry="14" fill="#FFFFFF" stroke="#1C1917" strokeWidth="2.5" />
      <ellipse cx="26" cy="16" rx="9" ry="14" fill="#FFFFFF" stroke="#1C1917" strokeWidth="2.5" />
      <line x1="18" y1="6" x2="18" y2="28" stroke="#E5E7EB" strokeWidth="2" />
    </g>

    {/* Cute Yellow/Brown Shoes */}
    <g transform="translate(112, 235)">
      <rect x="0" y="4" width="28" height="14" rx="6" fill="#D97706" stroke="#1C1917" strokeWidth="2.5" />
      <rect x="-2" y="14" width="32" height="6" rx="3" fill="#FFFFFF" stroke="#1C1917" strokeWidth="2" />
    </g>
    <g transform="translate(160, 235)">
      <rect x="0" y="4" width="28" height="14" rx="6" fill="#D97706" stroke="#1C1917" strokeWidth="2.5" />
      <rect x="-2" y="14" width="32" height="6" rx="3" fill="#FFFFFF" stroke="#1C1917" strokeWidth="2" />
    </g>
  </svg>
);

/* =========================================================================
   4. LASANIYA SUPERHERO: Inspired by Image 4! Fluttering red cape & bold boots
   ========================================================================= */
const LasaniyaSuperheroSVG = () => (
  <svg viewBox="0 0 320 320" className="w-full h-full filter drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Fluttering Red Superhero Cape in Background */}
    <path
      d="M 90 150 C 40 180 20 250 10 270 C 40 250 80 230 110 230 Z"
      fill="#DC2626"
      stroke="#1C1917"
      strokeWidth="4"
    />
    <path
      d="M 60 170 C 40 210 25 250 15 270"
      stroke="#991B1B"
      strokeWidth="3"
      fill="none"
    />

    {/* Papad Body with spicy red-gold tint */}
    <circle cx="160" cy="150" r="95" fill="#F8D7B0" stroke="#1C1917" strokeWidth="6" />

    {/* Spicy Red Chili flakes & Garlic paste specks */}
    <circle cx="115" cy="110" r="3.5" fill="#DC2626" />
    <circle cx="205" cy="115" r="3.2" fill="#DC2626" />
    <circle cx="110" cy="195" r="3" fill="#DC2626" />
    <circle cx="210" cy="190" r="3.5" fill="#DC2626" />
    <circle cx="160" cy="90" r="2.8" fill="#78350F" />
    {/* Cute Garlic Clove Pin on Chest/Side */}
    <path
      d="M 120 180 C 115 170 130 165 132 175 C 133 182 125 185 120 180 Z"
      fill="#FFFBEB"
      stroke="#1C1917"
      strokeWidth="2"
    />

    {/* Brave Superhero Eyes (Determined & Cute like Image 4!) */}
    <g>
      <ellipse cx="128" cy="140" rx="12" ry="16" fill="#1C1917" />
      <circle cx="124" cy="134" r="5" fill="#FFFFFF" />
      {/* Determined angled brow */}
      <path d="M 112 122 L 140 130" stroke="#1C1917" strokeWidth="4" strokeLinecap="round" />

      <ellipse cx="192" cy="140" rx="12" ry="16" fill="#1C1917" />
      <circle cx="188" cy="134" r="5" fill="#FFFFFF" />
      {/* Determined angled brow */}
      <path d="M 208 122 L 180 130" stroke="#1C1917" strokeWidth="4" strokeLinecap="round" />
    </g>

    {/* Confident Smile with Tongue */}
    <path
      d="M 144 165 Q 160 185 176 165 Z"
      fill="#991B1B"
      stroke="#1C1917"
      strokeWidth="3"
    />
    <circle cx="160" cy="172" r="3" fill="#F472B6" />

    {/* Superhero Fist Pointing Forward (Like Image 4!) */}
    <g transform="translate(245, 140)">
      <circle cx="16" cy="16" r="16" fill="#3B82F6" stroke="#1C1917" strokeWidth="3.5" />
      {/* Glove cuff */}
      <rect x="-4" y="8" width="10" height="16" rx="4" fill="#1D4ED8" stroke="#1C1917" strokeWidth="2.5" />
    </g>

    {/* Superhero Blue Boots on Sturdy Legs */}
    <g transform="translate(115, 235)">
      <rect x="0" y="4" width="30" height="18" rx="6" fill="#3B82F6" stroke="#1C1917" strokeWidth="3" />
      <rect x="-2" y="16" width="34" height="8" rx="4" fill="#FFFFFF" stroke="#1C1917" strokeWidth="2" />
    </g>
    <g transform="translate(175, 235)">
      <rect x="0" y="4" width="30" height="18" rx="6" fill="#3B82F6" stroke="#1C1917" strokeWidth="3" />
      <rect x="-2" y="16" width="34" height="8" rx="4" fill="#FFFFFF" stroke="#1C1917" strokeWidth="2" />
    </g>
  </svg>
);

/* =========================================================================
   5. SINDHI MASALA: Party papad dancing with colorful spices
   ========================================================================= */
const SindhiMasalaSVG = () => (
  <svg viewBox="0 0 300 300" className="w-full h-full filter drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="150" cy="150" r="95" fill="#F6D5A2" stroke="#1C1917" strokeWidth="6" />

    {/* Multi-spice confetti (Coriander, Red Chilli, Ajwain, Mari) */}
    <circle cx="105" cy="105" r="3" fill="#1C1917" />
    <circle cx="195" cy="100" r="3.2" fill="#DC2626" />
    <circle cx="95" cy="180" r="3" fill="#DC2626" />
    <circle cx="205" cy="185" r="3.2" fill="#1C1917" />
    <ellipse cx="150" cy="85" rx="4" ry="2" fill="#166534" />
    <ellipse cx="145" cy="220" rx="4" ry="2" fill="#166534" />

    {/* Big Anime Eyes with Stars (Inspired by Image 3!) */}
    <ellipse cx="122" cy="142" rx="14" ry="18" fill="#1C1917" />
    <path d="M 122 136 L 124 140 L 128 140 L 125 143 L 126 147 L 122 144 L 118 147 L 119 143 L 116 140 L 120 140 Z" fill="#FFFFFF" />

    <ellipse cx="178" cy="142" rx="14" ry="18" fill="#1C1917" />
    <path d="M 178 136 L 180 140 L 184 140 L 181 143 L 182 147 L 178 144 L 174 147 L 175 143 L 172 140 L 176 140 Z" fill="#FFFFFF" />

    {/* Rosy Heart Cheeks */}
    <ellipse cx="102" cy="160" rx="10" ry="7" fill="#F43F5E" />
    <ellipse cx="198" cy="160" rx="10" ry="7" fill="#F43F5E" />

    {/* Big Singing / Cheering Smile */}
    <ellipse cx="150" cy="172" rx="16" ry="12" fill="#991B1B" stroke="#1C1917" strokeWidth="3" />
    <ellipse cx="150" cy="176" rx="10" ry="6" fill="#F472B6" />

    {/* Party Hands in the air! */}
    <g transform="translate(60, 110) rotate(-35)">
      <rect x="0" y="0" width="10" height="28" rx="5" fill="#E6BD76" stroke="#1C1917" strokeWidth="3" />
      <circle cx="5" cy="-2" r="8" fill="#FFFFFF" stroke="#1C1917" strokeWidth="2.5" />
    </g>
    <g transform="translate(230, 95) rotate(35)">
      <rect x="0" y="0" width="10" height="28" rx="5" fill="#E6BD76" stroke="#1C1917" strokeWidth="3" />
      <circle cx="5" cy="-2" r="8" fill="#FFFFFF" stroke="#1C1917" strokeWidth="2.5" />
    </g>

    {/* Dancing Boots */}
    <g transform="translate(110, 235)">
      <rect x="0" y="4" width="30" height="14" rx="6" fill="#7C3AED" stroke="#1C1917" strokeWidth="2.5" />
      <rect x="-2" y="14" width="34" height="6" rx="3" fill="#FFFFFF" stroke="#1C1917" strokeWidth="2" />
    </g>
    <g transform="translate(160, 235)">
      <rect x="0" y="4" width="30" height="14" rx="6" fill="#7C3AED" stroke="#1C1917" strokeWidth="2.5" />
      <rect x="-2" y="14" width="34" height="6" rx="3" fill="#FFFFFF" stroke="#1C1917" strokeWidth="2" />
    </g>
  </svg>
);

/* =========================================================================
   6. RICE KHICHIYA: Super cute puffy baby cloud papad with sesame seeds
   ========================================================================= */
const RiceKhichiyaSVG = () => (
  <svg viewBox="0 0 300 300" className="w-full h-full filter drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Puffy Ivory White Body */}
    <circle cx="150" cy="150" r="95" fill="#FFFFFF" stroke="#1C1917" strokeWidth="6" />
    <circle cx="150" cy="150" r="88" stroke="#E5E7EB" strokeWidth="3" strokeDasharray="5 5" fill="none" />

    {/* Sesame seeds (white/ivory & cumin specks) */}
    <ellipse cx="110" cy="105" rx="4" ry="2" transform="rotate(30 110 105)" fill="#D1D5DB" />
    <ellipse cx="190" cy="105" rx="4" ry="2" transform="rotate(-30 190 105)" fill="#D1D5DB" />
    <ellipse cx="95" cy="180" rx="4" ry="2" transform="rotate(60 95 180)" fill="#78350F" />
    <ellipse cx="205" cy="180" rx="4" ry="2" transform="rotate(-40 205 180)" fill="#78350F" />

    {/* Cute baby eyes */}
    <ellipse cx="125" cy="142" rx="10" ry="14" fill="#1C1917" />
    <circle cx="122" cy="138" r="4" fill="#FFFFFF" />
    <circle cx="127" cy="146" r="1.5" fill="#FFFFFF" />

    <ellipse cx="175" cy="142" rx="10" ry="14" fill="#1C1917" />
    <circle cx="172" cy="138" r="4" fill="#FFFFFF" />
    <circle cx="177" cy="146" r="1.5" fill="#FFFFFF" />

    {/* Cute Blush */}
    <ellipse cx="108" cy="155" rx="10" ry="6" fill="#F472B6" opacity="0.8" />
    <ellipse cx="192" cy="155" rx="10" ry="6" fill="#F472B6" opacity="0.8" />

    {/* Sweet Open Smile */}
    <path d="M 138 160 Q 150 178 162 160 Z" fill="#F43F5E" stroke="#1C1917" strokeWidth="2.5" />

    {/* Holding a miniature green chili! */}
    <path
      d="M 175 178 Q 195 170 205 185 Q 190 190 175 178 Z"
      fill="#16A34A"
      stroke="#1C1917"
      strokeWidth="2"
    />

    {/* Cute White Booties */}
    <g transform="translate(115, 235)">
      <rect x="0" y="4" width="28" height="14" rx="7" fill="#F59E0B" stroke="#1C1917" strokeWidth="2.5" />
      <rect x="-2" y="14" width="32" height="6" rx="3" fill="#FFFFFF" stroke="#1C1917" strokeWidth="2" />
    </g>
    <g transform="translate(157, 235)">
      <rect x="0" y="4" width="28" height="14" rx="7" fill="#F59E0B" stroke="#1C1917" strokeWidth="2.5" />
      <rect x="-2" y="14" width="32" height="6" rx="3" fill="#FFFFFF" stroke="#1C1917" strokeWidth="2" />
    </g>
  </svg>
);

/* =========================================================================
   7. COIN TRIO: 3 adorable mini baby papads stacked together!
   ========================================================================= */
const CoinTrioSVG = () => (
  <svg viewBox="0 0 320 300" className="w-full h-full filter drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Coin 1: Left */}
    <g transform="translate(30, 90)">
      <circle cx="50" cy="50" r="46" fill="#FDE68A" stroke="#1C1917" strokeWidth="4.5" />
      <circle cx="40" cy="45" r="5" fill="#1C1917" />
      <circle cx="60" cy="45" r="5" fill="#1C1917" />
      <path d="M 44 58 Q 50 66 56 58" stroke="#1C1917" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="33" cy="54" r="4" fill="#F87171" />
      <circle cx="67" cy="54" r="4" fill="#F87171" />
    </g>

    {/* Coin 2: Right */}
    <g transform="translate(150, 85)">
      <circle cx="50" cy="50" r="46" fill="#FCD34D" stroke="#1C1917" strokeWidth="4.5" />
      <ellipse cx="40" cy="46" rx="5" ry="7" fill="#1C1917" />
      <ellipse cx="60" cy="46" rx="5" ry="7" fill="#1C1917" />
      <circle cx="38" cy="43" r="2" fill="#FFFFFF" />
      <circle cx="58" cy="43" r="2" fill="#FFFFFF" />
      <path d="M 45 60 Q 50 68 55 60 Z" fill="#DC2626" stroke="#1C1917" strokeWidth="2" />
      <circle cx="32" cy="56" r="4" fill="#F87171" />
      <circle cx="68" cy="56" r="4" fill="#F87171" />
    </g>

    {/* Coin 3: Center & In Front (Smiling Star!) */}
    <g transform="translate(90, 140)">
      <circle cx="65" cy="65" r="56" fill="#FBBF24" stroke="#1C1917" strokeWidth="5.5" />
      <circle cx="45" cy="42" r="2.5" fill="#1C1917" />
      <circle cx="85" cy="42" r="2.5" fill="#1C1917" />
      <circle cx="50" cy="58" r="7" fill="#1C1917" />
      <circle cx="80" cy="58" r="7" fill="#1C1917" />
      <circle cx="48" cy="55" r="2.5" fill="#FFFFFF" />
      <circle cx="78" cy="55" r="2.5" fill="#FFFFFF" />
      <path d="M 56 74 Q 65 92 74 74 Z" fill="#991B1B" stroke="#1C1917" strokeWidth="3" />
      <circle cx="65" cy="81" r="3" fill="#F472B6" />
      <ellipse cx="38" cy="72" rx="7" ry="5" fill="#EF4444" />
      <ellipse cx="92" cy="72" rx="7" ry="5" fill="#EF4444" />
    </g>
  </svg>
);

/* =========================================================================
   8. FLOATING BUDDY: Compact companion for floating interactive widget
   ========================================================================= */
const FloatingBuddySVG = () => (
  <svg viewBox="0 0 160 160" className="w-full h-full filter drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="80" cy="80" r="62" fill="#FDE68A" stroke="#1C1917" strokeWidth="5" />
    <circle cx="50" cy="55" r="8" fill="#F59E0B" opacity="0.4" />
    <circle cx="110" cy="105" r="10" fill="#F59E0B" opacity="0.4" />
    <circle cx="52" cy="55" r="2" fill="#1C1917" />
    <circle cx="108" cy="105" r="2.5" fill="#1C1917" />

    {/* Eyes with high gleam */}
    <ellipse cx="64" cy="75" rx="8" ry="12" fill="#1C1917" />
    <circle cx="61" cy="71" r="3.5" fill="#FFFFFF" />
    <circle cx="66" cy="79" r="1.5" fill="#FFFFFF" />

    <ellipse cx="96" cy="75" rx="8" ry="12" fill="#1C1917" />
    <circle cx="93" cy="71" r="3.5" fill="#FFFFFF" />
    <circle cx="98" cy="79" r="1.5" fill="#FFFFFF" />

    {/* Cheeks */}
    <ellipse cx="52" cy="87" rx="7" ry="4" fill="#F87171" />
    <ellipse cx="108" cy="87" rx="7" ry="4" fill="#F87171" />

    {/* Sweet smile */}
    <path d="M 72 90 Q 80 102 88 90 Z" fill="#991B1B" stroke="#1C1917" strokeWidth="2.5" />
  </svg>
);
