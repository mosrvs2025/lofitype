export const PROMPTS = [
  "breathe slow, type steady, enjoy the flow.",
  "lofi beats and quiet streets under soft neon lights.",
  "small habits, big change; one key at a time.",
  "simplicity scales; clarity wins.",
  "curiosity is the engine, attention is the fuel.",
  "coffee cools, code rules.",
  "whitespace is also design.",
  "make it boring to break: reliable before clever.",
  "mobile first, then delight.",
  "ship small, ship often."
];

export const PARAGRAPHS = [
  "The rain hums on the window while the cursor blinks, patient and blue. You match the rhythm, letting each letter arrive when it’s ready. A paragraph later, the room feels quieter, and your breathing does too.",
  "Progress is a slow river. You don’t force the current; you choose the shore and keep walking. Keys click, metrics rise and fall, but attention is the constant that carries you forward.",
  "Good software is calm. It forgives small mistakes and rewards steady hands. It prefers clarity to style and welcomes newcomers with simple paths."
];

export function getRandomPrompt() {
  const pool = Math.random() < 0.7 ? PROMPTS : PARAGRAPHS;
  return pool[Math.floor(Math.random() * pool.length)];
}
