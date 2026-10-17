import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { MessageSquare, ShoppingBag, Menu, X, ShieldCheck } from 'lucide-react';
import { sound } from '../utils/audioSynth';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  activeTab: string;
  onNavigate: (tab: string) => void;
  totalEnquiriesCount: number;
  onOpenBasket: () => void;
  onOpenWhatsAppDirect: () => void;
  onOpenConfigModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  activeTab,
  onNavigate,
  totalEnquiriesCount,
  onOpenBasket,
  onOpenWhatsAppDirect,
  onOpenConfigModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[currentLang];

  const handleNavClick = (tab: string) => {
    sound.playPop();
    onNavigate(tab);
    setMobileMenuOpen(false);
  };

  const handleLangSelect = (lang: Language) => {
    sound.playPop();
    onLanguageChange(lang);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FFFDF7]/95 backdrop-blur-md border-b-2 border-stone-900 shadow-[0_4px_0_rgba(28,25,23,0.08)] transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2 sm:gap-4 lg:gap-8">
        {/* Zone 1: Brand wordmark with clean responsive layout */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left group cursor-pointer focus-visible:outline-none flex items-center gap-2 sm:gap-2.5 transition-transform hover:scale-105 active:scale-95 min-w-0 shrink"
        >
          {/* Header Papad Logo Avatar */}
          <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full bg-amber-100 border-2 border-stone-900 shadow-[0_2px_0_#1c1917] sm:shadow-[0_3px_0_#1c1917] flex items-center justify-center shrink-0 group-hover:rotate-6 transition-transform">
            <svg viewBox="0 0 100 100" className="w-6 h-6 sm:w-8 sm:h-8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="42" fill="#FDE68A" stroke="#1C1917" strokeWidth="4" />
              <circle cx="38" cy="44" r="4" fill="#1C1917" />
              <circle cx="62" cy="44" r="4" fill="#1C1917" />
              <circle cx="36" cy="42" r="1.5" fill="#FFFFFF" />
              <circle cx="60" cy="42" r="1.5" fill="#FFFFFF" />
              <path d="M 42 56 Q 50 68 58 56 Z" fill="#DC2626" stroke="#1C1917" strokeWidth="2.5" />
              <circle cx="30" cy="52" r="3.5" fill="#F87171" />
              <circle cx="70" cy="52" r="3.5" fill="#F87171" />
            </svg>
          </div>

          <div className="min-w-0">
            <span className="text-sm sm:text-xl font-black tracking-tight text-stone-900 truncate block leading-tight">
              Sakshi Pradip
            </span>
            <span className="text-[10px] sm:text-xs font-black tracking-wider text-amber-700 uppercase block -mt-0.5">
              Papad
            </span>
          </div>
        </button>

        {/* Zone 2: Desktop Cartoon Nav Links + Language Switcher */}
        <nav className="hidden md:flex items-center gap-3 lg:gap-5 text-sm font-bold text-stone-700">
          {[
            { id: 'home', label: t.nav.home },
            { id: 'products', label: t.nav.products },
            { id: 'about', label: t.nav.about },
            { id: 'contact', label: t.nav.contact },
          ].map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`cursor-pointer px-3.5 py-1.5 rounded-xl border-2 transition-all ${
                  isActive
                    ? 'bg-amber-400 text-stone-900 border-stone-900 shadow-[0_3px_0_#1c1917] font-black'
                    : 'border-transparent text-stone-700 hover:text-stone-900 hover:bg-stone-100 hover:border-stone-300'
                }`}
              >
                {item.label}
              </button>
            );
          })}

          {/* Chunky Cartoon Language Switcher */}
          <div className="flex items-center gap-1.5 border-l-2 border-stone-300 pl-4">
            {[
              { code: 'en' as Language, label: 'EN', title: 'English' },
              { code: 'hi' as Language, label: 'हिं', title: 'हिन्दी' },
              { code: 'gu' as Language, label: 'ગુ', title: 'ગુજરાતી' },
            ].map((lang) => {
              const isSelected = currentLang === lang.code;
              return (
                <button
                  key={lang.code}
                  onClick={() => handleLangSelect(lang.code)}
                  className={`px-2 py-1 text-xs font-black rounded-lg border-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-stone-900 text-amber-300 border-stone-900 shadow-[0_2px_0_#1c1917]'
                      : 'bg-white text-stone-700 border-stone-300 hover:border-stone-900'
                  }`}
                  title={lang.title}
                >
                  {lang.label}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Zone 3: Streamlined Mobile & Desktop Actions (Zero Congestion) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Enquiry List Drawer trigger */}
          <button
            onClick={() => {
              sound.playPop();
              onOpenBasket();
            }}
            className="relative p-2 sm:p-2.5 text-stone-900 bg-white border-2 border-stone-900 rounded-xl shadow-[0_2px_0_#1c1917] sm:shadow-[0_3px_0_#1c1917] hover:shadow-[0_4px_0_#1c1917] hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[0_1px_0_#1c1917] transition-all cursor-pointer"
            aria-label="View Enquiry Basket"
            title={t.nav.basket}
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
            {totalEnquiriesCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] sm:text-[11px] font-black w-4.5 h-4.5 sm:w-5 sm:h-5 rounded-full border-2 border-stone-900 flex items-center justify-center shadow-xs animate-bounce">
                {totalEnquiriesCount}
              </span>
            )}
          </button>

          {/* Primary Action Button (WhatsApp) - Visible on tablet and desktop */}
          <button
            onClick={() => {
              sound.playCrunch();
              onOpenWhatsAppDirect();
            }}
            className="hidden sm:inline-flex cartoon-btn-whatsapp px-3.5 sm:px-4 py-2 text-xs lg:text-sm shadow-[0_3px_0_#1c1917]"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{t.nav.enquireWhatsApp}</span>
          </button>

          {/* Quick Config / FSSAI button - Visible on desktop/tablet to keep mobile spacious */}
          {onOpenConfigModal && (
            <button
              onClick={() => {
                sound.playPop();
                onOpenConfigModal();
              }}
              className="hidden md:inline-flex p-2.5 text-stone-700 hover:text-stone-900 bg-amber-50 border-2 border-stone-900 rounded-xl shadow-[0_3px_0_#1c1917] transition-all cursor-pointer hover:-translate-y-0.5 active:translate-y-0.5"
              title="Store Information & FSSAI Details"
              aria-label="Store Information"
            >
              <ShieldCheck className="w-5 h-5 text-amber-700" />
            </button>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => {
              sound.playPop();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="md:hidden p-2 text-stone-900 border-2 border-stone-900 rounded-xl bg-amber-400 shadow-[0_2px_0_#1c1917] active:translate-y-0.5 transition-all cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation (Spacious, Elegant, Touch-Friendly) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FFFDF7] border-b-2 border-stone-900 px-4 py-4 space-y-3.5 shadow-xl animate-fade-in" data-lenis-prevent>
          {/* Navigation links */}
          <nav className="flex flex-col space-y-1.5 text-sm font-black text-stone-900">
            {[
              { id: 'home', label: t.nav.home },
              { id: 'products', label: t.nav.products },
              { id: 'about', label: t.nav.about },
              { id: 'contact', label: t.nav.contact },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left py-2.5 px-3.5 rounded-xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                  activeTab === item.id
                    ? 'bg-amber-400 border-stone-900 shadow-[0_3px_0_#1c1917]'
                    : 'border-transparent text-stone-800 hover:bg-stone-100'
                }`}
              >
                <span>{item.label}</span>
                {activeTab === item.id && <span className="text-xs">👉</span>}
              </button>
            ))}
          </nav>

          {/* Mobile Language Switcher Row */}
          <div className="pt-2 flex items-center justify-between border-t border-stone-200 text-xs">
            <span className="text-stone-700 font-bold">Language / ભાષા:</span>
            <div className="flex gap-1.5">
              {[
                { code: 'en' as Language, label: 'English' },
                { code: 'gu' as Language, label: 'ગુજરાતી' },
                { code: 'hi' as Language, label: 'हिन्दी' },
              ].map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLangSelect(lang.code)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-black border-2 cursor-pointer transition-all ${
                    currentLang === lang.code
                      ? 'bg-stone-900 text-amber-300 border-stone-900 shadow-[0_2px_0_#1c1917]'
                      : 'bg-white border-stone-300 text-stone-700'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile FSSAI Store Info Row */}
          {onOpenConfigModal && (
            <button
              onClick={() => {
                sound.playPop();
                setMobileMenuOpen(false);
                onOpenConfigModal();
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-xl border-2 border-stone-900 bg-amber-50 text-xs font-bold text-stone-800 shadow-[0_2px_0_#1c1917] cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-700" />
                <span>FSSAI Certified • ISO 9001:2015</span>
              </div>
              <span className="text-[10px] text-amber-800 font-extrabold uppercase bg-amber-200/80 px-2 py-0.5 rounded border border-amber-300">
                Verified
              </span>
            </button>
          )}

          {/* Primary Mobile WhatsApp Action */}
          <div className="pt-1">
            <button
              onClick={() => {
                sound.playCrunch();
                setMobileMenuOpen(false);
                onOpenWhatsAppDirect();
              }}
              className="w-full py-2.5 cartoon-btn-whatsapp text-xs font-black shadow-[0_3px_0_#1c1917] flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t.nav.enquireWhatsApp}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
