import React, { useState, useEffect } from 'react';
import { CutePapadMascot } from './CutePapadMascot';
import { sound } from '../utils/audioSynth';
import { Language } from '../types';
import { Volume2, VolumeX, Sparkles, X } from 'lucide-react';

interface InteractiveMascotBuddyProps {
  currentLang: Language;
}

export const InteractiveMascotBuddy: React.FC<InteractiveMascotBuddyProps> = ({ currentLang }) => {
  const [speechText, setSpeechText] = useState<string>('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [totalCrunches, setTotalCrunches] = useState(0);

  const dialogueList: Record<Language, string[]> = {
    en: [
      'Hi! I am Pip the Papad! Tap me for a crunch! 😋',
      '100% Sun-Dried Saurashtra Tradition! ☀️',
      'Our secret? Pure dal & freshly cracked pepper! 🌶️',
      'Pairs perfectly with Gujarati Dal-Bhat! 🍛',
      'Super crunchy! Over 100,000+ packets dispatched! 📦',
      'Crunchy on the outside, light on the stomach! ✨',
    ],
    gu: [
      'નમસ્તે! હું છું પીપ પાપડ! એક ક્રંચ આપો! 😋',
      '૧૦૦% સૌરાષ્ટ્રના તડકામાં સુકવેલા અસલી પાપડ! ☀️',
      'મગ દાળ અને તીખા કાળા મરીનો અસલ સ્વાદ! 🌶️',
      'દાળ-ભાત સાથે પાપડ વગર જમવાની મજા ક્યાં! 🍛',
      'રાજકોટથી સીધા તમારા ઘર સુધી ડિલિવરી! 📦',
    ],
    hi: [
      'नमस्ते! मैं हूँ पिप पापड़! मुझे टैप करें और क्रंच सुनें! 😋',
      '१००% सौराष्ट्र की धूप में सूखे प्रामाणिक पापड़! ☀️',
      'शुद्ध मूंग दाल और ताजी कुटी काली मिर्च का स्वाद! 🌶️',
      'थाली की असली जान - साक्षी प्रदीप पापड़! 🍛',
      'ऑल इंडिया एक्सप्रेस होम डिलीवरी उपलब्ध! 📦',
    ],
  };

  // Welcome message
  useEffect(() => {
    const list = dialogueList[currentLang];
    setSpeechText(list[0]);
    const timer = setTimeout(() => {
      setSpeechText('');
    }, 6000);
    return () => clearTimeout(timer);
  }, [currentLang]);

  const handleBuddyClick = () => {
    sound.playCrunch();
    setTotalCrunches((c) => c + 1);

    const list = dialogueList[currentLang];
    const randomIndex = Math.floor(Math.random() * list.length);
    setSpeechText(list[randomIndex]);

    // Auto-hide bubble after 4.5s
    setTimeout(() => {
      setSpeechText('');
    }, 4500);
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    sound.enabled = nextState;
    if (nextState) {
      sound.playPop();
    }
  };

  if (isMinimized) {
    return (
      <button
        onClick={() => {
          setIsMinimized(false);
          sound.playPop();
        }}
        className="fixed bottom-4 right-4 z-40 bg-amber-400 hover:bg-amber-300 text-stone-900 border-2 border-stone-900 px-3 py-2 rounded-full font-bold text-xs flex items-center gap-1.5 shadow-[0_4px_0_#1c1917] cursor-pointer transition-transform hover:scale-105"
        title="Open Mascot Companion"
      >
        <span className="text-base">🫓</span>
        <span>Mascot Buddy</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end pointer-events-none select-none">
      {/* Cartoon Speech Bubble */}
      {speechText && (
        <div className="pointer-events-auto relative mb-2 max-w-[240px] bg-white border-2 border-stone-900 p-3 rounded-2xl shadow-[0_4px_0_#1c1917] text-xs font-bold text-stone-900 leading-snug animate-papad-bounce">
          <div className="flex items-start justify-between gap-1">
            <span>{speechText}</span>
            <button
              onClick={() => setSpeechText('')}
              className="text-stone-400 hover:text-stone-800 p-0.5 rounded cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          {/* Bubble tail pointing down to mascot */}
          <div className="absolute -bottom-2 right-8 w-3 h-3 bg-white border-r-2 border-b-2 border-stone-900 rotate-45" />
        </div>
      )}

      {/* Mascot Card Container */}
      <div className="pointer-events-auto relative bg-[#FFFDF7] border-2 border-stone-900 rounded-3xl p-2.5 shadow-[0_6px_0_#1c1917] flex items-center gap-2 group">
        {/* Minimize Button */}
        <button
          onClick={() => setIsMinimized(true)}
          className="absolute -top-2 -left-2 bg-stone-100 hover:bg-stone-200 border-1.5 border-stone-900 rounded-full p-1 text-stone-600 cursor-pointer shadow-xs"
          title="Minimize"
        >
          <X className="w-3 h-3" />
        </button>

        {/* Audio Toggle Button */}
        <button
          onClick={toggleSound}
          className={`absolute -top-2 right-2 border-1.5 border-stone-900 rounded-full p-1 cursor-pointer shadow-xs ${
            soundEnabled ? 'bg-amber-400 text-stone-900' : 'bg-stone-200 text-stone-400'
          }`}
          title={soundEnabled ? 'Sound Effects Active (Click to mute)' : 'Sound Muted (Click to enable)'}
        >
          {soundEnabled ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
        </button>

        {/* The Animated Mascot Character */}
        <div onClick={handleBuddyClick} className="cursor-pointer">
          <CutePapadMascot
            variant="hero_dancer"
            size="sm"
            animate={true}
            interactive={true}
          />
        </div>

        {/* Quick Crunch Stat & Tap Hint */}
        <div onClick={handleBuddyClick} className="cursor-pointer pr-1 flex flex-col justify-center">
          <div className="flex items-center gap-1 text-[11px] font-black text-amber-600 uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-amber-500 animate-spin-slow" />
            <span>Pip Buddy</span>
          </div>
          <div className="text-[10px] font-bold text-stone-600">
            {totalCrunches === 0 ? 'Tap for Crunch!' : `${totalCrunches} Crunches! 🔥`}
          </div>
        </div>
      </div>
    </div>
  );
};
