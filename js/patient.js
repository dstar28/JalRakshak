// patient.js

document.addEventListener('DOMContentLoaded', () => {
  renderVillageRiskStatus();
  document
    .getElementById('checkRiskBtn')
    .addEventListener('click', evaluateSymptoms);
});

/* ─────────────────────────────────────────────
   Village Risk Status
───────────────────────────────────────────── */

function renderVillageRiskStatus() {
  const container = document.getElementById('villageRiskList');
  if (!container) return;

  container.innerHTML = '';

  villagesData.forEach(v => {

    const level =
      v.riskScore >= 70 ? 'high' :
      v.riskScore >= 40 ? 'moderate' :
      'low';

    const color =
      level === 'high' ? '#dc2626' :
      level === 'moderate' ? '#f59e0b' :
      '#10b981';

    container.innerHTML += `
      <div class="village-risk-item">
        <div class="v-name">
          ${v.village}
        </div>

        <div class="v-bar">
          <div class="v-fill ${level}" style="width:${v.riskScore}%"></div>
        </div>

        <div class="v-score" style="color:${color}">
          ${v.riskScore}
        </div>
      </div>
    `;
  });
}

/* ─────────────────────────────────────────────
   Symptom Evaluation Logic
───────────────────────────────────────────── */

function evaluateSymptoms() {

  const symptoms = {
    vomiting: document.getElementById('sym-vomiting').checked,
    fever: document.getElementById('sym-fever').checked,
    diarrhea: document.getElementById('sym-diarrhea').checked,
    dehydration: document.getElementById('sym-dehydration').checked,
    abdominal: document.getElementById('sym-abdominal').checked
  };

  const count = Object.values(symptoms).filter(Boolean).length;

  let level, title, advice;

  /* ───── Risk Classification ───── */

  if (count === 0) {
    level = 'low';
    title = 'No Symptoms Detected';
    advice = 'You currently show no symptoms. Continue maintaining safe hygiene and clean drinking water practices.';
  }

  else if (count <= 2 && !symptoms.dehydration) {
    level = 'low';
    title = 'Mild Risk';
    advice = 'You have mild symptoms. Rest well, stay hydrated, and monitor your condition closely.';
  }

  else if (count <= 3 || (count === 2 && symptoms.dehydration)) {
    level = 'moderate';
    title = 'Moderate Risk';
    advice = 'You have multiple symptoms. Begin ORS immediately and consult a nearby health worker within 24 hours.';
  }

  else {
    level = 'high';
    title = 'High Risk — Immediate Medical Attention Required';
    advice = 'Your symptoms indicate a possible serious water-borne illness. Visit the nearest health facility immediately.';
  }

  /* ───── Display Result ───── */

  const result = document.getElementById('symptomResult');

  result.className = `result-panel ${level}`;
  result.style.display = 'block';

  result.innerHTML = `
    <div class="result-title">${title}</div>

    <p style="font-size:.95rem;margin-bottom:.75rem;color:#374151">
      ${advice}
    </p>

    ${
      level !== 'low'
        ? `
        <div style="
          background:rgba(255,255,255,.6);
          border-radius:12px;
          padding:1rem;
          margin-top:.75rem;
          border:1px solid rgba(15,118,110,.1);
        ">
          <strong>ORS Preparation Guidelines:</strong><br/>
          Mix <b>1 litre</b> of boiled and cooled water with
          <b>6 teaspoons of sugar</b> and
          <b>½ teaspoon of salt</b>.
          Provide small sips frequently.
          Prepare a fresh solution every 24 hours.
        </div>
        `
        : ''
    }
  `;

  result.scrollIntoView({
    behavior: 'smooth',
    block: 'center'
  });
}