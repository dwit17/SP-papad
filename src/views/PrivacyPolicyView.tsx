import React from 'react';
import { Language, StoreConfig } from '../types';
import { ShieldCheck, ArrowLeft, Lock, Eye, Database, Bell } from 'lucide-react';
import { sound } from '../utils/audioSynth';

interface PrivacyPolicyViewProps {
  currentLang: Language;
  onNavigate: (tab: string) => void;
  storeConfig: StoreConfig;
}

export const PrivacyPolicyView: React.FC<PrivacyPolicyViewProps> = ({
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
            Privacy Policy
          </h1>
        </div>

        {/* Content Container */}
        <div className="space-y-6 text-stone-800 text-xs sm:text-sm leading-relaxed">
          {/* Section 1 */}
          <div className="cartoon-card p-5 sm:p-7 bg-white space-y-3">
            <h2 className="text-base sm:text-lg font-black text-stone-900">
              Our Privacy Commitment
            </h2>
            <p className="font-medium text-stone-700">
              At {storeConfig.brandName}, we hold your personal privacy and customer trust with the utmost care. We collect only the minimal necessary customer and delivery address details required to process, package, coordinate, and dispatch your orders. We do not sell, rent, monetize, or disclose your personal details to advertising networks or unrelated third parties.
            </p>
          </div>

          {/* Section 2 */}
          <div className="cartoon-card p-5 sm:p-7 bg-white space-y-3">
            <h2 className="text-base sm:text-lg font-black text-stone-900">
              Information We Collect
            </h2>
            <p className="font-medium text-stone-700">
              When you configure an order or submit customer information through our checkout, we collect:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 font-medium text-stone-700">
              <li><strong>Full Name:</strong> To address the consignment carton and generate the courier booking label.</li>
              <li><strong>Calling & WhatsApp Number:</strong> For dispatch updates, parcel tracking sharing, and so delivery personnel can contact you at doorstep.</li>
              <li><strong>Delivery Address & Pincode:</strong> Complete physical address including flat/house number, street, landmark, city, and 6-digit postal code to calculate exact freight and route parcels.</li>
              <li><strong>Order Item Specifications:</strong> Selected papad varieties, pack weights, packet counts, and optional customer preparation instructions.</li>
            </ul>
          </div>

          {/* Section 3 */}
          <div className="cartoon-card p-5 sm:p-7 bg-white space-y-3">
            <h2 className="text-base sm:text-lg font-black text-stone-900">
              How We Use Your Information
            </h2>
            <p className="font-medium text-stone-700">
              Your information is strictly utilized for the following legitimate purposes:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 font-medium text-stone-700">
              <li>Generating customized WhatsApp order summaries for your confirmation.</li>
              <li>Communicating payment details (official UPI QR code or bank account details).</li>
              <li>Booking consignments with verified courier partners (DTDC, Delhivery, Tirupati, Rapido, etc.).</li>
              <li>Providing live tracking links and resolving delivery location inquiries.</li>
            </ul>
          </div>

          {/* Section 4 */}
          <div className="cartoon-card p-5 sm:p-7 bg-white space-y-3">
            <h2 className="text-base sm:text-lg font-black text-stone-900">
              Local Storage & Device Data
            </h2>
            <p className="font-medium text-stone-700">
              When you check the option <em>"Save my contact & delivery address for future orders"</em> on our checkout page, that information is saved directly inside your browser's private <code className="bg-stone-100 px-1.5 py-0.5 rounded font-mono text-stone-800">localStorage</code> on your own device. This enables autofill on your next visit without requiring server database logins. You can clear this saved data anytime by clearing your browser cache.
            </p>
          </div>

          {/* Section 5 */}
          <div className="cartoon-card p-5 sm:p-7 bg-white space-y-3">
            <h2 className="text-base sm:text-lg font-black text-stone-900">
              Data Sharing with Logistics Partners
            </h2>
            <p className="font-medium text-stone-700">
              We only share your necessary name, delivery address, pincode, and calling telephone number with our bonded transportation and express courier partners solely to execute doorstep transit. These partners are legally prohibited from utilizing your contact details for unauthorized advertising or third-party marketing.
            </p>
          </div>

          {/* Section 6 */}
          <div className="cartoon-card p-5 sm:p-7 bg-white space-y-3">
            <h2 className="text-base sm:text-lg font-black text-stone-900">
              Contact Privacy Officer
            </h2>
            <p className="font-medium text-stone-700">
              If you have questions regarding your data privacy, or wish to request deletion of any order communication records, you may write directly to our administrative team:
            </p>
            <div className="p-3 bg-amber-50 rounded-xl border border-stone-300 font-bold flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-stone-900">
              <span><strong>Email:</strong> {storeConfig.email}</span>
              <span><strong>Location:</strong> {storeConfig.city}, {storeConfig.state}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
