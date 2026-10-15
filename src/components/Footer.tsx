import React from 'react';
import { Language, StoreConfig } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { MessageSquare, MapPin, ShieldCheck, Globe } from 'lucide-react';
import { sound } from '../utils/audioSynth';
import { PapadNinjaGame } from './PapadNinjaGame';

interface FooterProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onNavigate: (tab: string) => void;
  storeConfig: StoreConfig;
  onOpenSeoModal: () => void;
  onOpenWhatsAppDirect: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLang,
  onLanguageChange,
  onNavigate,
  storeConfig,
  onOpenSeoModal,
  onOpenWhatsAppDirect,
}) => {
  const t = TRANSLATIONS[currentLang];

  const handleNav = (tab: string) => {
    sound.playPop();
    onNavigate(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full h-[100svh] min-h-[100svh] max-h-[100svh] relative flex flex-col justify-end overflow-hidden bg-white text-stone-900 border-t-4 border-stone-900 select-none">
      {/* 1. THE PAPAD NINJA GAME RUNNING IN THE PURE WHITE BACKGROUND */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <PapadNinjaGame currentLang={currentLang} />
      </div>

      {/* 2. MAIN FOOTER CONTENT ANCHORED BEAUTIFULLY IN A STRUCTURED DOCK CARD */}
      <div className="relative z-10 w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pb-20 sm:pb-24 pointer-events-none">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl border-2 border-stone-900 shadow-[0_5px_0_#1c1917] p-6 sm:p-8 lg:p-9 pointer-events-auto">
          {/* Main 4-Column Information Grid - Perfectly Aligned */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            
            {/* COLUMN 1 — BRAND IDENTITY (~33% width / lg:col-span-4) */}
            <div className="col-span-1 md:col-span-1 lg:col-span-4 space-y-2.5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400 border-2 border-stone-900 shadow-[0_2px_0_#1c1917] flex items-center justify-center shrink-0">
                  <span className="text-xl">🫓</span>
                </div>
                <div>
                  <h3 className="text-lg font-black text-stone-950 tracking-tight leading-tight">
                    {storeConfig.brandName}
                  </h3>
                  <span className="text-[10px] font-bold text-amber-600 tracking-wider uppercase block">
                    100% Sun-Dried · Saurashtra Tradition
                  </span>
                </div>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                Handcrafted with stone-ground lentils, cold-pressed spices & unadulterated hing. Made with love in Rajkot and sun-dried under Gujarat's golden sun.
              </p>

              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-stone-100 rounded-xl border border-stone-300 text-[11px] text-stone-800 font-mono font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>FSSAI: {storeConfig.fssaiLicence}</span>
                </div>
              </div>
            </div>

            {/* COLUMN 2 — EXPLORE NAVIGATION (~17% width / lg:col-span-2) in a balanced 2x2 grid */}
            <div className="col-span-1 md:col-span-1 lg:col-span-2 space-y-2.5">
              <h4 className="text-[11px] font-black uppercase tracking-wider text-amber-700">
                Explore
              </h4>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs font-bold text-stone-800">
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-amber-600 transition-colors cursor-pointer text-left py-0.5"
                >
                  {t.nav.home}
                </button>
                <button
                  onClick={() => handleNav('products')}
                  className="hover:text-amber-600 transition-colors cursor-pointer text-left py-0.5"
                >
                  {t.nav.products}
                </button>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-amber-600 transition-colors cursor-pointer text-left py-0.5"
                >
                  {t.nav.about}
                </button>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-amber-600 transition-colors cursor-pointer text-left py-0.5"
                >
                  {t.nav.contact}
                </button>
              </div>
            </div>

            {/* COLUMN 3 — DISPATCH DESK (~25% width / lg:col-span-3) */}
            <div className="col-span-1 md:col-span-1 lg:col-span-3 space-y-2.5">
              <h4 className="text-[11px] font-black uppercase tracking-wider text-amber-700">
                Dispatch Desk
              </h4>
              <div className="space-y-2 text-xs font-medium">
                <div>
                  <button
                    onClick={() => {
                      sound.playPapadCrunch();
                      onOpenWhatsAppDirect();
                    }}
                    className="cartoon-btn-whatsapp py-1.5 px-3.5 text-xs font-black shadow-[0_2px_0_#1c1917] inline-flex items-center gap-2 cursor-pointer transition-transform hover:scale-102"
                  >
                    <MessageSquare className="w-4 h-4 shrink-0" />
                    <span>WhatsApp: {storeConfig.phoneWhatsApp}</span>
                  </button>
                </div>
                <div className="text-[11px] text-stone-600 flex items-center gap-1.5 pt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  <span>{storeConfig.city}, {storeConfig.state}</span>
                </div>
              </div>
            </div>

            {/* COLUMN 4 — LANGUAGE & SITE INFORMATION (~25% width / lg:col-span-3) */}
            <div className="col-span-1 md:col-span-1 lg:col-span-3 space-y-2.5">
              <h4 className="text-[11px] font-black uppercase tracking-wider text-amber-700">
                Language / ભાષા / भाषा
              </h4>
              <div className="flex gap-1.5">
                {[
                  { code: 'en' as Language, label: 'EN' },
                  { code: 'gu' as Language, label: 'ગુ' },
                  { code: 'hi' as Language, label: 'हिં' },
                ].map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      sound.playPop();
                      onLanguageChange(lang.code);
                    }}
                    className={`px-3 py-1 text-xs rounded-xl border-2 font-black transition-all cursor-pointer ${
                      currentLang === lang.code
                        ? 'border-stone-900 bg-amber-400 text-stone-950 shadow-[0_2px_0_#1c1917]'
                        : 'border-stone-300 bg-white text-stone-700 hover:border-amber-500 shadow-sm'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>

              <div className="pt-0.5">
                <button
                  onClick={() => {
                    sound.playPop();
                    onOpenSeoModal();
                  }}
                  className="inline-flex items-center gap-1.5 text-xs text-stone-600 hover:text-amber-700 transition-colors cursor-pointer font-bold"
                >
                  <Globe className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>{t.footer.seoToolsLink}</span>
                </button>
              </div>
            </div>

          </div>

          {/* Copyright Row inside the dock card */}
          <div className="mt-6 pt-4 border-t border-stone-200/90 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-stone-500 font-medium">
            <p>© {new Date().getFullYear()} {storeConfig.brandName}. {t.footer.copyright}</p>
            <p className="flex items-center gap-1.5">
              <span>Handcrafted with 100% natural lentils in Rajkot, Gujarat</span>
              <span>🌶️</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
