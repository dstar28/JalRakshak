from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib, os
import pandas as pd

app = Flask(__name__)
CORS(app)

# ===== LOAD MODEL =====
base_dir = os.path.dirname(__file__)

model_path = os.path.join(base_dir, "../ml/model.pkl")
scaler_path = os.path.join(base_dir, "../ml/scaler.pkl")

model = joblib.load(model_path)
scaler = joblib.load(scaler_path)

# ===== HOME ROUTE =====
@app.route("/")
def home():
    return "API Running"

# ===== PREDICT ROUTE =====
@app.route("/predict", methods=["POST"])
def predict():

    data = request.json

    # get inputs
    rainfall = float(data["rainfall"])
    diarrhea = float(data["diarrhea"])
    cholera = float(data["cholera"])
    typhoid = float(data["typhoid"])
    population = float(data["population"])
    month = float(data["month"])
    year = float(data["year"])

    # ===== FIXED INPUT FORMAT (NO WARNING) =====
    features = pd.DataFrame([{
        "rainfall": rainfall,
        "diarrhea": diarrhea,
        "cholera": cholera,
        "typhoid": typhoid,
        "population": population,
        "month": month,
        "year": year
    }])

    # scale input
    features_scaled = scaler.transform(features)

    # ML prediction
    prob = model.predict_proba(features_scaled)[0][1]

    # ===== WHO / RULE-BASED LOGIC =====

    # High risk triggers
    if cholera >= 8:
        prob = max(prob, 0.9)

    elif rainfall >= 180 and diarrhea >= 120:
        prob = max(prob, 0.85)

    elif diarrhea >= 100 and typhoid >= 25:
        prob = max(prob, 0.8)

    # Moderate risk triggers
    elif rainfall >= 100 and diarrhea >= 60:
        prob = max(prob, 0.6)

    elif 3 <= cholera < 8:
        prob = max(prob, 0.55)

    # ===== MINIMUM PROBABILITY FIX =====
    prob = max(prob, 0.05)   # ensures no 0%

    return jsonify({
        "outbreakProbability": round(prob * 100, 2)
    })

# ===== RUN SERVER =====
if __name__ == "__main__":
    app.run(debug=True)