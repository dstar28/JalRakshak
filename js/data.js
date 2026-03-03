const villagesData = [
  // ASSAM
  { village:"Majuli", lat:26.95, lng:94.15, rainfall:120, diarrhea:14, cholera:3, typhoid:5,  population:12400, riskScore:78, outbreakProbability:72 },
  { village:"Dibrugarh", lat:27.48, lng:94.90, rainfall:90, diarrhea:7, cholera:1, typhoid:3,  population:18700, riskScore:42, outbreakProbability:38 },
  { village:"Dhemaji", lat:27.48, lng:94.57, rainfall:145, diarrhea:19, cholera:6, typhoid:8, population:9800, riskScore:91, outbreakProbability:87 },
  { village:"Jorhat", lat:26.75, lng:94.20, rainfall:80, diarrhea:9, cholera:2, typhoid:4, population:22000, riskScore:55, outbreakProbability:51 },
  { village:"Tinsukia", lat:27.49, lng:95.36, rainfall:110, diarrhea:11, cholera:2, typhoid:6, population:16500, riskScore:63, outbreakProbability:59 },

  // MEGHALAYA
  { village:"Shillong", lat:25.57, lng:91.88, rainfall:130, diarrhea:15, cholera:4, typhoid:6, population:14300, riskScore:82, outbreakProbability:76 },
  { village:"Tura", lat:25.51, lng:90.22, rainfall:140, diarrhea:18, cholera:5, typhoid:7, population:8700, riskScore:89, outbreakProbability:84 },

  // ARUNACHAL PRADESH
  { village:"Itanagar", lat:27.08, lng:93.61, rainfall:100, diarrhea:10, cholera:2, typhoid:4, population:15200, riskScore:58, outbreakProbability:54 },
  { village:"Pasighat", lat:28.07, lng:95.33, rainfall:160, diarrhea:22, cholera:7, typhoid:9, population:7600, riskScore:95, outbreakProbability:91 },

  // MANIPUR
  { village:"Imphal", lat:24.82, lng:93.95, rainfall:95, diarrhea:8, cholera:1, typhoid:3, population:19800, riskScore:46, outbreakProbability:41 },
  { village:"Thoubal", lat:24.63, lng:94.01, rainfall:115, diarrhea:13, cholera:3, typhoid:5, population:10200, riskScore:68, outbreakProbability:62 },

  // MIZORAM
  { village:"Aizawl", lat:23.73, lng:92.72, rainfall:125, diarrhea:16, cholera:4, typhoid:6, population:12100, riskScore:79, outbreakProbability:74 },
  { village:"Lunglei", lat:22.88, lng:92.73, rainfall:135, diarrhea:17, cholera:5, typhoid:7, population:6400, riskScore:85, outbreakProbability:80 },

  // TRIPURA
  { village:"Agartala", lat:23.83, lng:91.28, rainfall:105, diarrhea:12, cholera:2, typhoid:4, population:17400, riskScore:61, outbreakProbability:57 },
  { village:"Udaipur", lat:23.53, lng:91.48, rainfall:150, diarrhea:20, cholera:6, typhoid:8, population:8300, riskScore:92, outbreakProbability:88 },

  // NAGALAND
  { village:"Kohima", lat:25.67, lng:94.11, rainfall:98, diarrhea:9, cholera:2, typhoid:3, population:11200, riskScore:49, outbreakProbability:44 },
  { village:"Dimapur", lat:25.91, lng:93.73, rainfall:118, diarrhea:14, cholera:3, typhoid:5, population:21000, riskScore:71, outbreakProbability:66 }
];

const diseaseTrendData = {
  labels:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
  diarrhea:[6,8,10,15,22,30,38,35,28,18,12,9],
  cholera:[0,1,1,3,5,8,12,10,6,3,1,1],
  typhoid:[2,3,4,6,9,14,18,16,12,8,4,3]
};

const rainfallData = {
  labels:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
  rainfall:[40,55,70,120,180,250,310,290,210,150,90,60],
  cases:[10,12,15,22,35,52,68,60,48,30,18,14]
};

const predictionData = {
  labels:["Week 1","Week 2","Week 3","Week 4","Week 5","Week 6","Week 7","Week 8"],
  actual:[14,18,21,30,40,55,62,58],
  predicted:[16,17,23,28,42,50,65,60]
};

const historicalCaseData = [
  { date:"2024-05-01", village:"Majuli", diarrhea:8, cholera:2, typhoid:3, rainfall:95, risk:"Moderate" },
  { date:"2024-05-08", village:"Pasighat", diarrhea:18, cholera:5, typhoid:7, rainfall:150, risk:"High" },
  { date:"2024-05-15", village:"Shillong", diarrhea:12, cholera:3, typhoid:4, rainfall:120, risk:"Moderate" },
  { date:"2024-05-22", village:"Imphal", diarrhea:6, cholera:1, typhoid:2, rainfall:85, risk:"Low" },
  { date:"2024-05-29", village:"Agartala", diarrhea:15, cholera:3, typhoid:5, rainfall:110, risk:"Moderate" },
  { date:"2024-06-05", village:"Lunglei", diarrhea:17, cholera:5, typhoid:6, rainfall:135, risk:"High" }
];