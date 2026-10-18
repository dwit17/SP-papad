import React, { useState } from 'react';
import { Language, EnquiryItem, StoreConfig } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { PRODUCTS } from '../data/products';
import { X, Trash2, Plus, Minus, ShoppingBag, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';
import { sound } from '../utils/audioSynth';

interface EnquiryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: EnquiryItem[];
  onUpdateQuantity: (productId: string, packSize: string, delta: number) => void;
  onRemoveItem: (productId: string, packSize: string) => void;
  onClearAll: () => void;
  currentLang: Language;
  storeConfig: StoreConfig;
  onNavigate?: (tab: string) => void;
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
  onNavigate,
}) => {
  const [orderType, setOrderType] = useState<'retail' | 'wholesale'>('retail');
  const [city, setCity] = useState('');
  const [note, setNote] = useState('');

  const t = TRANSLATIONS[currentLang];

  if (!isOpen) return null;

  const handleSendWhatsApp = () => {
    if (items.length === 0) return;
    sound.playCrunch();

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
        onClick={() => {
          sound.playPop();
          onClose();
        }}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-md bg-[#FFFDF7] border-l-0 sm:border-l-4 border-stone-900 flex flex-col shadow-2xl">
          {/* Header with Cartoon Mascot Avatar */}
          <div className="px-6 py-5 border-b-2 border-stone-900 flex items-center justify-between bg-amber-400">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white border-2 border-stone-900 flex items-center justify-center shadow-[0_2px_0_#1c1917]">
                <ShoppingBag className="w-5 h-5 text-stone-900" />
              </div>
              <h2 className="text-lg font-black text-stone-900">{t.basket.title}</h2>
              <span className="cartoon-badge bg-white text-stone-900 text-xs py-0.5 px-2">
                {items.length} items
              </span>
            </div>
            <button
              onClick={() => {
                sound.playPop();
                onClose();
              }}
              className="p-1.5 text-stone-900 hover:bg-amber-300 border-2 border-stone-900 rounded-xl bg-white shadow-[0_2px_0_#1c1917] transition-all cursor-pointer"
              aria-label="Close Drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4" data-lenis-prevent>
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-20 h-20 mx-auto rounded-full bg-amber-100 border-2 border-stone-900 flex items-center justify-center shadow-[0_4px_0_#1c1917]">
                  <span className="text-4xl animate-papad-bounce">🫓</span>
                </div>
                <p className="text-sm font-bold text-stone-700 max-w-xs mx-auto leading-relaxed">
                  {t.basket.emptyText}
                </p>
                <button
                  onClick={() => {
                    sound.playPop();
                    onClose();
                  }}
                  className="cartoon-btn-primary px-4 py-2 text-xs font-black shadow-[0_3px_0_#1c1917]"
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
                      className="cartoon-card p-4 bg-white flex items-center justify-between gap-3 shadow-[0_4px_0_#1c1917]"
                    >
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-black text-stone-900 truncate">
                          {prod.name[currentLang]}
                        </h4>
                        <div className="flex items-center gap-2 text-xs font-bold text-stone-500 mt-0.5">
                          <span className="cartoon-badge bg-amber-50 text-stone-900 text-[10px] py-0 px-1.5">
                            {item.packSize}
                          </span>
                          <span>·</span>
                          <span>{prod.categoryLabel[currentLang]}</span>
                        </div>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-2 bg-amber-50 px-2.5 py-1.5 rounded-xl border-2 border-stone-900 shadow-[0_2px_0_#1c1917]">
                        <button
                          onClick={() => {
                            sound.playPop();
                            onUpdateQuantity(item.productId, item.packSize, -1);
                          }}
                          className="p-1 text-stone-700 hover:text-stone-900 cursor-pointer font-black"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-black text-stone-900 w-4 text-center tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => {
                            sound.playPop();
                            onUpdateQuantity(item.productId, item.packSize, 1);
                          }}
                          className="p-1 text-stone-700 hover:text-stone-900 cursor-pointer font-black"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => {
                          sound.playPop();
                          onRemoveItem(item.productId, item.packSize);
                        }}
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
                    onClick={() => {
                      sound.playPop();
                      onClearAll();
                    }}
                    className="text-xs font-black text-stone-500 hover:text-red-600 cursor-pointer"
                  >
                    {t.basket.clearBasket}
                  </button>
                </div>

                {/* Order Intent Selector */}
                <div className="pt-3 border-t-2 border-stone-200 space-y-2">
                  <label className="block text-xs font-black text-stone-800">
                    {t.basket.customerType}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        sound.playPop();
                        setOrderType('retail');
                      }}
                      className={`py-2 px-3 text-xs font-black rounded-xl border-2 transition-all cursor-pointer ${
                        orderType === 'retail'
                          ? 'border-stone-900 bg-amber-400 text-stone-900 shadow-[0_2px_0_#1c1917]'
                          : 'border-stone-300 bg-white text-stone-700 hover:border-stone-900'
                      }`}
                    >
                      {t.basket.retail}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        sound.playPop();
                        setOrderType('wholesale');
                      }}
                      className={`py-2 px-3 text-xs font-black rounded-xl border-2 transition-all cursor-pointer ${
                        orderType === 'wholesale'
                          ? 'border-stone-900 bg-amber-400 text-stone-900 shadow-[0_2px_0_#1c1917]'
                          : 'border-stone-300 bg-white text-stone-700 hover:border-stone-900'
                      }`}
                    >
                      {t.basket.wholesale}
                    </button>
                  </div>
                </div>

                {/* City Input */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-black text-stone-800">
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
                    className="w-full text-base sm:text-xs font-bold px-3 py-2.5 bg-white border-2 border-stone-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-[0_2px_0_#1c1917]"
                  />
                </div>

                {/* Custom Note */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-black text-stone-800">
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
                    className="w-full text-base sm:text-xs font-bold px-3 py-2 bg-white border-2 border-stone-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-[0_2px_0_#1c1917]"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Footer CTA with Safe Area Handling */}
          <div className="p-4 sm:p-5 border-t-2 border-stone-900 bg-white space-y-2 pb-[max(1.25rem,env(safe-area-inset-bottom,1.25rem))]">
            {onNavigate && (
              <button
                onClick={() => {
                  sound.playPop();
                  onClose();
                  onNavigate('checkout');
                }}
                disabled={items.length === 0}
                className={`w-full py-3 px-4 font-black text-xs sm:text-sm rounded-xl border-2 border-stone-900 transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  items.length > 0
                    ? 'bg-amber-400 hover:bg-amber-300 text-stone-900 shadow-[0_3px_0_#1c1917]'
                    : 'bg-stone-100 text-stone-400 border-stone-200 cursor-not-allowed'
                }`}
              >
                <span>Calculate Courier & Checkout</span>
                <span className="text-xs">→</span>
              </button>
            )}

            <button
              onClick={handleSendWhatsApp}
              disabled={items.length === 0}
              className={`w-full py-3.5 sm:py-4 px-4 font-black text-sm flex items-center justify-center gap-2 transition-all min-h-[48px] ${
                items.length > 0
                  ? 'cartoon-btn-whatsapp shadow-[0_4px_0_#1c1917]'
                  : 'bg-stone-200 text-stone-400 rounded-xl border-2 border-stone-300 cursor-not-allowed'
              }`}
            >
              <WhatsAppIcon className="w-5 h-5" />
              <span>{t.basket.sendEnquiryWhatsApp}</span>
            </button>
            <p className="text-[11px] font-bold text-stone-500 text-center">
              Direct connection to Sakshi Pradip Papad dispatch desk 🚀
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
