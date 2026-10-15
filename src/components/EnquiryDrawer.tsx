import React, { useState } from 'react';
import { Language, EnquiryItem, StoreConfig } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { PRODUCTS } from '../data/products';
import { X, Trash2, Plus, Minus, MessageSquare, ShoppingBag } from 'lucide-react';

interface EnquiryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: EnquiryItem[];
  onUpdateQuantity: (productId: string, packSize: string, delta: number) => void;
  onRemoveItem: (productId: string, packSize: string) => void;
  onClearAll: () => void;
  currentLang: Language;
  storeConfig: StoreConfig;
}

export const EnquiryDrawer: React.FC<EnquiryDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearAll,
  currentLang,
  storeConfig,
}) => {
  const [orderType, setOrderType] = useState<'retail' | 'wholesale'>('retail');
  const [city, setCity] = useState('');
  const [note, setNote] = useState('');

  const t = TRANSLATIONS[currentLang];

  if (!isOpen) return null;

  const handleSendWhatsApp = () => {
    if (items.length === 0) return;

    let message = '';
    if (currentLang === 'gu') {
      message = `નમસ્તે સાક્ષી પ્રદીપ પાપડ,\nહું નીચે આપેલા પાપડ માટે પૂછપરછ કરવા માંગુ છું:\n\n`;
      items.forEach((item, index) => {
        const prod = PRODUCTS.find((p) => p.id === item.productId);
        const name = prod?.name.gu || item.productId;
        message += `${index + 1}. ${name} - ${item.packSize} (જથ્થો: ${item.quantity})\n`;
      });
      message += `\nઓર્ડર પ્રકાર: ${orderType === 'retail' ? 'ઘર વપરાશ (રીટેલ)' : 'વેપાર / જથ્થાબંધ (હોલસેલ)'}\n`;
      if (city.trim()) message += `ડિલિવરી શહેર: ${city.trim()}\n`;
      if (note.trim()) message += `નોંધ: ${note.trim()}\n`;
      message += `\nકૃપા કરીને કિંમત અને ડિલિવરીની વિગત જણાવશો. આભાર!`;
    } else if (currentLang === 'hi') {
      message = `नमस्ते साक्षी प्रदीप पापड़,\nमैं निम्नलिखित पापड़ उत्पादों के लिए पूछताछ करना चाहता हूँ:\n\n`;
      items.forEach((item, index) => {
        const prod = PRODUCTS.find((p) => p.id === item.productId);
        const name = prod?.name.hi || item.productId;
        message += `${index + 1}. ${name} - ${item.packSize} (मात्रा: ${item.quantity})\n`;
      });
      message += `\nऑर्डर प्रकार: ${orderType === 'retail' ? 'खुदरा (घर के लिए)' : 'थोक / कैटरिंग (होलसेल)'}\n`;
      if (city.trim()) message += `डिलीवरी शहर: ${city.trim()}\n`;
      if (note.trim()) message += `टिप्पणी: ${note.trim()}\n`;
      message += `\nकृपया मूल्य और डिलीवरी का समय बताएं। धन्यवाद!`;
    } else {
      message = `Hello Sakshi Pradip Papad,\nI would like to enquire about the following papad products:\n\n`;
      items.forEach((item, index) => {
        const prod = PRODUCTS.find((p) => p.id === item.productId);
        const name = prod?.name.en || item.productId;
        message += `${index + 1}. ${name} - ${item.packSize} (Qty: ${item.quantity})\n`;
      });
      message += `\nOrder Type: ${orderType === 'retail' ? 'Retail Household' : 'Wholesale / Bulk'}\n`;
      if (city.trim()) message += `Delivery City: ${city.trim()}\n`;
      if (note.trim()) message += `Note: ${note.trim()}\n`;
      message += `\nPlease share price, packing availability and delivery timelines. Thank you!`;
    }

    const cleanPhone = storeConfig.phoneWhatsApp.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/60 transition-opacity backdrop-blur-xs cursor-pointer"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] border-l border-[#E7DFD5] flex flex-col shadow-2xl">
          {/* Header */}
          <div className="px-6 py-5 border-b border-[#E7DFD5] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#C2410C]" />
              <h2 className="text-lg font-bold text-stone-900">{t.basket.title}</h2>
              <span className="text-xs text-stone-500 font-medium">({items.length})</span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-stone-500 hover:text-stone-900 rounded-md hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="Close Drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <ShoppingBag className="w-12 h-12 text-stone-300 mx-auto" />
                <p className="text-sm text-stone-600 max-w-xs mx-auto leading-relaxed">
                  {t.basket.emptyText}
                </p>
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-stone-800 bg-stone-200/80 hover:bg-stone-200 rounded-md cursor-pointer"
                >
                  {t.hero.ctaProducts}
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((item) => {
                  const prod = PRODUCTS.find((p) => p.id === item.productId);
                  if (!prod) return null;

                  return (
                    <div
                      key={`${item.productId}-${item.packSize}`}
                      className="p-3.5 bg-white border border-[#E7DFD5] rounded-lg flex items-center justify-between gap-3 shadow-2xs"
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-stone-900 truncate">
                          {prod.name[currentLang]}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-stone-500 mt-0.5">
                          <span>{item.packSize}</span>
                          <span>·</span>
                          <span>{prod.categoryLabel[currentLang]}</span>
                        </div>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-2 bg-stone-100 px-2 py-1 rounded-md border border-stone-200">
                        <button
                          onClick={() => onUpdateQuantity(item.productId, item.packSize, -1)}
                          className="p-1 text-stone-600 hover:text-stone-900 cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-bold text-stone-900 w-4 text-center tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.productId, item.packSize, 1)}
                          className="p-1 text-stone-600 hover:text-stone-900 cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.productId, item.packSize)}
                        className="p-1.5 text-stone-400 hover:text-red-600 cursor-pointer transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}

                {/* Clear all */}
                <div className="text-right pt-1">
                  <button
                    onClick={onClearAll}
                    className="text-xs text-stone-500 hover:text-red-600 font-medium cursor-pointer"
                  >
                    {t.basket.clearBasket}
                  </button>
                </div>

                {/* Order Intent Selector */}
                <div className="pt-3 border-t border-stone-200 space-y-2">
                  <label className="block text-xs font-semibold text-stone-700">
                    {t.basket.customerType}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setOrderType('retail')}
                      className={`py-2 px-3 text-xs font-medium rounded-md border transition-all cursor-pointer ${
                        orderType === 'retail'
                          ? 'border-[#C2410C] bg-[#C2410C]/5 text-[#C2410C] font-semibold'
                          : 'border-stone-300 bg-white text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      {t.basket.retail}
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderType('wholesale')}
                      className={`py-2 px-3 text-xs font-medium rounded-md border transition-all cursor-pointer ${
                        orderType === 'wholesale'
                          ? 'border-[#C2410C] bg-[#C2410C]/5 text-[#C2410C] font-semibold'
                          : 'border-stone-300 bg-white text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      {t.basket.wholesale}
                    </button>
                  </div>
                </div>

                {/* City Input */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-stone-700">
                    {currentLang === 'gu'
                      ? 'ડિલિવરી શહેર / ગામ'
                      : currentLang === 'hi'
                      ? 'डिलीवरी शहर / कस्बा'
                      : 'Delivery Destination'}
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder={t.basket.enterCityPlaceholder}
                    className="w-full text-xs px-3 py-2 bg-white border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>

                {/* Custom Note */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-stone-700">
                    {currentLang === 'gu'
                      ? 'વધારાની નોંધ (વૈકલ્પિક)'
                      : currentLang === 'hi'
                      ? 'अतिरिक्त टिप्पणी (वैकल्पिक)'
                      : 'Additional Note (Optional)'}
                  </label>
                  <textarea
                    rows={2}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder={t.basket.customNotePlaceholder}
                    className="w-full text-xs px-3 py-2 bg-white border border-stone-300 rounded-md focus:outline-none focus:ring-1 focus:ring-stone-900"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Footer CTA */}
          <div className="p-5 border-t border-[#E7DFD5] bg-white space-y-2">
            <button
              onClick={handleSendWhatsApp}
              disabled={items.length === 0}
              className={`w-full py-3 px-4 rounded-md font-semibold text-sm flex items-center justify-center gap-2 transition-colors ${
                items.length > 0
                  ? 'bg-[#15803D] hover:bg-[#166534] text-white cursor-pointer shadow-md'
                  : 'bg-stone-200 text-stone-400 cursor-not-allowed'
              }`}
            >
              <MessageSquare className="w-5 h-5" />
              <span>{t.basket.sendEnquiryWhatsApp}</span>
            </button>
            <p className="text-[11px] text-stone-500 text-center">
              Direct connection to Sakshi Pradip Papad dispatch desk
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
