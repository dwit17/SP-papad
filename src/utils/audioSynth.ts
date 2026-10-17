// Authentic Papad ASMR Crunch & Audio Controller
// Features real recorded crispy wafer sound samples + Web Audio API ASMR filtering

const REAL_CRUNCH_URLS = [
  '/assets/crunches/crunch.1.ogg',
  '/assets/crunches/crunch.2.ogg',
  '/assets/crunches/crunch.3.ogg',
  '/assets/crunches/crunch.4.ogg',
  '/assets/crunches/crunch.5.ogg',
  '/assets/crunches/crunch.6.ogg',
  '/assets/crunches/crunch.7.ogg',
  '/assets/crunches/toast/toast_1.ogg',
  '/assets/crunches/toast/toast_2.ogg',
  '/assets/crunches/toast/toast_3.ogg',
  '/assets/crunches/toast/toast_4.ogg',
  '/assets/crunches/multiple_cracks_2.wav',
  '/assets/crunch_toast.mp3',
];

class SoundController {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;
  private lastWhooshTime: number = 0;
  private lastCrunchTime: number = 0;

  // Real recorded audio buffers for ASMR crunch
  private crunchBuffers: AudioBuffer[] = [];
  private crackBuffers: AudioBuffer[] = [];
  private isPreloading: boolean = false;
  private isPreloaded: boolean = false;
  private lastBiteIndex: number = 0;

  constructor() {
    // Automatically attach user-interaction unlocker for browser autoplay policies
    if (typeof window !== 'undefined') {
      const unlock = () => {
        this.unlockContext();
        this.preloadAudio();
        window.removeEventListener('pointerdown', unlock);
        window.removeEventListener('click', unlock);
        window.removeEventListener('keydown', unlock);
        window.removeEventListener('touchstart', unlock);
      };
      window.addEventListener('pointerdown', unlock, { passive: true });
      window.addEventListener('click', unlock, { passive: true });
      window.addEventListener('keydown', unlock, { passive: true });
      window.addEventListener('touchstart', unlock, { passive: true });

      // Preload audio only when browser network and main thread are idle
      if ('requestIdleCallback' in window) {
        (window as unknown as { requestIdleCallback: (cb: () => void, opts: { timeout: number }) => void }).requestIdleCallback(() => {
          this.preloadAudio();
        }, { timeout: 3500 });
      } else {
        setTimeout(() => {
          this.preloadAudio();
        }, 3000);
      }
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
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // Preload real crunchy audio files into memory
  public async preloadAudio(): Promise<void> {
    if (this.isPreloaded || this.isPreloading || typeof window === 'undefined') return;
    this.isPreloading = true;

    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const loadPromises = REAL_CRUNCH_URLS.map(async (url) => {
        try {
          const res = await fetch(url);
          if (!res.ok) return null;
          const arrayBuffer = await res.arrayBuffer();
          const decoded = await ctx.decodeAudioData(arrayBuffer);
          return { url, buffer: decoded };
        } catch {
          return null;
        }
      });

      const results = await Promise.all(loadPromises);
      for (const item of results) {
        if (item && item.buffer) {
          if (item.url.includes('multiple_cracks')) {
            this.crackBuffers.push(item.buffer);
          } else {
            this.crunchBuffers.push(item.buffer);
          }
        }
      }

      this.isPreloaded = true;
    } catch {
      // Gracefully handle if offline or fetch restricted
    } finally {
      this.isPreloading = false;
    }
  }

  // Authentic Real Papad ASMR Crunch
  // Plays satisfying high-resolution real food fracture audio with crispy blister texture
  playPapadASMR(isBigCrunch: boolean = false, biteIndex: number = 0) {
    if (!this.enabled) return;
    const now = Date.now();
    if (now - this.lastCrunchTime < 45) return;
    this.lastCrunchTime = now;

    try {
      const ctx = this.getContext();
      if (!ctx) return;

      if (ctx.state === 'suspended') {
        ctx.resume().catch(() => {});
      }

      const startTime = Math.max(ctx.currentTime, 0.001);

      // If real audio buffers are loaded, play authentic recorded ASMR crunch!
      if (this.crunchBuffers.length > 0) {
        // Pick an authentic crunch sample with rotation
        const idx = (biteIndex + this.lastBiteIndex) % this.crunchBuffers.length;
        this.lastBiteIndex = (this.lastBiteIndex + 1) % this.crunchBuffers.length;
        const mainBuffer = this.crunchBuffers[idx];

        const source = ctx.createBufferSource();
        source.buffer = mainBuffer;

        // Subtle organic pitch shift so every bite sounds distinct and natural
        const pitchShift = 0.94 + Math.random() * 0.12;
        source.playbackRate.setValueAtTime(pitchShift, startTime);

        // ASMR EQ Shaping:
        // 1. Highpass filter to remove any boom/muffle below 140Hz
        const hp = ctx.createBiquadFilter();
        hp.type = 'highpass';
        hp.frequency.setValueAtTime(140, startTime);

        // 2. Peaking filter to enhance crispy wafer blisters and crunch presence around 3.4kHz
        const peak = ctx.createBiquadFilter();
        peak.type = 'peaking';
        peak.frequency.setValueAtTime(3400 * pitchShift, startTime);
        peak.gain.setValueAtTime(3.5, startTime);
        peak.Q.setValueAtTime(1.4, startTime);

        // 3. Dynamic Gain
        const gainNode = ctx.createGain();
        const volume = isBigCrunch ? 0.95 : 0.82;
        gainNode.gain.setValueAtTime(volume, startTime);

        source.connect(hp);
        hp.connect(peak);
        peak.connect(gainNode);
        gainNode.connect(ctx.destination);

        source.start(startTime);

        // For large fracture bites, layer an authentic initial crack snap
        if (isBigCrunch && this.crackBuffers.length > 0) {
          const crackSource = ctx.createBufferSource();
          crackSource.buffer = this.crackBuffers[0];
          crackSource.playbackRate.setValueAtTime(1.1 + Math.random() * 0.15, startTime);

          const crackGain = ctx.createGain();
          crackGain.gain.setValueAtTime(0.45, startTime);
          crackGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.12);

          crackSource.connect(crackGain);
          crackGain.connect(ctx.destination);

          crackSource.start(startTime);
          crackSource.stop(startTime + 0.13);
        }

        return;
      }

      // High-Fidelity Granular Acoustic Fracture Fallback (if audio buffers still fetching)
      this.playGranularAcousticCrunch(ctx, startTime, isBigCrunch);
    } catch {
      // Audio autoplay or permissions handled gracefully
    }
  }

