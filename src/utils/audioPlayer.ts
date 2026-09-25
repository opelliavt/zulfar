/**
 * Romantic Audio Engine for Digital Wedding Invitation
 * Supports:
 * 1. Custom MP3/Audio URL (from any direct link, CDN, hosting, cloud storage)
 * 2. Automatic fallback to Web Audio API soothing acoustic piano synthesis
 *    (Canon in D chords) if no URL is provided or if network fails.
 */

import { WEDDING_DATA } from '../data/weddingData';

class RomanticAudioEngine {
  private audioElement: HTMLAudioElement | null = null;
  private audioUrl: string = WEDDING_DATA.audio.url || '';
  private isUsingCustomAudio = false;

  private audioCtx: AudioContext | null = null;
  private isPlayingState = false;
  private timerId: number | null = null;
  private volume = 0.5;
  private masterGain: GainNode | null = null;
  private listeners: ((playing: boolean) => void)[] = [];

  // Canon in D chord progressions and delicate arpeggios
  private readonly melodyPattern: number[][] = [
    [146.83, 220.00, 369.99, 440.00, 587.33, 440.00],
    [110.00, 164.81, 277.18, 329.63, 440.00, 329.63],
    [123.47, 185.00, 293.66, 369.99, 493.88, 369.99],
    [92.50, 138.59, 220.00, 277.18, 369.99, 277.18],
    [98.00, 146.83, 246.94, 293.66, 392.00, 293.66],
    [146.83, 220.00, 369.99, 440.00, 587.33, 440.00],
    [98.00, 146.83, 246.94, 293.66, 392.00, 493.88],
    [110.00, 164.81, 277.18, 329.63, 440.00, 554.37],
  ];

  private currentBar = 0;
  private currentStep = 0;

  constructor() {
    if (this.audioUrl) {
      this.initAudioElement(this.audioUrl);
    }
  }

  public setAudioUrl(url: string) {
    const trimmed = url.trim();
    this.audioUrl = trimmed;
    if (trimmed) {
      this.initAudioElement(trimmed);
      if (this.isPlayingState) {
        this.stopSynthesizer();
        this.playCustomAudio();
      }
    } else {
      if (this.audioElement) {
        this.audioElement.pause();
        this.audioElement = null;
      }
      this.isUsingCustomAudio = false;
      if (this.isPlayingState) {
        this.startSynthesizer();
      }
    }
  }

  public getAudioUrl(): string {
    return this.audioUrl;
  }

  private initAudioElement(url: string) {
    if (!this.audioElement) {
      this.audioElement = new Audio();
      this.audioElement.loop = true;
      this.audioElement.preload = 'auto';
    }
    this.audioElement.src = url;
    this.audioElement.volume = this.volume;

    this.audioElement.onerror = () => {
      console.warn('Custom audio URL failed to load, falling back to romantic piano synthesizer');
      this.isUsingCustomAudio = false;
      if (this.isPlayingState) {
        this.startSynthesizer();
      }
    };
  }

  private playCustomAudio(): boolean {
    if (!this.audioElement) return false;
    this.isUsingCustomAudio = true;
    this.audioElement.volume = this.volume;
    this.audioElement
      .play()
      .then(() => {
        this.isPlayingState = true;
        this.notifyListeners();
      })
      .catch((err) => {
        console.warn('Audio URL playback was blocked or failed, fallback to synth', err);
        this.isUsingCustomAudio = false;
        this.startSynthesizer();
      });
    return true;
  }

  private initContext() {
    if (!this.audioCtx) {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioCtxClass();
      this.masterGain = this.audioCtx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);
      this.masterGain.connect(this.audioCtx.destination);
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  private playPianoNote(freq: number, duration = 1.6) {
    if (!this.audioCtx || !this.masterGain) return;
    const now = this.audioCtx.currentTime;

    const osc1 = this.audioCtx.createOscillator();
    const osc2 = this.audioCtx.createOscillator();
    const noteGain = this.audioCtx.createGain();
    const filter = this.audioCtx.createBiquadFilter();

    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, now);
    osc2.detune.setValueAtTime(4, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.frequency.exponentialRampToValueAtTime(600, now + duration);

    noteGain.gain.setValueAtTime(0.001, now);
    noteGain.gain.linearRampToValueAtTime(0.35, now + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.12, now + 0.35);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(this.masterGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration + 0.1);
    osc2.stop(now + duration + 0.1);
  }

  private tick = () => {
    if (!this.isPlayingState || this.isUsingCustomAudio) return;

    const barNotes = this.melodyPattern[this.currentBar];
    const freq = barNotes[this.currentStep];

    if (this.currentStep === 0) {
      this.playPianoNote(freq, 2.5);
    } else {
      this.playPianoNote(freq, 1.4);
    }

    this.currentStep++;
    if (this.currentStep >= barNotes.length) {
      this.currentStep = 0;
      this.currentBar = (this.currentBar + 1) % this.melodyPattern.length;
    }

    this.timerId = window.setTimeout(this.tick, 520);
  };

  private startSynthesizer() {
    this.initContext();
    this.isUsingCustomAudio = false;
    this.isPlayingState = true;
    this.notifyListeners();
    this.tick();
  }

  private stopSynthesizer() {
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
  }

  public play(): boolean {
    if (this.audioUrl && this.audioElement) {
      return this.playCustomAudio();
    } else {
      this.startSynthesizer();
      return true;
    }
  }

  public pause() {
    this.isPlayingState = false;
    if (this.audioElement) {
      this.audioElement.pause();
    }
    this.stopSynthesizer();
    this.notifyListeners();
  }

  public toggle(): boolean {
    if (this.isPlayingState) {
      this.pause();
      return false;
    } else {
      return this.play();
    }
  }

  public isPlaying(): boolean {
    return this.isPlayingState;
  }

  public setVolume(val: number) {
    this.volume = Math.max(0, Math.min(1, val));
    if (this.audioElement) {
      this.audioElement.volume = this.volume;
    }
    if (this.masterGain && this.audioCtx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);
    }
  }

  public getVolume(): number {
    return this.volume;
  }

  public subscribe(listener: (playing: boolean) => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notifyListeners() {
    for (const listener of this.listeners) {
      listener(this.isPlayingState);
    }
  }
}

export const romanticAudio = new RomanticAudioEngine();
