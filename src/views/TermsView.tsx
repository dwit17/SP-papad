import React from 'react';
import { Language, StoreConfig } from '../types';
import { ShieldCheck, ArrowLeft, FileText, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/audioSynth';

interface TermsViewProps {
  currentLang: Language;
  onNavigate: (tab: string) => void;
  storeConfig: StoreConfig;
}

export const TermsView: React.FC<TermsViewProps> = ({
  currentLang,
  onNavigate,
  storeConfig,
}) => {
  return (
    <div className="pt-28 pb-20 bg-[#FFFDF7] min-h-screen selection:bg-amber-300 selection:text-stone-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Back button */}
        <div>
          <button
            onClick={() => {
              sound.playPop();
              onNavigate('home');
            }}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-black text-stone-700 hover:text-stone-900 cartoon-card px-3.5 py-2 bg-white cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
        </div>

        {/* Main Title - NO EYEBROW, NO SUBTEXT */}
        <div className="border-b-2 border-stone-900 pb-5">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight">
            Terms & Conditions
          </h1>
        </div>

        {/* Content Container */}
        <div className="space-y-6 text-stone-800 text-xs sm:text-sm leading-relaxed">
          {/* Section 1 */}
          <div className="cartoon-card p-5 sm:p-7 bg-white space-y-3">
            <h2 className="text-base sm:text-lg font-black text-stone-900">
              Acceptance of Terms
            </h2>
            <p className="font-medium text-stone-700">
              Welcome to {storeConfig.brandName}. By accessing our website, browsing our product catalog, placing orders, or sending inquiries via WhatsApp or phone, you agree to be bound by these Terms & Conditions, our Shipping Policy, and our Privacy Policy. If you do not agree with any part of these terms, please refrain from using our services.
            </p>
          </div>

          {/* Section 2 */}
          <div className="cartoon-card p-5 sm:p-7 bg-white space-y-3">
            <h2 className="text-base sm:text-lg font-black text-stone-900">
              Nature of Handcrafted & Sun-Dried Food Products
            </h2>
            <p className="font-medium text-stone-700">
              All our papads (Moong Mari, Udad Jeera, Lasaniya Garlic, Sindhi Masala, and Rice Khichiya) are traditionally handcrafted using genuine lentils, unadulterated spices, and natural sun-drying in Rajkot, Gujarat. Because natural artisanal methods are honored rather than artificial chemical drying:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 font-medium text-stone-700">
              <li>Slight natural variations in blister diameter, natural spice specks, and hue between batches are normal and signify authentic handmade quality.</li>
              <li>We do not add synthetic food colors, chemical leavening boosters, or artificial bleaching agents.</li>
              <li>Our products carry a shelf life of 12 months when stored in an airtight container in a cool, dry place.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="cartoon-card p-5 sm:p-7 bg-white space-y-3">
            <h2 className="text-base sm:text-lg font-black text-stone-900">
              Order Placement, Pricing & Payment Modes
            </h2>
            <p className="font-medium text-stone-700">
              Orders can be configured directly through our checkout system and submitted via WhatsApp for instant coordination with our dispatch team.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 font-medium text-stone-700">
              <li><strong>Advance Payment:</strong> All retail and wholesale orders require advance payment confirmation via UPI (Google Pay, PhonePe, Paytm, BHIM) or Direct Bank NEFT/IMPS.</li>
              <li><strong>No Cash on Delivery (COD):</strong> Due to the perishable and fragile nature of sun-dried food products, Cash on Delivery (COD) is not supported.</li>
              <li><strong>Price Inclusivity:</strong> Retail prices are inclusive of GST. Shipping and transport courier freight charges are calculated separately based on destination and parcel weight.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="cartoon-card p-5 sm:p-7 bg-white space-y-3">
            <h2 className="text-base sm:text-lg font-black text-stone-900">
              Order Cancellation & Modifications
            </h2>
            <p className="font-medium text-stone-700">
              You may request cancellation or change in packet quantities within 2 hours of payment confirmation, provided your order has not already been packed and handed over to the courier partner. Once a parcel is dispatched from our Rajkot hub and a tracking docket is issued, cancellations or route changes cannot be accommodated.
            </p>
          </div>

          {/* Section 5 */}
          <div className="cartoon-card p-5 sm:p-7 bg-white space-y-3">
            <h2 className="text-base sm:text-lg font-black text-stone-900">
              Food Safety & FSSAI Standards
            </h2>
            <p className="font-medium text-stone-700">
              Sakshi Pradip Papad complies with the food hygiene and manufacturing safety regulations specified by the Food Safety and Standards Authority of India (FSSAI).
            </p>
            <div className="p-3 bg-amber-50 rounded-xl border border-stone-300 font-bold flex items-center gap-2 text-stone-900">
              <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
              <span>FSSAI Central Food License No: <span className="font-mono">{storeConfig.fssaiLicence}</span></span>
            </div>
          </div>

          {/* Section 6 */}
          <div className="cartoon-card p-5 sm:p-7 bg-white space-y-3">
            <h2 className="text-base sm:text-lg font-black text-stone-900">
              Wholesale Merchant & Catering Terms
            </h2>
            <p className="font-medium text-stone-700">
              Wholesale merchant carton orders (5 kg and 10 kg master corrugated boxes) are fulfilled directly via road transport logistics. GST e-invoices are provided for registered businesses. Transport demurrage, destination octroi, or local terminal unloading fees (if any) are the responsibility of the consignee.
            </p>
          </div>

          {/* Section 7 */}
          <div className="cartoon-card p-5 sm:p-7 bg-white space-y-3">
            <h2 className="text-base sm:text-lg font-black text-stone-900">
              Governing Law & Jurisdiction
            </h2>
            <p className="font-medium text-stone-700">
              These terms are governed by and construed in accordance with the laws of India. Any legal dispute, claim, or proceeding arising out of or related to our products or services shall be subject to the exclusive jurisdiction of the competent courts in Rajkot, Gujarat, India.
            </p>
          </div>

          {/* Contact info card */}
          <div className="cartoon-card p-4 sm:p-6 bg-amber-50 border-2 border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-bold text-stone-900">
            <div>
              <span className="block font-black text-sm">{storeConfig.brandName} Legal Desk</span>
              <span className="text-stone-600">{storeConfig.addressLine1}, {storeConfig.city}, {storeConfig.state} - {storeConfig.pincode}</span>
            </div>
            <div className="font-mono text-stone-800">
              Email: {storeConfig.email} | Phone: {storeConfig.phoneDisplay}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
