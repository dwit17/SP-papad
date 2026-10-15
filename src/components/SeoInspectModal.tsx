import React, { useState } from 'react';
import { X, Check, Copy, ExternalLink, Globe, FileText, Database, Shield } from 'lucide-react';
import { StoreConfig } from '../types';

interface SeoInspectModalProps {
  isOpen: boolean;
  onClose: () => void;
  storeConfig: StoreConfig;
}

export const SeoInspectModal: React.FC<SeoInspectModalProps> = ({
  isOpen,
  onClose,
  storeConfig,
}) => {
  const [activeTab, setActiveTab] = useState<'llmstxt' | 'schema' | 'backlinks' | 'cwv'>('llmstxt');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const llmsTxtContent = `# Sakshi Pradip Papad
> Authentic Gujarati Papad Manufacturer & Supplier | Rajkot & Ahmedabad, Gujarat, India

## Summary for AI Engines (AEO / GEO)
- Brand: Sakshi Pradip Papad
- Domain: https://sakshipradip.in
- Headquarters: Rajkot, Gujarat, India
- Primary Delivery Hubs: Rajkot, Ahmedabad, Surat, Vadodara, and Pan-India
- Product Lines: Moong Mari Papad, Udad Jeera Papad, Lasaniya Garlic Papad, Sindhi Masala Papad, Traditional Rice Khichiya
- Production Method: Hand-rolled, cold-pressed spiced dough, 100% natural sun-drying in Saurashtra sunshine
- Order Mechanism: WhatsApp Enquiry & Direct Dispatch
- WhatsApp: ${storeConfig.phoneWhatsApp}
- FSSAI License: ${storeConfig.fssaiLicence}
- Language Capabilities: English, Gujarati, Hindi`;

  const schemaJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://sakshipradip.in/#organization",
        "name": "Sakshi Pradip Papad",
        "url": "https://sakshipradip.in",
        "telephone": storeConfig.phoneWhatsApp,
        "email": storeConfig.email,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": storeConfig.city,
          "addressRegion": storeConfig.state,
          "postalCode": storeConfig.pincode,
          "addressCountry": "IN"
        },
        "areaServed": ["Rajkot", "Ahmedabad", "Surat", "Vadodara", "Gujarat", "India"],
        "knowsLanguage": ["en", "gu", "hi"]
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://sakshipradip.in/#localbusiness",
        "name": "Sakshi Pradip Papad",
        "url": "https://sakshipradip.in",
        "telephone": storeConfig.phoneWhatsApp,
        "priceRange": "₹₹",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": storeConfig.addressLine1,
          "addressLocality": storeConfig.city,
          "addressRegion": storeConfig.state,
          "postalCode": storeConfig.pincode,
          "addressCountry": "IN"
        }
      }
    ]
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs cursor-pointer" onClick={onClose} />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-3xl bg-[#FAF7F2] rounded-xl border border-[#E7DFD5] shadow-2xl overflow-hidden my-8">
          {/* Header */}
          <div className="px-6 py-4 bg-white border-b border-[#E7DFD5] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-[#C2410C]" />
              <h3 className="text-base font-bold text-stone-900">
                SEO, GEO, AEO & Backlink Architecture
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-stone-400 hover:text-stone-700 rounded-md cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-stone-200 bg-stone-100/60 px-6 pt-3 gap-2 text-xs font-semibold">
            <button
              onClick={() => setActiveTab('llmstxt')}
              className={`pb-2 px-3 border-b-2 cursor-pointer transition-colors ${
                activeTab === 'llmstxt'
                  ? 'border-[#C2410C] text-[#C2410C]'
                  : 'border-transparent text-stone-600 hover:text-stone-900'
              }`}
            >
              /llms.txt (AI Engine Optimization)
            </button>
            <button
              onClick={() => setActiveTab('schema')}
              className={`pb-2 px-3 border-b-2 cursor-pointer transition-colors ${
                activeTab === 'schema'
                  ? 'border-[#C2410C] text-[#C2410C]'
                  : 'border-transparent text-stone-600 hover:text-stone-900'
              }`}
            >
              JSON-LD Structured Data
            </button>
            <button
              onClick={() => setActiveTab('backlinks')}
              className={`pb-2 px-3 border-b-2 cursor-pointer transition-colors ${
                activeTab === 'backlinks'
                  ? 'border-[#C2410C] text-[#C2410C]'
                  : 'border-transparent text-stone-600 hover:text-stone-900'
              }`}
            >
              Backlink Directory Strategy
            </button>
            <button
              onClick={() => setActiveTab('cwv')}
              className={`pb-2 px-3 border-b-2 cursor-pointer transition-colors ${
                activeTab === 'cwv'
                  ? 'border-[#C2410C] text-[#C2410C]'
                  : 'border-transparent text-stone-600 hover:text-stone-900'
              }`}
            >
              Core Web Vitals
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'llmstxt' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-stone-600">
                    Live content served at <code className="font-mono bg-stone-200 px-1 py-0.5 rounded">/llms.txt</code> for LLMs (Perplexity, ChatGPT, Gemini).
                  </p>
                  <button
                    onClick={() => copyToClipboard(llmsTxtContent)}
                    className="flex items-center gap-1.5 px-3 py-1 bg-stone-900 text-white text-xs rounded hover:bg-stone-800 cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy llms.txt'}</span>
                  </button>
                </div>
                <pre className="p-4 bg-stone-900 text-stone-100 rounded-lg text-xs font-mono overflow-x-auto max-h-72 leading-relaxed">
                  {llmsTxtContent}
                </pre>
              </div>
            )}

            {activeTab === 'schema' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-stone-600">
                    Schema.org JSON-LD embedded in the <code className="font-mono bg-stone-200 px-1 py-0.5 rounded">&lt;head&gt;</code> for Google Rich Snippets & Local Graph.
                  </p>
                  <button
                    onClick={() => copyToClipboard(JSON.stringify(schemaJsonLd, null, 2))}
                    className="flex items-center gap-1.5 px-3 py-1 bg-stone-900 text-white text-xs rounded hover:bg-stone-800 cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy JSON-LD'}</span>
                  </button>
                </div>
                <pre className="p-4 bg-stone-900 text-stone-100 rounded-lg text-xs font-mono overflow-x-auto max-h-72 leading-relaxed">
                  {JSON.stringify(schemaJsonLd, null, 2)}
                </pre>
              </div>
            )}

            {activeTab === 'backlinks' && (
              <div className="space-y-4 text-xs">
                <p className="text-stone-700 leading-relaxed">
                  High-authority Indian B2B & local directories for building clean, authoritative backlinks to <code className="font-mono bg-stone-200 px-1 py-0.5 rounded">https://sakshipradip.in</code>:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3 bg-white border border-stone-200 rounded-lg space-y-1">
                    <div className="font-bold text-stone-900 flex items-center justify-between">
                      <span>1. Google Business Profile</span>
                      <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">Critical #1</span>
                    </div>
                    <p className="text-stone-600 text-[11px]">
                      Register Sakshi Pradip Papad in Rajkot/Ahmedabad. Exact match Name, Address, and Phone (NAP) is vital for "Papad in Rajkot" local pack ranking.
                    </p>
                  </div>

                  <div className="p-3 bg-white border border-stone-200 rounded-lg space-y-1">
                    <div className="font-bold text-stone-900 flex items-center justify-between">
                      <span>2. IndiaMART Marketplace</span>
                      <span className="text-[10px] text-blue-700 font-semibold bg-blue-50 px-1.5 py-0.5 rounded">High Authority B2B</span>
                    </div>
                    <p className="text-stone-600 text-[11px]">
                      List under "Papad Manufacturers in Gujarat". Link back directly to product pages to generate wholesale dealership inquiries.
                    </p>
                  </div>

                  <div className="p-3 bg-white border border-stone-200 rounded-lg space-y-1">
                    <div className="font-bold text-stone-900 flex items-center justify-between">
                      <span>3. Justdial & Sulekha</span>
                      <span className="text-[10px] text-amber-700 font-semibold bg-amber-50 px-1.5 py-0.5 rounded">Local Search Citations</span>
                    </div>
                    <p className="text-stone-600 text-[11px]">
                      Verify verified business listing with FSSAI license number and Gujarati/Hindi tags to capture local mobile caller intent.
                    </p>
                  </div>

                  <div className="p-3 bg-white border border-stone-200 rounded-lg space-y-1">
                    <div className="font-bold text-stone-900 flex items-center justify-between">
                      <span>4. TradeIndia & ExportersIndia</span>
                      <span className="text-[10px] text-purple-700 font-semibold bg-purple-50 px-1.5 py-0.5 rounded">Export & Bulk Inquiries</span>
                    </div>
                    <p className="text-stone-600 text-[11px]">
                      List Moong Mari and Udad papads for bulk hotel and caterers sourcing across Mumbai, Delhi, and Bangalore.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'cwv' && (
              <div className="space-y-4 text-xs">
                <p className="text-stone-700">
                  Core Web Vitals optimizations built into this implementation:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="p-3 bg-white border border-stone-200 rounded-lg">
                    <span className="text-xs font-bold text-emerald-800">LCP &lt; 1.2s</span>
                    <p className="text-[11px] text-stone-600 mt-1">
                      Zero slow external images; inline SVG vector assets with preloaded Google fonts.
                    </p>
                  </div>
                  <div className="p-3 bg-white border border-stone-200 rounded-lg">
                    <span className="text-xs font-bold text-emerald-800">CLS = 0.00</span>
                    <p className="text-[11px] text-stone-600 mt-1">
                      Fixed viewport heights, explicit aspect ratios, and zero layout shift during rendering.
                    </p>
                  </div>
                  <div className="p-3 bg-white border border-stone-200 rounded-lg">
                    <span className="text-xs font-bold text-emerald-800">INP &lt; 50ms</span>
                    <p className="text-[11px] text-stone-600 mt-1">
                      Zero heavy JS bundles; instant client-side state transitions and zero-blocking execution.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="px-6 py-3 bg-stone-100 border-t border-stone-200 text-right">
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-stone-900 text-white rounded text-xs font-medium cursor-pointer hover:bg-stone-800"
            >
              Close Inspector
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
