document.addEventListener('DOMContentLoaded', () => {
  renderHistoricalTable();
  document.getElementById('predictBtn')
    .addEventListener('click', generatePrediction);
});

/* Historical Table */

function renderHistoricalTable() {
  const tbody = document.getElementById('historyTableBody');
  if (!tbody) return;

  historicalCaseData.forEach(row => {
    tbody.innerHTML += `
      <tr>
        <td>${row.date}</td>
        <td><strong>${row.village}</strong></td>
        <td>${row.diarrhea}</td>
        <td>${row.cholera}</td>
        <td>${row.typhoid}</td>
        <td>${row.rainfall} mm</td>
        <td><span class="risk-pill ${row.risk}">${row.risk}</span></td>
      </tr>`;
  });
}

/* AI Prediction */

function generatePrediction() {

  const diarrhea = parseFloat(document.getElementById('diarrhea').value) || 0;
  const cholera  = parseFloat(document.getElementById('cholera').value)  || 0;
  const typhoid  = parseFloat(document.getElementById('typhoid').value)  || 0;
  const rainfall = parseFloat(document.getElementById('rainfall').value) || 0;

  const score = Math.min(100, Math.round(
    (diarrhea * 2.5) +
    (cholera * 8) +
    (typhoid * 4) +
    (rainfall * 0.3) +
    (Math.random() * 10)
  ));

  let level, label;

  if (score >= 65) {
    level = 'high';
    label = 'HIGH RISK';
  }
  else if (score >= 35) {
    level = 'moderate';
    label = 'MODERATE RISK';
  }
  else {
    level = 'low';
    label = 'LOW RISK';
  }

  const resultEl = document.getElementById('predictionResult');
  resultEl.className = `prediction-result ${level}`;
  resultEl.style.display = 'block';

  resultEl.innerHTML = `
    <div class="prob-label">Outbreak Probability</div>
    <div class="prob-big">${score}%</div>
    <div class="risk-badge-big">${label}</div>
    <p style="margin-top:.75rem;opacity:.9;font-size:.9rem">
      ${
        level === 'high'
        ? 'Immediate intervention required. Alert district health authorities.'
        : level === 'moderate'
        ? 'Increase surveillance and conduct water quality checks.'
        : 'Situation stable. Continue routine monitoring.'
      }
    </p>
  `;

  resultEl.scrollIntoView({ behavior:'smooth', block:'center' });
}