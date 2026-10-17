import React, { useState } from 'react';
import { Language, ProductItem, StoreConfig } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { PRODUCTS } from '../data/products';
import { CITIES_DELIVERY } from '../data/cities';
import { PapadVisual } from '../components/PapadVisual';
import { PapadCrunch } from '../components/PapadCrunch';
import { MessageSquare, ArrowRight, Check, Plus, ChevronDown, ChevronUp, Truck, Sun, Heart } from 'lucide-react';
import { sound } from '../utils/audioSynth';

interface HomeViewProps {
  currentLang: Language;
  onNavigate: (tab: string) => void;
  onAddToEnquiry: (productId: string, packSize: string) => void;
  onOpenWhatsAppDirect: (productName?: string) => void;
  storeConfig: StoreConfig;
}

export const HomeView: React.FC<HomeViewProps> = ({
  currentLang,
  onNavigate,
  onAddToEnquiry,
  onOpenWhatsAppDirect,
  storeConfig,
}) => {
  const t = TRANSLATIONS[currentLang];
  const [selectedPacks, setSelectedPacks] = useState<Record<string, string>>({
    'moong-mari-papad': '500g',
    'udad-jeera-papad': '500g',
    'rice-khichiya-papad': '500g',
  });
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [selectedCityId, setSelectedCityId] = useState<string>('rajkot');

  const featuredProducts = PRODUCTS.slice(0, 3);

  const handlePackChange = (productId: string, packSize: string) => {
    sound.playPop();
    setSelectedPacks((prev) => ({ ...prev, [productId]: packSize }));
  };

  const handleAdd = (product: ProductItem) => {
    sound.playCrunch();
    const packSize = selectedPacks[product.id] || product.packOptions[1]?.size || product.packOptions[0]?.size;
    onAddToEnquiry(product.id, packSize);
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  const selectedCity = CITIES_DELIVERY.find((c) => c.id === selectedCityId) || CITIES_DELIVERY[0];

  return (
    <div className="space-y-0 selection:bg-amber-300 selection:text-stone-900">
      {/* SECTION 1: HERO (1 Viewport Height on Desktop) */}
      <section className="section-viewport py-6 sm:py-0 bg-[#FFFDF7] border-b-2 border-stone-900 relative overflow-hidden">

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center">
            {/* Left Column: Heading, Primary Actions, Playful Badges */}
            <div className="lg:col-span-7 space-y-4 sm:space-y-6 text-left">

              {/* Single H1 per page with responsive fluid typography */}
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-stone-900 leading-tight text-balance">
                {t.hero.title}
              </h1>

              {/* Playful Cartoon Badges */}
              <div className="flex flex-wrap items-center gap-2 pt-0.5">
                <span className="cartoon-badge bg-amber-100 text-stone-900 text-[11px] sm:text-xs">
                  <Sun className="w-3.5 h-3.5 text-amber-600" />
                  {t.hero.highlightSunDried}
                </span>
                <span className="cartoon-badge bg-rose-100 text-stone-900 text-[11px] sm:text-xs">
                  <Heart className="w-3.5 h-3.5 text-rose-600" />
                  {t.hero.highlightPurity}
                </span>
                <span className="cartoon-badge bg-emerald-100 text-stone-900 text-[11px] sm:text-xs">
                  <Truck className="w-3.5 h-3.5 text-emerald-600" />
                  {t.hero.highlightDelivery}
                </span>
              </div>

              {/* Two Direct Action Buttons with Chunky 3D Cartoon Styling */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
                <button
                  onClick={() => {
                    sound.playPop();
                    onNavigate('products');
                  }}
                  className="cartoon-btn-primary px-5 sm:px-7 py-3 sm:py-4 text-xs sm:text-base font-black shadow-[0_4px_0_#1c1917] sm:shadow-[0_5px_0_#1c1917] min-h-[44px]"
                >
                  <span>{t.hero.ctaProducts}</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <button
                  onClick={() => {
                    sound.playCrunch();
                    onOpenWhatsAppDirect();
                  }}
                  className="cartoon-btn-whatsapp px-5 sm:px-7 py-3 sm:py-4 text-xs sm:text-base font-black shadow-[0_4px_0_#1c1917] sm:shadow-[0_5px_0_#1c1917] min-h-[44px]"
                >
                  <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>{t.hero.ctaWhatsApp}</span>
                </button>
              </div>

            </div>

            {/* Right Column: Realistic Papad Cracked & Eaten Animation */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
              <PapadCrunch speed={1.0} sound={true} />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: PRODUCTS (1 Viewport Height on Desktop) */}
      <section className="section-viewport bg-white border-b-2 border-stone-900 content-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center space-y-4 sm:space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-3xl font-black tracking-tight text-stone-900">
                {t.productsSection.title}
              </h2>
            </div>

            <button
              onClick={() => {
                sound.playPop();
                onNavigate('products');
              }}
              className="cartoon-btn-secondary px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-bold shadow-[0_3px_0_#1c1917] min-h-[36px]"
            >
              <span>{t.hero.ctaProducts}</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

          {/* Mobile swipe prompt */}
          <div className="md:hidden flex items-center justify-between text-[11px] font-bold text-amber-800">
            <span>✨ 3 Bestseller Varieties</span>
            <span className="flex items-center gap-1">Swipe 👉</span>
          </div>

          {/* 3 Featured Products: Swipeable Carousel on Mobile, 3-Col Grid on Tablet/Desktop */}
          <div className="flex md:grid md:grid-cols-3 gap-4 md:gap-6 overflow-x-auto md:overflow-visible pb-3 md:pb-0 snap-x snap-mandatory scroll-touch scrollbar-none">
            {featuredProducts.map((product) => {
              const currentPack = selectedPacks[product.id] || product.packOptions[1]?.size || product.packOptions[0]?.size;
              const isAdded = !!addedIds[product.id];

              return (
                <div
                  key={product.id}
                  className="w-[84vw] max-w-[320px] shrink-0 snap-center md:w-auto md:max-w-none md:shrink cartoon-card p-4 sm:p-6 flex flex-col justify-between group bg-[#FFFDF7]"
                >
                  <div className="space-y-3 sm:space-y-4">
                    {/* Cute Mascot Avatar */}
                    <div className="flex items-center justify-center py-1">
                      <PapadVisual type={product.visualType} size="md" />
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-black text-stone-900 mt-0.5">
                        {product.name[currentLang]}
                      </h3>
                    </div>

                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed font-medium">
                      {product.description[currentLang]}
                    </p>

                    {/* Pack size selector */}
                    <div className="space-y-1 pt-1">
                      <span className="text-[11px] font-black text-stone-700 block">
                        {t.productsSection.selectPack}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {product.packOptions.map((opt) => (
                          <button
                            key={opt.size}
                            onClick={() => handlePackChange(product.id, opt.size)}
                            className={`px-2.5 sm:px-3 py-1 text-xs font-black rounded-xl border-2 transition-all cursor-pointer ${
                              currentPack === opt.size
                                ? 'bg-stone-900 border-stone-900 text-amber-300 shadow-[0_2px_0_#1c1917]'
                                : 'bg-white border-stone-300 text-stone-700 hover:border-stone-900 hover:bg-stone-50'
                            }`}
                          >
                            {opt.size}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card actions with 3D tactile buttons */}
                  <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t-2 border-stone-200 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleAdd(product)}
                      className="cartoon-btn-secondary py-2 px-2 text-xs font-black shadow-[0_3px_0_#1c1917] min-h-[40px]"
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-600" />
                          <span>{t.productsSection.addedToEnquiry}</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 text-stone-900" />
                          <span>{t.productsSection.addToEnquiry}</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => {
                        sound.playCrunch();
                        onOpenWhatsAppDirect(product.name[currentLang]);
                      }}
                      className="cartoon-btn-whatsapp py-2 px-2 text-xs font-black shadow-[0_3px_0_#1c1917] min-h-[40px]"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>{t.nav.enquireWhatsApp}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3: QUALITY & PROCESS (1 Viewport Height on Desktop) */}
      <section className="section-viewport bg-[#FFFDF7] border-b-2 border-stone-900 content-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center space-y-5 sm:space-y-8">
          <div>
            <h2 className="text-xl sm:text-3xl font-black tracking-tight text-stone-900">
              {t.qualitySection.title}
            </h2>
          </div>

          {/* 4 Playful Fact Cards: 2x2 on Mobile, 4-Col on Desktop */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {[
              { num: '01', title: t.qualitySection.fact1Title, desc: t.qualitySection.fact1Desc, emoji: '🌾' },
              { num: '02', title: t.qualitySection.fact2Title, desc: t.qualitySection.fact2Desc, emoji: '☀️' },
              { num: '03', title: t.qualitySection.fact3Title, desc: t.qualitySection.fact3Desc, emoji: '🌶️' },
              { num: '04', title: t.qualitySection.fact4Title, desc: t.qualitySection.fact4Desc, emoji: '🛡️' },
            ].map((fact) => (
              <div
                key={fact.num}
                className="cartoon-card p-3.5 sm:p-5 space-y-2 sm:space-y-3 bg-white flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-end mb-1.5 sm:mb-2">
                    <span className="text-xl sm:text-2xl">{fact.emoji}</span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-black text-stone-900 leading-snug">
                    {fact.title}
                  </h3>
                </div>
                <p className="text-[11px] sm:text-xs text-stone-600 leading-relaxed font-medium line-clamp-3 sm:line-clamp-none">
                  {fact.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: STORY (1 Viewport Height on Desktop) */}
      <section className="section-viewport bg-white border-b-2 border-stone-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center space-y-4 sm:space-y-6">
          <div className="cartoon-card p-5 sm:p-8 lg:p-10 bg-[#FFFDF7] space-y-4 sm:space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl sm:text-3xl">🏺</span>
              <h2 className="text-xl sm:text-3xl font-black tracking-tight text-stone-900">
                {t.storySection.title}
              </h2>
            </div>

            <div className="space-y-3 sm:space-y-4 text-stone-700 text-xs sm:text-base leading-relaxed font-medium">
              <p>{t.storySection.paragraph1}</p>
              <p className="hidden sm:block">{t.storySection.paragraph2}</p>
            </div>

            <div className="pt-1 sm:pt-2">
              <button
                onClick={() => {
                  sound.playPop();
                  onNavigate('about');
                }}
                className="cartoon-btn-secondary px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-black shadow-[0_3px_0_#1c1917] min-h-[40px]"
              >
                <span>{t.storySection.ctaReadMore}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: WHERE WE SELL / DELIVER (1 Viewport Height on Desktop) */}
      <section className="section-viewport bg-[#FFFDF7] border-b-2 border-stone-900 content-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center space-y-4 sm:space-y-6">
          <div>
            <h2 className="text-xl sm:text-3xl font-black tracking-tight text-stone-900">
              {t.deliverySection.title}
            </h2>
          </div>

          {/* City Selection Matrix & Delivery Timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start">
            <div className="lg:col-span-7 cartoon-card p-4 sm:p-6 space-y-4 sm:space-y-5 bg-white">
              <span className="text-[11px] sm:text-xs font-black text-stone-800 block">
                {t.deliverySection.checkCityPrompt}
              </span>

              <div className="grid grid-cols-4 sm:grid-cols-4 gap-1.5 sm:gap-2.5">
                {CITIES_DELIVERY.map((city) => (
                  <button
                    key={city.id}
                    onClick={() => {
                      sound.playPop();
                      setSelectedCityId(city.id);
                    }}
                    className={`p-2 sm:p-3 rounded-xl text-left border-2 text-[11px] sm:text-xs transition-all cursor-pointer ${
                      selectedCityId === city.id
                        ? 'border-stone-900 bg-amber-400 text-stone-900 font-black shadow-[0_2px_0_#1c1917] sm:shadow-[0_3px_0_#1c1917] -translate-y-0.5'
                        : 'border-stone-200 bg-stone-50 hover:border-stone-900 text-stone-800'
                    }`}
                  >
                    <span className="block font-black truncate">{city.city[currentLang]}</span>
                    <span className={`text-[9px] sm:text-[10px] font-bold block truncate ${selectedCityId === city.id ? 'text-stone-800' : 'text-stone-500'}`}>
                      {city.state[currentLang]}
                    </span>
                  </button>
                ))}
              </div>

              <div className="pt-3 sm:pt-4 border-t-2 border-stone-200 grid grid-cols-2 gap-2 sm:gap-4 text-xs font-bold">
                <div className="flex items-center gap-2 sm:gap-2.5">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-red-100 border-2 border-stone-900 flex items-center justify-center shrink-0">
                    <Truck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-600" />
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px] sm:text-[11px]">{t.deliverySection.deliveryTimeLabel}:</span>
                    <span className="font-black text-stone-900 text-xs sm:text-sm">{selectedCity.estimatedDays}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-2.5">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-emerald-100 border-2 border-stone-900 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600" />
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px] sm:text-[11px]">Availability:</span>
                    <span className="font-black text-stone-900 text-xs sm:text-sm">Retail & Wholesale</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 cartoon-card p-4 sm:p-6 space-y-3 sm:space-y-4 bg-amber-50">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl">🇮🇳</span>
                <h3 className="text-sm sm:text-base font-black text-stone-900">
                  Pan-India Supply & Transport
                </h3>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed font-medium">
                {t.deliverySection.panIndiaNote}
              </p>
              <div className="pt-1">
                <button
                  onClick={() => {
                    sound.playCrunch();
                    onOpenWhatsAppDirect(`Delivery enquiry for ${selectedCity.city.en}`);
                  }}
                  className="w-full cartoon-btn-whatsapp py-2.5 sm:py-3 px-3 sm:px-4 text-xs font-black shadow-[0_3px_0_#1c1917] sm:shadow-[0_4px_0_#1c1917] min-h-[42px]"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Enquire for {selectedCity.city[currentLang]}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: FAQ (1 Viewport Height on Desktop) */}
      <section className="section-viewport bg-white border-b-2 border-stone-900 content-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center space-y-4 sm:space-y-6">
          <div className="text-center">
            <span className="text-2xl sm:text-3xl">❓</span>
            <h2 className="text-xl sm:text-3xl font-black tracking-tight text-stone-900 mt-1">
              {t.faqSection.title}
            </h2>
          </div>

          <div className="space-y-2.5 sm:space-y-3">
            {t.faqSection.faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="cartoon-card overflow-hidden bg-[#FFFDF7]"
                >
                  <button
                    onClick={() => {
                      sound.playPop();
                      setOpenFaqIndex(isOpen ? null : index);
                    }}
                    className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex items-center justify-between gap-3 sm:gap-4 font-black text-stone-900 text-xs sm:text-sm cursor-pointer hover:bg-amber-50 transition-colors min-h-[44px]"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-stone-800 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-stone-800 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-4 sm:px-6 pb-4 sm:pb-5 text-xs sm:text-sm text-stone-600 leading-relaxed border-t-2 border-stone-200 pt-3 sm:pt-4 bg-white font-medium">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 7: CLOSING CTA (1 Viewport Height on Desktop) */}
      <section className="section-viewport bg-amber-400 border-b-2 border-stone-900 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center text-center space-y-4 sm:space-y-6 relative z-10">

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight text-stone-900">
            {t.ctaSection.title}
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-1 sm:pt-2">
            <button
              onClick={() => {
                sound.playCrunch();
                onOpenWhatsAppDirect();
              }}
              className="cartoon-btn-whatsapp px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-black shadow-[0_4px_0_#1c1917] sm:shadow-[0_5px_0_#1c1917] min-h-[48px]"
            >
              <MessageSquare className="w-5 h-5" />
              <span>{t.ctaSection.buttonText}</span>
            </button>
          </div>

          <div className="text-[11px] sm:text-xs font-bold text-stone-800 space-y-0.5 sm:space-y-1">
            <p className="font-black text-stone-900">{t.ctaSection.directCallText}</p>
            <p>{t.ctaSection.businessHoursText}</p>
          </div>
        </div>
      </section>
    </div>
  );
};
