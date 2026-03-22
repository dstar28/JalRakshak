document.addEventListener('DOMContentLoaded', () => {

  console.log("JS Loaded ✅");

  populateVillages();
  renderVillageRisk();

  const btn = document.getElementById('checkRiskBtn');

  if (btn) {
    btn.addEventListener('click', evaluateSymptoms);
  }

});


/* ───────── POPULATE VILLAGES ───────── */

function populateVillages() {
  const select = document.getElementById("villageSelect");
  if (!select) return;

  select.innerHTML = '';

  villagesData.forEach(v => {
    const option = document.createElement("option");
    option.value = v.village;
    option.textContent = v.village;
    select.appendChild(option);
  });
}


/* ───────── RENDER VILLAGE RISK ───────── */

function renderVillageRisk() {
  const container = document.getElementById('villageRiskList');
  if (!container) return;

  container.innerHTML = '';

  villagesData.forEach(v => {

    const level =
      v.riskScore >= 70 ? 'high' :
      v.riskScore >= 40 ? 'moderate' :
      'low';

    container.innerHTML += `
      <div class="village-risk-item">
        <div>${v.village}</div>

        <div class="v-bar">
          <div class="v-fill ${level}" style="width:${v.riskScore}%"></div>
        </div>

        <div>${v.riskScore}</div>
      </div>
    `;
  });
}


/* ───────── MAIN FUNCTION ───────── */

async function evaluateSymptoms() {

  console.log("Button clicked ✅");

  const village = document.getElementById('villageSelect').value;
  const villageObj = villagesData.find(v => v.village === village);
  const villageRisk = villageObj ? villageObj.riskScore : 50;

  const data = {
    vomiting: document.getElementById('sym-vomiting').checked ? 1 : 0,
    fever: document.getElementById('sym-fever').checked ? 1 : 0,
    diarrhea: document.getElementById('sym-diarrhea').checked ? 1 : 0,
    dehydration: document.getElementById('sym-dehydration').checked ? 1 : 0,
    stomachPain: document.getElementById('sym-abdominal').checked ? 1 : 0,

    weakness: 1,
    unsafeWater: parseFloat(document.getElementById('waterSource').value),
    othersSick: 1,
    days: parseFloat(document.getElementById('days').value),
    villageRisk: villageRisk
  };

  try {

    const res = await fetch("http://127.0.0.1:5000/predict_disease", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const resultData = await res.json();

    let disease = resultData.disease;
    const confidence = resultData.confidence || 70;

    /* ───────── IMPROVED MEDICAL LOGIC ───────── */

    if (data.diarrhea && data.dehydration && data.unsafeWater && data.days >= 2) {
      disease = "Cholera";
    }
    else if (data.fever && data.stomachPain && data.days >= 3 && data.unsafeWater) {
      disease = "Typhoid";
    }
    else if (data.diarrhea && data.days <= 2 && !data.dehydration) {
      disease = "Diarrhea";
    }
    else if (data.vomiting && data.stomachPain && data.days <= 2) {
      disease = "Food Poisoning";
    }

    /* ───────── MEDICAL RISK SCORING ───────── */

    let score = 0;

    if (data.diarrhea) score += 2;
    if (data.vomiting) score += 1;
    if (data.fever) score += 2;
    if (data.stomachPain) score += 1;
    if (data.dehydration) score += 3;

    if (data.days >= 3) score += 2;
    if (data.days >= 5) score += 3;

    if (data.unsafeWater) score += 2;
    if (villageRisk > 70) score += 2;

    let level, advice;

    if (score >= 10) {
      level = "high";
      advice = "🚨 High risk. Immediate medical attention required.";
    }
    else if (score >= 5) {
      level = "moderate";
      advice = "⚠ Moderate risk. Consult doctor within 24 hours.";
    }
    else {
      level = "low";
      advice = "✅ Low risk. Rest, hydrate, and monitor symptoms.";
    }

    /* ───────── SAVE USER DATA (SIMULATED LEARNING) ───────── */

    let history = JSON.parse(localStorage.getItem("patientHistory")) || [];

    history.push({
      symptoms: data,
      disease: disease,
      risk: level
    });

    localStorage.setItem("patientHistory", JSON.stringify(history));

    /* ───────── UI OUTPUT ───────── */

    const result = document.getElementById('symptomResult');

    result.className = `result-panel show ${level}`;

    result.innerHTML = `
      <div style="font-weight:700;font-size:1.2rem;">
        ${level.toUpperCase()} RISK
      </div>

      <div>🦠 Disease: <b>${disease}</b></div>
      <div>📍 Village: <b>${village}</b></div>
      <div>📊 Village Risk: <b>${villageRisk}%</b></div>
      <div>📈 Confidence: <b>${confidence}%</b></div>

      <div style="margin-top:8px;">
        ${advice}
      </div>

      ${
        level !== 'low'
          ? `
          <div style="margin-top:10px;background:#fff;padding:10px;border-radius:10px;">
            <b>ORS:</b> 1L water + 6 tsp sugar + ½ tsp salt
          </div>
          `
          : ''
      }
    `;

  } catch (err) {

    console.error(err);

    document.getElementById('symptomResult').innerHTML =
      "<span style='color:red'>Server error ❌</span>";
  }
}