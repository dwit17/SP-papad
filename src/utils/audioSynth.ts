// Web Audio API Procedural Authentic Papad Crunch & Arcade Slicing Sound Effects
// High-fidelity crispy food fracture synthesis with zero external dependencies

class SoundController {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;
  private lastWhooshTime: number = 0;
  private lastCrunchTime: number = 0;

  constructor() {
    // Automatically attach user-interaction unlocker for browser autoplay policies
    if (typeof window !== 'undefined') {
      const unlock = () => {
        this.unlockContext();
        window.removeEventListener('pointerdown', unlock);
        window.removeEventListener('click', unlock);
        window.removeEventListener('keydown', unlock);
        window.removeEventListener('touchstart', unlock);
      };
      window.addEventListener('pointerdown', unlock, { passive: true });
      window.addEventListener('click', unlock, { passive: true });
      window.addEventListener('keydown', unlock, { passive: true });
      window.addEventListener('touchstart', unlock, { passive: true });
    }
  }

  public unlockContext(): void {
    const ctx = this.getContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
  }

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // Realistic Brittle Papad Crunch (Layered crispy snap + dry lentil wafer micro-fractures)
  playPapadCrunch() {
    if (!this.enabled) return;
    const now = Date.now();
    // Prevent harsh distortion on rapid simultaneous slices while allowing quick double-slices
    if (now - this.lastCrunchTime < 35) return;
    this.lastCrunchTime = now;

    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const startTime = Math.max(ctx.currentTime, 0.001);
      const pitchVariation = 0.9 + Math.random() * 0.25;

      // --- LAYER 1: The Brittle Body Snap (Physical food fracture transient) ---
      const snapOsc = ctx.createOscillator();
      const snapGain = ctx.createGain();

      snapOsc.type = 'triangle';
      snapOsc.frequency.setValueAtTime(620 * pitchVariation, startTime);
      snapOsc.frequency.exponentialRampToValueAtTime(110 * pitchVariation, startTime + 0.035);

      snapGain.gain.setValueAtTime(0.7, startTime);
      snapGain.gain.linearRampToValueAtTime(0.001, startTime + 0.045);

      snapOsc.connect(snapGain);
      snapGain.connect(ctx.destination);

      snapOsc.start(startTime);
      snapOsc.stop(startTime + 0.05);

      // --- LAYER 2: Brittle Shatter Micro-Crackles (Blistered roasted wafer texture) ---
      const duration = 0.14; // 140ms crispy trail
      const sampleRate = ctx.sampleRate;
      const bufferSize = Math.max(256, Math.floor(sampleRate * duration));
      const buffer = ctx.createBuffer(1, bufferSize, sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        const t = i / sampleRate;
        const decay = Math.exp(-t * (34 * pitchVariation));
        // High density of sharp micro-spikes mimicking brittle puffed blister bubbles bursting
        const isCrack = Math.random() > 0.78;
        const crackle = isCrack ? (Math.random() * 2 - 1) * 2.4 : (Math.random() * 2 - 1) * 0.6;
        data[i] = crackle * decay;
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = buffer;

      // Filter: Highpass to strip mud + peaking boost in crisp crispy zone (~3200Hz)
      const hpFilter = ctx.createBiquadFilter();
      hpFilter.type = 'highpass';
      hpFilter.frequency.setValueAtTime(1100, startTime);

      const peakFilter = ctx.createBiquadFilter();
      peakFilter.type = 'peaking';
      peakFilter.frequency.setValueAtTime(3200 * pitchVariation, startTime);
      peakFilter.gain.setValueAtTime(6.0, startTime);
      peakFilter.Q.setValueAtTime(1.5, startTime);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.85, startTime);
      noiseGain.gain.linearRampToValueAtTime(0.001, startTime + duration);

      noiseSource.connect(hpFilter);
      hpFilter.connect(peakFilter);
      peakFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      noiseSource.start(startTime);
      noiseSource.stop(startTime + duration + 0.01);
    } catch {
      // Audio autoplay or permissions handled gracefully
    }
  }

  // Aliases for compatibility
  playCrunch() {
    this.playPapadCrunch();
  }

  playSliceCrunch(_comboCount: number = 1) {
    this.playPapadCrunch();
  }

  // Smooth aerodynamic blade swipe whoosh
  playWhoosh() {
    if (!this.enabled) return;
    const now = Date.now();
    if (now - this.lastWhooshTime < 90) return;
    this.lastWhooshTime = now;

    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const startTime = Math.max(ctx.currentTime, 0.001);
      const duration = 0.12;
      const bufferSize = Math.max(256, Math.floor(ctx.sampleRate * duration));
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.4;
      }

      const noise = ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(800, startTime);
      filter.frequency.exponentialRampToValueAtTime(2400, startTime + 0.05);
      filter.frequency.exponentialRampToValueAtTime(650, startTime + duration);
      filter.Q.setValueAtTime(2.2, startTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.01, startTime);
      gain.gain.linearRampToValueAtTime(0.22, startTime + 0.025);
      gain.gain.linearRampToValueAtTime(0.001, startTime + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      noise.start(startTime);
      noise.stop(startTime + duration + 0.01);
    } catch {
      // ignore
    }
  }

  // Soft organic pop for interactive clicks
  playPop() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const startTime = Math.max(ctx.currentTime, 0.001);
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, startTime);
      osc.frequency.exponentialRampToValueAtTime(680, startTime + 0.06);

      gain.gain.setValueAtTime(0.2, startTime);
      gain.gain.linearRampToValueAtTime(0.001, startTime + 0.075);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.08);
    } catch {
      // ignore
    }
  }

  // Gentle sparkle sound for achievements
  playSparkle() {
    if (!this.enabled) return;
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const baseTime = Math.max(ctx.currentTime, 0.001);
      const notes = [659.25, 880.0, 1174.66]; // E5, A5, D6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        const startTime = baseTime + idx * 0.04;
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.1, startTime);
        gain.gain.linearRampToValueAtTime(0.001, startTime + 0.12);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + 0.12);
      });
    } catch {
      // ignore
    }
  }
}

export const sound = new SoundController();
