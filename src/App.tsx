import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ReactLenis, type LenisRef } from 'lenis/react';
import 'lenis/dist/lenis.css';
import { Language, EnquiryItem, StoreConfig } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { ProductsView } from './views/ProductsView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { TermsView } from './views/TermsView';
import { ShippingPolicyView } from './views/ShippingPolicyView';
import { PrivacyPolicyView } from './views/PrivacyPolicyView';
import { CheckoutView } from './views/CheckoutView';
import { EnquiryDrawer } from './components/EnquiryDrawer';
import { SeoInspectModal } from './components/SeoInspectModal';
import { SettingsModal } from './components/SettingsModal';


const DEFAULT_STORE_CONFIG: StoreConfig = {
  brandName: 'Sakshi Pradip Papad',
  phoneWhatsApp: '+91 98250 12345',
  phoneDisplay: '+91 98250 12345',
  email: 'orders@sakshipradip.in',
  addressLine1: 'Industrial Area, Aji GIDC',
  city: 'Rajkot',
  state: 'Gujarat',
  pincode: '360003',
  fssaiLicence: '10721026000123',
  workingHours: 'Monday – Saturday: 9:00 AM – 8:00 PM IST',
};

export default function App() {
  // Initialize language from query or localStorage or default to 'en'
  const [currentLang, setCurrentLang] = useState<Language>(() => {
    const params = new URLSearchParams(window.location.search);
    const langParam = params.get('lang');
    if (langParam === 'gu' || langParam === 'hi' || langParam === 'en') {
      return langParam;
    }
    const saved = localStorage.getItem('sakshi_papad_lang');
    if (saved === 'gu' || saved === 'hi' || saved === 'en') {
      return saved as Language;
    }
    return 'en';
  });

  // Active view tab (home, products, about, contact, checkout, terms, shipping-policy, privacy-policy)
  const [activeTab, setActiveTab] = useState<string>(() => {
    const hash = window.location.hash.replace('#', '');
    const validTabs = ['products', 'about', 'contact', 'checkout', 'terms', 'shipping-policy', 'privacy-policy'];
    if (validTabs.includes(hash)) {
      return hash;
    }
    return 'home';
  });

  // Store Configuration
  const [storeConfig, setStoreConfig] = useState<StoreConfig>(() => {
    try {
      const saved = localStorage.getItem('sakshi_store_config');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_STORE_CONFIG;
  });

  // Enquiry Basket Items
  const [enquiryItems, setEnquiryItems] = useState<EnquiryItem[]>(() => {
    try {
      const saved = localStorage.getItem('sakshi_enquiry_items');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [];
  });

  // Modals
  const [isBasketOpen, setIsBasketOpen] = useState(false);
  const [isSeoModalOpen, setIsSeoModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

  // Lenis Smooth Scroll Reference & Configuration
  const lenisRef = useRef<LenisRef>(null);

  const lenisOptions = useMemo(
    () => ({
      lerp: 0.08,
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      autoRaf: true,
      anchors: true,
    }),
    []
  );

  // Stop Lenis background scrolling when any modal or drawer is open
  useEffect(() => {
    const isModalActive = isBasketOpen || isSeoModalOpen || isSettingsModalOpen;
    if (isModalActive) {
      lenisRef.current?.lenis?.stop();
    } else {
      lenisRef.current?.lenis?.start();
    }
  }, [isBasketOpen, isSeoModalOpen, isSettingsModalOpen]);

  // Sync language with document & localStorage
  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    localStorage.setItem('sakshi_papad_lang', lang);
    document.documentElement.lang = lang === 'gu' ? 'gu-IN' : lang === 'hi' ? 'hi-IN' : 'en-IN';

    // Update URL query cleanly without page reload
    const url = new URL(window.location.href);
    if (lang === 'en') {
      url.searchParams.delete('lang');
    } else {
      url.searchParams.set('lang', lang);
    }
    window.history.replaceState({}, '', url.toString());
  };

  // Sync tab with URL hash & smooth scroll to top
  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
    lenisRef.current?.lenis?.scrollTo(0, { immediate: false, duration: 0.7 });
    if (tab === 'home') {
      window.history.pushState({}, '', window.location.pathname + window.location.search);
    } else {
      window.location.hash = tab;
    }
  };

  // Listen to popstate / hashchange for back/forward browser button navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validTabs = ['products', 'about', 'contact', 'checkout', 'terms', 'shipping-policy', 'privacy-policy'];
      if (validTabs.includes(hash)) {
        setActiveTab(hash);
      } else {
        setActiveTab('home');
      }
      lenisRef.current?.lenis?.scrollTo(0, { immediate: false, duration: 0.7 });
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Save enquiry items to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('sakshi_enquiry_items', JSON.stringify(enquiryItems));
    } catch {
      // ignore
    }
  }, [enquiryItems]);

  // Save store config
  const handleSaveConfig = (newConfig: StoreConfig) => {
    setStoreConfig(newConfig);
    localStorage.setItem('sakshi_store_config', JSON.stringify(newConfig));
  };

  const handleResetConfig = () => {
    setStoreConfig(DEFAULT_STORE_CONFIG);
    localStorage.removeItem('sakshi_store_config');
  };

  // Enquiry Item Operations
  const handleAddToEnquiry = (productId: string, packSize: string) => {
    setEnquiryItems((prev) => {
      const existing = prev.find(
        (item) => item.productId === productId && item.packSize === packSize
      );
      if (existing) {
        return prev.map((item) =>
          item.productId === productId && item.packSize === packSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { productId, packSize, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, packSize: string, delta: number) => {
    setEnquiryItems((prev) => {
      return prev
        .map((item) => {
          if (item.productId === productId && item.packSize === packSize) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as EnquiryItem[];
    });
  };

  const handleRemoveItem = (productId: string, packSize: string) => {
    setEnquiryItems((prev) =>
      prev.filter((item) => !(item.productId === productId && item.packSize === packSize))
    );
  };

  const handleClearBasket = () => {
    setEnquiryItems([]);
  };

  // Direct 1-tap WhatsApp Click-to-Chat Link
  const handleOpenWhatsAppDirect = (productName?: string) => {
    const cleanPhone = storeConfig.phoneWhatsApp.replace(/[^0-9]/g, '');
    let msg = '';
    if (productName) {
      if (currentLang === 'gu') {
        msg = `નમસ્તે સાક્ષી પ્રદીપ પાપડ, હું ${productName} માટે પૂછપરછ કરવા માંગુ છું. કિંમત અને વિગત જણાવશો.`;
      } else if (currentLang === 'hi') {
        msg = `नमस्ते साक्षी प्रदीप पापड़, मैं ${productName} के लिए पूछताछ करना चाहता हूँ। कृपया मूल्य और डिलीवरी की जानकारी दें।`;
      } else {
        msg = `Hello Sakshi Pradip Papad, I would like to enquire about ${productName}. Please share availability and details.`;
      }
    } else {
      if (currentLang === 'gu') {
        msg = `નમસ્તે સાક્ષી પ્રદીપ પાપડ, હું આપના અસલી ગુજરાતી પાપડના ઓર્ડર અને ડિલિવરી માટે પૂછપરછ કરવા માંગુ છું.`;
      } else if (currentLang === 'hi') {
        msg = `नमस्ते साक्षी प्रदीप पापड़, मैं आपके प्रामाणिक गुजराती पापड़ के ऑर्डर और डिलीवरी के संबंध में पूछताछ करना चाहता हूँ।`;
      } else {
        msg = `Hello Sakshi Pradip Papad, I would like to enquire about ordering your authentic Gujarati papad products.`;
      }
    }

    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const totalEnquiriesCount = enquiryItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <ReactLenis root ref={lenisRef} options={lenisOptions}>
      <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#44403C] selection:bg-[#C2410C]/20 selection:text-[#1C1917]">
        {/* Top Bar Navigation */}
        <Header
          currentLang={currentLang}
          onLanguageChange={handleLanguageChange}
          activeTab={activeTab}
          onNavigate={handleNavigate}
          totalEnquiriesCount={totalEnquiriesCount}
          onOpenBasket={() => setIsBasketOpen(true)}
          onOpenWhatsAppDirect={() => handleOpenWhatsAppDirect()}
          onOpenConfigModal={() => setIsSettingsModalOpen(true)}
        />

        {/* Main Content Area */}
        <main className="flex-1">
          {activeTab === 'home' && (
            <HomeView
              currentLang={currentLang}
              onNavigate={handleNavigate}
              onAddToEnquiry={handleAddToEnquiry}
              onOpenWhatsAppDirect={handleOpenWhatsAppDirect}
              storeConfig={storeConfig}
            />
          )}

          {activeTab === 'products' && (
            <ProductsView
              currentLang={currentLang}
              onAddToEnquiry={handleAddToEnquiry}
              onOpenWhatsAppDirect={handleOpenWhatsAppDirect}
              onOpenBasket={() => setIsBasketOpen(true)}
              totalEnquiriesCount={totalEnquiriesCount}
              storeConfig={storeConfig}
            />
          )}

          {activeTab === 'about' && (
            <AboutView
              currentLang={currentLang}
              onNavigate={handleNavigate}
              onOpenWhatsAppDirect={() => handleOpenWhatsAppDirect()}
              storeConfig={storeConfig}
            />
          )}

          {activeTab === 'contact' && (
            <ContactView
              currentLang={currentLang}
              storeConfig={storeConfig}
              onOpenWhatsAppDirect={handleOpenWhatsAppDirect}
            />
          )}

          {activeTab === 'terms' && (
            <TermsView
              currentLang={currentLang}
              onNavigate={handleNavigate}
              storeConfig={storeConfig}
            />
          )}

          {activeTab === 'shipping-policy' && (
            <ShippingPolicyView
              currentLang={currentLang}
              onNavigate={handleNavigate}
              storeConfig={storeConfig}
            />
          )}

          {activeTab === 'privacy-policy' && (
            <PrivacyPolicyView
              currentLang={currentLang}
              onNavigate={handleNavigate}
              storeConfig={storeConfig}
            />
          )}

          {activeTab === 'checkout' && (
            <CheckoutView
              currentLang={currentLang}
              onNavigate={handleNavigate}
              enquiryItems={enquiryItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onClearBasket={handleClearBasket}
              onAddToEnquiry={handleAddToEnquiry}
              storeConfig={storeConfig}
            />
          )}
        </main>

        {/* Global Footer */}
        <Footer
          currentLang={currentLang}
          onLanguageChange={handleLanguageChange}
          onNavigate={handleNavigate}
          storeConfig={storeConfig}
          onOpenSeoModal={() => setIsSeoModalOpen(true)}
          onOpenWhatsAppDirect={() => handleOpenWhatsAppDirect()}
        />

        {/* Multi-Item Enquiry Basket Drawer */}
        <EnquiryDrawer
          isOpen={isBasketOpen}
          onClose={() => setIsBasketOpen(false)}
          items={enquiryItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onClearAll={handleClearBasket}
          currentLang={currentLang}
          storeConfig={storeConfig}
          onNavigate={handleNavigate}
        />

        {/* SEO / GEO / AEO / Backlink Inspector Modal */}
        <SeoInspectModal
          isOpen={isSeoModalOpen}
          onClose={() => setIsSeoModalOpen(false)}
          storeConfig={storeConfig}
        />

        {/* Store Details / FSSAI Config Modal */}
        <SettingsModal
          isOpen={isSettingsModalOpen}
          onClose={() => setIsSettingsModalOpen(false)}
          config={storeConfig}
          onSaveConfig={handleSaveConfig}
          onResetDefaults={handleResetConfig}
        />
      </div>
    </ReactLenis>
  );
}
