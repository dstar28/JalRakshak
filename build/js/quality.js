document.getElementById('water-form').addEventListener('submit', function(e) {
e.preventDefault();

const turbidityInput=parseFloat(
document.getElementById('turbidity').value
);

const tdsInput=parseFloat(
document.getElementById('tds').value
);

let turbidityNTU=Math.round(turbidityInput);
let tdsValue=Math.round(tdsInput);

analyzeWaterQuality(
turbidityNTU,
tdsValue
);

});


function analyzeWaterQuality(turbidity,tds){

const resultsPanel=
document.getElementById('results');

resultsPanel.style.display='block';

resultsPanel.classList.remove('fade-in');
void resultsPanel.offsetWidth;
resultsPanel.classList.add('fade-in');


const statusBadge=
document.getElementById('overall-status');

const turbidVal=
document.getElementById('turbidity-val');

const turbidDesc=
document.getElementById('turbidity-desc');

const turbidCard=
document.getElementById('turbidity-card');


const tdsVal=
document.getElementById('tds-val');

const tdsDesc=
document.getElementById('tds-desc');

const tdsCard=
document.getElementById('tds-card');


const insightsList=
document.getElementById('insights-list');


turbidVal.textContent=turbidity;
tdsVal.textContent=tds;

let insights=[];


/* reset */
turbidCard.className='metric-block';
tdsCard.className='metric-block';


/* Turbidity */

if(turbidity<=1){

turbidDesc.textContent='Excellent / Clear';
turbidDesc.className='assessment';
turbidCard.classList.add('metric-safe');

}

else if(turbidity<=5){

turbidDesc.textContent='Acceptable';
turbidDesc.className='assessment';
turbidCard.classList.add('metric-warning');

insights.push(
"Turbidity is acceptable (1-5 NTU), but water may not be perfectly clear."
);

}

else{

turbidDesc.textContent='Poor / Unsafe';
turbidDesc.className='assessment';
turbidCard.classList.add('metric-danger');

insights.push(
"Turbidity is >5 NTU. Water is cloudy and not recommended for drinking."
);

}



/* TDS */

if(tds<50){

tdsDesc.textContent=
'Very Low Mineral Content';

tdsCard.classList.add(
'metric-warning'
);

insights.push(
"TDS is very low (< 50 ppm). Water is demineralized and may lack essential minerals."
);

}

else if(tds<=150){

tdsDesc.textContent='Excellent';
tdsCard.classList.add('metric-safe');

}

else if(tds<=300){

tdsDesc.textContent='Good';
tdsCard.classList.add('metric-safe');

}

else if(tds<=500){

tdsDesc.textContent=
'Fair / Acceptable';

tdsCard.classList.add(
'metric-safe'
);

}

else if(tds<=1000){

tdsDesc.textContent='Permissible';

tdsCard.classList.add(
'metric-warning'
);

insights.push(
"TDS is high (500-1000 ppm). Drinkable, but may have a noticeable taste or cause scaling."
);

}

else{

tdsDesc.textContent='Unsuitable';

tdsCard.classList.add(
'metric-danger'
);

insights.push(
"TDS exceeds 1000 ppm. Unsuitable for drinking; purification is highly recommended."
);

}



/* OVERALL STATUS ONLY UPDATED */

if(
turbidity>5 ||
tds>1000
){

statusBadge.textContent=
'UNSAFE TO DRINK';

statusBadge.className=
'status-badge status-danger';

insights.unshift(
"❌ <strong>CRITICAL:</strong> Water parameters exceed safe limits. Do not consume without proper purification."
);

}

else if(
turbidity<=1 &&
tds>=50 &&
tds<=150
){

statusBadge.textContent=
'EXCELLENT / IDEAL';

statusBadge.className=
'status-badge status-safe';

insights.unshift(
"🌟 <strong>IDEAL:</strong> Water quality is excellent. Ideal for drinking with perfect clarity and optimal mineral content."
);

}

else if(
turbidity<=1 &&
tds>150 &&
tds<=300
){

statusBadge.textContent=
'GOOD QUALITY';

statusBadge.className=
'status-badge status-safe';

insights.unshift(
"✅ <strong>VERIFIED:</strong> Water quality is good and entirely safe for drinking."
);

}

else if(tds<50){

statusBadge.textContent=
'SAFE (DEMINERALIZED)';

statusBadge.className=
'status-badge status-warning';

insights.unshift(
"⚠️ <strong>NOTICE:</strong> Water is safe but has very low mineral content (Demineralized). It may lack essential dietary minerals."
);

}

else if(
tds>500 ||
turbidity>1
){

statusBadge.textContent=
'ACCEPTABLE / PERMISSIBLE';

statusBadge.className=
'status-badge status-warning';

insights.unshift(
"⚠️ <strong>NOTICE:</strong> Water is drinkable but quality is not optimal. It is within acceptable and permissible limits."
);

}

else{

statusBadge.textContent=
'SAFE TO DRINK';

statusBadge.className=
'status-badge status-safe';

insights.unshift(
"✅ <strong>VERIFIED:</strong> Water quality is within desirable limits and safe for consumption."
);

}


/* SAME TECHNICAL INSIGHTS */
insightsList.innerHTML=
insights.map(
i=>`<li>${i}</li>`
).join('');

}