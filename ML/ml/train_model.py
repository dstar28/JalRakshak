import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import StandardScaler
import joblib, os

base_dir = os.path.dirname(__file__)
data_path = os.path.join(base_dir, "../dataset/ne_rural_dataset.csv")

data = pd.read_csv(data_path)

X = data[[
    "rainfall","diarrhea","cholera",
    "typhoid","population","month","year"
]]

y = data["outbreak"]

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

model = RandomForestClassifier(n_estimators=300, random_state=42)
model.fit(X_scaled,y)

joblib.dump(model, os.path.join(base_dir,"model.pkl"))
joblib.dump(scaler, os.path.join(base_dir,"scaler.pkl"))

print("Model trained & saved")