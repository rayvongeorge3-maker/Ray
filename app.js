const state = {
  wave: 0,
  integrity: 100,
  resources: 120,
  phase: 0,
};

const phases = [
  {
    title: "Early Survival (Lv 1-3)",
    description: "Clean transparent anatomy. Balanced stamina. Baseline combat response.",
    eye: "BLUE • SCANNING",
    eyeClass: "#7dc2ff",
    stats: ["Stamina +0%", "Reflex +0%", "Bone Density +0%"],
  },
  {
    title: "Reinforcement Stage (Lv 4-7)",
    description: "Bones darken and muscles tighten. Orange pulse veins trigger in heavy combat.",
    eye: "ORANGE • COMBAT STRESS",
    eyeClass: "#fb923c",
    stats: ["Stamina +15%", "Reflex +10%", "Bone Density +18%"],
  },
  {
    title: "Combat Adaptation (Lv 8-12)",
    description: "Reinforced joints and high neural output enable tactical reactions and elite tracking.",
    eye: "RED • HIGH DANGER",
    eyeClass: "#ef4444",
    stats: ["Stamina +25%", "Reflex +28%", "Weak-Point Scan +35%"],
  },
  {
    title: "Advanced Defense State (Lv 13+)",
    description: "Geometric skeletal reinforcement and white surge pulses unlock peak defensive lethality.",
    eye: "WHITE • EVOLUTION SURGE",
    eyeClass: "#e5e7eb",
    stats: ["Stamina +35%", "Reflex +45%", "Damage Resist +30%"],
  },
];

const enemyPool = [
  "Fractured Swarm",
  "Runner Flank Pack",
  "Brute Siege Unit",
  "Watcher Disruptor",
  "Burrower Ambush",
  "Hollow Giant",
  "Core Entity Signal",
];

const upgradePool = [
  { name: "Reinforced Femur", effect: "+Sprint stability and kick damage" },
  { name: "Expanded Lungs", effect: "+Stamina duration and faster recovery" },
  { name: "Synaptic Surge", effect: "Slow-motion window after perfect dodge" },
  { name: "Bone Plating", effect: "Reduced frontal damage intake" },
  { name: "Ocular Precision", effect: "Highlight elite weak points" },
  { name: "Shock Blood Cells", effect: "Chance to stun nearby enemies" },
  { name: "Adrenal Recovery", effect: "Faster healing after kill streak" },
];

const waveEl = document.getElementById("wave");
const threatEl = document.getElementById("threat");
const integrityEl = document.getElementById("integrity");
const resourcesEl = document.getElementById("resources");
const enemyListEl = document.getElementById("enemyList");
const upgradeCardsEl = document.getElementById("upgradeCards");
const phaseTitleEl = document.getElementById("phaseTitle");
const phaseDescEl = document.getElementById("phaseDescription");
const eyeStateEl = document.getElementById("eyeState");
const statsListEl = document.getElementById("statsList");

function randomChoices(list, count) {
  return [...list].sort(() => Math.random() - 0.5).slice(0, count);
}

function renderPhase() {
  const phase = phases[state.phase];
  phaseTitleEl.textContent = phase.title;
  phaseDescEl.textContent = phase.description;
  eyeStateEl.textContent = phase.eye;
  eyeStateEl.style.color = phase.eyeClass;
  eyeStateEl.style.borderColor = phase.eyeClass;

  statsListEl.innerHTML = "";
  phase.stats.forEach((stat) => {
    const chip = document.createElement("span");
    chip.textContent = stat;
    statsListEl.appendChild(chip);
  });
}

function renderEnemyWave() {
  const count = Math.min(2 + state.wave, 7);
  const enemies = randomChoices(enemyPool, count);
  enemyListEl.innerHTML = "";
  enemies.forEach((enemy) => {
    const li = document.createElement("li");
    li.textContent = enemy;
    enemyListEl.appendChild(li);
  });
}

function renderUpgrades() {
  const options = randomChoices(upgradePool, 3);
  upgradeCardsEl.innerHTML = "";

  options.forEach((option) => {
    const card = document.createElement("article");
    card.className = "upgrade-card";
    card.innerHTML = `<strong>${option.name}</strong><p>${option.effect}</p>`;

    const btn = document.createElement("button");
    btn.textContent = "Select Upgrade";
    btn.addEventListener("click", () => {
      state.resources += 12;
      state.integrity = Math.min(100, state.integrity + 5);
      resourcesEl.textContent = state.resources;
      integrityEl.textContent = `${state.integrity}%`;
      alert(`Upgrade locked: ${option.name}`);
      renderUpgrades();
    });

    card.appendChild(btn);
    upgradeCardsEl.appendChild(card);
  });
}

function threatLabel() {
  if (state.wave < 3) return "Containment";
  if (state.wave < 6) return "Escalation";
  if (state.wave < 9) return "Critical";
  return "Catastrophic";
}

function nextWave() {
  state.wave += 1;
  state.resources += 8;
  state.integrity = Math.max(12, state.integrity - (8 + Math.floor(state.wave * 1.4)));

  if (state.wave >= 4 && state.phase < 1) state.phase = 1;
  if (state.wave >= 8 && state.phase < 2) state.phase = 2;
  if (state.wave >= 13 && state.phase < 3) state.phase = 3;

  waveEl.textContent = state.wave;
  threatEl.textContent = threatLabel();
  integrityEl.textContent = `${state.integrity}%`;
  resourcesEl.textContent = state.resources;

  renderPhase();
  renderEnemyWave();
  renderUpgrades();
}

function resetSimulation() {
  state.wave = 0;
  state.integrity = 100;
  state.resources = 120;
  state.phase = 0;
  waveEl.textContent = "0";
  threatEl.textContent = "Dormant";
  integrityEl.textContent = "100%";
  resourcesEl.textContent = "120";
  renderPhase();
  renderEnemyWave();
  renderUpgrades();
}

document.getElementById("nextWaveBtn").addEventListener("click", nextWave);
document.getElementById("startRunBtn").addEventListener("click", resetSimulation);
document.getElementById("showLoreBtn").addEventListener("click", () => {
  document.getElementById("storyText").textContent =
    "Field reports confirm Core Entities are linked to the original adaptation program. Secure defense cores and extract tactical memory logs to prevent total system collapse.";
});

resetSimulation();
