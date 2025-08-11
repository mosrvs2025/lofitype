import { TypingEngine } from "./typingEngine.js";
import { Stats } from "./stats.js";
import { getRandomPrompt } from "./prompts.js";
import * as Music from "./audio.js";

const qs = s => document.querySelector(s);

const promptEl = qs("#prompt");
const hiddenInput = qs("#hidden-input");
const wpmEl = qs("#wpm");
const accEl = qs("#accuracy");
const elapsedEl = qs("#elapsed");

const newBtn = qs("#newPromptBtn");
const resetBtn = qs("#resetBtn");
const themeBtn = qs("#themeToggle");
const musicBtn = qs("#musicToggle");
const volumeEl = qs("#volume");
const bgGenBtn = qs("#bgGenBtn");

const engine = new TypingEngine(promptEl);
const stats = new Stats();

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
  themeBtn.setAttribute("aria-pressed", theme === "dark" ? "false" : "true");
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme") || "dark";
  setTheme(current === "dark" ? "light" : "dark");
}

function loadPrompt() {
  engine.setPrompt(getRandomPrompt());
  hiddenInput.value = "";
  stats.reset();
  updateStatsUI();
  if (document.activeElement !== hiddenInput) hiddenInput.focus();
}

function updateStatsUI() {
  elapsedEl.textContent = stats.elapsedSec.toFixed(1) + "s";
  wpmEl.textContent = stats.wpm;
  accEl.textContent = stats.accuracy + "%";
}

function startIfNeeded() { stats.start(); }

function onChar(ch) {
  const { advanced, correct } = engine.handleChar(ch);
  if (!advanced) return;
  stats.addTyped(!!correct);
  if (engine.isComplete()) stats.stop();
  updateStatsUI();
}

function onBackspace() {
  const { moved, prevWasCorrect } = engine.handleBackspace();
  if (!moved) return;
  stats.backspace(prevWasCorrect);
  updateStatsUI();
}

function setupInput() {
  promptEl.addEventListener("click", () => hiddenInput.focus(), { passive: true });

  let lastValue = "";
  hiddenInput.addEventListener("input", (e) => {
    startIfNeeded();
    const v = e.target.value;
    const add = v.slice(lastValue.length);
    if (add.length > 0) {
      for (const ch of add) onChar(ch);
    } else if (v.length < lastValue.length) {
      onBackspace();
    }
    lastValue = e.target.value;
  });

  hiddenInput.addEventListener("keydown", (e) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (hiddenInput.value.length > 0) hiddenInput.value = hiddenInput.value.slice(0, -1);
      onBackspace();
    } else if (e.key === "Tab") {
      e.preventDefault();
    } else if (e.key.length === 1) {
      hiddenInput.value += e.key;
    }
  });

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) hiddenInput.focus();
  });
}

async function generateBackground() {
  bgGenBtn.disabled = true;
  const original = bgGenBtn.textContent;
  bgGenBtn.textContent = "Generating…";
  try {
    const theme = document.documentElement.getAttribute("data-theme") || "dark";
    const res = await fetch("/.netlify/functions/generate_bg", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ theme })
    });
    if (!res.ok) throw new Error("BG request failed");
    const data = await res.json();
    if (data.svg) {
      const encoded = encodeURIComponent(data.svg);
      document.documentElement.style.setProperty("--bg-image", `url("data:image/svg+xml;utf8,${encoded}")`);
    } else if (data.cssGradient) {
      document.documentElement.style.setProperty("--bg-image", data.cssGradient);
    }
  } catch (e) {
    console.error(e);
    alert("Could not generate background. Check your Netlify env var GEMINI_API_KEY.");
  } finally {
    bgGenBtn.disabled = false;
    bgGenBtn.textContent = original;
  }
}

function setupControls() {
  newBtn.addEventListener("click", loadPrompt);
  resetBtn.addEventListener("click", () => loadPrompt());
  themeBtn.addEventListener("click", toggleTheme);

  const savedTheme = localStorage.getItem("theme") || "dark";
  setTheme(savedTheme);

  Music.initAudio({ musicBtn });
  musicBtn.addEventListener("click", async () => {
    Music.toggle();
    musicBtn.setAttribute("aria-pressed", Music.isPlaying() ? "true" : "false");
  });

  const savedVol = parseFloat(localStorage.getItem("volume") ?? "0.4");
  volumeEl.value = String(savedVol);
  Music.setVolume(savedVol);
  volumeEl.addEventListener("input", (e) => {
    const v = parseFloat(e.target.value);
    Music.setVolume(v);
    localStorage.setItem("volume", String(v));
  });

  bgGenBtn.addEventListener("click", generateBackground);
}

function tick() {
  if (!engine.isComplete() && stats.startTime) updateStatsUI();
  requestAnimationFrame(tick);
}

setupInput();
setupControls();
loadPrompt();
hiddenInput.focus();
requestAnimationFrame(tick);
