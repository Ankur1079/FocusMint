/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private primaryGain: GainNode | null = null;
  private isMuted: boolean = false;

  // Sound nodes for ambient rain / focus sound generators
  private rainNoiseNode: AudioWorkletNode | ScriptProcessorNode | null = null;
  private rainFilterNode: BiquadFilterNode | null = null;
  private rainGainNode: GainNode | null = null;
  private loFiBeatsInterval: any = null;

  // Seasonal Custom Synthesized Soundscape fields
  private summerInterval: any = null;
  private summerVol: number = 50;

  private nightWindSource: AudioBufferSourceNode | null = null;
  private nightWindFilter: BiquadFilterNode | null = null;
  private nightWindGain: GainNode | null = null;
  private nightWindLfoInterval: any = null;
  private nightCricketsInterval: any = null;
  private nightVol: number = 50;

  private thunderInterval: any = null;
  private rainVol: number = 50;

  private winterSource: AudioBufferSourceNode | null = null;
  private winterFilter: BiquadFilterNode | null = null;
  private winterGain: GainNode | null = null;
  private winterLfoInterval: any = null;
  private winterVol: number = 50;

  constructor() {
    // Lazy initialized on user click
  }

  private init() {
    if (this.ctx) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.primaryGain = this.ctx.createGain();
      this.primaryGain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      this.primaryGain.connect(this.ctx.destination);
    } catch (e) {
      console.warn('Web Audio API not supported', e);
    }
  }

  setMute(muted: boolean) {
    this.isMuted = muted;
    if (this.primaryGain && this.ctx) {
      this.primaryGain.gain.setValueAtTime(muted ? 0 : 0.4, this.ctx.currentTime);
    }
  }

  toggleMute(): boolean {
    this.setMute(!this.isMuted);
    return this.isMuted;
  }

  getMuted() {
    return this.isMuted;
  }

  playTriggerSound() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    this.playBeep(980, 0.08, 'sine');
  }

  playClick() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    
    // Simulate mechanical tactile click
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1400, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.04);
    
    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
    
    osc.connect(gain);
    gain.connect(this.primaryGain || this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  playConfirm() {
    this.init();
    if (!this.ctx || this.isMuted) return;

    this.playBeep(660, 0.1, 'sine', 0.1);
    setTimeout(() => {
      this.playBeep(880, 0.15, 'sine', 0.12);
    }, 70);
  }

  playBeep(freq: number, duration: number, type: OscillatorType = 'sine', gainVal: number = 0.12) {
    this.init();
    if (!this.ctx || this.isMuted) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(this.primaryGain || this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  playPomodoroSignal() {
    // Beautiful aesthetic triple chime sound
    this.playBeep(523.25, 0.3, 'sine', 0.2); // C5
    setTimeout(() => this.playBeep(659.25, 0.3, 'sine', 0.2), 150); // E5
    setTimeout(() => this.playBeep(783.99, 0.4, 'sine', 0.2), 300); // G5
  }

  // Synthesis of Formula 1 Doppler Sweep (Race engine zoom!)
  playF1Sweep() {
    this.init();
    if (!this.ctx || this.isMuted) return;

    const osc = this.ctx.createOscillator();
    const oscHarmonic = this.ctx.createOscillator();
    const subOsc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    oscHarmonic.type = 'sawtooth';
    subOsc.type = 'sawtooth';

    const t = this.ctx.currentTime;
    
    // Doppler pitch drop simulation: 360Hz -> 140Hz
    osc.frequency.setValueAtTime(450, t);
    osc.frequency.exponentialRampToValueAtTime(80, t + 1.6);
    
    oscHarmonic.frequency.setValueAtTime(900, t);
    oscHarmonic.frequency.exponentialRampToValueAtTime(160, t + 1.6);

    subOsc.frequency.setValueAtTime(225, t);
    subOsc.frequency.exponentialRampToValueAtTime(40, t + 1.6);

    // Filter to give that roaring muffler tone
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1000, t);
    filter.frequency.exponentialRampToValueAtTime(350, t + 1.6);

    // Loudness ramp up then drop (pass-by)
    gain.gain.setValueAtTime(0.001, t);
    gain.gain.linearRampToValueAtTime(0.35, t + 0.4);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 1.6);

    osc.connect(filter);
    oscHarmonic.connect(filter);
    subOsc.connect(filter);
    filter.connect(gain);
    gain.connect(this.primaryGain || this.ctx.destination);

    osc.start();
    oscHarmonic.start();
    subOsc.start();

    osc.stop(t + 1.6);
    oscHarmonic.stop(t + 1.6);
    subOsc.stop(t + 1.6);
  }

  // Procedural Focus Rain Water Simulator
  startRainSound(volumePercent: number = 50) {
    this.init();
    if (!this.ctx || this.isMuted) return;

    // Safety shutdown if already playing
    this.stopRainSound();

    if (volumePercent === 0) return;

    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);

    // Generate White Noise
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    // Play rain noise
    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    // Filter low rumbling cloud base and soft splatter
    this.rainFilterNode = this.ctx.createBiquadFilter();
    this.rainFilterNode.type = 'bandpass';
    this.rainFilterNode.frequency.setValueAtTime(450, this.ctx.currentTime);
    this.rainFilterNode.Q.setValueAtTime(0.6, this.ctx.currentTime);

    this.rainGainNode = this.ctx.createGain();
    const normalizedVol = (volumePercent / 100) * 0.18;
    this.rainGainNode.gain.setValueAtTime(normalizedVol, this.ctx.currentTime);

    noiseSource.connect(this.rainFilterNode);
    this.rainFilterNode.connect(this.rainGainNode);
    this.rainGainNode.connect(this.primaryGain || this.ctx.destination);

    noiseSource.start();
    
    // Store reference differently for garbage collection safety (ScriptProcessor fallback)
    (this as any).rainSource = noiseSource;
  }

  adjustRainVolume(volumePercent: number) {
    if (!this.ctx || !this.rainGainNode) return;
    const normalizedVol = (volumePercent / 100) * 0.18;
    this.rainGainNode.gain.setTargetAtTime(normalizedVol, this.ctx.currentTime, 0.15);
  }

  stopRainSound() {
    if ((this as any).rainSource) {
      try {
        (this as any).rainSource.stop();
        (this as any).rainSource.disconnect();
      } catch (e) {}
      (this as any).rainSource = null;
    }
    if (this.rainFilterNode) {
      this.rainFilterNode.disconnect();
      this.rainFilterNode = null;
    }
    if (this.rainGainNode) {
      this.rainGainNode.disconnect();
      this.rainGainNode = null;
    }
  }

  startFocusChimes(volumePercent: number) {
    this.stopFocusChimes();
    if (volumePercent === 0) return;

    // Simulate ambient lo-fi synth pluck sequence on interval
    this.loFiBeatsInterval = setInterval(() => {
      if (this.isMuted) return;
      
      const chord = [261.63, 329.63, 392.00, 493.88, 523.25]; // pleasant pentatonic tones (C4, E4, G4, B4, C5)
      const randomTone = chord[Math.floor(Math.random() * chord.length)];
      
      this.playBeep(randomTone, 1.8, 'sine', (volumePercent / 100) * 0.05);

      // Random delay offset to simulate slow lo-fi piano plucks
    }, 4000);
  }

  stopFocusChimes() {
    if (this.loFiBeatsInterval) {
      clearInterval(this.loFiBeatsInterval);
      this.loFiBeatsInterval = null;
    }
  }

  private createNoiseBuffer(): AudioBuffer {
    if (!this.ctx) throw new Error("No context");
    const bufferSize = 2 * this.ctx.sampleRate;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  // ==========================================
  // SUMMER: BIRD CHIRPING / CLIPERING SYNTH
  // ==========================================
  startSummerAmbient(volumePercent: number) {
    this.stopSummerAmbient();
    this.init();
    if (!this.ctx || this.isMuted || volumePercent === 0) return;
    this.summerVol = volumePercent;

    const playChirpGroup = () => {
      if (!this.ctx || this.isMuted) return;
      const now = this.ctx.currentTime;
      const count = 3 + Math.floor(Math.random() * 3); // 3 to 5 tweets
      let delay = 0;

      for (let i = 0; i < count; i++) {
        const chirpTime = now + delay;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        const baseFreq = 2200 + Math.random() * 400;
        const topFreq = baseFreq + 1000 + Math.random() * 600;
        osc.frequency.setValueAtTime(baseFreq, chirpTime);
        osc.frequency.exponentialRampToValueAtTime(topFreq, chirpTime + 0.08);

        gain.gain.setValueAtTime(0, chirpTime);
        gain.gain.linearRampToValueAtTime((this.summerVol / 100) * 0.07, chirpTime + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, chirpTime + 0.08);

        osc.connect(gain);
        gain.connect(this.primaryGain || this.ctx.destination);

        osc.start(chirpTime);
        osc.stop(chirpTime + 0.09);

        delay += 0.12 + Math.random() * 0.08;
      }
    };

    playChirpGroup();
    this.summerInterval = setInterval(playChirpGroup, 4500);
  }

  adjustSummerVolume(volumePercent: number) {
    this.summerVol = volumePercent;
  }

  stopSummerAmbient() {
    if (this.summerInterval) {
      clearInterval(this.summerInterval);
      this.summerInterval = null;
    }
  }

  // ==========================================
  // NIGHT: CRICKET CHIRPS & SILENT HOWLING WIND
  // ==========================================
  startNightAmbient(volumePercent: number) {
    this.stopNightAmbient();
    this.init();
    if (!this.ctx || this.isMuted || volumePercent === 0) return;
    this.nightVol = volumePercent;

    const t = this.ctx.currentTime;
    const buffer = this.createNoiseBuffer();

    // Night Wind
    this.nightWindSource = this.ctx.createBufferSource();
    this.nightWindSource.buffer = buffer;
    this.nightWindSource.loop = true;

    this.nightWindFilter = this.ctx.createBiquadFilter();
    this.nightWindFilter.type = 'lowpass';
    this.nightWindFilter.frequency.setValueAtTime(320, t);
    this.nightWindFilter.Q.setValueAtTime(1.5, t);

    this.nightWindGain = this.ctx.createGain();
    const windVol = (this.nightVol / 100) * 0.12;
    this.nightWindGain.gain.setValueAtTime(windVol, t);

    this.nightWindSource.connect(this.nightWindFilter);
    this.nightWindFilter.connect(this.nightWindGain);
    this.nightWindGain.connect(this.primaryGain || this.ctx.destination);
    
    this.nightWindSource.start();

    // Night Wind dynamic LFO
    let angle = 0;
    this.nightWindLfoInterval = setInterval(() => {
      if (!this.ctx || !this.nightWindFilter) return;
      angle += 0.05;
      const cutoff = 320 + Math.sin(angle) * 120;
      this.nightWindFilter.frequency.setTargetAtTime(cutoff, this.ctx.currentTime, 0.25);
    }, 100);

    // Crickets chirp group rhythm
    const playCricketChirpGroup = () => {
      if (!this.ctx || this.isMuted) return;
      const now = this.ctx.currentTime;
      const duration = 0.35 + Math.random() * 0.15;
      
      const osc = this.ctx.createOscillator();
      const pulseGain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(4200 + Math.random() * 300, now);

      pulseGain.gain.setValueAtTime(0, now);
      const pulseCount = Math.floor(duration * 35);
      for (let p = 0; p < pulseCount; p++) {
        const pulseTime = now + (p * 0.028);
        pulseGain.gain.setValueAtTime((this.nightVol / 100) * 0.035, pulseTime);
        pulseGain.gain.setValueAtTime(0.0001, pulseTime + 0.015);
      }

      osc.connect(pulseGain);
      pulseGain.connect(this.primaryGain || this.ctx.destination);

      osc.start(now);
      osc.stop(now + duration);
    };

    playCricketChirpGroup();
    this.nightCricketsInterval = setInterval(playCricketChirpGroup, 1400);
  }

  adjustNightVolume(volumePercent: number) {
    this.nightVol = volumePercent;
    if (this.ctx && this.nightWindGain) {
      const windVol = (volumePercent / 100) * 0.12;
      this.nightWindGain.gain.setTargetAtTime(windVol, this.ctx.currentTime, 0.15);
    }
  }

  stopNightAmbient() {
    if (this.nightWindSource) {
      try { this.nightWindSource.stop(); } catch (e) {}
      this.nightWindSource.disconnect();
      this.nightWindSource = null;
    }
    if (this.nightWindFilter) { this.nightWindFilter.disconnect(); this.nightWindFilter = null; }
    if (this.nightWindGain) { this.nightWindGain.disconnect(); this.nightWindGain = null; }
    if (this.nightWindLfoInterval) { clearInterval(this.nightWindLfoInterval); this.nightWindLfoInterval = null; }
    if (this.nightCricketsInterval) { clearInterval(this.nightCricketsInterval); this.nightCricketsInterval = null; }
  }

  // ==========================================
  // RAINY: RAIN RUSTLE & RANDOM THUNDER CLAPS
  // ==========================================
  startRainyAmbient(volumePercent: number) {
    this.stopRainyAmbient();
    this.init();
    if (!this.ctx || this.isMuted || volumePercent === 0) return;
    this.rainVol = volumePercent;

    // 1. Play rain base
    this.startRainSound(volumePercent);

    // 2. Schedule randomized thunder
    const playThunder = () => {
      if (!this.ctx || this.isMuted) return;
      const now = this.ctx.currentTime;

      // Low frequency rumble oscillator
      const rumbleOsc = this.ctx.createOscillator();
      const rumbleFilter = this.ctx.createBiquadFilter();
      const rumbleGain = this.ctx.createGain();

      rumbleOsc.type = 'sawtooth';
      rumbleOsc.frequency.setValueAtTime(45, now);
      rumbleOsc.frequency.linearRampToValueAtTime(22, now + 3.0);

      rumbleFilter.type = 'lowpass';
      rumbleFilter.frequency.setValueAtTime(95, now);
      rumbleFilter.frequency.exponentialRampToValueAtTime(25, now + 3.0);

      rumbleGain.gain.setValueAtTime(0.001, now);
      rumbleGain.gain.linearRampToValueAtTime((this.rainVol / 100) * 0.18, now + 0.15);
      rumbleGain.gain.linearRampToValueAtTime((this.rainVol / 100) * 0.08, now + 0.8);
      rumbleGain.gain.exponentialRampToValueAtTime(0.0001, now + 3.0);

      rumbleOsc.connect(rumbleFilter);
      rumbleFilter.connect(rumbleGain);
      rumbleGain.connect(this.primaryGain || this.ctx.destination);

      rumbleOsc.start(now);
      rumbleOsc.stop(now + 3.1);

      // Higher frequency strike static crackle
      if (Math.random() > 0.4) {
        const strikeSource = this.ctx.createBufferSource();
        strikeSource.buffer = this.createNoiseBuffer();
        const strikeFilter = this.ctx.createBiquadFilter();
        const strikeGain = this.ctx.createGain();

        strikeFilter.type = 'bandpass';
        strikeFilter.frequency.setValueAtTime(180, now);
        strikeFilter.frequency.exponentialRampToValueAtTime(80, now + 0.82);

        strikeGain.gain.setValueAtTime((this.rainVol / 100) * 0.12, now);
        strikeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.82);

        strikeSource.connect(strikeFilter);
        strikeFilter.connect(strikeGain);
        strikeGain.connect(this.primaryGain || this.ctx.destination);
        
        strikeSource.start(now);
        strikeSource.stop(now + 0.84);
      }
    };

    setTimeout(playThunder, 2500);
    this.thunderInterval = setInterval(() => {
      if (Math.random() > 0.5) {
        playThunder();
      }
    }, 14000);
  }

  adjustRainyVolume(volumePercent: number) {
    this.rainVol = volumePercent;
    this.adjustRainVolume(volumePercent);
  }

  stopRainyAmbient() {
    this.stopRainSound();
    if (this.thunderInterval) {
      clearInterval(this.thunderInterval);
      this.thunderInterval = null;
    }
  }

  // ==========================================
  // WINTER: ICE WIND & BLIZZARD WHISTLE
  // ==========================================
  startWinterAmbient(volumePercent: number) {
    this.stopWinterAmbient();
    this.init();
    if (!this.ctx || this.isMuted || volumePercent === 0) return;
    this.winterVol = volumePercent;

    const t = this.ctx.currentTime;
    const buffer = this.createNoiseBuffer();

    this.winterSource = this.ctx.createBufferSource();
    this.winterSource.buffer = buffer;
    this.winterSource.loop = true;

    this.winterFilter = this.ctx.createBiquadFilter();
    this.winterFilter.type = 'bandpass';
    this.winterFilter.frequency.setValueAtTime(800, t);
    this.winterFilter.Q.setValueAtTime(5.5, t);

    this.winterGain = this.ctx.createGain();
    const finalVolume = (this.winterVol / 100) * 0.095;
    this.winterGain.gain.setValueAtTime(finalVolume, t);

    this.winterSource.connect(this.winterFilter);
    this.winterFilter.connect(this.winterGain);
    this.winterGain.connect(this.primaryGain || this.ctx.destination);

    this.winterSource.start();

    // Winter wind sweeps
    let count = 0;
    this.winterLfoInterval = setInterval(() => {
      if (!this.ctx || !this.winterFilter || !this.winterGain) return;
      count += 0.08;

      const primaryCycle = Math.sin(count * 0.6) * 400 + 1000;
      const flutter = Math.sin(count * 4.2) * 120;
      const finalFreq = Math.max(450, Math.min(2000, primaryCycle + flutter));

      const baseGain = (this.winterVol / 100) * 0.085;
      const gainModMultiplier = 0.5 + Math.sin(count * 0.5) * 0.35;
      const finalGainValue = baseGain * gainModMultiplier;

      this.winterFilter.frequency.setTargetAtTime(finalFreq, this.ctx.currentTime, 0.12);
      this.winterGain.gain.setTargetAtTime(finalGainValue, this.ctx.currentTime, 0.15);
    }, 90);
  }

  adjustWinterVolume(volumePercent: number) {
    this.winterVol = volumePercent;
  }

  stopWinterAmbient() {
    if (this.winterSource) {
      try { this.winterSource.stop(); } catch (e) {}
      this.winterSource.disconnect();
      this.winterSource = null;
    }
    if (this.winterFilter) { this.winterFilter.disconnect(); this.winterFilter = null; }
    if (this.winterGain) { this.winterGain.disconnect(); this.winterGain = null; }
    if (this.winterLfoInterval) { clearInterval(this.winterLfoInterval); this.winterLfoInterval = null; }
  }

  stopAllSeasonalEffects() {
    this.stopSummerAmbient();
    this.stopNightAmbient();
    this.stopRainyAmbient();
    this.stopWinterAmbient();
  }
}

export const audio = new SoundEngine();
