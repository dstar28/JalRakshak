document.getElementById("predictBtn").addEventListener("click", predictOutbreak);

async function predictOutbreak() {

  console.log("Button clicked");

  // get values
  const rainfall = parseFloat(document.getElementById("rainfall").value) || 0;
  const diarrhea = parseFloat(document.getElementById("diarrhea").value) || 0;
  const cholera = parseFloat(document.getElementById("cholera").value) || 0;
  const typhoid = parseFloat(document.getElementById("typhoid").value) || 0;

  const population = 12000;
  const date = document.getElementById("reportDate").value;

  // validation
  if (!date) {
    alert("Please select a date");
    return;
  }

  const d = new Date(date);
  const month = d.getMonth() + 1;
  const year = d.getFullYear();

  try {

    const response = await fetch("http://127.0.0.1:5000/predict", {
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
    });

    const result = await response.json();

    console.log("API Response:", result);

    const prob = result.outbreakProbability;

    // determine risk level
    let risk = "Low";
    let cssClass = "low";

    if (prob > 70) {
      risk = "High";
      cssClass = "high";
    } else if (prob > 40) {
      risk = "Moderate";
      cssClass = "moderate";
    }

    // update UI
    const resultBox = document.getElementById("predictionResult");

    resultBox.style.display = "block";
    resultBox.className = "prediction-result " + cssClass;

    resultBox.innerHTML = `
      <div class="prob-big">${prob}%</div>
      <div class="risk-badge-big">${risk} Risk</div>
      <div>AI Predicted Outbreak Probability</div>
    `;

  } catch (error) {
    console.error("Error:", error);
    alert("❌ Unable to connect to backend. Make sure Flask is running.");
  }
}