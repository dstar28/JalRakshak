import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler


data = pd.read_csv("../dataset/ne_rural_dataset.csv")

X = data[[
    "rainfall",
    "diarrhea",
    "cholera",
    "typhoid",
    "population",
    "month",
    "year"
]]

y = data["outbreak"]


X_train, X_test, y_train, y_test = train_test_split(
    X, y,
    test_size=0.2,
    random_state=42
)


model = Pipeline([
    ("scaler", StandardScaler()),
    ("rf", RandomForestClassifier(
        n_estimators=600,
        max_depth=15,
        random_state=42
    ))
])

model.fit(X_train, y_train)

print("Accuracy:", model.score(X_test, y_test))

joblib.dump(model, "model.pkl")

print("model saved")