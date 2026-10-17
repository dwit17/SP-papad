import React from 'react';
import { Language, StoreConfig } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { PacketCardsShowcase } from '../components/PacketCardsShowcase';
import { ShieldCheck, Sun, CheckCircle2, Award, ArrowRight } from 'lucide-react';
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
                  {t.nav.enquireWhatsApp}
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
            <div className="cartoon-card p-6 space-y-3 bg-[#FFFDF7]">
              <div className="flex items-center justify-end">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="text-base font-black text-stone-900">100% Desi Moong & Udad</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                We select clean, unpolished lentils directly from vetted agricultural suppliers in Saurashtra. We never blend maida or cheap starch fillers.
              </p>
            </div>

            <div className="cartoon-card p-6 space-y-3 bg-[#FFFDF7]">
              <div className="flex items-center justify-end">
                <span className="text-2xl">🌶️</span>
              </div>
              <h3 className="text-base font-black text-stone-900">Whole Cracked Spices</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                Malabar black pepper and whole cumin seeds are cracked fresh just before kneading. This guarantees vibrant essential oil aroma in every roasted bite.
              </p>
            </div>

            <div className="cartoon-card p-6 space-y-3 bg-[#FFFDF7]">
              <div className="flex items-center justify-end">
                <span className="text-2xl">🥜</span>
              </div>
              <h3 className="text-base font-black text-stone-900">Cold-Pressed Groundnut Oil</h3>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                Kneaded with premium Saurashtra groundnut oil and authentic alkaline papad khar for consistent dough elasticity and blister formation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: SUN-DRYING & HYGIENE (1 Viewport Height on Desktop) */}
      <section className="section-viewport bg-[#FFFDF7] border-b-2 border-stone-900 content-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center space-y-8">
          <div>

            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-stone-900">
              {t.aboutPage.processHeading}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 text-stone-700 text-sm leading-relaxed font-medium">
              <p>{t.aboutPage.processText}</p>
              <p>{t.aboutPage.hygieneText}</p>

              <div className="pt-2 space-y-2.5 text-xs font-bold">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>No Artificial Preservatives or Synthetic Colours</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>Sealed in Moisture-Barrier Multilayer Food Pouches</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>FSSAI License Verified: {storeConfig.fssaiLicence}</span>
                </div>
              </div>
            </div>

            <div className="cartoon-card p-7 space-y-4 bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-400 border-2 border-stone-900 flex items-center justify-center shadow-[0_2px_0_#1c1917]">
                  <Award className="w-5 h-5 text-stone-900" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-stone-900">Food Safety Assurance</h3>
                  <p className="text-xs text-stone-500 font-bold">Government of India Standard</p>
                </div>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed font-medium">
                All manufacturing and packaging protocols at Sakshi Pradip Papad adhere to the hygiene criteria laid out by the Food Safety and Standards Authority of India (FSSAI).
              </p>
              <div className="p-3 bg-amber-50 rounded-xl border-2 border-stone-900 text-xs font-black font-mono text-stone-900 shadow-[0_2px_0_#1c1917]">
                Lic. No. {storeConfig.fssaiLicence}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
