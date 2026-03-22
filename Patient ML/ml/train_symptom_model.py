import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib


# =========================
# Load dataset
# =========================

data = pd.read_csv("../dataset/symptom_dataset.csv")

print("Dataset loaded")
print(data.head())


# =========================
# Features
# =========================

X = data[[
    "diarrhea",
    "vomiting",
    "fever",
    "stomachPain",
    "dehydration",
    "weakness",
    "unsafeWater",
    "othersSick",
    "days",
    "villageRisk"
]]

y = data["disease"]


# =========================
# Split
# =========================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)


# =========================
# Model
# =========================

model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)


# =========================
# Train
# =========================

model.fit(X_train, y_train)


# =========================
# Accuracy
# =========================

accuracy = model.score(X_test, y_test)

print("Accuracy:", accuracy)


# =========================
# Save model
# =========================

joblib.dump(model, "symptom_model.pkl")

print("Model saved as symptom_model.pkl")