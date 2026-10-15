import React, { useState } from 'react';
import { CutePapadMascot, MascotVariant } from './CutePapadMascot';
import { sound } from '../utils/audioSynth';

interface PapadVisualProps {
  type: 'moong_mari' | 'udad_jeera' | 'garlic_lasaniya' | 'sindhi_masala' | 'rice_khichiya' | 'coin_papad' | 'hero_platter';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showClassicToggle?: boolean;
}

export const PapadVisual: React.FC<PapadVisualProps> = ({
  type,
  className = '',
  size = 'md',
}) => {
  const [clickCount, setClickCount] = useState(0);

  // Map each product type to its dedicated cute mascot variant
  const mascotVariantMap: Record<PapadVisualProps['type'], MascotVariant> = {
    hero_platter: 'hero_dancer',
    moong_mari: 'moong_mari',
    udad_jeera: 'udad_jeera',
    garlic_lasaniya: 'lasaniya_superhero',
    sindhi_masala: 'sindhi_masala',
    rice_khichiya: 'rice_khichiya',
    coin_papad: 'coin_trio',
  };

  const badgeTextMap: Record<PapadVisualProps['type'], string> = {
    hero_platter: '★ SUPER CRUNCHY DANCER ★',
    moong_mari: '🌶️ EXTRA PEPPER CRUNCH',
    udad_jeera: '✨ AROMATIC JEERA',
    garlic_lasaniya: '🦸 SPICY HERO LASANIYA',
    sindhi_masala: '🎉 PARTY MASALA',
    rice_khichiya: '☁️ FLUFFY AIR PUFF',
    coin_papad: '🪙 MINI CRUNCH TRIO',
  };

  const variant = mascotVariantMap[type] || 'hero_dancer';
  const badgeText = size === 'hero' || size === 'lg' ? badgeTextMap[type] : undefined;

  const handleInteraction = () => {
    sound.playCrunch();
    setClickCount((c) => c + 1);
  };

  return (
    <div
      onClick={handleInteraction}
      className={`relative group cursor-pointer inline-flex items-center justify-center p-2 rounded-2xl transition-transform hover:scale-105 active:scale-95 ${className}`}
      title="Click me for a tasty crunch!"
    >
      {/* Background Soft Glow Aura for Hero & Large */}
      {size === 'hero' && (
        <div className="absolute inset-0 bg-gradient-to-tr from-amber-200/50 via-orange-100/40 to-yellow-200/50 rounded-full blur-2xl -z-10 animate-pulse pointer-events-none" />
      )}

      {/* Hero Platter Authentic Brass Thali Ring Behind Mascot */}
      {type === 'hero_platter' && (
        <div className="absolute inset-2 -z-5 rounded-full border-4 border-amber-300/60 bg-amber-50/40 shadow-inner animate-spin-slow pointer-events-none" />
      )}

      {/* The Animated Cute Papad Mascot */}
      <CutePapadMascot
        variant={variant}
        size={size}
        badgeText={badgeText}
        animate={true}
        interactive={true}
      />

      {/* Floating Crunch Count bubble on multi-clicks */}
      {clickCount > 0 && (
        <div className="absolute -top-2 right-2 bg-stone-900 text-amber-300 text-[10px] font-black px-2 py-0.5 rounded-full border border-amber-400 shadow-sm pointer-events-none animate-bounce">
          {clickCount} {clickCount === 1 ? 'Crunch!' : 'Crunches! 🔥'}
        </div>
      )}
    </div>
  );
};