  // Realistic Acoustic Granular Wafer Fracture (Fallback)
  private playGranularAcousticCrunch(ctx: AudioContext, startTime: number, isBigCrunch: boolean) {
    const duration = isBigCrunch ? 0.22 : 0.14;
    const sampleRate = ctx.sampleRate;
    const bufferSize = Math.max(256, Math.floor(sampleRate * duration));
    const buffer = ctx.createBuffer(1, bufferSize, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      const t = i / sampleRate;
      // Multi-envelope rapid micro-crackle decay
      const decay = Math.exp(-t * (32 + Math.random() * 8));
      const isBurst = Math.random() > 0.65;
      const crackle = isBurst ? (Math.random() * 2 - 1) * 2.2 : (Math.random() * 2 - 1) * 0.4;
      data[i] = crackle * decay;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;

    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.setValueAtTime(1200, startTime);

    const peak = ctx.createBiquadFilter();
    peak.type = 'peaking';
    peak.frequency.setValueAtTime(3600, startTime);
    peak.gain.setValueAtTime(5.5, startTime);
    peak.Q.setValueAtTime(1.6, startTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(isBigCrunch ? 0.8 : 0.65, startTime);
    gain.gain.linearRampToValueAtTime(0.001, startTime + duration);

    noiseSource.connect(hp);
    hp.connect(peak);
    peak.connect(gain);
    gain.connect(ctx.destination);

    noiseSource.start(startTime);
    noiseSource.stop(startTime + duration + 0.01);
  }

  // Public methods used throughout the application
  playBiteCrunch(isBigCrunch: boolean = false, biteIndex: number = 0) {
    this.playPapadASMR(isBigCrunch, biteIndex);
  }

  playPapadCrunch() {
    this.playPapadASMR(false);
  }

  playCrunch() {
    this.playPapadASMR(false);
  }

  playSliceCrunch(_comboCount: number = 1) {
    this.playPapadASMR(true);
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

      gain.gain.setValueAtTime(0.18, startTime);
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
