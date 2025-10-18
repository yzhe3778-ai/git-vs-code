// 像素风格音效生成器
class PixelSound {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  private playTone(frequency: number, duration: number, type: OscillatorType = 'square') {
    if (!this.enabled || !this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = type;

    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration);
  }

  // 添加待办音效
  add() {
    this.playTone(523.25, 0.1); // C5
    setTimeout(() => this.playTone(659.25, 0.1), 50); // E5
  }

  // 完成待办音效
  complete() {
    this.playTone(523.25, 0.08); // C5
    setTimeout(() => this.playTone(659.25, 0.08), 40); // E5
    setTimeout(() => this.playTone(783.99, 0.15), 80); // G5
  }

  // 删除待办音效
  delete() {
    this.playTone(392.00, 0.1); // G4
    setTimeout(() => this.playTone(329.63, 0.15), 50); // E4
  }

  // 按钮点击音效
  click() {
    this.playTone(830.61, 0.05); // G#5
  }

  // 切换音效开关
  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  isEnabled() {
    return this.enabled;
  }
}

export const pixelSound = new PixelSound();
