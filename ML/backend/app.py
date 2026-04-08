from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import os

app = Flask(__name__)
CORS(app)

# Load models
model = joblib.load("model.pkl")
symptom_model = joblib.load("symptom_model.pkl")


@app.route("/")
def home():
    return "Flask API running"


# =====================================================
# ADMIN PREDICTION (FINAL MEDICAL LOGIC VERSION)
# =====================================================

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.json

        rainfall = float(data["rainfall"])
        diarrhea = float(data["diarrhea"])
        cholera = float(data["cholera"])
        typhoid = float(data["typhoid"])
        population = float(data["population"])
        month = float(data["month"])
        year = float(data["year"])

        total_cases = diarrhea + cholera + typhoid

        # Disease weight
        disease_score = (
            diarrhea * 1 +
            typhoid * 1.6 +
            cholera * 2.2
        )

        # Incidence per population
        incidence_score = 0
        if population > 0:
            incidence = total_cases / population

            if incidence > 0.05:
                incidence_score = 25
            elif incidence > 0.02:
                incidence_score = 15
            elif incidence > 0.01:
                incidence_score = 8
            else:
                incidence_score = 2

        # Rainfall factor
        rain_factor = 1.0
        if rainfall > 350:
            rain_factor = 1.35
        elif rainfall > 250:
            rain_factor = 1.25
        elif rainfall > 150:
            rain_factor = 1.15
        elif rainfall > 80:
            rain_factor = 1.05

        # Season factor
        season_factor = 1.0
        if month in [5, 6, 7, 8, 9]:
            season_factor = 1.2

        # Severity factor
        severity_factor = 1.0

        if total_cases >= 50:
            severity_factor += 0.15
        if total_cases >= 100:
            severity_factor += 0.25
        if total_cases >= 150:
            severity_factor += 0.35

        if cholera >= 5:
            severity_factor += 0.2
        if cholera >= 15:
            severity_factor += 0.35

        if typhoid >= 10:
            severity_factor += 0.1
        if typhoid >= 30:
            severity_factor += 0.25

        # Raw score
        raw_score = disease_score + incidence_score
        raw_score *= rain_factor
        raw_score *= season_factor
        raw_score *= severity_factor

        # Scaling
        percent = raw_score / 3
        percent = 100 * (percent / (percent + 70))
        percent = round(percent, 2)

        # Risk classification
        if percent < 20:
            risk = "LOW"
        elif percent < 50:
            risk = "MODERATE"
        else:
            risk = "HIGH"

        return jsonify({
            "risk": risk,
            "percent": percent
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        })


# =====================================================
# PATIENT MODEL
# =====================================================

@app.route("/predict_disease", methods=["POST"])
def predict_disease():
    try:
        data = request.json

        features = np.array([[
            float(data["diarrhea"]),
            float(data["vomiting"]),
            float(data["fever"]),
            float(data["stomachPain"]),
            float(data["dehydration"]),
            float(data["weakness"]),
            float(data["unsafeWater"]),
            float(data["othersSick"]),
            float(data["days"]),
            float(data["villageRisk"])
        ]])

        prediction = symptom_model.predict(features)[0]
        prob = symptom_model.predict_proba(features)[0]
        confidence = max(prob)

        return jsonify({
            "disease": prediction,
            "confidence": round(confidence * 100, 2)
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        })


# =====================================================
# IMPORTANT FOR DEPLOYMENT
# =====================================================

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)