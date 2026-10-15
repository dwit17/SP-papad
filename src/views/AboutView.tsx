import React from 'react';
import { Language, StoreConfig } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { PapadVisual } from '../components/PapadVisual';
import { ShieldCheck, Sun, CheckCircle2, Award, ArrowRight } from 'lucide-react';

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
    <div className="space-y-0">
      {/* SECTION 1: ABOUT HERO (1 Viewport Height on Desktop) */}
      <section className="section-viewport bg-[#FAF7F2] border-b border-[#E7DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-left">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1C1917] leading-tight">
                {t.aboutPage.title}
              </h1>

              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-stone-600 font-medium">
                <span>Kathiyawadi Heritage</span>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span>Unadulterated Dal</span>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span>FSSAI Certified</span>
              </div>

              <p className="text-sm sm:text-base text-stone-700 leading-relaxed max-w-2xl">
                {t.aboutPage.traditionText}
              </p>

              <div className="pt-2 flex items-center gap-4">
                <button
                  onClick={() => onNavigate('products')}
                  className="px-6 py-3 bg-[#C2410C] hover:bg-[#9A3412] text-white text-xs font-semibold rounded-md transition-colors cursor-pointer flex items-center gap-2"
                >
                  <span>{t.hero.ctaProducts}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onOpenWhatsAppDirect}
                  className="px-6 py-3 bg-[#15803D] hover:bg-[#166534] text-white text-xs font-semibold rounded-md transition-colors cursor-pointer"
                >
                  {t.nav.enquireWhatsApp}
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 flex items-center justify-center">
              <PapadVisual type="hero_platter" size="hero" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: INGREDIENTS & DOUGH CRAFT (1 Viewport Height on Desktop) */}
      <section className="section-viewport bg-white border-b border-[#E7DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center space-y-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1C1917]">
            {t.aboutPage.ingredientsHeading}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#FAF7F2] border border-[#E7DFD5] rounded-xl space-y-3">
              <span className="text-xs font-bold text-[#C2410C] block">01 / Dal Selection</span>
              <h3 className="text-base font-bold text-stone-900">100% Desi Moong & Udad</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                We select clean, unpolished lentils directly from vetted agricultural suppliers in Saurashtra. We never blend maida or cheap starch fillers.
              </p>
            </div>

            <div className="p-6 bg-[#FAF7F2] border border-[#E7DFD5] rounded-xl space-y-3">
              <span className="text-xs font-bold text-[#C2410C] block">02 / Fresh Spices</span>
              <h3 className="text-base font-bold text-stone-900">Whole Cracked Spices</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Malabar black pepper and whole cumin seeds are cracked fresh just before kneading. This guarantees vibrant essential oil aroma in every roasted bite.
              </p>
            </div>

            <div className="p-6 bg-[#FAF7F2] border border-[#E7DFD5] rounded-xl space-y-3">
              <span className="text-xs font-bold text-[#C2410C] block">03 / Pure Oils</span>
              <h3 className="text-base font-bold text-stone-900">Cold-Pressed Groundnut Oil</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Kneaded with premium Saurashtra groundnut oil and authentic alkaline papad khar for consistent dough elasticity and blister formation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: SUN-DRYING & HYGIENE (1 Viewport Height on Desktop) */}
      <section className="section-viewport bg-[#FAF7F2] border-b border-[#E7DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center space-y-8">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1C1917]">
            {t.aboutPage.processHeading}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4 text-stone-700 text-sm leading-relaxed">
              <p>{t.aboutPage.processText}</p>
              <p>{t.aboutPage.hygieneText}</p>

              <div className="pt-2 space-y-2 text-xs font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>No Artificial Preservatives or Synthetic Colours</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Sealed in Moisture-Barrier Multilayer Food Pouches</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>FSSAI License Verified: {storeConfig.fssaiLicence}</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-[#E7DFD5] p-6 rounded-xl space-y-4">
              <div className="flex items-center gap-3">
                <Award className="w-6 h-6 text-[#C2410C]" />
                <div>
                  <h3 className="text-sm font-bold text-stone-900">Food Safety Assurance</h3>
                  <p className="text-xs text-stone-500">Government of India Standard</p>
                </div>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">
                All manufacturing and packaging protocols at Sakshi Pradip Papad adhere to the hygiene criteria laid out by the Food Safety and Standards Authority of India (FSSAI).
              </p>
              <div className="p-3 bg-stone-50 rounded border border-stone-200 text-xs font-mono text-stone-800">
                Lic. No. {storeConfig.fssaiLicence}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
