import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { MessageSquare, ShoppingBag, Menu, X, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  activeTab: string;
  onNavigate: (tab: string) => void;
  totalEnquiriesCount: number;
  onOpenBasket: () => void;
  onOpenWhatsAppDirect: () => void;
  onOpenConfigModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  activeTab,
  onNavigate,
  totalEnquiriesCount,
  onOpenBasket,
  onOpenWhatsAppDirect,
  onOpenConfigModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = TRANSLATIONS[currentLang];

  const handleNavClick = (tab: string) => {
    onNavigate(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E7DFD5] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4 lg:gap-8">
        {/* Zone 1: Brand wordmark (single text element wordmark, no decorative pill) */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-900 rounded-sm"
        >
          <span className="text-xl sm:text-2xl font-bold tracking-tight text-[#1C1917] whitespace-nowrap block">
            Sakshi Pradip Papad
          </span>
        </button>

        {/* Zone 2: Nav links + Language Switcher (clean typography, no pill badges) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-stone-700">
          <button
            onClick={() => handleNavClick('home')}
            className={`cursor-pointer whitespace-nowrap transition-colors pb-1 border-b-2 ${
              activeTab === 'home'
                ? 'border-[#C2410C] text-[#1C1917] font-semibold'
                : 'border-transparent hover:text-[#1C1917]'
            }`}
          >
            {t.nav.home}
          </button>
          <button
            onClick={() => handleNavClick('products')}
            className={`cursor-pointer whitespace-nowrap transition-colors pb-1 border-b-2 ${
              activeTab === 'products'
                ? 'border-[#C2410C] text-[#1C1917] font-semibold'
                : 'border-transparent hover:text-[#1C1917]'
            }`}
          >
            {t.nav.products}
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className={`cursor-pointer whitespace-nowrap transition-colors pb-1 border-b-2 ${
              activeTab === 'about'
                ? 'border-[#C2410C] text-[#1C1917] font-semibold'
                : 'border-transparent hover:text-[#1C1917]'
            }`}
          >
            {t.nav.about}
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className={`cursor-pointer whitespace-nowrap transition-colors pb-1 border-b-2 ${
              activeTab === 'contact'
                ? 'border-[#C2410C] text-[#1C1917] font-semibold'
                : 'border-transparent hover:text-[#1C1917]'
            }`}
          >
            {t.nav.contact}
          </button>

          {/* Minimal Language Switcher: EN | हिं | ગુ */}
          <div className="flex items-center gap-1 border-l border-stone-300 pl-4 text-xs font-semibold">
            <button
              onClick={() => onLanguageChange('en')}
              className={`px-1.5 py-1 rounded transition-colors ${
                currentLang === 'en'
                  ? 'bg-stone-900 text-white'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              title="English"
            >
              EN
            </button>
            <span className="text-stone-400">|</span>
            <button
              onClick={() => onLanguageChange('hi')}
              className={`px-1.5 py-1 rounded transition-colors ${
                currentLang === 'hi'
                  ? 'bg-stone-900 text-white'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              title="हिन्दी (Hindi)"
            >
              हिं
            </button>
            <span className="text-stone-400">|</span>
            <button
              onClick={() => onLanguageChange('gu')}
              className={`px-1.5 py-1 rounded transition-colors ${
                currentLang === 'gu'
                  ? 'bg-stone-900 text-white'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              title="ગુજરાતી (Gujarati)"
            >
              ગુ
            </button>
          </div>
        </nav>

        {/* Zone 3: 1 Primary Action (Enquire on WhatsApp & Basket Drawer) */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Enquiry List Drawer trigger */}
          <button
            onClick={onOpenBasket}
            className="relative p-2 text-stone-700 hover:text-stone-900 bg-white border border-[#E7DFD5] rounded-md transition-colors cursor-pointer"
            aria-label="View Enquiry Basket"
            title={t.nav.basket}
          >
            <ShoppingBag className="w-5 h-5" />
            {totalEnquiriesCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#C2410C] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalEnquiriesCount}
              </span>
            )}
          </button>

          {/* Primary Action Button */}
          <button
            onClick={onOpenWhatsAppDirect}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs lg:text-sm font-medium text-white bg-[#15803D] hover:bg-[#166534] active:bg-[#14532D] rounded-md transition-colors whitespace-nowrap cursor-pointer shadow-xs"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{t.nav.enquireWhatsApp}</span>
          </button>

          {/* Quick Config / FSSAI settings icon button */}
          {onOpenConfigModal && (
            <button
              onClick={onOpenConfigModal}
              className="p-2 text-stone-500 hover:text-stone-800 transition-colors rounded-md"
              title="Store Information & FSSAI Details"
              aria-label="Store Information"
            >
              <ShieldCheck className="w-5 h-5" />
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-700 hover:text-stone-900 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF7F2] border-b border-[#E7DFD5] px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3 text-base font-medium text-stone-800">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-left py-2 border-b border-stone-200 ${
                activeTab === 'home' ? 'text-[#C2410C] font-semibold' : ''
              }`}
            >
              {t.nav.home}
            </button>
            <button
              onClick={() => handleNavClick('products')}
              className={`text-left py-2 border-b border-stone-200 ${
                activeTab === 'products' ? 'text-[#C2410C] font-semibold' : ''
              }`}
            >
              {t.nav.products}
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className={`text-left py-2 border-b border-stone-200 ${
                activeTab === 'about' ? 'text-[#C2410C] font-semibold' : ''
              }`}
            >
              {t.nav.about}
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className={`text-left py-2 border-b border-stone-200 ${
                activeTab === 'contact' ? 'text-[#C2410C] font-semibold' : ''
              }`}
            >
              {t.nav.contact}
            </button>
          </nav>

          {/* Mobile Language Switcher */}
          <div className="pt-2 flex items-center justify-between border-t border-stone-200 text-sm">
            <span className="text-stone-500 font-medium">Language / ભાષા / भाषा:</span>
            <div className="flex gap-2">
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-3 py-1.5 rounded text-xs font-semibold ${
                  currentLang === 'en' ? 'bg-stone-900 text-white' : 'bg-white border border-stone-300'
                }`}
              >
                English
              </button>
              <button
                onClick={() => onLanguageChange('gu')}
                className={`px-3 py-1.5 rounded text-xs font-semibold ${
                  currentLang === 'gu' ? 'bg-stone-900 text-white' : 'bg-white border border-stone-300'
                }`}
              >
                ગુજરાતી
              </button>
              <button
                onClick={() => onLanguageChange('hi')}
                className={`px-3 py-1.5 rounded text-xs font-semibold ${
                  currentLang === 'hi' ? 'bg-stone-900 text-white' : 'bg-white border border-stone-300'
                }`}
              >
                हिन्दी
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenWhatsAppDirect();
              }}
              className="w-full py-3 bg-[#15803D] text-white rounded-md font-medium flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-5 h-5" />
              <span>{t.nav.enquireWhatsApp}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
