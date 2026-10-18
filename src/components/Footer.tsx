import React from 'react';
import { Language, StoreConfig } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { MapPin, ShieldCheck, Globe } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
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
  };

  return (
    <footer className="w-full min-h-[100vh] min-h-[100svh] min-h-[100dvh] lg:h-[100svh] lg:max-h-[100svh] relative flex flex-col justify-end overflow-hidden bg-white text-stone-900 border-t-4 border-stone-900 select-none">
      {/* 1. THE PAPAD NINJA GAME RUNNING IN THE PURE WHITE BACKGROUND */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <PapadNinjaGame currentLang={currentLang} />
      </div>

      {/* 2. MAIN FOOTER CONTENT ANCHORED BEAUTIFULLY IN A STRUCTURED DOCK CARD */}
      <div className="relative z-10 w-full max-w-[1360px] mx-auto px-3 sm:px-6 lg:px-8 pb-20 sm:pb-22 lg:pb-24 pointer-events-none">
        <div className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl border-2 border-stone-900 shadow-[0_4px_0_#1c1917] sm:shadow-[0_5px_0_#1c1917] p-4 sm:p-7 lg:p-8 pointer-events-auto">
          {/* Main Information Grid - 2 cols on mobile, 4 cols on desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-start">
            
            {/* COLUMN 1 — BRAND IDENTITY (Full width on mobile, 4 cols on desktop) */}
            <div className="col-span-2 sm:col-span-2 lg:col-span-4 space-y-2">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-400 border-2 border-stone-900 shadow-[0_2px_0_#1c1917] flex items-center justify-center shrink-0">
                  <span className="text-lg sm:text-xl">🫓</span>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-stone-950 tracking-tight leading-tight">
                    {storeConfig.brandName}
                  </h3>
                </div>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed font-medium line-clamp-2 sm:line-clamp-none">
                Handcrafted with stone-ground lentils, cold-pressed spices & unadulterated hing. Made with love in Rajkot and sun-dried under Gujarat's golden sun.
              </p>

              <div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-stone-100 rounded-lg border border-stone-300 text-[10px] sm:text-[11px] text-stone-800 font-mono font-bold">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>FSSAI: {storeConfig.fssaiLicence}</span>
                </div>
              </div>
            </div>

            {/* COLUMN 2 — EXPLORE NAVIGATION (1 col on mobile, 2 cols on desktop) */}
            <div className="col-span-1 sm:col-span-1 lg:col-span-2 space-y-1.5 sm:space-y-2">
              <h4 className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-amber-700">
                Explore
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-1 text-xs font-bold text-stone-800">
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

            {/* COLUMN 3 — DISPATCH DESK (1 col on mobile, 3 cols on desktop) */}
            <div className="col-span-1 sm:col-span-1 lg:col-span-3 space-y-1.5 sm:space-y-2">
              <h4 className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-amber-700">
                Dispatch Desk
              </h4>
              <div className="space-y-1.5 text-xs font-medium">
                <div>
                  <button
                    onClick={() => {
                      sound.playPapadCrunch();
                      onOpenWhatsAppDirect();
                    }}
                    className="cartoon-btn-whatsapp py-1 px-2.5 sm:py-1.5 sm:px-3.5 text-[11px] sm:text-xs font-black shadow-[0_2px_0_#1c1917] inline-flex items-center gap-1.5 cursor-pointer transition-transform hover:scale-102"
                  >
                    <WhatsAppIcon className="w-3.5 h-3.5 shrink-0" />
                    <span>WhatsApp Chat</span>
                  </button>
                </div>
                <div className="text-[10px] sm:text-[11px] text-stone-600 flex items-center gap-1 pt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  <span>{storeConfig.city}, {storeConfig.state}</span>
                </div>
              </div>
            </div>

            {/* COLUMN 4 — LANGUAGE & SITE INFORMATION (Full width on mobile, 3 cols on desktop) */}
            <div className="col-span-2 sm:col-span-2 lg:col-span-3 space-y-1.5 sm:space-y-2 pt-1 sm:pt-0 border-t sm:border-t-0 border-stone-200">
              <div className="flex items-center justify-between sm:block">
                <h4 className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-amber-700 block sm:mb-1.5">
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
                      className={`px-2.5 py-0.5 sm:px-3 sm:py-1 text-xs rounded-xl border-2 font-black transition-all cursor-pointer ${
                        currentLang === lang.code
                          ? 'border-stone-900 bg-amber-400 text-stone-950 shadow-[0_2px_0_#1c1917]'
                          : 'border-stone-300 bg-white text-stone-700 hover:border-amber-500 shadow-xs'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-0.5">
                <button
                  onClick={() => {
                    sound.playPop();
                    onOpenSeoModal();
                  }}
                  className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs text-stone-600 hover:text-amber-700 transition-colors cursor-pointer font-bold"
                >
                  <Globe className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span>{t.footer.seoToolsLink}</span>
                </button>
              </div>
            </div>

          </div>

          {/* Legal Links & Copyright Row inside the dock card */}
          <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-stone-200/90 flex flex-col lg:flex-row items-center justify-between gap-2.5 text-[10px] sm:text-xs text-stone-500 font-medium text-center lg:text-left">
            <p>© {new Date().getFullYear()} {storeConfig.brandName}. {t.footer.copyright}</p>

            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-black text-stone-700">
              <button onClick={() => handleNav('checkout')} className="hover:text-amber-600 cursor-pointer transition-colors">
                Checkout
              </button>
              <span>•</span>
              <button onClick={() => handleNav('shipping-policy')} className="hover:text-amber-600 cursor-pointer transition-colors">
                Shipping Policy
              </button>
              <span>•</span>
              <button onClick={() => handleNav('terms')} className="hover:text-amber-600 cursor-pointer transition-colors">
                Terms & Conditions
              </button>
              <span>•</span>
              <button onClick={() => handleNav('privacy-policy')} className="hover:text-amber-600 cursor-pointer transition-colors">
                Privacy Policy
              </button>
            </div>

            <p className="flex items-center gap-1 font-bold text-stone-600">
              <span>Handcrafted in Rajkot, Gujarat</span>
              <span>🌶️</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
