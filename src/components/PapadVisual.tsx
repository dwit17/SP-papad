import React from 'react';

interface PapadVisualProps {
  type: 'moong_mari' | 'udad_jeera' | 'garlic_lasaniya' | 'sindhi_masala' | 'rice_khichiya' | 'coin_papad' | 'hero_platter';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
}

export const PapadVisual: React.FC<PapadVisualProps> = ({
  type,
  className = '',
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-24 h-24',
    md: 'w-48 h-48',
    lg: 'w-64 h-64',
    hero: 'w-72 h-72 sm:w-96 sm:h-96 lg:w-[420px] lg:h-[420px]',
  }[size];

  if (type === 'hero_platter') {
    return (
      <div className={`relative flex items-center justify-center ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 500 500" className="w-full h-full drop-shadow-xl" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Authentic Brass Thali Plate */}
          <circle cx="250" cy="250" r="235" fill="#E8D5B5" stroke="#B89758" strokeWidth="6" />
          <circle cx="250" cy="250" r="225" fill="#F4E9D5" stroke="#CFB27C" strokeWidth="2" strokeDasharray="4 4" />
          <circle cx="250" cy="250" r="215" fill="#EFE3CA" />

          {/* Underneath Rice Khichiya Crisp */}
          <circle cx="205" cy="210" r="130" fill="#FAF7F0" stroke="#E5DEC9" strokeWidth="3" opacity="0.95" />
          <circle cx="205" cy="210" r="126" stroke="#DCD3BC" strokeWidth="1" strokeDasharray="3 3" fill="none" />
          {/* Sesame seeds & cumin on khichiya */}
          <ellipse cx="160" cy="180" rx="3" ry="1.5" transform="rotate(35 160 180)" fill="#44403C" opacity="0.7" />
          <ellipse cx="220" cy="160" rx="3" ry="1.5" transform="rotate(-20 220 160)" fill="#78716C" opacity="0.8" />
          <ellipse cx="190" cy="240" rx="2.5" ry="1.5" transform="rotate(60 190 240)" fill="#78716C" opacity="0.7" />
          <circle cx="140" cy="210" r="1.5" fill="#C2410C" opacity="0.6" />

          {/* Second Papad: Udad Jeera with blister rings */}
          <circle cx="280" cy="220" r="125" fill="#F0E0BF" stroke="#D4BC90" strokeWidth="3" opacity="0.95" />
          {/* Roasted blisters */}
          <ellipse cx="270" cy="180" rx="14" ry="9" fill="#E5CE9F" opacity="0.9" />
          <ellipse cx="320" cy="240" rx="18" ry="12" fill="#DFC28A" opacity="0.85" />
          <ellipse cx="250" cy="260" rx="12" ry="7" fill="#E2C996" opacity="0.9" />
          {/* Cumin seeds */}
          <ellipse cx="260" cy="200" rx="4" ry="1.8" transform="rotate(45 260 200)" fill="#573D1C" />
          <ellipse cx="305" cy="195" rx="4.5" ry="2" transform="rotate(-30 305 195)" fill="#573D1C" />
          <ellipse cx="290" cy="270" rx="4" ry="1.8" transform="rotate(15 290 270)" fill="#573D1C" />
          <ellipse cx="330" cy="215" rx="3.5" ry="1.6" transform="rotate(75 330 215)" fill="#573D1C" />

          {/* Top Prime Star: Moong Mari (Black Pepper) Papad */}
          <circle cx="245" cy="275" r="130" fill="#EBDAB6" stroke="#D1BE93" strokeWidth="3.5" />
          {/* Golden blistered roasts */}
          <circle cx="230" cy="240" r="14" fill="#DFCA9D" />
          <circle cx="285" cy="290" r="20" fill="#D6BD8B" />
          <ellipse cx="210" cy="315" rx="16" ry="10" fill="#DFC799" />
          <circle cx="270" cy="240" r="8" fill="#D3BA85" />
          <circle cx="190" cy="270" r="10" fill="#DAC393" />

          {/* Black pepper coarse kernels */}
          <circle cx="230" cy="240" r="3" fill="#1C1917" />
          <circle cx="235" cy="245" r="2" fill="#292524" />
          <circle cx="275" cy="285" r="3.2" fill="#1C1917" />
          <circle cx="282" cy="292" r="2" fill="#292524" />
          <circle cx="265" cy="330" r="3" fill="#1C1917" />
          <circle cx="210" cy="280" r="2.8" fill="#1C1917" />
          <circle cx="180" cy="320" r="2.5" fill="#292524" />
          <circle cx="295" cy="250" r="3" fill="#1C1917" />
          <circle cx="215" cy="220" r="2.5" fill="#292524" />
          <circle cx="250" cy="350" r="2.8" fill="#1C1917" />
          <circle cx="310" cy="310" r="2.2" fill="#292524" />

          {/* Scattering whole spices around the thali edge */}
          <ellipse cx="105" cy="120" rx="5" ry="2.2" transform="rotate(25 105 120)" fill="#78350F" />
          <ellipse cx="120" cy="110" rx="4.5" ry="2" transform="rotate(-40 120 110)" fill="#78350F" />
          <circle cx="390" cy="125" r="4" fill="#1C1917" />
          <circle cx="405" cy="140" r="3.2" fill="#292524" />
          <circle cx="380" cy="145" r="2.5" fill="#44403C" />
          <circle cx="95" cy="370" r="3.5" fill="#1C1917" />
          <ellipse cx="385" cy="380" rx="4.5" ry="2" transform="rotate(65 385 380)" fill="#78350F" />
        </svg>

        {/* Subtle authentic text marker inside hero */}
        <div className="absolute -bottom-2 bg-stone-900/90 text-stone-100 text-xs tracking-wider px-3 py-1 rounded-sm shadow-sm backdrop-blur-xs">
          100% Sun-Dried Saurashtra Tradition
        </div>
      </div>
    );
  }

  if (type === 'moong_mari') {
    return (
      <div className={`relative flex items-center justify-center p-3 bg-stone-50/80 rounded-lg border border-stone-200/80 overflow-hidden ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="88" fill="#EAD8B2" stroke="#CEBA8F" strokeWidth="2.5" />
          {/* Subtle blistered bubbles */}
          <circle cx="85" cy="75" r="10" fill="#DFC699" />
          <circle cx="125" cy="115" r="14" fill="#D8BE8E" />
          <ellipse cx="75" cy="125" rx="12" ry="8" fill="#DFC699" />
          <circle cx="120" cy="70" r="8" fill="#D8BE8E" />
          {/* Cracked black pepper */}
          <circle cx="85" cy="75" r="2.5" fill="#1C1917" />
          <circle cx="120" cy="112" r="2.8" fill="#1C1917" />
          <circle cx="126" cy="118" r="2" fill="#292524" />
          <circle cx="72" cy="124" r="2.2" fill="#1C1917" />
          <circle cx="118" cy="70" r="2" fill="#1C1917" />
          <circle cx="100" cy="100" r="2.6" fill="#1C1917" />
          <circle cx="65" cy="95" r="2" fill="#292524" />
          <circle cx="140" cy="92" r="2.4" fill="#1C1917" />
          <circle cx="95" cy="140" r="2" fill="#1C1917" />
          <circle cx="135" cy="138" r="1.8" fill="#292524" />
        </svg>
      </div>
    );
  }

  if (type === 'udad_jeera') {
    return (
      <div className={`relative flex items-center justify-center p-3 bg-stone-50/80 rounded-lg border border-stone-200/80 overflow-hidden ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="88" fill="#F2E3C4" stroke="#D7C197" strokeWidth="2.5" />
          {/* Golden blisters */}
          <circle cx="80" cy="80" r="12" fill="#E6D1A8" />
          <circle cx="120" cy="120" r="16" fill="#DEC69A" />
          <ellipse cx="115" cy="75" rx="10" ry="6" fill="#E6D1A8" />
          {/* Aromatic cumin seeds */}
          <ellipse cx="80" cy="80" rx="3.5" ry="1.6" transform="rotate(35 80 80)" fill="#69441D" />
          <ellipse cx="120" cy="118" rx="4" ry="1.7" transform="rotate(-25 120 118)" fill="#69441D" />
          <ellipse cx="70" cy="120" rx="3.5" ry="1.6" transform="rotate(70 70 120)" fill="#69441D" />
          <ellipse cx="115" cy="74" rx="3.5" ry="1.6" transform="rotate(10 115 74)" fill="#69441D" />
          <ellipse cx="98" cy="98" rx="3.8" ry="1.7" transform="rotate(-60 98 98)" fill="#69441D" />
          <ellipse cx="135" cy="95" rx="3.2" ry="1.5" transform="rotate(40 135 95)" fill="#69441D" />
          <ellipse cx="65" cy="90" rx="3" ry="1.5" transform="rotate(-15 65 90)" fill="#69441D" />
          <ellipse cx="102" cy="138" rx="3.5" ry="1.6" transform="rotate(30 102 138)" fill="#69441D" />
        </svg>
      </div>
    );
  }

  if (type === 'garlic_lasaniya') {
    return (
      <div className={`relative flex items-center justify-center p-3 bg-stone-50/80 rounded-lg border border-stone-200/80 overflow-hidden ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="88" fill="#E8CBA6" stroke="#CEAB80" strokeWidth="2.5" />
          {/* Garlic and red chili roast flecks */}
          <circle cx="78" cy="82" r="10" fill="#DBB58B" />
          <circle cx="122" cy="115" r="14" fill="#D3A97D" />
          <circle cx="76" cy="80" r="2.5" fill="#991B1B" />
          <circle cx="120" cy="112" r="2.8" fill="#991B1B" />
          <circle cx="124" cy="116" r="2.2" fill="#78350F" />
          <circle cx="95" cy="96" r="2" fill="#991B1B" />
          <circle cx="68" cy="118" r="2.2" fill="#78350F" />
          <circle cx="132" cy="80" r="2.4" fill="#991B1B" />
          <circle cx="105" cy="138" r="2" fill="#991B1B" />
          {/* Garlic clove accent */}
          <path d="M70 140 C65 130 80 125 82 135 C83 142 75 145 70 140 Z" fill="#FDF8ED" stroke="#D6C7AA" strokeWidth="1" />
        </svg>
      </div>
    );
  }

  if (type === 'sindhi_masala') {
    return (
      <div className={`relative flex items-center justify-center p-3 bg-stone-50/80 rounded-lg border border-stone-200/80 overflow-hidden ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="88" fill="#E4C8A0" stroke="#C9A676" strokeWidth="2.5" />
          {/* Spicy flecks: coriander seeds, red chilli, pepper */}
          <circle cx="85" cy="78" r="11" fill="#D3B083" />
          <circle cx="118" cy="120" r="13" fill="#CAA373" />
          <circle cx="85" cy="78" r="2.8" fill="#1C1917" />
          <circle cx="118" cy="120" r="2.6" fill="#991B1B" />
          <ellipse cx="100" cy="95" rx="3.5" ry="2.2" transform="rotate(45 100 95)" fill="#6B4F2C" />
          <circle cx="130" cy="85" r="2.2" fill="#1C1917" />
          <circle cx="70" cy="120" r="2" fill="#991B1B" />
          <circle cx="98" cy="140" r="2.2" fill="#1C1917" />
          <ellipse cx="68" cy="85" rx="3.2" ry="1.8" transform="rotate(-30 68 85)" fill="#6B4F2C" />
        </svg>
      </div>
    );
  }

  if (type === 'rice_khichiya') {
    return (
      <div className={`relative flex items-center justify-center p-3 bg-stone-50/80 rounded-lg border border-stone-200/80 overflow-hidden ${sizeClasses} ${className}`}>
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="100" r="88" fill="#FCFAF2" stroke="#E6DFCC" strokeWidth="2.5" />
          {/* Airy puffed texture */}
          <circle cx="85" cy="85" r="12" fill="#F4EEDC" />
          <circle cx="120" cy="115" r="15" fill="#EFE8D3" />
          {/* Sesame and cumin */}
          <ellipse cx="85" cy="85" rx="3" ry="1.6" transform="rotate(25 85 85)" fill="#573D1C" />
          <ellipse cx="118" cy="115" rx="3.2" ry="1.7" transform="rotate(-35 118 115)" fill="#8C7D6B" />
          <ellipse cx="98" cy="98" rx="2.8" ry="1.5" transform="rotate(65 98 98)" fill="#573D1C" />
          <ellipse cx="130" cy="80" rx="3" ry="1.6" transform="rotate(10 130 80)" fill="#8C7D6B" />
          <circle cx="70" cy="120" r="1.5" fill="#DC2626" opacity="0.7" />
          <circle cx="135" cy="130" r="1.5" fill="#DC2626" opacity="0.6" />
        </svg>
      </div>
    );
  }

  // coin_papad
  return (
    <div className={`relative flex items-center justify-center p-3 bg-stone-50/80 rounded-lg border border-stone-200/80 overflow-hidden ${sizeClasses} ${className}`}>
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="75" cy="80" r="42" fill="#EAD9B4" stroke="#CEB98E" strokeWidth="2" />
        <circle cx="130" cy="120" r="45" fill="#F0E0BF" stroke="#D6C198" strokeWidth="2" />
        <circle cx="125" cy="65" r="32" fill="#E6D3AB" stroke="#CCB587" strokeWidth="2" />
        {/* Crisp blisters */}
        <circle cx="72" cy="78" r="1.8" fill="#1C1917" />
        <ellipse cx="132" cy="120" rx="2.8" ry="1.4" transform="rotate(40 132 120)" fill="#69441D" />
        <circle cx="124" cy="64" r="1.6" fill="#1C1917" />
      </svg>
    </div>
  );
};
