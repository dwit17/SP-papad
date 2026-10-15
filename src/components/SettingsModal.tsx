import React, { useState } from 'react';
import { X, Check, RotateCcw, ShieldCheck } from 'lucide-react';
import { StoreConfig } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: StoreConfig;
  onSaveConfig: (newConfig: StoreConfig) => void;
  onResetDefaults: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
  onResetDefaults,
}) => {
  const [formData, setFormData] = useState<StoreConfig>({ ...config });
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveConfig(formData);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs cursor-pointer" onClick={onClose} />

      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-lg bg-[#FAF7F2] rounded-xl border border-[#E7DFD5] shadow-2xl overflow-hidden my-8">
          <div className="px-6 py-4 bg-white border-b border-[#E7DFD5] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#C2410C]" />
              <h3 className="text-base font-bold text-stone-900">
                Store Contact & FSSAI Details
              </h3>
            </div>
            <button onClick={onClose} className="p-1 text-stone-400 hover:text-stone-700 cursor-pointer">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            <p className="text-stone-600">
              Update your direct WhatsApp enquiry number, business address, and FSSAI license.
            </p>

            <div className="space-y-1">
              <label className="block font-semibold text-stone-800">
                WhatsApp Phone Number (with Country Code)
              </label>
              <input
                type="text"
                value={formData.phoneWhatsApp}
                onChange={(e) => setFormData({ ...formData, phoneWhatsApp: e.target.value })}
                placeholder="+91 98250 12345"
                className="w-full px-3 py-2 bg-white border border-stone-300 rounded-md focus:ring-1 focus:ring-stone-900"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="block font-semibold text-stone-800">
                Display Phone Number
              </label>
              <input
                type="text"
                value={formData.phoneDisplay}
                onChange={(e) => setFormData({ ...formData, phoneDisplay: e.target.value })}
                placeholder="+91 98250 12345"
                className="w-full px-3 py-2 bg-white border border-stone-300 rounded-md focus:ring-1 focus:ring-stone-900"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="block font-semibold text-stone-800">
                  Business City
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Rajkot"
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-md focus:ring-1 focus:ring-stone-900"
                />
              </div>
              <div className="space-y-1">
                <label className="block font-semibold text-stone-800">
                  State
                </label>
                <input
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  placeholder="Gujarat"
                  className="w-full px-3 py-2 bg-white border border-stone-300 rounded-md focus:ring-1 focus:ring-stone-900"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block font-semibold text-stone-800">
                Address / Area Line
              </label>
              <input
                type="text"
                value={formData.addressLine1}
                onChange={(e) => setFormData({ ...formData, addressLine1: e.target.value })}
                placeholder="Industrial Area, Aji GIDC, Rajkot - 360003"
                className="w-full px-3 py-2 bg-white border border-stone-300 rounded-md focus:ring-1 focus:ring-stone-900"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-semibold text-stone-800">
                FSSAI License Number
              </label>
              <input
                type="text"
                value={formData.fssaiLicence}
                onChange={(e) => setFormData({ ...formData, fssaiLicence: e.target.value })}
                placeholder="10721026000123"
                className="w-full px-3 py-2 bg-white border border-stone-300 rounded-md focus:ring-1 focus:ring-stone-900"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-semibold text-stone-800">
                Contact Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="orders@sakshipradip.in"
                className="w-full px-3 py-2 bg-white border border-stone-300 rounded-md focus:ring-1 focus:ring-stone-900"
              />
            </div>

            <div className="pt-3 border-t border-stone-200 flex items-center justify-between">
              <button
                type="button"
                onClick={onResetDefaults}
                className="flex items-center gap-1 text-stone-500 hover:text-stone-800 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to Defaults</span>
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-3 py-1.5 border border-stone-300 text-stone-700 rounded hover:bg-stone-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-1.5 bg-[#15803D] text-white rounded font-medium hover:bg-[#166534] cursor-pointer"
                >
                  {saved ? <Check className="w-4 h-4" /> : null}
                  <span>{saved ? 'Saved!' : 'Save Details'}</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
