document
.getElementById("predictBtn")
.addEventListener(
"click",
predictOutbreak
);

const tableBody=
document.getElementById(
"historyTableBody"
);

const clearBtn=
document.getElementById(
"clearHistory"
);

loadHistory();


async function predictOutbreak(){

const village=
document.getElementById(
"villageName"
).value;

const rainfall=
parseFloat(
document.getElementById(
"rainfall"
).value
)||0;

const diarrhea=
parseFloat(
document.getElementById(
"diarrhea"
).value
)||0;

const cholera=
parseFloat(
document.getElementById(
"cholera"
).value
)||0;

const typhoid=
parseFloat(
document.getElementById(
"typhoid"
).value
)||0;

const population=12000;

const date=
document.getElementById(
"reportDate"
).value;


if(!date){
alert("Select date");
return;
}

if(!village){
alert("Select village");
return;
}

const d=new Date(date);

const month=
d.getMonth()+1;

const year=
d.getFullYear();


try{

const response=
await fetch(
"https://jalrakshak-akth.onrender.com/predict",
{
method:"POST",
headers:{
"Content-Type":
"application/json"
},
body:JSON.stringify({
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

const result=
await response.json();

const prob=result.percent;
const risk=result.risk;

let cssClass="low";

if(risk==="HIGH")
cssClass="high";

else if(
risk==="MODERATE"
)
cssClass="moderate";


const resultBox=
document.getElementById(
"predictionResult"
);

resultBox.style.display=
"block";

resultBox.className=
"prediction-result "+
cssClass;

resultBox.innerHTML=`
<div class="prob-big">
${prob}%
</div>

<div class="risk-badge-big">
${risk} Risk
</div>

<div>
AI Predicted Outbreak Risk
</div>
`;


/* NEW TABLE UPDATE */

const rowData={
date,
village,
diarrhea,
cholera,
typhoid,
rainfall,
risk
};

addRow(rowData);
saveRow(rowData);


}

catch(err){

alert(
"Backend not running"
);

}

}



/* ---------- TABLE FUNCTIONS ---------- */

function addRow(data){

const row=
document.createElement(
"tr"
);

let riskClass=
"risk-low";

if(
data.risk==="MODERATE"
){
riskClass=
"risk-medium";
}

if(
data.risk==="HIGH"
){
riskClass=
"risk-high";
}


row.innerHTML=`
<td>${data.date}</td>
<td>${data.village}</td>
<td>${data.diarrhea}</td>
<td>${data.cholera}</td>
<td>${data.typhoid}</td>
<td>${data.rainfall}</td>

<td>
<span class="${riskClass}">
${data.risk}
</span>
</td>

<td>
<button class="delete-btn">
Delete
</button>
</td>
`;


row
.querySelector(
".delete-btn"
)
.addEventListener(
"click",
function(){

row.remove();

removeRow(data);

}
);

tableBody.prepend(row);

}



/* local storage save */

function saveRow(row){

let history=
JSON.parse(
localStorage.getItem(
"caseHistory"
)
)||[];

history.push(row);

localStorage.setItem(
"caseHistory",
JSON.stringify(
history
)
);

}


/* load on refresh */

function loadHistory(){

let history=
JSON.parse(
localStorage.getItem(
"caseHistory"
)
)||[];

history.forEach(
addRow
);

}


/* remove one row */

function removeRow(target){

let history=
JSON.parse(
localStorage.getItem(
"caseHistory"
)
)||[];


history=
history.filter(
r=>!(
r.date===
target.date &&
r.village===
target.village &&
r.diarrhea===
target.diarrhea &&
r.cholera===
target.cholera &&
r.typhoid===
target.typhoid
)
);


localStorage.setItem(
"caseHistory",
JSON.stringify(
history
)
);

}



/* clear all */

if(clearBtn){

clearBtn.addEventListener(
"click",
function(){

if(
confirm(
"Clear all records?"
)
){

localStorage.removeItem(
"caseHistory"
);

tableBody.innerHTML=
"";

}

}
);

}