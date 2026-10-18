import React from 'react';
import { Language, StoreConfig } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { PacketCardsShowcase } from '../components/PacketCardsShowcase';
import { ShieldCheck, Sun, Leaf, Package, BadgeCheck, ArrowRight } from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { sound } from '../utils/audioSynth';

interface AboutViewProps {
  currentLang: Language;
  onNavigate: (tab: string) => void;
  onOpenWhatsAppDirect: () => void;
  storeConfig: StoreConfig;
}

export const AboutView: React.FC<AboutViewProps> = ({
  currentLang,
  onNavigate,
  onOpenWhatsAppDirect,
  storeConfig,
}) => {
  const t = TRANSLATIONS[currentLang];

  return (
    <div className="space-y-0 selection:bg-amber-300 selection:text-stone-900">
      {/* SECTION 1: ABOUT HERO (1 Viewport Height on Desktop) */}
      <section className="section-viewport py-6 sm:py-0 bg-[#FFFDF7] border-b-2 border-stone-900 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-left">


              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-stone-900 leading-tight">
                {t.aboutPage.title}
              </h1>

              <div className="flex flex-wrap items-center gap-2 text-[11px] sm:text-xs font-bold text-stone-700">
                <span className="cartoon-badge bg-amber-100 text-stone-900">Kathiyawadi Heritage 🏛️</span>
                <span className="cartoon-badge bg-rose-100 text-stone-900">Unadulterated Dal 🌾</span>
                <span className="cartoon-badge bg-emerald-100 text-stone-900">FSSAI Certified 🛡️</span>
              </div>

              <p className="text-xs sm:text-base text-stone-700 leading-relaxed max-w-2xl font-medium">
                {t.aboutPage.traditionText}
              </p>

              <div className="pt-2 sm:pt-3 flex flex-wrap items-center gap-3 sm:gap-4">
                <button
                  onClick={() => {
                    sound.playPop();
                    onNavigate('products');
                  }}
                  className="cartoon-btn-primary px-5 sm:px-6 py-3 sm:py-3.5 text-xs font-black shadow-[0_4px_0_#1c1917] min-h-[44px]"
                >
                  <span>{t.hero.ctaProducts}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    sound.playCrunch();
                    onOpenWhatsAppDirect();
                  }}
                  className="cartoon-btn-whatsapp px-5 sm:px-6 py-3 sm:py-3.5 text-xs font-black shadow-[0_4px_0_#1c1917] min-h-[44px]"
                >
                  <WhatsAppIcon className="w-4 h-4 shrink-0" />
                  <span>{t.productsSection.orderNow}</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 flex items-center justify-center w-full">
              <PacketCardsShowcase
                currentLang={currentLang}
                onOpenWhatsAppDirect={onOpenWhatsAppDirect}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: INGREDIENTS & DOUGH CRAFT (1 Viewport Height on Desktop) */}
      <section className="section-viewport bg-white border-b-2 border-stone-900 content-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center space-y-8">
          <div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-stone-900">
              {t.aboutPage.ingredientsHeading}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="cartoon-card p-6 space-y-4 bg-[#FFFDF7] group hover:-translate-y-1.5 transition-all">
              <div className="w-16 h-16 rounded-2xl bg-amber-100 border-2 border-stone-900 flex items-center justify-center p-2 shadow-[0_2.5px_0_#1c1917]">
                <img
                  src="/icons/thiings/bowl-of-dhal.png"
                  alt="100% Desi Moong & Udad - 3D Dal from thiings.co"
                  loading="lazy"
                  decoding="async"
                  className="w-12 h-12 object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.15)] group-hover:scale-115 transition-transform select-none"
                />
              </div>
              <div>
                <h3 className="text-base font-black text-stone-900 mb-1">100% Desi Moong & Udad</h3>
                <p className="text-xs text-stone-600 leading-relaxed font-medium">
                  We select clean, unpolished lentils directly from vetted agricultural suppliers in Saurashtra. We never blend maida or cheap starch fillers.
                </p>
              </div>
            </div>

            <div className="cartoon-card p-6 space-y-4 bg-[#FFFDF7] group hover:-translate-y-1.5 transition-all">
              <div className="w-16 h-16 rounded-2xl bg-orange-100 border-2 border-stone-900 flex items-center justify-center p-2 shadow-[0_2.5px_0_#1c1917]">
                <img
                  src="/icons/thiings/spices.png"
                  alt="Whole Cracked Spices - 3D Pepper from thiings.co"
                  loading="lazy"
                  decoding="async"
                  className="w-12 h-12 object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.15)] group-hover:scale-115 transition-transform select-none"
                />
              </div>
              <div>
                <h3 className="text-base font-black text-stone-900 mb-1">Whole Cracked Spices</h3>
                <p className="text-xs text-stone-600 leading-relaxed font-medium">
                  Malabar black pepper and whole cumin seeds are cracked fresh just before kneading. This guarantees vibrant essential oil aroma in every roasted bite.
                </p>
              </div>
            </div>

            <div className="cartoon-card p-6 space-y-4 bg-[#FFFDF7] group hover:-translate-y-1.5 transition-all">
              <div className="w-16 h-16 rounded-2xl bg-yellow-100 border-2 border-stone-900 flex items-center justify-center p-2 shadow-[0_2.5px_0_#1c1917]">
                <img
                  src="/icons/thiings/oil.png"
                  alt="Cold-Pressed Groundnut Oil - 3D Oil from thiings.co"
                  loading="lazy"
                  decoding="async"
                  className="w-12 h-12 object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.15)] group-hover:scale-115 transition-transform select-none"
                />
              </div>
              <div>
                <h3 className="text-base font-black text-stone-900 mb-1">Cold-Pressed Groundnut Oil</h3>
                <p className="text-xs text-stone-600 leading-relaxed font-medium">
                  Kneaded with premium Saurashtra groundnut oil and authentic alkaline papad khar for consistent dough elasticity and blister formation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: SUN-DRYING & HYGIENE (1 Viewport Height on Desktop) */}
      <section className="section-viewport bg-[#FFFDF7] border-b-2 border-stone-900 content-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center space-y-4 sm:space-y-6">
          <div>
            <h2 className="text-xl sm:text-3xl font-black tracking-tight text-stone-900">
              {t.aboutPage.processHeading}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-stretch">
            {/* Left Column: Process Description & 3 Outlined Benefit Cards */}
            <div className="space-y-3 sm:space-y-4 text-stone-700 text-xs sm:text-sm leading-relaxed font-medium flex flex-col justify-between h-full">
              <div className="space-y-2 sm:space-y-3 bg-white p-4 sm:p-5 rounded-2xl border-2 border-stone-200">
                <p>{t.aboutPage.processText}</p>
                <p>{t.aboutPage.hygieneText}</p>
              </div>

              {/* 3 Outlined Feature Cards replacing checkmarks */}
              <div className="space-y-2 pt-1">
                <div className="p-2.5 sm:p-3 rounded-xl border-2 border-stone-200 hover:border-stone-900 bg-white flex items-center gap-3 transition-all shadow-xs">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-300 flex items-center justify-center shrink-0">
                    <Leaf className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700 stroke-[1.8]" />
                  </div>
                  <span className="text-xs sm:text-[13px] font-black text-stone-900">
                    No Artificial Preservatives or Synthetic Colours
                  </span>
                </div>

                <div className="p-2.5 sm:p-3 rounded-xl border-2 border-stone-200 hover:border-stone-900 bg-white flex items-center gap-3 transition-all shadow-xs">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-300 flex items-center justify-center shrink-0">
                    <Package className="w-4 h-4 sm:w-5 sm:h-5 text-amber-700 stroke-[1.8]" />
                  </div>
                  <span className="text-xs sm:text-[13px] font-black text-stone-900">
                    Sealed in Moisture-Barrier Multilayer Food Pouches
                  </span>
                </div>

                <div className="p-2.5 sm:p-3 rounded-xl border-2 border-stone-200 hover:border-stone-900 bg-white flex items-center gap-3 transition-all shadow-xs">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-300 flex items-center justify-center shrink-0">
                    <BadgeCheck className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-700 stroke-[1.8]" />
                  </div>
                  <span className="text-xs sm:text-[13px] font-black text-stone-900">
                    FSSAI License Verified: <span className="font-mono text-stone-700">{storeConfig.fssaiLicence}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Enlarged Food Safety Assurance Card with thiings.co 3D Shield */}
            <div className="cartoon-card p-5 sm:p-7 bg-white h-full flex flex-col justify-between relative overflow-hidden">
              {/* Soft decorative background tint */}
              <div className="absolute -top-10 -right-10 w-36 h-36 bg-emerald-50 rounded-full pointer-events-none opacity-70" />

              <div className="space-y-3 sm:space-y-4 relative z-10">
                <div className="flex items-center gap-3 sm:gap-4">
                  {/* Enlarged 3D Verified Shield from thiings.co */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 p-1.5 sm:p-2 bg-emerald-50 rounded-2xl border-2 border-stone-900 shadow-[0_3px_0_#1c1917] flex items-center justify-center">
                    <img
                      src="/icons/thiings/verified-shield.png"
                      alt="Food Safety Assurance Verified Shield"
                      className="w-full h-full object-contain drop-shadow-sm hover:scale-110 transition-transform"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-100 border border-stone-900 text-emerald-950 text-[10px] sm:text-[11px] font-black uppercase tracking-wider">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                      FSSAI Compliant
                    </div>
                    <h3 className="text-sm sm:text-base font-black text-stone-900 leading-tight">
                      Food Safety Assurance
                    </h3>
                    <p className="text-[11px] sm:text-xs text-stone-500 font-bold">
                      Government of India Standard
                    </p>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-medium">
                  All manufacturing and packaging protocols at Sakshi Pradip Papad adhere to the hygiene criteria laid out by the Food Safety and Standards Authority of India (FSSAI).
                </p>

                {/* Hygiene Quality Chips */}
                <div className="grid grid-cols-2 gap-2 pt-1 text-[11px] font-bold">
                  <div className="p-2 sm:p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-800 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                    <span>Hygienic Facility</span>
                  </div>
                  <div className="p-2 sm:p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-stone-800 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
                    <span>100% Food-Grade</span>
                  </div>
                </div>
              </div>

              {/* Official License Badge at Bottom */}
              <div className="pt-3 sm:pt-4 mt-3 border-t-2 border-stone-200 relative z-10">
                <div className="p-2.5 sm:p-3 bg-amber-50 rounded-xl border-2 border-stone-900 flex items-center justify-between shadow-[0_2px_0_#1c1917]">
                  <div>
                    <span className="text-[9px] sm:text-[10px] font-bold text-stone-500 uppercase tracking-wider block">Central License Number</span>
                    <span className="text-xs sm:text-sm font-black font-mono text-stone-900">{storeConfig.fssaiLicence}</span>
                  </div>
                  <div className="px-2 py-0.5 sm:py-1 bg-emerald-100 rounded-lg border border-stone-900 text-[10px] font-black text-emerald-950">
                    Active & Verified
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
