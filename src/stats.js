export class Stats {
  constructor() { this.reset(); }
  reset() {
    this.startTime = null;
    this.endTime = null;
    this.typed = 0;
    this.correct = 0;
    this.errors = 0;
  }
  start() { if (!this.startTime) this.startTime = performance.now(); }
  stop()  { if (!this.endTime) this.endTime = performance.now(); }
  addTyped(isCorrect) {
    this.typed++;
    if (isCorrect) this.correct++; else this.errors++;
  }
  backspace(prevWasCorrect) {
    if (this.typed > 0) this.typed--;
    if (prevWasCorrect) this.correct = Math.max(0, this.correct - 1);
    else this.errors = Math.max(0, this.errors - 1);
  }
  get elapsedMs() {
    const end = this.endTime ?? performance.now();
    return this.startTime ? end - this.startTime : 0;
  }
  get elapsedSec() { return this.elapsedMs / 1000; }
  get wpm() {
    const minutes = this.elapsedSec / 60 || 1;
    return Math.max(0, Math.round((this.correct / 5) / minutes));
  }
  get accuracy() {
    if (this.typed === 0) return 100;
    return Math.max(0, Math.round((this.correct / this.typed) * 100));
  }
}
