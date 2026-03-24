document
  .getElementById("predictBtn")
  .addEventListener("click", predictOutbreak);

async function predictOutbreak() {

  const rainfall =
    parseFloat(document.getElementById("rainfall").value) || 0;

  const diarrhea =
    parseFloat(document.getElementById("diarrhea").value) || 0;

  const cholera =
    parseFloat(document.getElementById("cholera").value) || 0;

  const typhoid =
    parseFloat(document.getElementById("typhoid").value) || 0;

  const population = 12000;

  const date =
    document.getElementById("reportDate").value;

  if (!date) {
    alert("Select date");
    return;
  }

  const d = new Date(date);

  const month = d.getMonth() + 1;
  const year = d.getFullYear();

  try {

    const response = await fetch(
      "https://jalrakshak-xntn.onrender.com/predict",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          rainfall,
          diarrhea,
          cholera,
          typhoid,
          population,
          month,
          year
        })
      }
    );

    const result = await response.json();

    const prob = result.percent;
    const risk = result.risk;

    let cssClass = "low";

    if (risk === "HIGH") cssClass = "high";
    else if (risk === "MODERATE") cssClass = "moderate";

    const resultBox =
      document.getElementById("predictionResult");

    resultBox.style.display = "block";

    resultBox.className =
      "prediction-result " + cssClass;

    resultBox.innerHTML = `
      <div class="prob-big">${prob}%</div>
      <div class="risk-badge-big">${risk} Risk</div>
      <div>AI Predicted Outbreak Risk</div>
    `;

  }
  catch (err) {

    alert("Backend not running");

  }

}