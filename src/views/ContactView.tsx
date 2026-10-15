import React, { useState } from 'react';
import { Language, StoreConfig } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { PRODUCTS } from '../data/products';
import { MessageSquare, Phone, MapPin, Mail, Clock, Send, ShieldCheck, Truck } from 'lucide-react';

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
    <div className="pt-24 pb-20 bg-[#FAF7F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Page Title: Single H1 */}
        <div className="border-b border-[#E7DFD5] pb-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#1C1917]">
            {t.contactPage.title}
          </h1>
          <div className="flex items-center gap-2 text-xs text-stone-600 mt-2 font-medium">
            <span>Direct WhatsApp Enquiry</span>
            <span aria-hidden="true">·</span>
            <span>Rajkot Manufacturing Hub</span>
            <span aria-hidden="true">·</span>
            <span>Retail & Bulk Supply</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact Details & Wholesale Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-[#E7DFD5] rounded-xl p-6 space-y-5 shadow-2xs">
              <h2 className="text-lg font-bold text-stone-900 border-b border-stone-100 pb-3">
                {t.contactPage.title}
              </h2>

              <div className="space-y-4 text-xs text-stone-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#C2410C] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-stone-900 block text-xs">
                      {t.contactPage.addressHeading}
                    </span>
                    <p className="text-stone-600 mt-0.5">
                      {storeConfig.addressLine1}, {storeConfig.city}, {storeConfig.state} - {storeConfig.pincode}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageSquare className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-stone-900 block text-xs">
                      {t.contactPage.whatsappHeading}
                    </span>
                    <button
                      onClick={() => onOpenWhatsAppDirect()}
                      className="text-emerald-700 font-semibold hover:underline cursor-pointer block mt-0.5"
                    >
                      {storeConfig.phoneWhatsApp} (Click to Chat)
                    </button>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-stone-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-stone-900 block text-xs">
                      {t.contactPage.phoneHeading}
                    </span>
                    <p className="text-stone-600 mt-0.5">{storeConfig.phoneDisplay}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-stone-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-stone-900 block text-xs">
                      {t.contactPage.emailHeading}
                    </span>
                    <p className="text-stone-600 mt-0.5">{storeConfig.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-stone-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-stone-900 block text-xs">
                      {t.contactPage.hoursHeading}
                    </span>
                    <p className="text-stone-600 mt-0.5">{storeConfig.workingHours}</p>
                  </div>
                </div>
              </div>

              {/* FSSAI Badge */}
              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200 flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
                <div className="text-[11px]">
                  <span className="font-bold text-stone-900 block">FSSAI License Verified</span>
                  <span className="font-mono text-stone-600">{storeConfig.fssaiLicence}</span>
                </div>
              </div>
            </div>

            {/* Wholesale Information Box */}
            <div className="bg-stone-900 text-stone-200 rounded-xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Truck className="w-4 h-4" />
                <span>{t.contactPage.wholesaleHeading}</span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                {t.contactPage.wholesaleText}
              </p>
              <div className="text-[11px] text-stone-400 pt-2 border-t border-stone-800">
                Bulk 5 kg & 10 kg master corrugated cartons with wholesale transport rates across Gujarat, Maharashtra, Delhi, and pan-India.
              </div>
            </div>
          </div>

          {/* Right Column: Direct WhatsApp Enquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-[#E7DFD5] rounded-xl p-6 sm:p-8 space-y-6 shadow-2xs">
              <div>
                <h2 className="text-xl font-bold text-stone-900">
                  {currentLang === 'gu'
                    ? 'સીધી વોટ્સએપ પૂછપરછ મોકલો'
                    : currentLang === 'hi'
                    ? 'सीधे व्हाट्सएप पर पूछताछ भेजें'
                    : 'Instant WhatsApp Enquiry Form'}
                </h2>
                <p className="text-xs text-stone-500 mt-1">
                  Select your variety and pack size to begin chatting directly with our sales team.
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                {/* Order Type Toggle */}
                <div className="space-y-1.5">
                  <label className="font-semibold text-stone-800 block">
                    {t.contactPage.formTypeLabel}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setOrderType('retail')}
                      className={`py-2.5 px-3 rounded-md border text-xs font-semibold cursor-pointer transition-colors ${
                        orderType === 'retail'
                          ? 'border-[#C2410C] bg-[#C2410C]/5 text-[#C2410C]'
                          : 'border-stone-300 bg-white text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      {t.contactPage.typeRetail}
                    </button>
                    <button
                      type="button"
                      onClick={() => setOrderType('wholesale')}
                      className={`py-2.5 px-3 rounded-md border text-xs font-semibold cursor-pointer transition-colors ${
                        orderType === 'wholesale'
                          ? 'border-[#C2410C] bg-[#C2410C]/5 text-[#C2410C]'
                          : 'border-stone-300 bg-white text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      {t.contactPage.typeWholesale}
                    </button>
                  </div>
                </div>

                {/* Product Select */}
                <div className="space-y-1.5">
                  <label className="font-semibold text-stone-800 block">
                    {t.contactPage.formProductLabel}
                  </label>
                  <select
                    value={selectedProductId}
                    onChange={(e) => setSelectedProductId(e.target.value)}
                    className="w-full px-3 py-2.5 bg-white border border-stone-300 rounded-md text-xs font-medium focus:ring-1 focus:ring-stone-900"
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
                  <label className="font-semibold text-stone-800 block">
                    {t.contactPage.formPackLabel}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {currentProduct.packOptions.map((opt) => (
                      <button
                        type="button"
                        key={opt.size}
                        onClick={() => setSelectedPack(opt.size)}
                        className={`px-3 py-1.5 rounded border text-xs cursor-pointer transition-colors ${
                          selectedPack === opt.size
                            ? 'bg-stone-900 border-stone-900 text-white font-medium'
                            : 'bg-stone-50 border-stone-200 text-stone-700 hover:border-stone-400'
                        }`}
                      >
                        {opt.size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* City */}
                <div className="space-y-1.5">
                  <label className="font-semibold text-stone-800 block">
                    {t.contactPage.formCityLabel}
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Rajkot, Ahmedabad, Surat, Mumbai"
                    className="w-full px-3 py-2.5 bg-white border border-stone-300 rounded-md focus:ring-1 focus:ring-stone-900"
                  />
                </div>

                {/* Message / Requirement */}
                <div className="space-y-1.5">
                  <label className="font-semibold text-stone-800 block">
                    Specific Requirement / Questions (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={userMessage}
                    onChange={(e) => setUserMessage(e.target.value)}
                    placeholder="Enter quantity needed or any specific inquiry..."
                    className="w-full px-3 py-2.5 bg-white border border-stone-300 rounded-md focus:ring-1 focus:ring-stone-900"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-4 bg-[#15803D] hover:bg-[#166534] active:bg-[#14532D] text-white font-bold rounded-md flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm text-sm"
                >
                  <MessageSquare className="w-5 h-5" />
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
