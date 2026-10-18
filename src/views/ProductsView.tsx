import React, { useState } from 'react';
import { Language, ProductCategory, ProductItem, StoreConfig } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { PRODUCTS } from '../data/products';
import { PapadVisual } from '../components/PapadVisual';
import { Plus, Check, Flame, ChefHat } from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { sound } from '../utils/audioSynth';

interface ProductsViewProps {
  currentLang: Language;
  onAddToEnquiry: (productId: string, packSize: string) => void;
  onOpenWhatsAppDirect: (productName?: string) => void;
  onOpenBasket: () => void;
  totalEnquiriesCount: number;
  storeConfig: StoreConfig;
}

export const ProductsView: React.FC<ProductsViewProps> = ({
  currentLang,
  onAddToEnquiry,
  onOpenWhatsAppDirect,
  onOpenBasket,
  totalEnquiriesCount,
  storeConfig,
}) => {
  const t = TRANSLATIONS[currentLang];
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [selectedPacks, setSelectedPacks] = useState<Record<string, string>>({
    'moong-mari-papad': '500g',
    'udad-jeera-papad': '500g',
    'lasaniya-garlic-papad': '500g',
    'sindhi-masala-papad': '500g',
    'rice-khichiya-papad': '500g',
    'coin-snack-papad': '500g',
  });
  const [addedIds, setAddedIds] = useState<Record<string, boolean>>({});

  const filteredProducts = PRODUCTS.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  });

  const handlePackChange = (productId: string, size: string) => {
    sound.playPop();
    setSelectedPacks((prev) => ({ ...prev, [productId]: size }));
  };

  const handleAdd = (product: ProductItem) => {
    sound.playCrunch();
    const pack = selectedPacks[product.id] || product.packOptions[0]?.size;
    onAddToEnquiry(product.id, pack);
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };



  return (
    <div className="pt-28 pb-20 bg-[#FFFDF7] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Title: Single H1 per page with Playful Cartoon Styling */}
        <div className="border-b-2 border-stone-900 pb-6">

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-stone-900">
            {currentLang === 'gu'
              ? 'સાક્ષી પ્રદીપ પાપડ પ્રોડક્ટ્સ'
              : currentLang === 'hi'
              ? 'साक्षी प्रदीप पापड़ उत्पाद सूची'
              : 'Our Authentic Papad Varieties'}
          </h1>
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-stone-600 mt-2">
            <span className="cartoon-badge bg-amber-100 text-stone-900">Freshly Rolled 🫓</span>
            <span className="cartoon-badge bg-orange-100 text-stone-900">Natural Sun-Drying ☀️</span>
            <span className="cartoon-badge bg-emerald-100 text-stone-900">Retail & Wholesale 📦</span>
          </div>
        </div>

        {/* Category Filter Tabs (Chunky 3D Segmented Control with smooth touch momentum scrolling) */}
        <div className="flex items-center gap-2 p-1.5 bg-stone-100 border-2 border-stone-900 rounded-2xl max-w-2xl overflow-x-auto scroll-touch scrollbar-none text-xs font-black shadow-[0_3px_0_#1c1917]">
          {[
            { id: 'all' as ProductCategory, label: t.productsSection.categoryAll },
            { id: 'moong' as ProductCategory, label: t.productsSection.categoryMoong },
            { id: 'udad' as ProductCategory, label: t.productsSection.categoryUdad },
            { id: 'speciality' as ProductCategory, label: t.productsSection.categorySpeciality },
            { id: 'khichiya' as ProductCategory, label: t.productsSection.categoryKhichiya },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                sound.playPop();
                setSelectedCategory(cat.id);
              }}
              className={`px-3.5 sm:px-4 py-2 rounded-xl whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-amber-400 text-stone-900 border-2 border-stone-900 shadow-[0_3px_0_#1c1917] -translate-y-0.5'
                  : 'text-stone-700 hover:text-stone-900 hover:bg-white border-2 border-transparent'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid with Chunky Cartoon Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-7">
          {filteredProducts.map((product) => {
            const currentPack = selectedPacks[product.id] || product.packOptions[1]?.size || product.packOptions[0]?.size;
            const isAdded = !!addedIds[product.id];

            return (
              <div
                key={product.id}
                className="cartoon-card p-4 sm:p-6 flex flex-col justify-between bg-[#FFFDF7] group"
              >
                <div className="space-y-4">
                  {/* Cute Mascot Avatar for this specific variety */}
                  <div className="flex items-center justify-center py-2">
                    <PapadVisual type={product.visualType} size="md" />
                  </div>

                    <h3 className="text-xl font-black text-stone-900">
                      {product.name[currentLang]}
                    </h3>

                  <p className="text-xs text-stone-600 leading-relaxed font-medium">
                    {product.description[currentLang]}
                  </p>

                  {/* Pack Selector */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-black text-stone-800 block">
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

                  {/* Ingredients Unboxed Text */}
                  <div className="pt-3 border-t-2 border-stone-200 text-[11px] text-stone-500 space-y-1">
                    <span className="font-black text-stone-800 block">
                      {t.productsSection.ingredientsTitle}:
                    </span>
                    <p className="leading-relaxed font-medium">
                      {product.ingredients[currentLang].join(' · ')}
                    </p>
                  </div>
                </div>

                {/* Card Action Buttons */}
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
                      onOpenWhatsAppDirect(`${product.name[currentLang]} (${currentPack})`);
                    }}
                    className="cartoon-btn-whatsapp py-2.5 px-3 text-xs font-black shadow-[0_3px_0_#1c1917] flex items-center justify-center gap-1.5"
                  >
                    <WhatsAppIcon className="w-4 h-4 shrink-0" />
                    <span>{t.productsSection.orderNow}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Preparation Guide Cartoon Card */}
        <div className="cartoon-card p-6 sm:p-8 mt-12 space-y-4 bg-amber-50">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-amber-400 border-2 border-stone-900 flex items-center justify-center shadow-[0_2px_0_#1c1917]">
              <ChefHat className="w-5 h-5 text-stone-900" />
            </div>
            <h2 className="text-lg font-black text-stone-900">
              {currentLang === 'gu'
                ? 'પાપડ શેકવાની અને તળવાની ઉત્તમ રીતો'
                : currentLang === 'hi'
                ? 'पापड़ भूनने व तलने की उत्तम विधियां'
                : 'How to Prepare for the Ultimate Crunch'}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-medium text-stone-700">
            <div className="p-4 bg-white border-2 border-stone-900 rounded-2xl shadow-[0_3px_0_#1c1917] space-y-1">
              <span className="font-black text-stone-900 block text-sm">🔥 1. Gas Flame / Tawa Roast</span>
              <p>Hold with tongs over medium flame for 15-20 seconds, turning continuously until golden blisters pop.</p>
            </div>
            <div className="p-4 bg-white border-2 border-stone-900 rounded-2xl shadow-[0_3px_0_#1c1917] space-y-1">
              <span className="font-black text-stone-900 block text-sm">🍳 2. Golden Deep Fry</span>
              <p>Submerge in hot groundnut oil for 4-5 seconds. Drain vertically for zero excess oiliness.</p>
            </div>
            <div className="p-4 bg-white border-2 border-stone-900 rounded-2xl shadow-[0_3px_0_#1c1917] space-y-1">
              <span className="font-black text-stone-900 block text-sm">⚡ 3. Air Fry / Microwave</span>
              <p>Brush lightly with oil drop and microwave for 45-60 seconds on high power for a guilt-free crunch.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Bar if user has items in Enquiry List */}
      {totalEnquiriesCount > 0 && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 bg-stone-900 text-white border-2 border-stone-900 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-[0_6px_0_#1c1917] flex items-center justify-between gap-2.5 sm:gap-4 text-[11px] sm:text-xs font-bold animate-papad-bounce w-[92vw] sm:w-auto max-w-md">
          <span className="text-amber-300 truncate">🫓 {totalEnquiriesCount} in enquiry list</span>
          <button
            onClick={() => {
              sound.playPop();
              onOpenBasket();
            }}
            className="cartoon-btn-whatsapp py-1.5 px-3 text-[11px] sm:text-xs shadow-none shrink-0"
          >
            Review & Send WhatsApp
          </button>
        </div>
      )}
    </div>
  );
};
