import React, { useState } from 'react';
import { Language, ProductItem, StoreConfig } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { PRODUCTS } from '../data/products';
import { CITIES_DELIVERY } from '../data/cities';
import { PapadVisual } from '../components/PapadVisual';
import { MessageSquare, ArrowRight, Check, Plus, ChevronDown, ChevronUp, MapPin, Truck } from 'lucide-react';

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
    setSelectedPacks((prev) => ({ ...prev, [productId]: packSize }));
  };

  const handleAdd = (product: ProductItem) => {
    const packSize = selectedPacks[product.id] || product.packOptions[1]?.size || product.packOptions[0]?.size;
    onAddToEnquiry(product.id, packSize);
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  const selectedCity = CITIES_DELIVERY.find((c) => c.id === selectedCityId) || CITIES_DELIVERY[0];

  return (
    <div className="space-y-0">
      {/* SECTION 1: HERO (1 Viewport Height on Desktop) */}
      <section className="section-viewport bg-[#FAF7F2] border-b border-[#E7DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Heading, Primary Actions, Unboxed Metadata */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Single H1 per page without eyebrow or subtext */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#1C1917] leading-tight text-balance">
                {t.hero.title}
              </h1>

              {/* Functional Key Indicators (clean unboxed text, no pills) */}
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-stone-600 font-medium">
                <span>{t.hero.highlightPurity}</span>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span>{t.hero.highlightSunDried}</span>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span>{t.hero.highlightDelivery}</span>
              </div>

              {/* Two Direct Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('products')}
                  className="px-6 py-3.5 bg-[#C2410C] hover:bg-[#9A3412] active:bg-[#7C2D12] text-white font-semibold text-sm rounded-md transition-colors cursor-pointer flex items-center gap-2 shadow-xs"
                >
                  <span>{t.hero.ctaProducts}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onOpenWhatsAppDirect()}
                  className="px-6 py-3.5 bg-[#15803D] hover:bg-[#166534] active:bg-[#14532D] text-white font-semibold text-sm rounded-md transition-colors cursor-pointer flex items-center gap-2 shadow-xs"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{t.hero.ctaWhatsApp}</span>
                </button>
              </div>

              {/* Regional trust marker in hero (not in top bar) */}
              <div className="pt-2 text-xs text-stone-500 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C2410C]" />
                <span>Prepared in Rajkot, Gujarat · Dispatched Daily Across India</span>
              </div>
            </div>

            {/* Right Column: High visual presence authentic papad presentation */}
            <div className="lg:col-span-5 flex items-center justify-center">
              <PapadVisual type="hero_platter" size="hero" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: PRODUCTS (1 Viewport Height on Desktop) */}
      <section className="section-viewport bg-white border-b border-[#E7DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center space-y-6">
          <div className="flex items-center justify-between">
            {/* H2 without eyebrow or subtext */}
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1C1917]">
              {t.productsSection.title}
            </h2>
            <button
              onClick={() => onNavigate('products')}
              className="text-xs sm:text-sm font-semibold text-[#C2410C] hover:text-[#9A3412] flex items-center gap-1 cursor-pointer"
            >
              <span>{t.hero.ctaProducts}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* 3 Featured Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProducts.map((product) => {
              const currentPack = selectedPacks[product.id] || product.packOptions[1]?.size || product.packOptions[0]?.size;
              const isAdded = !!addedIds[product.id];

              return (
                <div
                  key={product.id}
                  className="bg-[#FAF7F2] border border-[#E7DFD5] rounded-lg p-5 flex flex-col justify-between transition-all hover:border-stone-400"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-center py-2">
                      <PapadVisual type={product.visualType} size="md" />
                    </div>

                    <div>
                      <h3 className="text-base font-bold text-[#1C1917]">
                        {product.name[currentLang]}
                      </h3>
                      <p className="text-xs text-stone-500 mt-0.5">
                        {product.categoryLabel[currentLang]}
                      </p>
                    </div>

                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {product.description[currentLang]}
                    </p>

                    {/* Pack size selector */}
                    <div className="space-y-1.5 pt-1">
                      <span className="text-[11px] font-semibold text-stone-600 block">
                        {t.productsSection.selectPack}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {product.packOptions.map((opt) => (
                          <button
                            key={opt.size}
                            onClick={() => handlePackChange(product.id, opt.size)}
                            className={`px-2.5 py-1 text-xs rounded border transition-colors cursor-pointer ${
                              currentPack === opt.size
                                ? 'bg-stone-900 border-stone-900 text-white font-medium'
                                : 'bg-white border-stone-300 text-stone-700 hover:border-stone-400'
                            }`}
                          >
                            {opt.size}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card actions */}
                  <div className="pt-4 mt-3 border-t border-[#E7DFD5] grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleAdd(product)}
                      className="py-2 px-2.5 text-xs font-semibold rounded border border-stone-300 bg-white text-stone-800 hover:bg-stone-50 flex items-center justify-center gap-1 cursor-pointer"
                    >
                      {isAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{t.productsSection.addedToEnquiry}</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>{t.productsSection.addToEnquiry}</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => onOpenWhatsAppDirect(product.name[currentLang])}
                      className="py-2 px-2.5 text-xs font-semibold rounded bg-[#15803D] hover:bg-[#166534] text-white flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
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
      <section className="section-viewport bg-[#FAF7F2] border-b border-[#E7DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center space-y-8">
          {/* H2 without eyebrow or subtext */}
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1C1917]">
            {t.qualitySection.title}
          </h2>

          {/* 4 Authentic Facts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white border border-[#E7DFD5] p-5 rounded-lg space-y-2">
              <span className="text-xs font-mono text-[#C2410C] font-semibold">01</span>
              <h3 className="text-sm font-bold text-stone-900">
                {t.qualitySection.fact1Title}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {t.qualitySection.fact1Desc}
              </p>
            </div>

            <div className="bg-white border border-[#E7DFD5] p-5 rounded-lg space-y-2">
              <span className="text-xs font-mono text-[#C2410C] font-semibold">02</span>
              <h3 className="text-sm font-bold text-stone-900">
                {t.qualitySection.fact2Title}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {t.qualitySection.fact2Desc}
              </p>
            </div>

            <div className="bg-white border border-[#E7DFD5] p-5 rounded-lg space-y-2">
              <span className="text-xs font-mono text-[#C2410C] font-semibold">03</span>
              <h3 className="text-sm font-bold text-stone-900">
                {t.qualitySection.fact3Title}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {t.qualitySection.fact3Desc}
              </p>
            </div>

            <div className="bg-white border border-[#E7DFD5] p-5 rounded-lg space-y-2">
              <span className="text-xs font-mono text-[#C2410C] font-semibold">04</span>
              <h3 className="text-sm font-bold text-stone-900">
                {t.qualitySection.fact4Title}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {t.qualitySection.fact4Desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: STORY (1 Viewport Height on Desktop) */}
      <section className="section-viewport bg-white border-b border-[#E7DFD5]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center space-y-6">
          {/* H2 without eyebrow or subtext */}
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1C1917]">
            {t.storySection.title}
          </h2>

          <div className="space-y-4 text-stone-700 text-sm sm:text-base leading-relaxed">
            <p>{t.storySection.paragraph1}</p>
            <p>{t.storySection.paragraph2}</p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => onNavigate('about')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#C2410C] hover:text-[#9A3412] cursor-pointer"
            >
              <span>{t.storySection.ctaReadMore}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 5: WHERE WE SELL / DELIVER (1 Viewport Height on Desktop) */}
      <section className="section-viewport bg-[#FAF7F2] border-b border-[#E7DFD5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center space-y-6">
          {/* H2 without eyebrow or subtext */}
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1C1917]">
            {t.deliverySection.title}
          </h2>

          {/* City Selection Matrix & Delivery Timeline */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7 bg-white border border-[#E7DFD5] rounded-lg p-5 space-y-4">
              <span className="text-xs font-semibold text-stone-600 block">
                {t.deliverySection.checkCityPrompt}
              </span>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {CITIES_DELIVERY.map((city) => (
                  <button
                    key={city.id}
                    onClick={() => setSelectedCityId(city.id)}
                    className={`p-2.5 rounded text-left border text-xs transition-colors cursor-pointer ${
                      selectedCityId === city.id
                        ? 'border-stone-900 bg-stone-900 text-white font-medium'
                        : 'border-stone-200 bg-stone-50 hover:bg-stone-100 text-stone-800'
                    }`}
                  >
                    <span className="block font-semibold">{city.city[currentLang]}</span>
                    <span className={`text-[10px] ${selectedCityId === city.id ? 'text-stone-300' : 'text-stone-500'}`}>
                      {city.state[currentLang]}
                    </span>
                  </button>
                ))}
              </div>

              <div className="pt-3 border-t border-stone-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#C2410C]" />
                  <div>
                    <span className="text-stone-500 block">{t.deliverySection.deliveryTimeLabel}:</span>
                    <span className="font-bold text-stone-900">{selectedCity.estimatedDays}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600" />
                  <div>
                    <span className="text-stone-500 block">Supply Availability:</span>
                    <span className="font-bold text-stone-900">Retail & Wholesale Stock</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white border border-[#E7DFD5] rounded-lg p-5 space-y-3">
              <h3 className="text-sm font-bold text-stone-900">
                Pan-India Supply & Transport
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                {t.deliverySection.panIndiaNote}
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onOpenWhatsAppDirect(`Delivery enquiry for ${selectedCity.city.en}`)}
                  className="w-full py-2.5 px-3 bg-[#15803D] hover:bg-[#166534] text-white font-semibold text-xs rounded flex items-center justify-center gap-1.5 cursor-pointer"
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
      <section className="section-viewport bg-white border-b border-[#E7DFD5]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center space-y-6">
          {/* H2 without eyebrow or subtext */}
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1C1917]">
            {t.faqSection.title}
          </h2>

          <div className="space-y-3">
            {t.faqSection.faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="border border-[#E7DFD5] rounded-lg overflow-hidden bg-[#FAF7F2]"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-semibold text-stone-900 text-sm cursor-pointer hover:bg-stone-100/60 transition-colors"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-stone-500 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-stone-500 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-4 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-200 pt-3 bg-white">
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
      <section className="section-viewport bg-[#FAF7F2]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-center text-center space-y-6">
          {/* H2 without eyebrow or subtext */}
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1C1917]">
            {t.ctaSection.title}
          </h2>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onOpenWhatsAppDirect()}
              className="w-full sm:w-auto px-8 py-4 bg-[#15803D] hover:bg-[#166534] active:bg-[#14532D] text-white font-bold text-base rounded-md transition-colors flex items-center justify-center gap-3 cursor-pointer shadow-md"
            >
              <MessageSquare className="w-5 h-5" />
              <span>{t.ctaSection.buttonText}</span>
            </button>
          </div>

          <div className="text-xs text-stone-600 space-y-1">
            <p className="font-semibold text-stone-800">{t.ctaSection.directCallText}</p>
            <p>{t.ctaSection.businessHoursText}</p>
          </div>
        </div>
      </section>
    </div>
  );
};
