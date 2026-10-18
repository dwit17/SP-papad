import React, { useState } from 'react';
import { Language, StoreConfig } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { PRODUCTS } from '../data/products';
import { Phone, MapPin, Mail, Clock, Send, ShieldCheck, Truck } from 'lucide-react';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { sound } from '../utils/audioSynth';

interface ContactViewProps {
  currentLang: Language;
  storeConfig: StoreConfig;
  onOpenWhatsAppDirect: (customMsg?: string) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({
  currentLang,
  storeConfig,
  onOpenWhatsAppDirect,
}) => {
  const t = TRANSLATIONS[currentLang];
  const [selectedProductId, setSelectedProductId] = useState(PRODUCTS[0].id);
  const [selectedPack, setSelectedPack] = useState('500g');
  const [orderType, setOrderType] = useState<'retail' | 'wholesale'>('retail');
  const [city, setCity] = useState('');
  const [userMessage, setUserMessage] = useState('');

  const currentProduct = PRODUCTS.find((p) => p.id === selectedProductId) || PRODUCTS[0];

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sound.playCrunch();

    let text = '';
    if (currentLang === 'gu') {
      text = `નમસ્તે સાક્ષી પ્રદીપ પાપડ,\nહું ${currentProduct.name.gu} (${selectedPack}) માટે પૂછપરછ કરવા માંગુ છું.\nઓર્ડર પ્રકાર: ${orderType === 'retail' ? 'ઘર વપરાશ (રીટેલ)' : 'વેપાર / હોલસેલ'}\nશહેર: ${city || 'ગુજરાત'}\n${userMessage ? `નોંધ: ${userMessage}\n` : ''}કૃપા કરીને વિગત જણાવશો.`;
    } else if (currentLang === 'hi') {
      text = `नमस्ते साक्षी प्रदीप पापड़,\nमैं ${currentProduct.name.hi} (${selectedPack}) के लिए पूछताछ करना चाहता हूँ।\nप्रकार: ${orderType === 'retail' ? 'खुदरा (घर के लिए)' : 'थोक (व्यापार)'}\nशहर: ${city || 'भारत'}\n${userMessage ? `टिप्पणी: ${userMessage}\n` : ''}कृपया मूल्य व डिलीवरी बताएं।`;
    } else {
      text = `Hello Sakshi Pradip Papad,\nI would like to enquire about ${currentProduct.name.en} (${selectedPack}).\nOrder Type: ${orderType === 'retail' ? 'Retail' : 'Wholesale / Bulk'}\nCity: ${city || 'India'}\n${userMessage ? `Note: ${userMessage}\n` : ''}Please share availability and pricing.`;
    }

    const cleanPhone = storeConfig.phoneWhatsApp.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="pt-28 pb-20 bg-[#FFFDF7] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Page Title: Single H1 */}
        <div className="border-b-2 border-stone-900 pb-6">

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-stone-900">
            {t.contactPage.title}
          </h1>
          <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-stone-600 mt-2">
            <span className="cartoon-badge bg-emerald-100 text-stone-900">Direct WhatsApp 💬</span>
            <span className="cartoon-badge bg-amber-100 text-stone-900">Rajkot Hub 🏭</span>
            <span className="cartoon-badge bg-orange-100 text-stone-900">Retail & Bulk 📦</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact Details & Wholesale Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="cartoon-card p-6 sm:p-7 space-y-5 bg-white">
              <h2 className="text-lg font-black text-stone-900 border-b-2 border-stone-200 pb-3">
                {t.contactPage.title}
              </h2>

              <div className="space-y-4 text-xs font-medium text-stone-700">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-red-100 border-2 border-stone-900 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-red-600" />
                  </div>
                  <div>
                    <span className="font-black text-stone-900 block text-xs">
                      {t.contactPage.addressHeading}
                    </span>
                    <p className="text-stone-600 mt-0.5">
                      {storeConfig.addressLine1}, {storeConfig.city}, {storeConfig.state} - {storeConfig.pincode}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 border-2 border-stone-900 flex items-center justify-center shrink-0">
                    <WhatsAppIcon className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <span className="font-black text-stone-900 block text-xs">
                      {t.contactPage.whatsappHeading}
                    </span>
                    <button
                      onClick={() => {
                        sound.playCrunch();
                        onOpenWhatsAppDirect();
                      }}
                      className="text-emerald-700 font-black hover:underline cursor-pointer block mt-0.5"
                    >
                      {storeConfig.phoneWhatsApp} (Click to Chat)
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-amber-100 border-2 border-stone-900 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-stone-700" />
                  </div>
                  <div>
                    <span className="font-black text-stone-900 block text-xs">
                      {t.contactPage.phoneHeading}
                    </span>
                    <p className="text-stone-600 mt-0.5 font-bold">{storeConfig.phoneDisplay}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-stone-900 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-blue-700" />
                  </div>
                  <div>
                    <span className="font-black text-stone-900 block text-xs">
                      {t.contactPage.emailHeading}
                    </span>
                    <p className="text-stone-600 mt-0.5 font-bold">{storeConfig.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-100 border-2 border-stone-900 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-purple-700" />
                  </div>
                  <div>
                    <span className="font-black text-stone-900 block text-xs">
                      {t.contactPage.hoursHeading}
                    </span>
                    <p className="text-stone-600 mt-0.5 font-bold">{storeConfig.workingHours}</p>
                  </div>
                </div>
              </div>

              {/* FSSAI Badge */}
              <div className="p-3.5 bg-amber-50 rounded-2xl border-2 border-stone-900 flex items-center gap-3 shadow-[0_2px_0_#1c1917]">
                <ShieldCheck className="w-6 h-6 text-emerald-700 shrink-0" />
                <div className="text-[11px]">
                  <span className="font-black text-stone-900 block">FSSAI License Verified</span>
                  <span className="font-mono font-bold text-stone-700">{storeConfig.fssaiLicence}</span>
                </div>
              </div>
            </div>

            {/* Wholesale Information Box - High Visibility & Contrast */}
            <div className="cartoon-card p-5 sm:p-6 space-y-3.5 bg-amber-100 border-2 border-stone-900 shadow-[0_4px_0_#1c1917]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-400 border-2 border-stone-900 flex items-center justify-center shrink-0 shadow-[0_2px_0_#1c1917]">
                  <Truck className="w-4 h-4 text-stone-900" />
                </div>
                <span className="text-stone-900 font-black text-sm sm:text-base">
                  {t.contactPage.wholesaleHeading}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-stone-800 leading-relaxed font-semibold">
                {t.contactPage.wholesaleText}
              </p>

              <div className="p-3 bg-white rounded-xl border-2 border-stone-900 text-xs text-stone-900 font-bold leading-relaxed shadow-[0_2px_0_#1c1917]">
                <span className="font-black text-amber-900 block text-[10px] uppercase tracking-wider mb-1">
                  Bulk Merchant & Catering Rates
                </span>
                Bulk 5 kg & 10 kg master corrugated cartons with wholesale transport rates across Gujarat, Maharashtra, Delhi, and pan-India.
              </div>
            </div>
          </div>

          {/* Right Column: Direct WhatsApp Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="cartoon-card p-6 sm:p-8 space-y-6 bg-white">
              <div>
                <h2 className="text-2xl font-black text-stone-900">
                  {currentLang === 'gu'
                    ? 'સીધી વોટ્સએપ પૂછપરછ મોકલો'
                    : currentLang === 'hi'
                    ? 'सीधे व्हाट्सएप पर पूछताछ भेजें'
                    : 'Instant WhatsApp Enquiry Form'}
                </h2>
                <p className="text-xs font-bold text-stone-500 mt-1">
                  Select your variety and pack size to begin chatting directly with our sales team.
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                {/* Order Type Toggle */}
                <div className="space-y-1.5">
                  <label className="font-black text-stone-800 block text-xs">
                    {t.contactPage.formTypeLabel}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        sound.playPop();
                        setOrderType('retail');
                      }}
                      className={`py-3 px-3 rounded-xl border-2 text-xs font-black cursor-pointer transition-all ${
                        orderType === 'retail'
                          ? 'border-stone-900 bg-amber-400 text-stone-900 shadow-[0_3px_0_#1c1917] -translate-y-0.5'
                          : 'border-stone-300 bg-white text-stone-700 hover:border-stone-900'
                      }`}
                    >
                      {t.contactPage.typeRetail}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        sound.playPop();
                        setOrderType('wholesale');
                      }}
                      className={`py-3 px-3 rounded-xl border-2 text-xs font-black cursor-pointer transition-all ${
                        orderType === 'wholesale'
                          ? 'border-stone-900 bg-amber-400 text-stone-900 shadow-[0_3px_0_#1c1917] -translate-y-0.5'
                          : 'border-stone-300 bg-white text-stone-700 hover:border-stone-900'
                      }`}
                    >
                      {t.contactPage.typeWholesale}
                    </button>
                  </div>
                </div>

                {/* Product Select */}
                <div className="space-y-1.5">
                  <label className="font-black text-stone-800 block text-xs">
                    {t.contactPage.formProductLabel}
                  </label>
                  <select
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    className="w-full px-3.5 py-3 bg-white border-2 border-stone-900 rounded-xl text-base sm:text-xs font-bold focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-[0_2px_0_#1c1917]"
                  >
                    {PRODUCTS.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name[currentLang]} ({p.categoryLabel[currentLang]})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Pack Size */}
                <div className="space-y-1.5">
                  <label className="font-black text-stone-800 block text-xs">
                    {t.contactPage.formPackLabel}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {currentProduct.packOptions.map((opt) => (
                      <button
                        type="button"
                        key={opt.size}
                        onClick={() => {
                          sound.playPop();
                          setSelectedPack(opt.size);
                        }}
                        className={`px-3.5 py-2 sm:py-1.5 rounded-xl border-2 text-xs font-black cursor-pointer transition-all min-h-[38px] ${
                          selectedPack === opt.size
                            ? 'bg-stone-900 border-stone-900 text-amber-300 shadow-[0_2px_0_#1c1917]'
                            : 'bg-white border-stone-300 text-stone-700 hover:border-stone-900'
                        }`}
                      >
                        {opt.size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* City */}
                <div className="space-y-1.5">
                  <label className="font-black text-stone-800 block text-xs">
                    {t.contactPage.formCityLabel}
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Rajkot, Ahmedabad, Surat, Mumbai"
                    className="w-full px-3.5 py-3 bg-white border-2 border-stone-900 rounded-xl text-base sm:text-xs font-bold focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-[0_2px_0_#1c1917]"
                  />
                </div>

                {/* Message / Requirement */}
                <div className="space-y-1.5">
                  <label className="font-black text-stone-800 block text-xs">
                    Specific Requirement / Questions (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    placeholder="Enter quantity needed or any specific inquiry..."
                    className="w-full px-3.5 py-3 bg-white border-2 border-stone-900 rounded-xl text-base sm:text-xs font-bold focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-[0_2px_0_#1c1917]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full cartoon-btn-whatsapp py-3.5 sm:py-4 px-4 text-sm font-black shadow-[0_4px_0_#1c1917] min-h-[48px]"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  <span>{t.contactPage.formSendWhatsApp}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
