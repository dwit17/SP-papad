import React from 'react';
import { Language, StoreConfig } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { MessageSquare, Phone, MapPin, Mail, ShieldCheck, Globe } from 'lucide-react';

interface FooterProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onNavigate: (tab: string) => void;
  storeConfig: StoreConfig;
  onOpenSeoModal: () => void;
  onOpenWhatsAppDirect: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLang,
  onLanguageChange,
  onNavigate,
  storeConfig,
  onOpenSeoModal,
  onOpenWhatsAppDirect,
}) => {
  const t = TRANSLATIONS[currentLang];

  const handleNav = (tab: string) => {
    onNavigate(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1C1917] text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
          {/* Col 1: Brand & FSSAI */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white tracking-tight">
              {storeConfig.brandName}
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Authentic Gujarati hand-rolled and sun-dried papads crafted with 100% natural lentils and traditional spices. Supplying Rajkot, Ahmedabad, and pan-India.
            </p>
            <div className="p-3 bg-stone-900 border border-stone-800 rounded-md space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Food Safety Certified</span>
              </div>
              <p className="text-[11px] text-stone-400 font-mono">
                {storeConfig.fssaiLicence}
              </p>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="text-stone-300 hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.home}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('products')}
                  className="text-stone-300 hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.products}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="text-stone-300 hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.about}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="text-stone-300 hover:text-white transition-colors cursor-pointer"
                >
                  {t.nav.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400">
              Orders & Dispatch
            </h4>
            <div className="space-y-2.5 text-xs text-stone-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C2410C] shrink-0 mt-0.5" />
                <span>{storeConfig.addressLine1}, {storeConfig.city}, {storeConfig.state}</span>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <button
                  onClick={onOpenWhatsAppDirect}
                  className="text-emerald-400 hover:underline cursor-pointer"
                >
                  WhatsApp: {storeConfig.phoneWhatsApp}
                </button>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-stone-400 shrink-0" />
                <span>{storeConfig.phoneDisplay}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-stone-400 shrink-0" />
                <span>{storeConfig.email}</span>
              </div>
            </div>
          </div>

          {/* Col 4: Regional Language & SEO */}
          <div className="space-y-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-400">
              Language / ભાષા / भाषा
            </h4>
            <div className="flex gap-2">
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-2.5 py-1 text-xs rounded border transition-colors ${
                  currentLang === 'en'
                    ? 'border-white bg-white text-stone-900 font-semibold'
                    : 'border-stone-700 text-stone-400 hover:text-white'
                }`}
              >
                English
              </button>
              <button
                onClick={() => onLanguageChange('gu')}
                className={`px-2.5 py-1 text-xs rounded border transition-colors ${
                  currentLang === 'gu'
                    ? 'border-white bg-white text-stone-900 font-semibold'
                    : 'border-stone-700 text-stone-400 hover:text-white'
                }`}
              >
                ગુજરાતી
              </button>
              <button
                onClick={() => onLanguageChange('hi')}
                className={`px-2.5 py-1 text-xs rounded border transition-colors ${
                  currentLang === 'hi'
                    ? 'border-white bg-white text-stone-900 font-semibold'
                    : 'border-stone-700 text-stone-400 hover:text-white'
                }`}
              >
                हिन्दी
              </button>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenSeoModal}
                className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-[#C2410C] transition-colors cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{t.footer.seoToolsLink}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} {storeConfig.brandName}. {t.footer.copyright}</p>
          <p>{t.footer.seoDisclaimer}</p>
        </div>
      </div>
    </footer>
  );
};
