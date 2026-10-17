import React from 'react';

export interface PapadVisualProps {
  type:
    | 'moong_mari'
    | 'udad_jeera'
    | 'garlic_lasaniya'
    | 'sindhi_masala'
    | 'rice_khichiya'
    | 'coin_papad'
    | 'hero_platter'
    | string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showClassicToggle?: boolean;
}

const PACK_IMAGE_MAP: Record<string, string> = {
  udad_jeera: '/assets/products/udad-papad-pack.png',
  moong_mari: '/assets/products/moong-papad-pack.png',
  garlic_lasaniya: '/assets/products/lasaniya-garlic-pack.png',
  sindhi_masala: '/assets/products/sindhi-masala-pack.png',
  rice_khichiya: '/assets/products/rice-khichiya-pack.png',
  coin_papad: '/assets/products/punjabi-double-mari-pack.png',
  punjabi_double_mari: '/assets/products/punjabi-double-mari-pack.png',
  hero_platter: '/assets/products/udad-papad-pack.png',
};

export const PapadVisual: React.FC<PapadVisualProps> = ({
  type,
  className = '',
  size = 'md',
}) => {
  const imageSrc = PACK_IMAGE_MAP[type] || '/assets/products/udad-papad-pack.png';

  const sizeStyles = {
    sm: 'max-h-[110px] sm:max-h-[130px]',
    md: 'max-h-[165px] sm:max-h-[190px]',
    lg: 'max-h-[220px] sm:max-h-[250px]',
    hero: 'max-h-[280px] sm:max-h-[320px]',
  }[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none py-2 ${className}`}
    >
      {/* Subtle realistic contact shadow under packaging */}
      <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-28 sm:w-36 h-3 rounded-[100%] bg-stone-900/15 blur-sm pointer-events-none" />

      {/* Real Authentic Packaging Product Image */}
      <img
        src={imageSrc}
        alt={type.replace('_', ' ')}
        draggable={false}
        loading="lazy"
        decoding="async"
        className={`w-auto h-auto ${sizeStyles} object-contain mix-blend-multiply drop-shadow-[0_8px_16px_rgba(0,0,0,0.14)] transition-transform duration-300 group-hover:scale-104 pointer-events-none`}
      />
    </div>
  );
};
