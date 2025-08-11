export class TypingEngine {
  constructor(container) {
    this.container = container;
    this.spans = [];
    this.index = 0;
    this.states = []; // 'pending' | 'correct' | 'incorrect'
  }

  setPrompt(text) {
    this.container.innerHTML = "";
    this.spans = [];
    this.states = [];
    this.index = 0;

    for (const ch of text) {
      const span = document.createElement("span");
      span.textContent = ch;
      span.className = "char pending";
      this.container.appendChild(span);
      this.spans.push(span);
      this.states.push("pending");
    }
    this._updateCaret();
  }

  _updateCaret() {
    this.spans.forEach(s => s.classList.remove("current"));
    if (this.spans[this.index]) this.spans[this.index].classList.add("current");
  }

  handleChar(ch) {
    if (this.isComplete()) return { advanced: false, correct: null };
    const expected = this.spans[this.index].textContent;
    const correct = ch === expected;
    this.states[this.index] = correct ? "correct" : "incorrect";
    this.spans[this.index].className = `char ${this.states[this.index]}`;
    this.index++;
    this._updateCaret();
    return { advanced: true, correct };
  }

  handleBackspace() {
    if (this.index === 0) return { moved: false, prevWasCorrect: null };
    this.index--;
    const prevWasCorrect = this.states[this.index] === "correct";
    this.states[this.index] = "pending";
    this.spans[this.index].className = "char pending";
    this._updateCaret();
    return { moved: true, prevWasCorrect };
  }

  isComplete() { return this.index >= this.spans.length; }
}
