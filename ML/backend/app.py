from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

# =========================
# ADMIN MODEL (DO NOT CHANGE)
# =========================

model = joblib.load("model.pkl")

@app.route("/")
def home():
    return "Flask API running"


@app.route("/predict", methods=["POST"])
def predict():

    data = request.json

    rainfall = data["rainfall"]
    diarrhea = data["diarrhea"]
    cholera = data["cholera"]
    typhoid = data["typhoid"]
    population = data["population"]
    month = data["month"]
    year = data["year"]

    features = np.array([[
        rainfall,
        diarrhea,
        cholera,
        typhoid,
        population,
        month,
        year
    ]])

    prob = model.predict_proba(features)[0][1]

    return jsonify({
        "outbreakProbability": round(prob * 100, 2)
    })


# =========================
# PATIENT ML MODEL (NEW PART)
# =========================

symptom_model = joblib.load("symptom_model.pkl")


@app.route("/predict_disease", methods=["POST"])
def predict_disease():

    try:

        data = request.json

        diarrhea = float(data["diarrhea"])
        vomiting = float(data["vomiting"])
        fever = float(data["fever"])
        stomachPain = float(data["stomachPain"])
        dehydration = float(data["dehydration"])
        weakness = float(data["weakness"])
        unsafeWater = float(data["unsafeWater"])
        othersSick = float(data["othersSick"])
        days = float(data["days"])
        villageRisk = float(data["villageRisk"])

        features = np.array([[
            diarrhea,
            vomiting,
            fever,
            stomachPain,
            dehydration,
            weakness,
            unsafeWater,
            othersSick,
            days,
            villageRisk
        ]])

        prediction = symptom_model.predict(features)[0]

        return jsonify({
            "disease": prediction
        })

    except Exception as e:

        return jsonify({
            "error": str(e)
        })


# =========================

if __name__ == "__main__":
    app.run(debug=True)