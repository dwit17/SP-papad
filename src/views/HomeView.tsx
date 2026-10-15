import React, { useState } from 'react';
import { Language, ProductItem, StoreConfig } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { PRODUCTS } from '../data/products';
import { CITIES_DELIVERY } from '../data/cities';
import { PapadVisual } from '../components/PapadVisual';
import { MessageSquare, ArrowRight, Check, Plus, ChevronDown, ChevronUp, MapPin, Truck, Sparkles, Flame, Sun, Heart } from 'lucide-react';
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
      <section className="section-viewport bg-[#FFFDF7] border-b-2 border-stone-900 relative overflow-hidden">
        {/* Playful Floating Background Confetti */}
        <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden">
          <div className="absolute top-12 left-10 text-amber-400 text-2xl animate-float-gentle">✨</div>
          <div className="absolute top-28 right-16 text-orange-400 text-xl animate-papad-bounce">✦</div>
          <div className="absolute bottom-20 left-1/4 text-red-400 text-lg animate-float-gentle">★</div>
          <div className="absolute top-1/2 right-12 text-amber-500 text-2xl animate-pulse">☀️</div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Heading, Primary Actions, Playful Badges */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Playful Eyebrow Sticker */}
              <div className="inline-flex items-center gap-2 bg-amber-400 text-stone-900 border-2 border-stone-900 px-3.5 py-1.5 rounded-full font-black text-xs shadow-[0_3px_0_#1c1917] animate-float-gentle">
                <Sparkles className="w-4 h-4 text-stone-900" />
                <span>SAURASHTRA'S CRUNCHIEST TRADITION</span>
                <span className="text-sm">🫓</span>
              </div>

              {/* Single H1 per page */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-stone-900 leading-tight text-balance">
                {t.hero.title}
              </h1>

              {/* Playful Cartoon Badges */}
              <div className="flex flex-wrap items-center gap-2.5 pt-1">
                <span className="cartoon-badge bg-amber-100 text-stone-900">
                  <Sun className="w-3.5 h-3.5 text-amber-600" />
                  {t.hero.highlightSunDried}
                </span>
                <span className="cartoon-badge bg-rose-100 text-stone-900">
                  <Heart className="w-3.5 h-3.5 text-rose-600" />
                  {t.hero.highlightPurity}
                </span>
                <span className="cartoon-badge bg-emerald-100 text-stone-900">
                  <Truck className="w-3.5 h-3.5 text-emerald-600" />
                  {t.hero.highlightDelivery}
                </span>
              </div>

              {/* Two Direct Action Buttons with Chunky 3D Cartoon Styling */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <button
                  onClick={() => {
                    sound.playPop();
                    onNavigate('products');
                  }}
                  className="cartoon-btn-primary px-7 py-4 text-sm sm:text-base font-black shadow-[0_5px_0_#1c1917]"
                >
                  <span>{t.hero.ctaProducts}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => {
                    sound.playCrunch();
                    onOpenWhatsAppDirect();
                  }}
                  className="cartoon-btn-whatsapp px-7 py-4 text-sm sm:text-base font-black shadow-[0_5px_0_#1c1917]"
                >
                  <MessageSquare className="w-5 h-5" />
                  <span>{t.hero.ctaWhatsApp}</span>
                </button>
              </div>

              {/* Regional trust marker in hero */}
              <div className="pt-2 text-xs font-bold text-stone-600 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-600 animate-bounce" />
                <span>Prepared in Rajkot, Gujarat · Dispatched Daily Across India 📦</span>
              </div>
            </div>

            {/* Right Column: High Visual Presence Animated Cute Papad Hero Mascot */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
              {/* Cute speech bubble above hero mascot */}
              <div className="relative mb-2 bg-white border-2 border-stone-900 px-4 py-2 rounded-2xl shadow-[0_4px_0_#1c1917] font-black text-xs text-stone-900 animate-papad-bounce">
                Tap me for a crunch! 😋✨
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r-2 border-b-2 border-stone-900 rotate-45" />
              </div>

              <PapadVisual type="hero_platter" size="hero" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: PRODUCTS (1 Viewport Height on Desktop) */}
      <section className="section-viewport bg-white border-b-2 border-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-600 uppercase tracking-wider mb-1">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <span>CRUNCH FACTORY PICKS</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-stone-900">
                {t.productsSection.title}
              </h2>
            </div>

            <button
              onClick={() => {
                sound.playPop();
                onNavigate('products');
              }}
              className="cartoon-btn-secondary px-4 py-2 text-xs sm:text-sm font-bold shadow-[0_3px_0_#1c1917]"
            >
              <span>{t.hero.ctaProducts}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 3 Featured Products Grid with Chunky Cartoon Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProducts.map((product) => {
              const currentPack = selectedPacks[product.id] || product.packOptions[1]?.size || product.packOptions[0]?.size;
              const isAdded = !!addedIds[product.id];

              return (
                <div
                  key={product.id}
                  className="cartoon-card p-6 flex flex-col justify-between group bg-[#FFFDF7]"
                >
                  <div className="space-y-4">
                    {/* Cute Mascot Avatar */}
                    <div className="flex items-center justify-center py-1">
                      <PapadVisual type={product.visualType} size="md" />
                    </div>

                    <div>
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[11px] font-black text-amber-700 uppercase tracking-wider">
                          {product.categoryLabel[currentLang]}
                        </span>
                        <span className="cartoon-badge bg-amber-100 text-stone-900 text-[10px] py-0.5 px-2">
                          ★ Best Seller
                        </span>
                      </div>
                      <h3 className="text-lg font-black text-stone-900 mt-1">
                        {product.name[currentLang]}
                      </h3>
                    </div>

                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed font-medium">
                      {product.description[currentLang]}
                    </p>

                    {/* Pack size selector */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[11px] font-black text-stone-700 block">
                        {t.productsSection.selectPack}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {product.packOptions.map((opt) => (
                          <button
                            key={opt.size}
                            onClick={() => handlePackChange(product.id, opt.size)}
                            className={`px-3 py-1 text-xs font-black rounded-xl border-2 transition-all cursor-pointer ${
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
                  <div className="pt-4 mt-4 border-t-2 border-stone-200 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleAdd(product)}
                      className="cartoon-btn-secondary py-2.5 px-2 text-xs font-black shadow-[0_3px_0_#1c1917]"
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
                      className="cartoon-btn-whatsapp py-2.5 px-2 text-xs font-black shadow-[0_3px_0_#1c1917]"
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
      <section className="section-viewport bg-[#FFFDF7] border-b-2 border-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center space-y-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-600 uppercase tracking-wider mb-1">
              <Sun className="w-3.5 h-3.5 text-amber-500" />
              <span>THE SECRET RECIPE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-stone-900">
              {t.qualitySection.title}
            </h2>
          </div>

          {/* 4 Playful Fact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { num: '01', title: t.qualitySection.fact1Title, desc: t.qualitySection.fact1Desc, emoji: '🌾' },
              { num: '02', title: t.qualitySection.fact2Title, desc: t.qualitySection.fact2Desc, emoji: '☀️' },
              { num: '03', title: t.qualitySection.fact3Title, desc: t.qualitySection.fact3Desc, emoji: '🌶️' },
              { num: '04', title: t.qualitySection.fact4Title, desc: t.qualitySection.fact4Desc, emoji: '🛡️' },
            ].map((fact) => (
              <div
                key={fact.num}
                className="cartoon-card p-5 space-y-3 bg-white"
              >
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-full bg-amber-400 text-stone-900 border-2 border-stone-900 font-black text-xs flex items-center justify-center shadow-[0_2px_0_#1c1917]">
                    {fact.num}
                  </span>
                  <span className="text-2xl">{fact.emoji}</span>
                </div>
                <h3 className="text-sm font-black text-stone-900">
                  {fact.title}
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed font-medium">
                  {fact.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: STORY (1 Viewport Height on Desktop) */}
      <section className="section-viewport bg-white border-b-2 border-stone-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center space-y-6">
          <div className="cartoon-card p-8 sm:p-10 bg-[#FFFDF7] space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🏺</span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-stone-900">
                {t.storySection.title}
              </h2>
            </div>

            <div className="space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed font-medium">
              <p>{t.storySection.paragraph1}</p>
              <p>{t.storySection.paragraph2}</p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  sound.playPop();
                  onNavigate('about');
                }}
                className="cartoon-btn-secondary px-5 py-2.5 text-sm font-black shadow-[0_3px_0_#1c1917]"
              >
                <span>{t.storySection.ctaReadMore}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: WHERE WE SELL / DELIVER (1 Viewport Height on Desktop) */}
      <section className="section-viewport bg-[#FFFDF7] border-b-2 border-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-600 uppercase tracking-wider mb-1">
              <Truck className="w-3.5 h-3.5 text-amber-500" />
              <span>SUPER FAST SUPPLY NETWORK</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-stone-900">
              {t.deliverySection.title}
            </h2>
          </div>

          {/* City Selection Matrix & Delivery Timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 cartoon-card p-6 space-y-5 bg-white">
              <span className="text-xs font-black text-stone-800 block">
                {t.deliverySection.checkCityPrompt}
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {CITIES_DELIVERY.map((city) => (
                  <button
                    key={city.id}
                    onClick={() => {
                      sound.playPop();
                      setSelectedCityId(city.id);
                    }}
                    className={`p-3 rounded-xl text-left border-2 text-xs transition-all cursor-pointer ${
                      selectedCityId === city.id
                        ? 'border-stone-900 bg-amber-400 text-stone-900 font-black shadow-[0_3px_0_#1c1917] -translate-y-0.5'
                        : 'border-stone-200 bg-stone-50 hover:border-stone-900 text-stone-800'
                    }`}
                  >
                    <span className="block font-black">{city.city[currentLang]}</span>
                    <span className={`text-[10px] font-bold ${selectedCityId === city.id ? 'text-stone-800' : 'text-stone-500'}`}>
                      {city.state[currentLang]}
                    </span>
                  </button>
                ))}
              </div>

              <div className="pt-4 border-t-2 border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-red-100 border-2 border-stone-900 flex items-center justify-center">
                    <Truck className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[11px]">{t.deliverySection.deliveryTimeLabel}:</span>
                    <span className="font-black text-stone-900 text-sm">{selectedCity.estimatedDays}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 border-2 border-stone-900 flex items-center justify-center">
                    <Check className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[11px]">Supply Availability:</span>
                    <span className="font-black text-stone-900 text-sm">Retail & Wholesale Stock</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 cartoon-card p-6 space-y-4 bg-amber-50">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🇮🇳</span>
                <h3 className="text-base font-black text-stone-900">
                  Pan-India Supply & Transport
                </h3>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed font-medium">
                {t.deliverySection.panIndiaNote}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    sound.playCrunch();
                    onOpenWhatsAppDirect(`Delivery enquiry for ${selectedCity.city.en}`);
                  }}
                  className="w-full cartoon-btn-whatsapp py-3 px-4 text-xs font-black shadow-[0_4px_0_#1c1917]"
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
      <section className="section-viewport bg-white border-b-2 border-stone-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center space-y-6">
          <div className="text-center">
            <span className="text-3xl">❓</span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-stone-900 mt-2">
              {t.faqSection.title}
            </h2>
          </div>

          <div className="space-y-3">
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
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-black text-stone-900 text-sm cursor-pointer hover:bg-amber-50 transition-colors"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-stone-800 shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-stone-800 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 text-xs sm:text-sm text-stone-600 leading-relaxed border-t-2 border-stone-200 pt-4 bg-white font-medium">
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center text-center space-y-6 relative z-10">
          <div className="inline-block mx-auto bg-white border-2 border-stone-900 px-4 py-1.5 rounded-full font-black text-xs shadow-[0_3px_0_#1c1917] animate-papad-bounce">
            ✨ FRESH CRUNCH DISPATCHED DAILY ✨
          </div>

          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-stone-900">
            {t.ctaSection.title}
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => {
                sound.playCrunch();
                onOpenWhatsAppDirect();
              }}
              className="cartoon-btn-whatsapp px-8 py-4 text-base font-black shadow-[0_5px_0_#1c1917]"
            >
              <MessageSquare className="w-5 h-5" />
              <span>{t.ctaSection.buttonText}</span>
            </button>
          </div>

          <div className="text-xs font-bold text-stone-800 space-y-1">
            <p className="font-black text-stone-900">{t.ctaSection.directCallText}</p>
            <p>{t.ctaSection.businessHoursText}</p>
          </div>
        </div>
      </section>
    </div>
  );
};
