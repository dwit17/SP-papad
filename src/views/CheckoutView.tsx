import React, { useState, useEffect, useMemo } from 'react';
import { Language, EnquiryItem, StoreConfig } from '../types';
import { PRODUCTS } from '../data/products';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  User, 
  Truck, 
  ShieldCheck, 
  Plus, 
  Minus, 
  Trash2, 
  AlertCircle, 
  Check, 
  Package, 
  Info,
  Clock,
  Sparkles
} from 'lucide-react';
import { sound } from '../utils/audioSynth';

interface CheckoutViewProps {
  currentLang: Language;
  onNavigate: (tab: string) => void;
  enquiryItems: EnquiryItem[];
  onUpdateQuantity: (productId: string, packSize: string, delta: number) => void;
  onRemoveItem: (productId: string, packSize: string) => void;
  onClearBasket: () => void;
  onAddToEnquiry: (productId: string, packSize: string) => void;
  storeConfig: StoreConfig;
}

interface CustomerAddress {
  fullName: string;
  callingNumber: string;
  addressLine: string;
  landmark: string;
  pincode: string;
  city: string;
  state: string;
  saveDetails: boolean;
}

const STORAGE_KEY = 'sakshi_checkout_customer_address';

export const CheckoutView: React.FC<CheckoutViewProps> = ({
  currentLang,
  onNavigate,
  enquiryItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearBasket,
  onAddToEnquiry,
  storeConfig,
}) => {
  // Load saved address or default
  const [address, setAddress] = useState<CustomerAddress>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return {
      fullName: '',
      callingNumber: '',
      addressLine: '',
      landmark: '',
      pincode: '',
      city: '',
      state: '',
      saveDetails: true,
    };
  });

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  // Auto-detect location based on 6-digit Pincode
  useEffect(() => {
    const cleanPin = address.pincode.replace(/[^0-9]/g, '');
    if (cleanPin.length === 6) {
      if (cleanPin.startsWith('360')) {
        setAddress((prev) => ({
          ...prev,
          city: prev.city || 'Rajkot',
          state: prev.state || 'Gujarat',
        }));
      } else if (cleanPin.startsWith('380') || cleanPin.startsWith('382')) {
        setAddress((prev) => ({
          ...prev,
          city: prev.city || 'Ahmedabad',
          state: prev.state || 'Gujarat',
        }));
      } else if (cleanPin.startsWith('395') || cleanPin.startsWith('394')) {
        setAddress((prev) => ({
          ...prev,
          city: prev.city || 'Surat',
          state: prev.state || 'Gujarat',
        }));
      } else if (cleanPin.startsWith('390') || cleanPin.startsWith('391')) {
        setAddress((prev) => ({
          ...prev,
          city: prev.city || 'Vadodara',
          state: prev.state || 'Gujarat',
        }));
      } else if (['36', '37', '38', '39'].some((prefix) => cleanPin.startsWith(prefix))) {
        setAddress((prev) => ({
          ...prev,
          state: prev.state || 'Gujarat',
        }));
      } else if (['40', '41', '42', '43', '44'].some((prefix) => cleanPin.startsWith(prefix))) {
        setAddress((prev) => ({
          ...prev,
          state: prev.state || 'Maharashtra',
        }));
      } else if (cleanPin.startsWith('11') || cleanPin.startsWith('20') || cleanPin.startsWith('12')) {
        setAddress((prev) => ({
          ...prev,
          state: prev.state || 'Delhi NCR',
        }));
      } else if (cleanPin.startsWith('56') || cleanPin.startsWith('57')) {
        setAddress((prev) => ({
          ...prev,
          state: prev.state || 'Karnataka',
        }));
      }
    }
  }, [address.pincode]);

  // Determine delivery region
  const deliveryRegion = useMemo<'rajkot' | 'gujarat' | 'outer'>(() => {
    const pin = address.pincode.trim();
    const cityLower = address.city.trim().toLowerCase();
    const stateLower = address.state.trim().toLowerCase();

    if (pin.startsWith('360') || cityLower === 'rajkot') {
      return 'rajkot';
    }
    if (['36', '37', '38', '39'].some((p) => pin.startsWith(p)) || stateLower === 'gujarat') {
      return 'gujarat';
    }
    return 'outer';
  }, [address.pincode, address.city, address.state]);

  // Helper to price pack size
  const getPackPrice = (packSize: string): number => {
    if (packSize.includes('200g') || packSize.includes('250g')) return 90;
    if (packSize.includes('500g')) return 210;
    if (packSize.includes('1 kg') || packSize.includes('1kg')) return 400;
    if (packSize.includes('5 kg') || packSize.includes('5kg')) return 1850;
    return 210;
  };

  // Helper for pack weight in grams
  const getPackWeightGrams = (packSize: string): number => {
    if (packSize.includes('200g')) return 200;
    if (packSize.includes('250g')) return 250;
    if (packSize.includes('500g')) return 500;
    if (packSize.includes('1 kg') || packSize.includes('1kg')) return 1000;
    if (packSize.includes('5 kg') || packSize.includes('5kg')) return 5000;
    return 500;
  };

  // Items details
  const itemsWithDetails = useMemo(() => {
    return enquiryItems.map((item) => {
      const product = PRODUCTS.find((p) => p.id === item.productId) || PRODUCTS[0];
      const unitPrice = getPackPrice(item.packSize);
      const weightGrams = getPackWeightGrams(item.packSize);
      const itemSubtotal = unitPrice * item.quantity;
      const totalWeightGrams = weightGrams * item.quantity;

      return {
        ...item,
        product,
        unitPrice,
        weightGrams,
        itemSubtotal,
        totalWeightGrams,
      };
    });
  }, [enquiryItems]);

  // Subtotal and weight calculations
  const itemsSubtotal = itemsWithDetails.reduce((sum, item) => sum + item.itemSubtotal, 0);
  const totalWeightKg = itemsWithDetails.reduce((sum, item) => sum + item.totalWeightGrams, 0) / 1000;
  const billedWeightKg = Math.max(1, Math.ceil(totalWeightKg));

  // Shipping calculation logic
  const shippingCharge = useMemo<number>(() => {
    if (itemsWithDetails.length === 0) return 0;

    if (deliveryRegion === 'rajkot') {
      // Free local delivery above ₹600, otherwise ₹40 estimated local logistics
      return itemsSubtotal >= 600 ? 0 : 40;
    }
    if (deliveryRegion === 'gujarat') {
      // Gujarat courier: ₹60 first 1 kg + ₹40 per extra kg
      return 60 + (billedWeightKg - 1) * 40;
    }
    // Rest of India: ₹110 first 1 kg + ₹70 per extra kg
    return 110 + (billedWeightKg - 1) * 70;
  }, [deliveryRegion, billedWeightKg, itemsSubtotal, itemsWithDetails.length]);

  const grandTotal = itemsSubtotal + shippingCharge;

  // Form validation
  const cleanPhone = address.callingNumber.replace(/[^0-9]/g, '');
  const isPhoneValid = cleanPhone.length === 10;
  const isNameValid = address.fullName.trim().length >= 2;
  const isAddressValid = address.addressLine.trim().length >= 5;
  const isPincodeValid = address.pincode.replace(/[^0-9]/g, '').length === 6;
  const hasItems = itemsWithDetails.length > 0;

  const isFormValid = isNameValid && isPhoneValid && isAddressValid && isPincodeValid && hasItems && agreedToTerms;

  const handleFieldChange = (field: keyof CustomerAddress, value: any) => {
    setAddress((prev) => {
      const updated = { ...prev, [field]: value };
      if (updated.saveDetails) {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch {
          // ignore
        }
      }
      return updated;
    });
  };

  // Submit via WhatsApp
  const handleSubmitOrder = () => {
    setAttemptedSubmit(true);
    if (!isFormValid) {
      sound.playPop();
      return;
    }

    sound.playCrunch();

    const dateStr = new Date().toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
    const timeStr = new Date().toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });

    let regionLabel = 'Pan-India Express Courier';
    if (deliveryRegion === 'rajkot') regionLabel = 'Local Rajkot Delivery';
    else if (deliveryRegion === 'gujarat') regionLabel = 'Gujarat Regional Courier';

    let msg = `🛒 *New Order - ${storeConfig.brandName}*\n`;
    msg += `📅 ${dateStr}, ${timeStr} IST\n`;
    msg += `📍 *Order Route:* ${regionLabel}\n\n`;

    msg += `👤 *Customer & Delivery Details:*\n`;
    msg += `━━━━━━━━━━━━━━━━━\n`;
    msg += `• *Name:* ${address.fullName.trim()}\n`;
    msg += `• *Calling Number:* +91 ${cleanPhone}\n`;
    msg += `• *Address:* ${address.addressLine.trim()}\n`;
    if (address.landmark.trim()) {
      msg += `• *Landmark:* ${address.landmark.trim()}\n`;
    }
    msg += `• *Pincode:* ${address.pincode.trim()} (${address.city.trim() || 'Gujarat'}, ${address.state.trim() || 'India'})\n\n`;

    msg += `📦 *Weight Breakdown:*\n`;
    msg += `• Est. Net Weight: ${totalWeightKg.toFixed(2)} kg\n`;
    msg += `• Billed Courier Weight: ${billedWeightKg} kg\n\n`;

    msg += `📋 *Order Items:*\n`;
    msg += `━━━━━━━━━━━━━━━━━\n`;
    itemsWithDetails.forEach((item, idx) => {
      msg += `${idx + 1}. *${item.product.name.en}* (${item.packSize})\n`;
      msg += `   Qty: ${item.quantity} × ₹${item.unitPrice} = ₹${item.itemSubtotal}\n`;
    });

    msg += `━━━━━━━━━━━━━━━━━\n`;
    msg += `💰 *Subtotal:* ₹${itemsSubtotal}\n`;
    if (deliveryRegion === 'rajkot' && shippingCharge === 0) {
      msg += `🚚 *Local Delivery:* FREE (Orders above ₹600)\n`;
    } else if (deliveryRegion === 'rajkot') {
      msg += `🚚 *Estimated Local Delivery:* ₹${shippingCharge}\n`;
    } else {
      msg += `🚚 *Courier Shipping (${billedWeightKg} kg):* ₹${shippingCharge}\n`;
    }
    msg += `✨ *Grand Total:* ₹${grandTotal}\n\n`;

    msg += `✅ *Customer Agreement:*\n`;
    msg += `Customer has reviewed & agreed to Shipping & Delivery Terms, Advance Payment terms, and Zero-Breakage Policy.\n\n`;
    msg += `Please confirm order availability and share UPI payment QR code to initiate dispatch. Thank you!`;

    const targetPhone = storeConfig.phoneWhatsApp.replace(/[^0-9]/g, '');
    const url = `https://wa.me/${targetPhone}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="pt-28 pb-20 bg-[#FFFDF7] min-h-screen selection:bg-amber-300 selection:text-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top back navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              sound.playPop();
              onNavigate('products');
            }}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-black text-stone-700 hover:text-stone-900 cartoon-card px-3.5 py-2 bg-white cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Products</span>
          </button>

          <span className="text-xs font-black text-stone-500 font-mono">
            {itemsWithDetails.length} {itemsWithDetails.length === 1 ? 'variety' : 'varieties'} selected
          </span>
        </div>

        {/* Main Title - NO EYEBROW, NO SUBTEXT */}
        <div className="border-b-2 border-stone-900 pb-5">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight">
            Checkout & Shipping Calculation
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* LEFT COLUMN: Customer Info & Order Items */}
          <div className="lg:col-span-7 space-y-6">
            {/* SECTION 1: Delivery & Customer Information */}
            <div className="cartoon-card p-5 sm:p-7 bg-white space-y-5">
              <div className="border-b-2 border-stone-200 pb-3">
                <h2 className="text-base sm:text-lg font-black text-stone-900">
                  Delivery & Customer Information
                </h2>
              </div>

            {/* Destination Hub Detection Banner */}
            <div className={`p-3.5 rounded-xl border-2 transition-all ${
              deliveryRegion === 'rajkot'
                ? 'bg-amber-50 border-amber-500 text-amber-950'
                : deliveryRegion === 'gujarat'
                ? 'bg-emerald-50 border-emerald-500 text-emerald-950'
                : 'bg-blue-50 border-blue-500 text-blue-950'
            }`}>
              <div className="flex items-start gap-2.5">
                <Truck className="w-5 h-5 shrink-0 mt-0.5" />
                <div className="space-y-0.5 text-xs">
                  <span className="font-black block uppercase tracking-wider text-[10px]">
                    {deliveryRegion === 'rajkot'
                      ? 'Local Hub: Rajkot City Delivery'
                      : deliveryRegion === 'gujarat'
                      ? 'Gujarat Express Courier'
                      : 'Pan-India Nationwide Courier'}
                  </span>
                  <p className="font-medium leading-relaxed">
                    {deliveryRegion === 'rajkot'
                      ? 'Dispatched via local delivery partners (Rapido / Porter). FREE for orders above ₹600.'
                      : deliveryRegion === 'gujarat'
                      ? 'Express road courier transit across Gujarat within 1 – 2 business days. ₹60 for first 1 kg, ₹40/kg thereafter.'
                      : 'Nationwide surface & air express cargo within 3 – 5 business days. ₹110 for first 1 kg, ₹70/kg thereafter.'}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4 text-xs font-bold">
              {/* Full Name & Phone Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1">
                  <label className="block text-stone-800 font-black">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
                    <input
                      type="text"
                      value={address.fullName}
                      onChange={(e) => handleFieldChange('fullName', e.target.value)}
                      placeholder="e.g. Ramesh Patel"
                      className={`w-full pl-9 pr-3.5 py-2.5 bg-stone-50 border-2 rounded-xl text-xs sm:text-sm font-bold text-stone-900 focus:outline-none focus:bg-white transition-all ${
                        attemptedSubmit && !isNameValid
                          ? 'border-red-500 focus:ring-2 focus:ring-red-300'
                          : 'border-stone-900 focus:ring-2 focus:ring-amber-400'
                      }`}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-stone-800 font-black">
                    Calling Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-stone-500 font-bold text-xs pointer-events-none">
                      +91
                    </span>
                    <input
                      type="tel"
                      maxLength={10}
                      value={address.callingNumber}
                      onChange={(e) => handleFieldChange('callingNumber', e.target.value.replace(/[^0-9]/g, ''))}
                      placeholder="98250 12345"
                      className={`w-full pl-11 pr-3.5 py-2.5 bg-stone-50 border-2 rounded-xl text-xs sm:text-sm font-bold text-stone-900 focus:outline-none focus:bg-white transition-all ${
                        attemptedSubmit && !isPhoneValid
                          ? 'border-red-500 focus:ring-2 focus:ring-red-300'
                          : 'border-stone-900 focus:ring-2 focus:ring-amber-400'
                      }`}
                    />
                  </div>
                  <span className="text-[10px] text-stone-500 font-medium block">
                    Delivery partner will call on this number for coordination
                  </span>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="space-y-1">
                <label className="block text-stone-800 font-black">
                  Delivery Address <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-3 pointer-events-none" />
                  <textarea
                    rows={2}
                    value={address.addressLine}
                    onChange={(e) => handleFieldChange('addressLine', e.target.value)}
                    placeholder="Flat / House No., Society / Building Name, Street & Area"
                    className={`w-full pl-9 pr-3.5 py-2.5 bg-stone-50 border-2 rounded-xl text-xs sm:text-sm font-bold text-stone-900 focus:outline-none focus:bg-white transition-all ${
                      attemptedSubmit && !isAddressValid
                        ? 'border-red-500 focus:ring-2 focus:ring-red-300'
                        : 'border-stone-900 focus:ring-2 focus:ring-amber-400'
                    }`}
                  />
                </div>
              </div>

              {/* Landmark & Pincode */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1">
                  <label className="block text-stone-800 font-black">
                    Landmark <span className="text-stone-400 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={address.landmark}
                    onChange={(e) => handleFieldChange('landmark', e.target.value)}
                    placeholder="Near temple, school, or main road"
                    className="w-full px-3.5 py-2.5 bg-stone-50 border-2 border-stone-900 rounded-xl text-xs sm:text-sm font-bold text-stone-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-stone-800 font-black">
                    Pincode <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    maxLength={6}
                    value={address.pincode}
                    onChange={(e) => handleFieldChange('pincode', e.target.value.replace(/[^0-9]/g, ''))}
                    placeholder="6-digit pincode (e.g. 360003)"
                    className={`w-full px-3.5 py-2.5 bg-stone-50 border-2 rounded-xl text-xs sm:text-sm font-mono font-bold text-stone-900 focus:outline-none focus:bg-white transition-all ${
                      attemptedSubmit && !isPincodeValid
                        ? 'border-red-500 focus:ring-2 focus:ring-red-300'
                        : 'border-stone-900 focus:ring-2 focus:ring-amber-400'
                    }`}
                  />
                </div>
              </div>

              {/* City & State */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1">
                  <label className="block text-stone-800 font-black">City / Town</label>
                  <input
                    type="text"
                    value={address.city}
                    onChange={(e) => handleFieldChange('city', e.target.value)}
                    placeholder="City (e.g. Rajkot)"
                    className="w-full px-3.5 py-2.5 bg-stone-50 border-2 border-stone-900 rounded-xl text-xs sm:text-sm font-bold text-stone-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-stone-800 font-black">State</label>
                  <input
                    type="text"
                    value={address.state}
                    onChange={(e) => handleFieldChange('state', e.target.value)}
                    placeholder="State (e.g. Gujarat)"
                    className="w-full px-3.5 py-2.5 bg-stone-50 border-2 border-stone-900 rounded-xl text-xs sm:text-sm font-bold text-stone-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>

              {/* Save details checkbox */}
              <label className="flex items-center gap-2 pt-1 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={address.saveDetails}
                  onChange={(e) => handleFieldChange('saveDetails', e.target.checked)}
                  className="w-4 h-4 rounded border-2 border-stone-900 text-amber-500 focus:ring-amber-400 accent-amber-500"
                />
                <span className="text-xs font-bold text-stone-700">
                  Save my contact & delivery address for future orders
                </span>
              </label>
            </div>
          </div>

          {/* SECTION 2: Your Order & Shipping Calculation */}
          <div className="cartoon-card p-5 sm:p-7 bg-white space-y-5">
            <div className="flex items-center justify-between border-b-2 border-stone-200 pb-3">
              <h2 className="text-base sm:text-lg font-black text-stone-900">
                Your Order & Shipping Calculation
              </h2>

              {hasItems && (
                <button
                  onClick={() => {
                    sound.playPop();
                    onClearBasket();
                  }}
                  className="text-xs font-black text-stone-500 hover:text-red-600 transition-colors cursor-pointer"
                >
                  Clear All
                </button>
              )}
            </div>

            {/* Empty state */}
            {!hasItems ? (
              <div className="p-6 sm:p-8 text-center space-y-4 bg-amber-50/60 rounded-2xl border-2 border-dashed border-stone-300">
                <Package className="w-10 h-10 text-stone-400 mx-auto" />
                <div className="space-y-1">
                  <span className="font-black text-stone-900 text-sm block">Your order basket is currently empty</span>
                  <p className="text-xs text-stone-500 font-medium">Add fresh papad varieties to calculate parcel weight and shipping rates.</p>
                </div>
                <div className="pt-2 flex flex-wrap justify-center gap-2">
                  <button
                    onClick={() => onAddToEnquiry('moong-mari-papad', '500g')}
                    className="cartoon-btn-secondary px-3 py-1.5 text-xs font-black shadow-[0_2px_0_#1c1917] cursor-pointer"
                  >
                    + Add Moong Mari (500g)
                  </button>
                  <button
                    onClick={() => onAddToEnquiry('udad-jeera-papad', '500g')}
                    className="cartoon-btn-secondary px-3 py-1.5 text-xs font-black shadow-[0_2px_0_#1c1917] cursor-pointer"
                  >
                    + Add Udad Jeera (500g)
                  </button>
                </div>
              </div>
            ) : (
              /* Items list */
              <div className="space-y-3">
                {itemsWithDetails.map((item) => (
                  <div
                    key={`${item.productId}-${item.packSize}`}
                    className="p-3 sm:p-4 rounded-xl border-2 border-stone-200 bg-[#FFFDF7] flex items-center justify-between gap-3 shadow-xs"
                  >
                    <div className="space-y-0.5 flex-1 min-w-0">
                      <h3 className="font-black text-stone-900 text-xs sm:text-sm truncate">
                        {item.product.name.en}
                      </h3>
                      <div className="flex items-center gap-2 text-[11px] text-stone-500 font-bold">
                        <span>Pack: <strong className="text-stone-800">{item.packSize}</strong></span>
                        <span>•</span>
                        <span>₹{item.unitPrice} each</span>
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="flex items-center border-2 border-stone-900 rounded-lg bg-white overflow-hidden shadow-[0_1px_0_#1c1917]">
                        <button
                          onClick={() => {
                            sound.playPop();
                            onUpdateQuantity(item.productId, item.packSize, -1);
                          }}
                          className="px-2 py-1 hover:bg-amber-100 transition-colors text-stone-900 font-black"
                          aria-label="Decrease"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 text-xs font-black text-stone-900 font-mono w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => {
                            sound.playPop();
                            onUpdateQuantity(item.productId, item.packSize, 1);
                          }}
                          className="px-2 py-1 hover:bg-amber-100 transition-colors text-stone-900 font-black"
                          aria-label="Increase"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <span className="font-black text-stone-900 text-xs sm:text-sm font-mono w-14 text-right">
                        ₹{item.itemSubtotal}
                      </span>

                      <button
                        onClick={() => {
                          sound.playPop();
                          onRemoveItem(item.productId, item.packSize);
                        }}
                        className="text-stone-400 hover:text-red-600 transition-colors cursor-pointer p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Weight & Calculation details */}
                <div className="pt-4 border-t-2 border-stone-200 space-y-2 text-xs font-bold">
                  <div className="flex items-center justify-between text-stone-600">
                    <span>Est. Net Weight:</span>
                    <span className="font-mono text-stone-900 font-black">{totalWeightKg.toFixed(2)} kg</span>
                  </div>
                  <div className="flex items-center justify-between text-stone-600">
                    <span className="flex items-center gap-1">
                      Billed Courier Weight:
                      <span title="Courier slabs round up to nearest full kg" className="inline-flex cursor-help">
                        <Info className="w-3.5 h-3.5 text-stone-400" />
                      </span>
                    </span>
                    <span className="font-mono text-stone-900 font-black">{billedWeightKg} kg</span>
                  </div>

                  <div className="h-px bg-stone-200 my-2" />

                  <div className="flex items-center justify-between text-stone-700">
                    <span>Items Subtotal:</span>
                    <span className="font-mono text-stone-900 font-black">₹{itemsSubtotal}</span>
                  </div>

                  <div className="flex items-center justify-between text-stone-700">
                    <div>
                      <span>Shipping Charges:</span>
                      <span className="block text-[10px] text-stone-500 font-normal">
                        {deliveryRegion === 'rajkot'
                          ? itemsSubtotal >= 600 ? 'Free Rajkot Delivery (Order > ₹600)' : 'Local Rajkot Delivery'
                          : deliveryRegion === 'gujarat'
                          ? `Gujarat Courier (${billedWeightKg} kg)`
                          : `Pan-India Courier (${billedWeightKg} kg)`}
                      </span>
                    </div>
                    <span className="font-mono font-black text-stone-900">
                      {shippingCharge === 0 ? (
                        <span className="text-emerald-700 font-extrabold uppercase">Free</span>
                      ) : (
                        `₹${shippingCharge}`
                      )}
                    </span>
                  </div>

                  <div className="pt-2 border-t-2 border-stone-900 flex items-center justify-between text-sm sm:text-base font-black text-stone-950">
                    <span>Grand Total:</span>
                    <span className="font-mono text-lg text-emerald-800">₹{grandTotal}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Terms, Checkbar, and WhatsApp Submit Action */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
          {/* SECTION 3: Shipping & Delivery Terms */}
          <div className="cartoon-card p-5 sm:p-7 bg-[#FFFDF7] space-y-4">
            <h2 className="text-base sm:text-lg font-black text-stone-900 border-b-2 border-stone-200 pb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-amber-600" />
              <span>Shipping & Delivery Terms</span>
            </h2>

            <div className="text-stone-700 text-xs sm:text-[13px] leading-relaxed space-y-3 font-medium">
              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-2" />
                <p>
                  <strong>Dispatch Timeline:</strong> Orders are dispatched within 24–48 hours after payment confirmation. Courier tracking link and packed carton photos will be shared on WhatsApp.
                </p>
              </div>

              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-2" />
                <p>
                  <strong>Payment Mode:</strong> Advance payment via UPI (GPay/PhonePe/Paytm) or Bank Transfer is required. Cash on Delivery (COD) is not available for perishable food items.
                </p>
              </div>

              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-2" />
                <p>
                  <strong>Zero-Breakage Packaging:</strong> All papads are sealed in moisture-barrier multilayer pouches and secured inside 5-ply export corrugated cartons.
                </p>
              </div>

              <div className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-2" />
                <p>
                  <strong>Return Policy & Claims:</strong> Food items once dispatched are non-returnable. In case of transit damage, share an uninterrupted unboxing video on WhatsApp within 24 hours of delivery.
                </p>
              </div>
            </div>
          </div>

          {/* SECTION 4: "I Agree to All Terms" Checkbar */}
          <label
            className={`cartoon-card p-4 sm:p-5 flex items-start gap-3 cursor-pointer select-none transition-all ${
              agreedToTerms
                ? 'bg-emerald-50/90 border-2 border-stone-900 shadow-[0_4px_0_#1c1917]'
                : attemptedSubmit
                ? 'bg-red-50 border-2 border-red-500'
                : 'bg-white border-2 border-stone-900 hover:bg-amber-50/60'
            }`}
          >
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => {
                sound.playPop();
                setAgreedToTerms(e.target.checked);
              }}
              className="w-5 h-5 rounded border-2 border-stone-900 text-emerald-600 focus:ring-emerald-400 accent-emerald-600 mt-0.5 cursor-pointer shrink-0"
            />
            <div className="space-y-0.5">
              <span className="text-xs sm:text-sm font-black text-stone-950 block leading-snug">
                I have read and agree to all Shipping & Delivery Terms, Terms & Conditions, and Privacy Policy.
              </span>
              <span className="text-[11px] text-stone-600 font-medium block">
                Mandatory agreement required to initiate WhatsApp dispatch coordination.
              </span>
            </div>
          </label>

          {/* Validation Error Alerts */}
          {attemptedSubmit && !isFormValid && (
            <div className="p-3.5 bg-red-50 rounded-xl border-2 border-red-400 text-xs font-bold text-red-900 space-y-1">
              <div className="flex items-center gap-1.5 font-black">
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                <span>Please complete the following:</span>
              </div>
              <ul className="list-disc pl-5 text-[11px] space-y-0.5 font-medium text-red-800">
                {!hasItems && <li>Add at least one variety to your order.</li>}
                {!isNameValid && <li>Enter your full name.</li>}
                {!isPhoneValid && <li>Enter a valid 10-digit calling number.</li>}
                {!isAddressValid && <li>Enter your complete delivery address.</li>}
                {!isPincodeValid && <li>Enter your 6-digit postal pincode.</li>}
                {!agreedToTerms && <li>Check the terms & shipping agreement box above.</li>}
              </ul>
            </div>
          )}

          {/* SECTION 5: WhatsApp Action Button */}
          <div className="space-y-2">
            <button
              onClick={handleSubmitOrder}
              disabled={!hasItems}
              className={`w-full py-4 px-6 text-sm sm:text-base font-black flex items-center justify-center gap-2.5 transition-all min-h-[52px] ${
                hasItems && agreedToTerms && isNameValid && isPhoneValid && isAddressValid && isPincodeValid
                  ? 'cartoon-btn-whatsapp shadow-[0_5px_0_#1c1917] cursor-pointer'
                  : 'bg-stone-200 text-stone-500 rounded-2xl border-2 border-stone-400 cursor-pointer hover:bg-stone-300'
              }`}
            >
              <WhatsAppIcon className="w-5 h-5 shrink-0" />
              <span>Submit Order on WhatsApp</span>
            </button>

            <p className="text-[11px] font-bold text-stone-500 text-center flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Direct confirmation with Sakshi Pradip Papad dispatch desk</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};
