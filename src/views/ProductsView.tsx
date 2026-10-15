import React, { useState } from 'react';
import { Language, ProductCategory, ProductItem, StoreConfig } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { PRODUCTS } from '../data/products';
import { PapadVisual } from '../components/PapadVisual';
import { MessageSquare, Plus, Check, Flame, ShieldAlert, Sparkles, ChefHat } from 'lucide-react';

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
    setSelectedPacks((prev) => ({ ...prev, [productId]: size }));
  };

  const handleAdd = (product: ProductItem) => {
    const pack = selectedPacks[product.id] || product.packOptions[0]?.size;
    onAddToEnquiry(product.id, pack);
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  const getSpiceText = (level: string) => {
    if (level === 'spicy') return currentLang === 'gu' ? 'તીખો સ્વાદ' : currentLang === 'hi' ? 'तीखा स्वाद' : 'Spicy Kick';
    if (level === 'medium') return currentLang === 'gu' ? 'મધ્યમ તીખો' : currentLang === 'hi' ? 'मध्यम तीखा' : 'Medium Spice';
    return currentLang === 'gu' ? 'હળવો મસાલો' : currentLang === 'hi' ? 'हल्का मसाला' : 'Mild & Aromatic';
  };

  return (
    <div className="pt-24 pb-20 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Page Title: Single H1 per page */}
        <div className="border-b border-[#E7DFD5] pb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1C1917]">
            {currentLang === 'gu'
              ? 'સાક્ષી પ્રદીપ પાપડ પ્રોડક્ટ્સ'
              : currentLang === 'hi'
              ? 'साक्षी प्रदीप पापड़ उत्पाद सूची'
              : 'Papad Products & Varieties'}
          </h1>
          <div className="flex items-center gap-2 text-xs text-stone-600 mt-2 font-medium">
            <span>Freshly Rolled</span>
            <span aria-hidden="true">·</span>
            <span>Natural Sun-Drying</span>
            <span aria-hidden="true">·</span>
            <span>Retail & Wholesale Boxes</span>
          </div>
        </div>

        {/* Category Filter Tabs (Interactive Segmented Control) */}
        <div className="flex items-center gap-1.5 p-1 bg-stone-200/80 rounded-lg max-w-xl overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-2 rounded-md whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === 'all'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            {t.productsSection.categoryAll}
          </button>
          <button
            onClick={() => setSelectedCategory('moong')}
            className={`px-3 py-2 rounded-md whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === 'moong'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            {t.productsSection.categoryMoong}
          </button>
          <button
            onClick={() => setSelectedCategory('udad')}
            className={`px-3 py-2 rounded-md whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === 'udad'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            {t.productsSection.categoryUdad}
          </button>
          <button
            onClick={() => setSelectedCategory('speciality')}
            className={`px-3 py-2 rounded-md whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === 'speciality'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            {t.productsSection.categorySpeciality}
          </button>
          <button
            onClick={() => setSelectedCategory('khichiya')}
            className={`px-3 py-2 rounded-md whitespace-nowrap transition-colors cursor-pointer ${
              selectedCategory === 'khichiya'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-700 hover:text-stone-900'
            }`}
          >
            {t.productsSection.categoryKhichiya}
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => {
            const currentPack = selectedPacks[product.id] || product.packOptions[1]?.size || product.packOptions[0]?.size;
            const isAdded = !!addedIds[product.id];

            return (
              <div
                key={product.id}
                className="bg-white border border-[#E7DFD5] rounded-xl p-5 flex flex-col justify-between hover:border-stone-400 transition-all shadow-2xs"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-center py-2">
                    <PapadVisual type={product.visualType} size="md" />
                  </div>

                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider">
                        {product.categoryLabel[currentLang]}
                      </span>
                      <span className="text-[11px] text-[#C2410C] font-semibold">
                        {getSpiceText(product.spiceLevel)}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-stone-900 mt-1">
                      {product.name[currentLang]}
                    </h3>
                  </div>

                  <p className="text-xs text-stone-600 leading-relaxed">
                    {product.description[currentLang]}
                  </p>

                  {/* Pack Selector */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[11px] font-semibold text-stone-700 block">
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
                              : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-stone-400'
                          }`}
                        >
                          {opt.size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Ingredients Unboxed Text */}
                  <div className="pt-2 border-t border-stone-100 text-[11px] text-stone-500 space-y-1">
                    <span className="font-semibold text-stone-700 block">
                      {t.productsSection.ingredientsTitle}:
                    </span>
                    <p className="leading-relaxed">
                      {product.ingredients[currentLang].join(' · ')}
                    </p>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 mt-4 border-t border-[#E7DFD5] grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleAdd(product)}
                    className="py-2.5 px-3 text-xs font-semibold rounded border border-stone-300 bg-white text-stone-800 hover:bg-stone-50 flex items-center justify-center gap-1.5 cursor-pointer"
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
                    onClick={() =>
                      onOpenWhatsAppDirect(`${product.name[currentLang]} (${currentPack})`)
                    }
                    className="py-2.5 px-3 text-xs font-semibold rounded bg-[#15803D] hover:bg-[#166534] text-white flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>{t.nav.enquireWhatsApp}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Preparation Guide Card */}
        <div className="bg-white border border-[#E7DFD5] rounded-xl p-6 mt-12 space-y-4">
          <div className="flex items-center gap-2">
            <ChefHat className="w-5 h-5 text-[#C2410C]" />
            <h2 className="text-base font-bold text-stone-900">
              {currentLang === 'gu'
                ? 'પાપડ શેકવાની અને તળવાની ઉત્તમ રીતો'
                : currentLang === 'hi'
                ? 'पापड़ भूनने व तलने की उत्तम विधियां'
                : 'How to Prepare for the Crispest Crunch'}
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-stone-600">
            <div className="p-3 bg-stone-50 rounded-lg space-y-1">
              <span className="font-bold text-stone-900 block">1. Gas Flame / Tawa Roast</span>
              <p>Hold with tongs over medium flame for 15-20 seconds, turning continuously until golden blisters appear.</p>
            </div>
            <div className="p-3 bg-stone-50 rounded-lg space-y-1">
              <span className="font-bold text-stone-900 block">2. Golden Deep Fry</span>
              <p>Submerge in hot groundnut oil for 4-5 seconds. Drain vertically on paper towel for zero greasiness.</p>
            </div>
            <div className="p-3 bg-stone-50 rounded-lg space-y-1">
              <span className="font-bold text-stone-900 block">3. Air Fry / Microwave</span>
              <p>Brush lightly with oil drop and microwave for 45-60 seconds on high power for an oil-free healthy crunch.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Bottom Bar if user has items in Enquiry List */}
      {totalEnquiriesCount > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-stone-900 text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-4 text-xs font-semibold">
          <span>{totalEnquiriesCount} varieties in enquiry list</span>
          <button
            onClick={onOpenBasket}
            className="px-3 py-1.5 bg-[#15803D] hover:bg-[#166534] rounded-full text-white cursor-pointer"
          >
            Review & Send WhatsApp
          </button>
        </div>
      )}
    </div>
  );
};
