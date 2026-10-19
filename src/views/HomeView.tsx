import React, { useState } from 'react';
import { Language, ProductItem, StoreConfig } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { PRODUCTS } from '../data/products';
import { CITIES_DELIVERY } from '../data/cities';
import { PapadVisual } from '../components/PapadVisual';
import { PapadCrunch } from '../components/PapadCrunch';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { ArrowRight, Check, Plus, ChevronDown, ChevronUp, Truck, Sun, Heart, PhoneCall, Clock, Sparkles } from 'lucide-react';
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
                <button
                  type="button"
                  onClick={() => sound.playCartoonCrunch(false, 0)}
                  className="cartoon-badge bg-amber-100 text-stone-900 text-[11px] sm:text-xs hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                >
                  <Sun className="w-3.5 h-3.5 text-amber-600" />
                  {t.hero.highlightSunDried}
                </button>
                <button
                  type="button"
                  onClick={() => sound.playCartoonCrunch(false, 1)}
                  className="cartoon-badge bg-rose-100 text-stone-900 text-[11px] sm:text-xs hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5 text-rose-600" />
                  {t.hero.highlightPurity}
                </button>
                <button
                  type="button"
                  onClick={() => sound.playCartoonCrunch(false, 2)}
                  className="cartoon-badge bg-emerald-100 text-stone-900 text-[11px] sm:text-xs hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                >
                  <Truck className="w-3.5 h-3.5 text-emerald-600" />
                  {t.hero.highlightDelivery}
                </button>
              </div>

              {/* Two Direct Action Buttons with Chunky 3D Cartoon Styling */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-1 sm:pt-2">
                <button
                  onClick={() => {
                    sound.playCartoonCrunch(false, 0);
                    onNavigate('products');
                  }}
                  className="cartoon-btn-primary px-5 sm:px-7 py-3 sm:py-4 text-xs sm:text-base font-black shadow-[0_4px_0_#1c1917] sm:shadow-[0_5px_0_#1c1917] min-h-[44px]"
                >
                  <span>{t.hero.ctaProducts}</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <button
                  onClick={() => {
                    sound.playCartoonCrunch(true, 1);
                    onOpenWhatsAppDirect();
                  }}
                  className="cartoon-btn-whatsapp px-5 sm:px-7 py-3 sm:py-4 text-xs sm:text-base font-black shadow-[0_4px_0_#1c1917] sm:shadow-[0_5px_0_#1c1917] min-h-[44px]"
                >
                  <WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>{t.hero.ctaWhatsApp}</span>
                </button>
              </div>

            </div>

            {/* Right Column: Realistic Papad Cracked & Eaten Animation with Cartoon Crunch */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
              <PapadCrunch speed={1.0} sound={true} soundType="cartoon" />
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
                      className="cartoon-btn-whatsapp py-2 px-3 text-xs font-black shadow-[0_3px_0_#1c1917] min-h-[40px] flex items-center justify-center gap-1.5"
                    >
                      <WhatsAppIcon className="w-4 h-4 shrink-0" />
                      <span>{t.productsSection.orderNow}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3: QUALITY & PROCESS (Unique 3D Showcase with thiings.co icons) */}
      <section className="section-viewport bg-[#FFFDF7] border-b-2 border-stone-900 content-auto py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center space-y-5 sm:space-y-7">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b-2 border-stone-900/10 pb-3 sm:pb-4">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-stone-900">
                {t.qualitySection.title}
              </h2>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-stone-600 max-w-md">
              {currentLang === 'gu' 
                ? 'કોઈ શોર્ટકટ નહીં, કોઈ મશીન ઓવન નહીં — માત્ર શુદ્ધ દાળ અને સૌરાષ્ટ્રનો કુદરતી તડકો.' 
                : currentLang === 'hi' 
                ? 'कोई शॉर्टकट नहीं, कोई ओवन नहीं — केवल शुद्ध दाल और सौराष्ट्र की प्राकृतिक धूप।'
                : 'Slow-crafted with pure Saurashtra sunshine, hand-rolled dough, and zero chemical preservatives.'}
            </p>
          </div>

          {/* 4 Unique 3D Process Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
            {[
              {
                num: '01',
                title: t.qualitySection.fact1Title,
                desc: t.qualitySection.fact1Desc,
                iconSrc: '/icons/thiings/wheat.png',
                iconAlt: 'Pure Desi Dal - 3D Wheat & Grains from thiings.co',
                pedestalBg: 'bg-gradient-to-b from-amber-100 to-amber-200/60',
                cardAccent: 'hover:border-amber-500',
              },
              {
                num: '02',
                title: t.qualitySection.fact2Title,
                desc: t.qualitySection.fact2Desc,
                iconSrc: '/icons/thiings/rolling-pin.png',
                iconAlt: 'Authentic Hand-Rolled Dough - 3D Rolling Pin from thiings.co',
                pedestalBg: 'bg-gradient-to-b from-orange-100 to-orange-200/60',
                cardAccent: 'hover:border-orange-500',
              },
              {
                num: '03',
                title: t.qualitySection.fact3Title,
                desc: t.qualitySection.fact3Desc,
                iconSrc: '/icons/thiings/sun.png',
                iconAlt: 'Gujarat Sun-Drying - 3D Radiant Sun from thiings.co',
                pedestalBg: 'bg-gradient-to-b from-yellow-100 to-yellow-200/60',
                cardAccent: 'hover:border-yellow-500',
              },
              {
                num: '04',
                title: t.qualitySection.fact4Title,
                desc: t.qualitySection.fact4Desc,
                iconSrc: '/icons/thiings/verified-shield.png',
                iconAlt: 'Hygienic Moisture-Lock - 3D Verified Shield from thiings.co',
                pedestalBg: 'bg-gradient-to-b from-emerald-100 to-emerald-200/60',
                cardAccent: 'hover:border-emerald-500',
              },
            ].map((fact) => (
              <div
                key={fact.num}
                onClick={() => sound.playPop()}
                className={`group cartoon-card p-4 sm:p-5 bg-white flex flex-col justify-center items-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_8px_0_#1c1917] cursor-pointer ${fact.cardAccent}`}
              >
                <div className="w-full flex flex-col items-center">
                  {/* Heroic 3D Icon Floating Pedestal (thiings.co 3D Asset) */}
                  <div className={`w-20 h-20 sm:w-24 sm:h-24 mx-auto my-2 rounded-2xl ${fact.pedestalBg} border-2 border-stone-900 flex items-center justify-center p-2 shadow-[0_3px_0_#1c1917] group-hover:shadow-[0_5px_0_#1c1917] transition-all`}>
                    <img
                      src={fact.iconSrc}
                      alt={fact.iconAlt}
                      loading="lazy"
                      decoding="async"
                      className="w-16 h-16 sm:w-20 sm:h-20 object-contain drop-shadow-[0_8px_12px_rgba(0,0,0,0.18)] group-hover:scale-115 group-hover:-translate-y-1.5 group-hover:rotate-3 transition-transform duration-300 select-none pointer-events-none"
                    />
                  </div>

                  {/* Title */}
                  <h3 className="text-sm sm:text-base font-black text-stone-900 leading-snug text-center mt-3 mb-1.5 group-hover:text-amber-800 transition-colors">
                    {fact.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-stone-600 leading-relaxed font-medium text-center">
                    {fact.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Trust & Quality Banner */}
          <div className="cartoon-card bg-amber-50/80 p-3 sm:p-3.5 border-2 border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs font-bold text-stone-800 shadow-[0_3px_0_#1c1917]">
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg">🌾</span>
              <span>100% Moong & Udad Dal • Cold-Pressed Groundnut Oil • Natural Papad Khar</span>
            </div>
            <div className="flex items-center gap-2 text-stone-900 font-black">
              <span className="text-emerald-600">✓</span>
              <span>Zero Artificial Additives or Oven Curing</span>
            </div>
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch">
            {/* Left Card: City Selection Matrix */}
            <div className="lg:col-span-7 cartoon-card p-4 sm:p-6 bg-white flex flex-col justify-between h-full">
              <div className="space-y-3 sm:space-y-4">
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
              </div>

              <div className="pt-3 sm:pt-4 mt-4 border-t-2 border-stone-200 grid grid-cols-2 gap-2 sm:gap-4 text-xs font-bold">
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
                    <span className="font-black text-stone-900 text-xs sm:text-sm">{t.deliverySection.wholesaleBadge}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card: Pan-India Transport & Dispatch */}
            <div className="lg:col-span-5 cartoon-card p-4 sm:p-6 bg-amber-50 flex flex-col justify-between h-full">
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-2.5">
                  <img
                    src="/images/india-flag.webp"
                    alt="Indian Flag"
                    className="w-7 h-[18px] sm:w-8 sm:h-5 object-cover rounded shadow-xs border border-stone-400 shrink-0"
                  />
                  <h3 className="text-sm sm:text-base font-black text-stone-900">
                    Pan-India Supply & Transport
                  </h3>
                </div>

                <p className="text-xs text-stone-700 leading-relaxed font-medium">
                  {t.deliverySection.panIndiaNote}
                </p>

                <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                  <div className="p-2.5 bg-white/80 rounded-xl border-2 border-stone-900/10 shadow-xs flex flex-col justify-between">
                    <span className="text-[10px] font-bold text-stone-500">Retail Dispatch</span>
                    <span className="font-black text-stone-900 mt-0.5">Express Courier</span>
                  </div>
                  <div className="p-2.5 bg-white/80 rounded-xl border-2 border-stone-900/10 shadow-xs flex flex-col justify-between">
                    <span className="text-[10px] font-bold text-stone-500">Bulk & Merchant</span>
                    <span className="font-black text-stone-900 mt-0.5">Road Transport</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 sm:pt-4 mt-4 border-t-2 border-amber-200">
                <button
                  onClick={() => {
                    sound.playCrunch();
                    onOpenWhatsAppDirect(`Delivery enquiry for ${selectedCity.city.en}`);
                  }}
                  className="w-full cartoon-btn-whatsapp py-2.5 sm:py-3 px-3 sm:px-4 text-xs font-black shadow-[0_3px_0_#1c1917] sm:shadow-[0_4px_0_#1c1917] min-h-[42px]"
                >
                  <WhatsAppIcon className="w-4 h-4 shrink-0" />
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
      <section className="section-viewport bg-amber-400 border-b-2 border-stone-900 relative overflow-hidden flex flex-col justify-center">
        {/* Playful background decorative glows */}
        <div className="absolute top-12 left-10 w-48 h-48 bg-amber-300 rounded-full opacity-40 blur-2xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-amber-500 rounded-full opacity-30 blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center py-4 sm:py-6 relative z-10">
          <div className="cartoon-card bg-[#FFFDF7] p-5 sm:p-7 lg:p-9 shadow-[0_8px_0_#1c1917] sm:shadow-[0_12px_0_#1c1917] border-3 border-stone-900 relative overflow-hidden">
            {/* Soft decorative background tint inside card */}
            <div className="absolute -top-16 -right-16 w-56 h-56 bg-amber-100 rounded-full pointer-events-none opacity-50" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
              {/* Left Column: Illustrative 3D Mascot & Papad Stack */}
              <div className="lg:col-span-5 flex flex-col items-center justify-center">
                <div className="bg-gradient-to-b from-amber-100/90 to-amber-200/50 rounded-2xl sm:rounded-3xl p-3 sm:p-5 border-2 border-stone-900 w-full flex flex-col items-center justify-center relative shadow-[0_4px_0_#1c1917]">
                  {/* Floating badge top-left */}
                  <div className="absolute -top-3 -left-2 sm:-left-3 bg-amber-300 border-2 border-stone-900 text-stone-900 text-[10px] sm:text-xs font-black px-2.5 py-1 rounded-full shadow-[0_2px_0_#1c1917] rotate-[-3deg] flex items-center">
                    <span>100% Sun-Dried</span>
                  </div>

                  {/* Floating badge bottom-right */}
                  <div className="absolute -bottom-3 -right-2 sm:-right-3 bg-emerald-500 text-white border-2 border-stone-900 text-[10px] sm:text-xs font-black px-2.5 py-1 rounded-full shadow-[0_2px_0_#1c1917] rotate-[2deg] flex items-center">
                    <span>Fresh Kathiyawadi</span>
                  </div>

                  {/* 3D Illustration */}
                  <img
                    src="/images/cta-chef-papad-transparent.webp"
                    alt="Authentic Kathiyawadi Papad with Chef Mascot"
                    className="w-44 sm:w-52 lg:w-60 h-auto object-contain drop-shadow-xl hover:scale-105 transition-transform duration-300 select-none"
                  />
                </div>
              </div>

              {/* Right Column: Copy & Actions */}
              <div className="lg:col-span-7 flex flex-col justify-center space-y-3 sm:space-y-4 text-left">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-100 border-2 border-stone-900 text-stone-900 text-[10px] sm:text-xs font-black shadow-[0_2px_0_#1c1917] self-start">
                  <span>Direct Orders & Trade Inquiries</span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-stone-900 leading-tight">
                  {t.ctaSection.title}
                </h2>

                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-medium">
                  {currentLang === 'gu'
                    ? 'કાઠિયાવાડી સ્વાદના અસલી તડકામાં સુકવેલા પાપડ તમારા ઘર કે દુકાન માટે મંગાવો. વોટ્સએપ પર તુરંત ઓર્ડર કે પૂછપરછ કરો.'
                    : currentLang === 'hi'
                    ? 'काठियावाड़ी स्वाद के असली धूप में सुखाए पापड़ अपने घर या दुकान के लिए मंगवाएं। व्हाट्सएप पर तुरंत ऑर्डर या पूछताछ करें।'
                    : 'Bring the authentic Kathiyawadi sun-dried crunch to your dining table or grocery store. Send your requirements for fast doorstep dispatch across India.'}
                </p>

                {/* Pack type pills */}
                <div className="grid grid-cols-2 gap-2 text-[11px] sm:text-xs font-black text-stone-800">
                  <div className="flex items-center gap-2 p-2 bg-amber-50/80 rounded-xl border border-stone-200">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 border border-stone-900 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-emerald-700" />
                    </div>
                    <span>{currentLang === 'gu' ? '૨૦૦ગ્રા - ૧કિલો રિટેલ' : currentLang === 'hi' ? '200g - 1kg रिटेल पैक' : 'Retail 200g - 1kg'}</span>
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-amber-50/80 rounded-xl border border-stone-200">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 border border-stone-900 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-emerald-700" />
                    </div>
                    <span>{currentLang === 'gu' ? '૫કિલો / ૧૦કિલો હોલસેલ' : currentLang === 'hi' ? '5kg / 10kg थोक कार्टन' : '5kg & 10kg Bulk'}</span>
                  </div>
                </div>

                {/* Primary CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
                  <button
                    onClick={() => {
                      sound.playCrunch();
                      onOpenWhatsAppDirect();
                    }}
                    className="cartoon-btn-whatsapp px-5 sm:px-7 py-3 sm:py-3.5 text-xs sm:text-sm font-black shadow-[0_4px_0_#1c1917] sm:shadow-[0_5px_0_#1c1917] min-h-[46px] flex-1 justify-center"
                  >
                    <WhatsAppIcon className="w-5 h-5 shrink-0" />
                    <span>{t.ctaSection.buttonText}</span>
                  </button>

                  <a
                    href="tel:+919825012345"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 sm:py-3.5 rounded-xl border-2 border-stone-900 bg-stone-100 hover:bg-amber-100 text-stone-900 text-xs sm:text-sm font-black shadow-[0_3px_0_#1c1917] transition-all min-h-[46px]"
                  >
                    <PhoneCall className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>{currentLang === 'gu' ? 'કોલ કરો' : currentLang === 'hi' ? 'कॉल करें' : 'Call Support'}</span>
                  </a>
                </div>

                {/* Contact & Hours */}
                <div className="pt-2 border-t-2 border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] font-bold text-stone-600">
                  <span className="text-stone-900 font-black flex items-center gap-1.5">
                    <PhoneCall className="w-3 h-3 text-stone-500" />
                    {t.ctaSection.directCallText}
                  </span>
                  <span className="flex items-center gap-1.5 text-stone-500">
                    <Clock className="w-3 h-3 text-stone-400" />
                    {t.ctaSection.businessHoursText}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
