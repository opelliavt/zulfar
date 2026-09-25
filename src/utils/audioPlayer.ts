/**
 * Romantic Audio Engine for Digital Wedding Invitation
 * Uses Web Audio API synthesis for zero-dependency, ultra-lightweight, 
 * offline-ready soothing acoustic piano melody (Canon in D chords),
 * perfectly optimized for fast performance on Cloudflare Pages.
 */

class RomanticAudioEngine {
  private audioCtx: AudioContext | null = null;
  private isPlayingState = false;
  private timerId: number | null = null;
  private noteIndex = 0;
  private volume = 0.5;
  private masterGain: GainNode | null = null;
  private listeners: ((playing: boolean) => void)[] = [];

  // Canon in D chord progressions and delicate arpeggios
  // Notes in Hz: D, A, Bm, F#m, G, D, G, A
  private readonly melodyPattern: number[][] = [
    // Bar 1: D Major (D3, A3, F#4, A4, D5, A4)
    [146.83, 220.00, 369.99, 440.00, 587.33, 440.00],
    // Bar 2: A Major (A2, E3, C#4, E4, A4, E4)
    [110.00, 164.81, 277.18, 329.63, 440.00, 329.63],
    // Bar 3: B Minor (B2, F#3, D4, F#4, B4, F#4)
    [123.47, 185.00, 293.66, 369.99, 493.88, 369.99],
    // Bar 4: F# Minor (F#2, C#3, A3, C#4, F#4, C#4)
    [92.50, 138.59, 220.00, 277.18, 369.99, 277.18],
    // Bar 5: G Major (G2, D3, B3, D4, G4, D4)
    [98.00, 146.83, 246.94, 293.66, 392.00, 293.66],
    // Bar 6: D Major (D3, A3, F#4, A4, D5, A4)
    [146.83, 220.00, 369.99, 440.00, 587.33, 440.00],
    // Bar 7: G Major (G2, D3, B3, D4, G4, B4)
    [98.00, 146.83, 246.94, 293.66, 392.00, 493.88],
    // Bar 8: A Major (A2, E3, C#4, E4, A4, C#5)
    [110.00, 164.81, 277.18, 329.63, 440.00, 554.37],
  ];

  private currentBar = 0;
  private currentStep = 0;

  private initContext() {
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.audioCtx = new AudioCtxClass();
      this.masterGain = this.audioCtx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);
      this.masterGain.connect(this.audioCtx.destination);
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  // Synthesize an acoustic piano / music-box note with warm decay
  private playPianoNote(freq: number, duration = 1.6) {
    if (!this.audioCtx || !this.masterGain) return;
    const now = this.audioCtx.currentTime;

    // Dual tone generator (warm acoustic chime)
    const osc1 = this.audioCtx.createOscillator();
    const osc2 = this.audioCtx.createOscillator();
    const noteGain = this.audioCtx.createGain();
    const filter = this.audioCtx.createBiquadFilter();

    // Fundamental: Triangle wave for gentle warmth
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, now);

    // Harmonic: Sine wave with slight detune for lush resonance
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, now);
    osc2.detune.setValueAtTime(4, now);

    // Warm low-pass filter
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.frequency.exponentialRampToValueAtTime(600, now + duration);

    // Acoustic piano-style ADSR envelope
    noteGain.gain.setValueAtTime(0.001, now);
    noteGain.gain.linearRampToValueAtTime(0.35, now + 0.04); // quick gentle attack
    noteGain.gain.exponentialRampToValueAtTime(0.12, now + 0.35); // initial decay
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration); // smooth release

    // Connect graph
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
    if (!this.isPlayingState) return;

    const barNotes = this.melodyPattern[this.currentBar];
    const freq = barNotes[this.currentStep];

    // If it's the first note of a bar (bass note), play bass + higher octave for rich sound
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

    // Tempo: ~540ms between notes = gentle 110bpm 6/8 romantic lilt
    this.timerId = window.setTimeout(this.tick, 520);
  };

  public play(): boolean {
    try {
      this.initContext();
      if (this.isPlayingState) return true;

      this.isPlayingState = true;
      this.notifyListeners();
      this.tick();
      return true;
    } catch (err) {
      console.warn('Audio playback could not start automatically', err);
      return false;
    }
  }

  public pause() {
    this.isPlayingState = false;
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
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
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners() {
    for (const listener of this.listeners) {
      listener(this.isPlayingState);
    }
  }
}

export const romanticAudio = new RomanticAudioEngine();
