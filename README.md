# JalRakshak – Smart Community Health Monitoring and Early Warning System

## Overview

JalRakshak is an AI and IoT-powered web application designed to monitor and predict water-borne disease outbreaks in rural communities. The system combines environmental data, machine learning, IoT sensor readings, and symptom-based disease prediction to help authorities and citizens take preventive action before outbreaks become severe.

The platform consists of an Admin Portal for monitoring disease risks and a Patient Portal that allows users to check possible diseases based on symptoms. A real-time dashboard provides outbreak trends, risk analysis, and health alerts.

---

## Features

### Admin Portal

* Secure Admin Login
* Outbreak Prediction using Machine Learning
* Risk Score Calculation
* Disease Trend Analysis
* Real-Time Dashboard
* Health Alerts Generation
* Village-wise Risk Monitoring

### Patient Portal

* Symptom-Based Disease Prediction
* Risk Assessment
* Basic Medical Guidance
* Easy-to-use Interface

### Dashboard

* Disease Statistics
* Outbreak Probability
* Risk Distribution
* Historical Trends
* Environmental Data Visualization

### IoT Integration

* Water Quality Monitoring
* Turbidity Sensor
* TDS Sensor
* Arduino-based Data Collection
* Real-time Sensor Readings

---

## Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript
* Bootstrap

### Backend

* Python
* Flask

### Machine Learning

* Scikit-learn
* Random Forest Classifier
* Pandas
* NumPy

### IoT

* Arduino UNO
* TDS Sensor
* Turbidity Sensor
* 16x2 LCD Display (I2C)

### Deployment

* Render
* Firebase Hosting

---

## Project Architecture

```
IoT Sensors
     │
     ▼
Arduino UNO
     │
     ▼
Flask Backend API
     │
     ├────────► Machine Learning Model
     │              │
     │              ▼
     │       Outbreak Prediction
     │
     ▼
Database
     │
     ▼
Dashboard / Admin Portal / Patient Portal
```

---

## Machine Learning Models

### 1. Outbreak Prediction Model

Predicts the probability of disease outbreaks using:

* Rainfall
* Turbidity
* TDS
* Diarrhea Cases
* Cholera Cases
* Typhoid Cases
* Population

**Algorithm Used**

* Random Forest Classifier

---

### 2. Symptom Prediction Model

Predicts possible diseases based on user symptoms.

Example symptoms:

* Fever
* Vomiting
* Diarrhea
* Abdominal Pain
* Nausea
* Weakness
* Headache

---

## IoT Hardware

| Component        | Purpose                         |
| ---------------- | ------------------------------- |
| Arduino UNO      | Microcontroller                 |
| Turbidity Sensor | Measures water clarity          |
| TDS Sensor       | Measures Total Dissolved Solids |
| LCD Display      | Displays live readings          |
| Breadboard       | Circuit Connections             |
| Jumper Wires     | Connections                     |

---

## Folder Structure

```
JalRakshak/
│
├── backend/
│   ├── app.py
│   ├── outbreak_model.pkl
│   ├── symptom_model.pkl
│   ├── requirements.txt
│   └── dataset.csv
│
├── frontend/
│   ├── index.html
│   ├── admin.html
│   ├── patient.html
│   ├── dashboard.html
│   ├── css/
│   ├── js/
│   └── assets/
│
├── iot/
│   ├── ArduinoCode.ino
│   └── SensorConnections.pdf
│
├── screenshots/
│
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/yourusername/JalRakshak.git
cd JalRakshak
```

---

### Create Virtual Environment

```bash
python -m venv venv
```

Activate

Windows

```bash
venv\Scripts\activate
```

Linux/Mac

```bash
source venv/bin/activate
```

---

### Install Dependencies

```bash
pip install -r requirements.txt
```

---

### Run Flask Server

```bash
python app.py
```

Server will start at

```
http://127.0.0.1:5000
```

---

## API Endpoints

### Predict Outbreak

```
POST /predict
```

Sample Request

```json
{
    "rainfall": 250,
    "turbidity": 7,
    "tds": 480,
    "diarrhea": 30,
    "cholera": 6,
    "typhoid": 12,
    "population": 5200
}
```

Sample Response

```json
{
    "risk": "High",
    "probability": "87%",
    "predictedDisease": "Cholera"
}
```

---

### Symptom Prediction

```
POST /symptom
```

Sample Request

```json
{
    "symptoms":[
        "Fever",
        "Vomiting",
        "Diarrhea"
    ]
}
```

Sample Response

```json
{
    "disease":"Typhoid",
    "risk":"Medium"
}
```

---

## Future Enhancements

* SMS Alert System
* Mobile Application
* GPS-based Disease Mapping
* Live IoT Data Streaming
* Cloud Database Integration
* Health Department Integration
* AI Chatbot for Medical Guidance
* Multi-language Support

---

## Screenshots

Add screenshots of:

* Home Page
* Admin Dashboard
* Patient Portal
* Prediction Results
* Dashboard Analytics
* IoT Prototype

---

## Team

**Project:** JalRakshak – Smart Community Health Monitoring and Early Warning System

Developed as an academic project to leverage Artificial Intelligence, Machine Learning, and IoT for early detection and prevention of water-borne disease outbreaks in rural communities.

---

## License

This project is developed for educational and research purposes. Feel free to use and modify it with proper attribution.
