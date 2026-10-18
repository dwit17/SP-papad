import React from 'react';
import { Language, StoreConfig } from '../types';
import { Truck, ArrowLeft, PackageCheck, Clock, MapPin, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { sound } from '../utils/audioSynth';

interface ShippingPolicyViewProps {
  currentLang: Language;
  onNavigate: (tab: string) => void;
  storeConfig: StoreConfig;
}

export const ShippingPolicyView: React.FC<ShippingPolicyViewProps> = ({
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
            Shipping & Delivery Policy
          </h1>
        </div>

        {/* Content Container */}
        <div className="space-y-6 text-stone-800 text-xs sm:text-sm leading-relaxed">
          {/* Section 1: Dispatch Hub & Timelines */}
          <div className="cartoon-card p-5 sm:p-7 bg-white space-y-4">
            <h2 className="text-base sm:text-lg font-black text-stone-900">
              Dispatch Hub & Processing Times
            </h2>
            <p className="font-medium text-stone-700">
              All orders placed with {storeConfig.brandName} are packed fresh and dispatched directly from our manufacturing and packaging facility in Rajkot, Gujarat.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3.5 rounded-xl border-2 border-stone-200 bg-amber-50/70 space-y-1">
                <span className="text-[10px] uppercase font-black tracking-wider text-amber-800 block">Processing Speed</span>
                <span className="text-xs sm:text-sm font-black text-stone-900 block">24 – 48 Hours</span>
                <span className="text-[11px] text-stone-600 font-medium block">Fresh batch packaging after payment receipt</span>
              </div>
              <div className="p-3.5 rounded-xl border-2 border-stone-200 bg-emerald-50/70 space-y-1">
                <span className="text-[10px] uppercase font-black tracking-wider text-emerald-800 block">Gujarat Transit</span>
                <span className="text-xs sm:text-sm font-black text-stone-900 block">1 – 2 Business Days</span>
                <span className="text-[11px] text-stone-600 font-medium block">Express surface delivery to all Gujarat cities</span>
              </div>
              <div className="p-3.5 rounded-xl border-2 border-stone-200 bg-blue-50/70 space-y-1">
                <span className="text-[10px] uppercase font-black tracking-wider text-blue-800 block">Rest of India</span>
                <span className="text-xs sm:text-sm font-black text-stone-900 block">3 – 5 Business Days</span>
                <span className="text-[11px] text-stone-600 font-medium block">Pan-India express courier network</span>
              </div>
            </div>
          </div>

          {/* Section 2: Local Delivery in Rajkot */}
          <div className="cartoon-card p-5 sm:p-7 bg-white space-y-3">
            <h2 className="text-base sm:text-lg font-black text-stone-900">
              Local Delivery within Rajkot City (Home Hub)
            </h2>
            <p className="font-medium text-stone-700">
              For addresses located inside Rajkot city limits (Pincodes: 360001, 360002, 360003, 360004, 360005, 360006, 360007, etc.):
            </p>
            <ul className="list-disc pl-5 space-y-1.5 font-medium text-stone-700">
              <li>Orders are dispatched via local fast on-demand logistics partners (such as Rapido, Porter, or local city bike couriers).</li>
              <li>Local delivery charges typically range between ₹30 to ₹80 based on your distance from our Aji GIDC manufacturing hub.</li>
              <li>Alternatively, orders above ₹600 qualify for free doorstep local delivery within municipal limits.</li>
              <li>Customers may also opt to pick up freshly packed parcels directly from our dispatch counter.</li>
            </ul>
          </div>

          {/* Section 3: Outer City Courier Delivery & Shipping Rates */}
          <div className="cartoon-card p-5 sm:p-7 bg-white space-y-3">
            <h2 className="text-base sm:text-lg font-black text-stone-900">
              Courier Delivery Across Gujarat & Pan-India
            </h2>
            <p className="font-medium text-stone-700">
              For deliveries outside Rajkot across Gujarat and other Indian states, courier freight is calculated based on billed parcel weight (rounded up to the next full kg):
            </p>
            <div className="overflow-x-auto pt-1">
              <table className="w-full text-left border-collapse border-2 border-stone-900 text-xs">
                <thead>
                  <tr className="bg-amber-100 border-b-2 border-stone-900 font-black text-stone-900">
                    <th className="p-2.5 sm:p-3 border-r-2 border-stone-900">Destination Region</th>
                    <th className="p-2.5 sm:p-3 border-r-2 border-stone-900">First 1 kg Slab</th>
                    <th className="p-2.5 sm:p-3 border-r-2 border-stone-900">Each Additional kg</th>
                    <th className="p-2.5 sm:p-3">Estimated Timeline</th>
                  </tr>
                </thead>
                <tbody className="divide-y border-stone-900 font-medium">
                  <tr className="bg-white">
                    <td className="p-2.5 sm:p-3 font-black text-stone-900 border-r-2 border-stone-900">Gujarat (Ahmedabad, Surat, Vadodara, etc.)</td>
                    <td className="p-2.5 sm:p-3 font-bold border-r-2 border-stone-900">₹60</td>
                    <td className="p-2.5 sm:p-3 font-bold border-r-2 border-stone-900">+₹40 / kg</td>
                    <td className="p-2.5 sm:p-3 text-stone-700">1 – 2 Business Days</td>
                  </tr>
                  <tr className="bg-stone-50">
                    <td className="p-2.5 sm:p-3 font-black text-stone-900 border-r-2 border-stone-900">Mumbai & Maharashtra Region</td>
                    <td className="p-2.5 sm:p-3 font-bold border-r-2 border-stone-900">₹90</td>
                    <td className="p-2.5 sm:p-3 font-bold border-r-2 border-stone-900">+₹60 / kg</td>
                    <td className="p-2.5 sm:p-3 text-stone-700">2 – 3 Business Days</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="p-2.5 sm:p-3 font-black text-stone-900 border-r-2 border-stone-900">Rest of India (Delhi NCR, Bengaluru, South & North)</td>
                    <td className="p-2.5 sm:p-3 font-bold border-r-2 border-stone-900">₹110</td>
                    <td className="p-2.5 sm:p-3 font-bold border-r-2 border-stone-900">+₹70 / kg</td>
                    <td className="p-2.5 sm:p-3 text-stone-700">3 – 5 Business Days</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 4: Safe Food-Grade Packaging Standard */}
          <div className="cartoon-card p-5 sm:p-7 bg-white space-y-3">
            <h2 className="text-base sm:text-lg font-black text-stone-900">
              Zero-Breakage Food Packaging Standard
            </h2>
            <p className="font-medium text-stone-700">
              Papads are fragile, delicate food items that require specialized cushioning. Every consignment leaving our facility undergoes our three-tier protection protocol:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 font-medium text-stone-700">
              <li><strong>Primary Barrier:</strong> Airtight, multilayer food-grade barrier pouches that prevent moisture, air ingress, and humidity degradation.</li>
              <li><strong>Secondary Cushioning:</strong> Corrugated bubble wrap / air pads surrounding packet stacks to absorb vibration and shock.</li>
              <li><strong>Outer Master Box:</strong> Heavy-duty 5-ply export-grade corrugated cartons taped securely and labeled with fragile handling stickers.</li>
            </ul>
          </div>

          {/* Section 5: Tracking & Delivery Coordination */}
          <div className="cartoon-card p-5 sm:p-7 bg-white space-y-3">
            <h2 className="text-base sm:text-lg font-black text-stone-900">
              Tracking Details & WhatsApp Coordination
            </h2>
            <p className="font-medium text-stone-700">
              Immediately upon handover to our courier partners (e.g. DTDC, Delhivery, Tirupati Courier, or Professional Couriers), our dispatch team sends the following directly to your WhatsApp number:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 font-medium text-stone-700">
              <li>Consignment tracking number / Air Waybill (AWB) link.</li>
              <li>Photograph of your packed carton with your delivery address label visible.</li>
              <li>Estimated delivery date and courier partner customer support helpline.</li>
            </ul>
          </div>

          {/* Section 6: Transit Damage Claims & Returns */}
          <div className="cartoon-card p-5 sm:p-7 bg-white space-y-3">
            <h2 className="text-base sm:text-lg font-black text-stone-900">
              Transit Damage & Unboxing Video Policy
            </h2>
            <p className="font-medium text-stone-700">
              Due to food safety hygiene standards, food items once dispatched cannot be returned or restocked. However, in the rare scenario where your parcel arrives physically crushed or compromised due to courier mishandling:
            </p>
            <div className="p-3.5 bg-red-50 rounded-xl border border-red-300 text-stone-800 font-medium space-y-1.5">
              <div className="flex items-center gap-2 text-red-900 font-black">
                <ShieldAlert className="w-4 h-4 text-red-700 shrink-0" />
                <span>Mandatory Continuous Unboxing Video:</span>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed">
                Please record a continuous, unedited 360° unboxing video showing the sealed outer carton label, opening of the box, and inspecting the inner pouches. Share this video with our WhatsApp desk within 24 hours of delivery receipt. Verified transit damages will receive an immediate replacement dispatch or product refund.
              </p>
            </div>
          </div>

          {/* Support Help Footer */}
          <div className="cartoon-card p-4 sm:p-6 bg-amber-50 border-2 border-stone-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-bold text-stone-900">
            <div>
              <span className="block font-black text-sm">Need shipping assistance or express dispatch?</span>
              <span className="text-stone-600">Our Rajkot dispatch desk is active Monday to Saturday from 9:00 AM to 8:00 PM IST.</span>
            </div>
            <button
              onClick={() => onNavigate('checkout')}
              className="cartoon-btn-whatsapp px-4 py-2.5 text-xs font-black shadow-[0_2px_0_#1c1917] shrink-0 cursor-pointer"
            >
              Calculate Shipping at Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
