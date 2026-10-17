import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export interface PacketItem {
  id: string;
  name: string;
  glowColor: string;
  image: string;
}

export const PACKET_ITEMS: PacketItem[] = [
  {
    id: 'udad-jeera',
    name: 'Udad Jeera Papad',
    glowColor: 'rgba(30, 64, 175, 0.25)',
    image: '/assets/products/udad-papad-pack.png',
  },
  {
    id: 'moong-mari',
    name: 'Moong Mari Papad',
    glowColor: 'rgba(21, 128, 61, 0.25)',
    image: '/assets/products/moong-papad-pack.png',
  },
  {
    id: 'lasaniya-garlic',
    name: 'Lasaniya Garlic Papad',
    glowColor: 'rgba(185, 28, 28, 0.28)',
    image: '/assets/products/lasaniya-garlic-pack.png',
  },
  {
    id: 'punjabi-double-mari',
    name: 'Punjabi Double Mari',
    glowColor: 'rgba(107, 33, 168, 0.25)',
    image: '/assets/products/punjabi-double-mari-pack.png',
  },
  {
    id: 'sindhi-masala',
    name: 'Sindhi Masala Papad',
    glowColor: 'rgba(180, 83, 9, 0.25)',
    image: '/assets/products/sindhi-masala-pack.png',
  },
  {
    id: 'rice-khichiya',
    name: 'Rice Khichiya Papad',
    glowColor: 'rgba(15, 118, 110, 0.25)',
    image: '/assets/products/rice-khichiya-pack.png',
  },
];

interface PacketCardsShowcaseProps {
  className?: string;
  [key: string]: any;
}

export const PacketCardsShowcase: React.FC<PacketCardsShowcaseProps> = ({
  className = '',
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef<number | null>(null);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const total = PACKET_ITEMS.length;

  const getIndex = (offset: number) => {
    return (activeIndex + offset + total) % total;
  };

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Touch & Mouse Drag Handlers
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    startXRef.current = clientX;
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging || startXRef.current === null) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const delta = clientX - startXRef.current;
    setDragOffset(Math.max(-100, Math.min(100, delta)));
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    if (dragOffset > 40) {
      handlePrev();
    } else if (dragOffset < -40) {
      handleNext();
    }
    setIsDragging(false);
    setDragOffset(0);
    startXRef.current = null;
  };

  // 3 Packets to render in the fanned card spread: Left = -1, Center = 0, Right = 1
  const positions = [-1, 0, 1] as const;
  const spreadOffset = isMobile ? 62 : 85;

  return (
    <div
      className={`relative w-full max-w-[480px] mx-auto select-none flex items-center justify-center py-2 ${className}`}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseMove={handleTouchMove}
      onMouseUp={handleTouchEnd}
    >
      {/* 3 PACKETS FAN SPREAD STAGE */}
      <div className="relative h-[290px] sm:h-[400px] w-full flex items-center justify-center">
        {positions.map((pos) => {
          const itemIndex = getIndex(pos);
          const item = PACKET_ITEMS[itemIndex];
          const isCenter = pos === 0;
          const isLeft = pos === -1;
          const isRight = pos === 1;

          // Calculate fanned transforms
          let transformStyle = '';
          let zIndex = 10;
          let opacity = 0.85;
          let filter = 'drop-shadow(0 10px 18px rgba(0,0,0,0.18))';

          if (isCenter) {
            const dragRotation = (dragOffset / 100) * 8;
            transformStyle = `translateX(${dragOffset}px) translateY(${isMobile ? -6 : -10}px) rotate(${dragRotation}deg) scale(${isMobile ? 1.08 : 1.12})`;
            zIndex = 30;
            opacity = 1;
            filter = `drop-shadow(0 20px 32px rgba(0,0,0,0.22)) drop-shadow(0 0 24px ${item.glowColor})`;
          } else if (isLeft) {
            transformStyle = `translateX(${-spreadOffset + dragOffset * 0.4}px) translateY(${isMobile ? 14 : 20}px) rotate(-13deg) scale(${isMobile ? 0.85 : 0.88})`;
            zIndex = 10;
            opacity = 0.85;
          } else if (isRight) {
            transformStyle = `translateX(${spreadOffset + dragOffset * 0.4}px) translateY(${isMobile ? 14 : 20}px) rotate(13deg) scale(${isMobile ? 0.85 : 0.88})`;
            zIndex = 10;
            opacity = 0.85;
          }

          return (
            <div
              key={item.id}
              onClick={() => {
                if (isLeft) handlePrev();
                if (isRight) handleNext();
              }}
              className={`absolute cursor-pointer will-change-transform ${
                isDragging ? 'transition-none' : 'transition-all duration-400 ease-out'
              } ${isCenter ? '' : 'hover:scale-95 hover:opacity-100 hover:z-25'}`}
              style={{
                transform: transformStyle,
                zIndex,
                opacity,
              }}
            >
              {/* Soft Contact Shadow Under Packet */}
              <div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-32 sm:w-48 h-5 rounded-[100%] bg-stone-900/20 blur-md pointer-events-none transition-all duration-300"
                style={{
                  transform: isCenter ? 'scale(1.1)' : 'scale(0.85)',
                  opacity: isCenter ? 0.35 : 0.18,
                }}
              />

              {/* The Packaging Image */}
              <div className="relative w-[155px] sm:w-[225px] h-auto flex items-center justify-center">
                <img
                  src={item.image}
                  alt={item.name}
                  draggable={false}
                  loading={isCenter ? 'eager' : 'lazy'}
                  decoding="async"
                  className="w-full h-auto max-h-[260px] sm:max-h-[350px] object-contain select-none mix-blend-multiply"
                  style={{ filter }}
                />
              </div>
            </div>
          );
        })}

        {/* Minimal Navigation Arrows */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          aria-label="Previous packet"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/95 hover:bg-white text-stone-900 border-2 border-stone-900 flex items-center justify-center shadow-[2px_2px_0_#1c1917] active:scale-90 transition-all z-40 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 stroke-[3]" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          aria-label="Next packet"
          className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/95 hover:bg-white text-stone-900 border-2 border-stone-900 flex items-center justify-center shadow-[2px_2px_0_#1c1917] active:scale-90 transition-all z-40 cursor-pointer"
        >
          <ChevronRight className="w-4 h-4 stroke-[3]" />
        </button>
      </div>
    </div>
  );
};
