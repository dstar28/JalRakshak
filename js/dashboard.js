// dashboard.js

document.addEventListener('DOMContentLoaded', () => {
  renderRiskCards();
  initMap();
  renderTrendChart();
  renderRainfallChart();
  renderPredictionChart();
});

/* ─────────────────────────────────────────────
   Risk Level Helpers
───────────────────────────────────────────── */

function getRiskLevel(score) {
  if (score >= 70) return 'high-risk';
  if (score >= 40) return 'moderate-risk';
  return 'low-risk';
}

function getRiskLabel(score) {
  if (score >= 70) return 'High';
  if (score >= 40) return 'Moderate';
  return 'Low';
}

/* ─────────────────────────────────────────────
   Risk Score Cards
───────────────────────────────────────────── */

function renderRiskCards() {
  const container = document.getElementById('riskCards');
  if (!container) return;

  container.innerHTML = '';

  villagesData.forEach(v => {
    const levelClass = getRiskLevel(v.riskScore);
    const label = getRiskLabel(v.riskScore);

    container.innerHTML += `
      <div class="col-md-6 col-lg-4 col-xl-3">
        <div class="risk-card ${levelClass}">
          
          <div class="risk-badge">${label} Risk</div>
          
          <div class="village-name">
            ${v.village}
          </div>

          <div class="risk-score">
            ${v.riskScore}
          </div>

          <div class="risk-label">
            Risk Score / 100
          </div>

          <div class="mini-stats">
            <div><strong>Diarrhea:</strong> ${v.diarrhea}</div>
            <div><strong>Rainfall:</strong> ${v.rainfall} mm</div>
            <div><strong>Population:</strong> ${v.population.toLocaleString()}</div>
          </div>

        </div>
      </div>
    `;
  });
}

/* ─────────────────────────────────────────────
   Leaflet Map
───────────────────────────────────────────── */

function initMap() {
  const map = L.map('map').setView([27.1, 94.6], 8);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  villagesData.forEach(v => {

    const level = getRiskLevel(v.riskScore);

    const color =
      level === 'high-risk' ? '#dc2626' :
      level === 'moderate-risk' ? '#f59e0b' :
      '#10b981';

    const marker = L.circleMarker([v.lat, v.lng], {
      radius: 16,
      fillColor: color,
      color: '#ffffff',
      weight: 2,
      fillOpacity: 0.85
    }).addTo(map);

    marker.bindPopup(`
      <div style="font-family: DM Sans; font-size:14px;">
        <strong style="font-size:15px;">${v.village}</strong><br/>
        <span><strong>Risk Score:</strong> ${v.riskScore}</span><br/>
        <span><strong>Outbreak Probability:</strong> ${v.outbreakProbability}%</span><br/><br/>
        <span>Diarrhea: ${v.diarrhea}</span><br/>
        <span>Cholera: ${v.cholera}</span><br/>
        <span>Typhoid: ${v.typhoid}</span><br/>
        <span>Rainfall: ${v.rainfall} mm</span><br/>
        <span>Population: ${v.population.toLocaleString()}</span>
      </div>
    `);
  });
}

/* ─────────────────────────────────────────────
   Disease Trend Chart
───────────────────────────────────────────── */

function renderTrendChart() {
  const ctx = document.getElementById('trendChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: diseaseTrendData.labels,
      datasets: [
        {
          label: 'Diarrhea',
          data: diseaseTrendData.diarrhea,
          borderColor: '#dc2626',
          backgroundColor: 'rgba(220,38,38,.1)',
          tension: 0.4,
          fill: true
        },
        {
          label: 'Cholera',
          data: diseaseTrendData.cholera,
          borderColor: '#f59e0b',
          backgroundColor: 'rgba(245,158,11,.1)',
          tension: 0.4,
          fill: true
        },
        {
          label: 'Typhoid',
          data: diseaseTrendData.typhoid,
          borderColor: '#0f766e',
          backgroundColor: 'rgba(15,118,110,.1)',
          tension: 0.4,
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      plugins: { legend: { position: 'top' } },
      scales: { y: { beginAtZero: true } }
    }
  });
}

/* ─────────────────────────────────────────────
   Rainfall vs Cases Chart
───────────────────────────────────────────── */

function renderRainfallChart() {
  const ctx = document.getElementById('rainfallChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: rainfallData.labels,
      datasets: [
        {
          label: 'Rainfall (mm)',
          data: rainfallData.rainfall,
          backgroundColor: 'rgba(15,118,110,.7)',
          yAxisID: 'y'
        },
        {
          label: 'Total Cases',
          data: rainfallData.cases,
          borderColor: '#dc2626',
          backgroundColor: 'rgba(220,38,38,.15)',
          type: 'line',
          yAxisID: 'y1',
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      plugins: { legend: { position: 'top' } },
      scales: {
        y: {
          beginAtZero: true,
          title: { display: true, text: 'Rainfall (mm)' }
        },
        y1: {
          beginAtZero: true,
          position: 'right',
          title: { display: true, text: 'Cases' },
          grid: { drawOnChartArea: false }
        }
      }
    }
  });
}

/* ─────────────────────────────────────────────
   Predicted vs Actual Chart
───────────────────────────────────────────── */

function renderPredictionChart() {
  const ctx = document.getElementById('predictionChart');
  if (!ctx) return;

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: predictionData.labels,
      datasets: [
        {
          label: 'Actual Cases',
          data: predictionData.actual,
          borderColor: '#10b981',
          backgroundColor: 'rgba(16,185,129,.1)',
          tension: 0.4,
          fill: true
        },
        {
          label: 'AI Prediction',
          data: predictionData.predicted,
          borderColor: '#0f766e',
          borderDash: [6, 3],
          tension: 0.4,
          fill: false
        }
      ]
    },
    options: {
      responsive: true,
      plugins: { legend: { position: 'top' } },
      scales: { y: { beginAtZero: true } }
    }
  });
}