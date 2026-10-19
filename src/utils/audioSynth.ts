// Authentic Papad ASMR Crunch & Cartoon Audio Controller
// Features real recorded crispy wafer sound samples + Cartoon crunch from YouTube (yf3rfrL1ksk) + Web Audio API ASMR filtering

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

// Cartoon crunch sound effect from YouTube video (yf3rfrL1ksk)
const CARTOON_CRUNCH_URLS = [
  '/assets/cartoon_crunch.mp3',
  '/assets/cartoon_crunch.webm',
  '/assets/cartoon_crunch.wav',
];

class SoundController {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;
  private lastWhooshTime: number = 0;
  private lastCrunchTime: number = 0;

  // Real recorded audio buffers for ASMR crunch
  private crunchBuffers: AudioBuffer[] = [];
  private crackBuffers: AudioBuffer[] = [];
  
  // Cartoon crunch audio buffers
  private cartoonBuffers: AudioBuffer[] = [];
  private cartoonAudioPool: HTMLAudioElement[] = [];
  private cartoonAudioIndex: number = 0;

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

      // Pre-initialize HTML5 audio fallback pool for instant 0ms latency playback
      try {
        if (typeof Audio !== 'undefined') {
          for (let i = 0; i < 4; i++) {
            const a = new Audio('/assets/cartoon_crunch.mp3');
            a.preload = 'auto';
            this.cartoonAudioPool.push(a);
          }
        }
      } catch {
        // ignore
      }

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
      ctxResume(this.ctx);
    }
    return this.ctx;
  }

  // Preload real crunchy audio files + cartoon crunch into memory
  public async preloadAudio(): Promise<void> {
    if (this.isPreloaded || this.isPreloading || typeof window === 'undefined') return;
    this.isPreloading = true;

    try {
      const ctx = this.getContext();
      if (!ctx) return;

      // 1. Preload Cartoon Crunch Audio First (Hero Section Priority)
      for (const cartoonUrl of CARTOON_CRUNCH_URLS) {
        try {
          const res = await fetch(cartoonUrl);
          if (res.ok) {
            const arrayBuf = await res.arrayBuffer();
            const decoded = await ctx.decodeAudioData(arrayBuf);
            if (decoded) {
              this.cartoonBuffers.push(decoded);
              break; // successfully decoded primary cartoon buffer
            }
          }
        } catch {
          // try next format
        }
      }

      // 2. Preload Realistic ASMR Crunch Audio
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

  // Cartoonish Crunchy Sound Effect from YouTube (yf3rfrL1ksk)
  // Enhanced with joyful cartoon pitch modulation per bite
  playCartoonCrunch(isBigCrunch: boolean = false, biteIndex: number = 0) {
    if (!this.enabled) return;
    const now = Date.now();
    if (now - this.lastCrunchTime < 40) return;
    this.lastCrunchTime = now;

    try {
      const ctx = this.getContext();
      if (ctx) {
        if (ctx.state === 'suspended') {
          ctx.resume().catch(() => {});
        }

        const startTime = Math.max(ctx.currentTime, 0.001);

        // If Web Audio decoded buffer is ready, play with lively cartoon acoustic shaping
        if (this.cartoonBuffers.length > 0) {
          const source = ctx.createBufferSource();
          source.buffer = this.cartoonBuffers[0];

          // Comical cartoon pitch modulation:
          // Subtle ascending/wacky steps across progressive bites
          const pitchStep = (biteIndex % 6) * 0.04;
          const jitter = (Math.random() - 0.5) * 0.04;
          const playbackRate = isBigCrunch ? 1.15 : Math.max(0.88, 0.96 + pitchStep + jitter);
          source.playbackRate.setValueAtTime(playbackRate, startTime);

          // Highpass filter to eliminate boom and keep it light & cartoonish
          const hp = ctx.createBiquadFilter();
          hp.type = 'highpass';
          hp.frequency.setValueAtTime(150, startTime);

          // Peaking filter to amplify cartoon crunch presence & crispness (3.5 kHz)
          const peak = ctx.createBiquadFilter();
          peak.type = 'peaking';
          peak.frequency.setValueAtTime(3600 * playbackRate, startTime);
          peak.gain.setValueAtTime(4.5, startTime);
          peak.Q.setValueAtTime(1.5, startTime);

          // Gain
          const gainNode = ctx.createGain();
          gainNode.gain.setValueAtTime(isBigCrunch ? 1.0 : 0.9, startTime);

          source.connect(hp);
          hp.connect(peak);
          peak.connect(gainNode);
          gainNode.connect(ctx.destination);

          source.start(startTime);
          return;
        }
      }

      // Fallback 1: HTMLAudioElement pool
      if (this.cartoonAudioPool.length > 0) {
        const audio = this.cartoonAudioPool[this.cartoonAudioIndex];
        this.cartoonAudioIndex = (this.cartoonAudioIndex + 1) % this.cartoonAudioPool.length;
        audio.currentTime = 0;
        audio.playbackRate = isBigCrunch ? 1.15 : (0.95 + (biteIndex % 5) * 0.05);
        audio.volume = isBigCrunch ? 1.0 : 0.9;
        audio.play().catch(() => {});
        return;
      }

      // Fallback 2: Procedural cartoon synthesis
      if (ctx) {
        this.playCartoonSynthCrunch(ctx, Math.max(ctx.currentTime, 0.001), isBigCrunch, biteIndex);
      }
    } catch {
      // Audio autoplay or permissions handled gracefully
    }
  }

  // Procedural Cartoon Crunch Synthesis Fallback
  private playCartoonSynthCrunch(ctx: AudioContext, startTime: number, isBigCrunch: boolean, biteIndex: number) {
    const duration = isBigCrunch ? 0.22 : 0.16;
    const sampleRate = ctx.sampleRate;
    const bufferSize = Math.max(256, Math.floor(sampleRate * duration));
    const buffer = ctx.createBuffer(1, bufferSize, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      const t = i / sampleRate;
      // Fast snappy bursts simulating wafer teeth fractures
      const decay = Math.exp(-t * 28);
      const isBurst = Math.random() > 0.6;
      const crackle = isBurst ? (Math.random() * 2 - 1) * 2.4 : (Math.random() * 2 - 1) * 0.5;
      data[i] = crackle * decay;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;

    // Pitch variation per bite
    const pitch = 0.96 + (biteIndex % 5) * 0.06;
    noiseSource.playbackRate.setValueAtTime(pitch, startTime);

    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(2800 * pitch, startTime);
    bp.Q.setValueAtTime(1.8, startTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(isBigCrunch ? 0.9 : 0.75, startTime);
    gain.gain.linearRampToValueAtTime(0.001, startTime + duration);

    // Subtle cartoon tonal pop underneath
    const osc = ctx.createOscillator();
    const oscGain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(480 * pitch, startTime);
    osc.frequency.exponentialRampToValueAtTime(160, startTime + 0.04);
    oscGain.gain.setValueAtTime(0.2, startTime);
    oscGain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.045);

    noiseSource.connect(bp);
    bp.connect(gain);
    gain.connect(ctx.destination);

    osc.connect(oscGain);
    oscGain.connect(ctx.destination);

    noiseSource.start(startTime);
    noiseSource.stop(startTime + duration + 0.01);
    osc.start(startTime);
    osc.stop(startTime + 0.05);
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
        const hp = ctx.createBiquadFilter();
        hp.type = 'highpass';
        hp.frequency.setValueAtTime(140, startTime);

        const peak = ctx.createBiquadFilter();
        peak.type = 'peaking';
        peak.frequency.setValueAtTime(3400 * pitchShift, startTime);
        peak.gain.setValueAtTime(3.5, startTime);
        peak.Q.setValueAtTime(1.4, startTime);

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
  // Defaults to the requested cartoon crunch in hero sections!
  playBiteCrunch(isBigCrunch: boolean = false, biteIndex: number = 0, soundType: 'cartoon' | 'realistic' = 'cartoon') {
    if (soundType === 'cartoon') {
      this.playCartoonCrunch(isBigCrunch, biteIndex);
    } else {
      this.playPapadASMR(isBigCrunch, biteIndex);
    }
  }

  playPapadCrunch() {
    this.playCartoonCrunch(false);
  }

  playCrunch(isBigCrunch: boolean = false, biteIndex: number = 0) {
    this.playCartoonCrunch(isBigCrunch, biteIndex);
  }

  playSliceCrunch(_comboCount: number = 1) {
    this.playCartoonCrunch(true);
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

function ctxResume(ctx: AudioContext) {
  try {
    ctx.resume().catch(() => {});
  } catch {
    // ignore
  }
}

export const sound = new SoundController();
