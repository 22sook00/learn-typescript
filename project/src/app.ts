//JS Docs : ts check 하면 자바스크립트 파일을 타입스크립트가 적용된것과 같은 효과를 줄 수 있다. ts 랭귀지서버가 돈다.
//JS Docs 사용하는 이유 : ts 로 바로 들어가기 전 try 해보는 용도로 쓰기 좋지만 ts 만큼 코드적 효율이 좋진 않다.
//ts 의 가장 큰장점 : 실무에서도 api interface 정의하는게 가장 큰장점으로 볼 수 있다. 백엔드와의 인터페이스 약속규정에 있어 중요.

//@ts-check

// utils
function $(selector:string) {
  return document.querySelector(selector);
}
function getUnixTimestamp(date:any) {
  return new Date(date).getTime();
}

// DOM
// Element > HTMLElement > HTMLParagraphElement(HTMLSpanElement 등의 구체화된 태그들.) 순으로 내려가는 형태.
var a : Element | HTMLElement | HTMLParagraphElement;
//HTML 에서 span 태그로 되어있기 때문에 HTMLSpanElement 로 타입단언을 해준다. -> 반복된다면 제네릭같이, 유틸함수로 만들수도있음.
const confirmedTotal = $('.confirmed-total') as HTMLSpanElement;
//innerText/innerHTML Element 없다는 오류 나타날 시 달러표시로 접근해서 나타난 오류이다. 
//오른쪽의 결과의 타입이 어떤것인지 판단해줘야함.  -> 타입단언 as -> 진짜 이해 하나도안감.
//HTML 에서 p 태그이기 때문에 HTMLParagraphElement를 적용해준다. 
const deathsTotal= $('.deaths') as HTMLParagraphElement ;
const recoveredTotal = $('.recovered') as HTMLParagraphElement ;
const lastUpdatedTime = $('.last-updated-time') as HTMLParagraphElement ;
const rankList = $('.rank-list');
const deathsList = $('.deaths-list');
const recoveredList = $('.recovered-list');
const deathSpinner = createSpinnerElement('deaths-spinner');
const recoveredSpinner = createSpinnerElement('recovered-spinner');

function createSpinnerElement(id:any) {
  const wrapperDiv = document.createElement('div');
  wrapperDiv.setAttribute('id', id);
  wrapperDiv.setAttribute(
    'class',
    'spinner-wrapper flex justify-center align-center',
  );
  const spinnerDiv = document.createElement('div');
  spinnerDiv.setAttribute('class', 'ripple-spinner');
  spinnerDiv.appendChild(document.createElement('div'));
  spinnerDiv.appendChild(document.createElement('div'));
  wrapperDiv.appendChild(spinnerDiv);
  return wrapperDiv;
}

// state
let isDeathLoading = false;
let isRecoveredLoading = false;

//typedef : 타입스크립트의 타입별칭같은 역할
/**
 * @typedef {object} CovidSummary
 * @property {Array<object>} Country
 */

// api
// 타입스크립트라면 Promise에 제네릭타입으로 사용가능하지만 js Doc 은 다음과 같이 사용가능하다.
// cmd + d 치면 사용할코드로 이동! 
/** 
 * @returns {Promise<CovidSummary>}
*/

//!axios, chart 라이브러리에 대한 타입지정.
function fetchCovidSummary() {
  const url = 'https://api.covid19api.com/summary';
  return axios.get(url);
}
// params enum -> 특정값의 집합. interface 로 안한이유??
enum CovidStatus {
  Confirmed = 'confirmed',
  Recovered = 'recovered',
  Deaths = 'deaths'
}

// interface CovidStatus {
//   Confirmed : number,
//   Recovered : number,
//   Deaths : number,
// }
//api 형태 :: https://api.covid19api.com/live/country/south-africa/status/confirmed
function fetchCountryInfo(countryCode:string, status:CovidStatus) {
  // params: confirmed, recovered, deaths
  const url = `https://api.covid19api.com/country/${countryCode}/status/${status}`;
  return axios.get(url);
}

// methods
function startApp() {
  setupData();
  initEvents();
}

// events
function initEvents() {
  rankList.addEventListener('click', handleListClick);
}

async function handleListClick(event:any) {
  let selectedId;
  if (
    event.target instanceof HTMLParagraphElement ||
    event.target instanceof HTMLSpanElement
  ) {
    selectedId = event.target.parentElement.id;
  }
  if (event.target instanceof HTMLLIElement) {
    selectedId = event.target.id;
  }
  if (isDeathLoading) {
    return;
  }
  clearDeathList();
  clearRecoveredList();
  startLoadingAnimation();
  isDeathLoading = true;
  const { data: deathResponse } = await fetchCountryInfo(selectedId,CovidStatus.Deaths);
  const { data: recoveredResponse } = await fetchCountryInfo(
    selectedId,
    CovidStatus.Recovered,
  );
  const { data: confirmedResponse } = await fetchCountryInfo(
    selectedId,
    CovidStatus.Confirmed,
  );
  endLoadingAnimation();
  setDeathsList(deathResponse);
  setTotalDeathsByCountry(deathResponse);
  setRecoveredList(recoveredResponse);
  setTotalRecoveredByCountry(recoveredResponse);
  setChartData(confirmedResponse);
  isDeathLoading = false;
}

function setDeathsList(data:any) {
  const sorted = data.sort(
    (a:any, b:any) => getUnixTimestamp(b.Date) - getUnixTimestamp(a.Date),
  );
  sorted.forEach(value => {
    const li = document.createElement('li');
    li.setAttribute('class', 'list-item-b flex align-center');
    const span = document.createElement('span');
    span.textContent = value.Cases;
    span.setAttribute('class', 'deaths');
    const p = document.createElement('p');
    p.textContent = new Date(value.Date).toLocaleDateString().slice(0, -1);
    li.appendChild(span);
    li.appendChild(p);
    deathsList.appendChild(li);
  });
}

function clearDeathList() {
  deathsList.innerHTML = null;
}

function setTotalDeathsByCountry(data:any) {
  deathsTotal.innerText = data[0].Cases;
}

function setRecoveredList(data:any) {
  const sorted = data.sort(
    (a:any, b:any) => getUnixTimestamp(b.Date) - getUnixTimestamp(a.Date),
  );
  sorted.forEach(value => {
    const li = document.createElement('li');
    li.setAttribute('class', 'list-item-b flex align-center');
    const span = document.createElement('span');
    span.textContent = value.Cases;
    span.setAttribute('class', 'recovered');
    const p = document.createElement('p');
    p.textContent = new Date(value.Date).toLocaleDateString().slice(0, -1);
    li.appendChild(span);
    li.appendChild(p);
    recoveredList.appendChild(li);
  });
}

function clearRecoveredList() {
  recoveredList.innerHTML = null;
}

function setTotalRecoveredByCountry(data:any) {
  recoveredTotal.innerText = data[0].Cases;
}

function startLoadingAnimation() {
  deathsList.appendChild(deathSpinner);
  recoveredList.appendChild(recoveredSpinner);
}

function endLoadingAnimation() {
  deathsList.removeChild(deathSpinner);
  recoveredList.removeChild(recoveredSpinner);
}

async function setupData() {
  const { data } = await fetchCovidSummary();
  setTotalConfirmedNumber(data);
  setTotalDeathsByWorld(data);
  setTotalRecoveredByWorld(data);
  setCountryRanksByConfirmedCases(data);
  setLastUpdatedTimestamp(data);
}

function renderChart(data:any, labels:any) {
  var ctx = $('#lineChart').getContext('2d');
  Chart.defaults.global.defaultFontColor = '#f5eaea';
  Chart.defaults.global.defaultFontFamily = 'Exo 2';
  new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Confirmed for the last two weeks',
          backgroundColor: '#feb72b',
          borderColor: '#feb72b',
          data,
        },
      ],
    },
    options: {},
  });
}

function setChartData(data:any) {
  const chartData = data.slice(-14).map(value => value.Cases);
  const chartLabel = data
    .slice(-14)
    .map(value => new Date(value.Date).toLocaleDateString().slice(5, -1));
  renderChart(chartData, chartLabel);
}

function setTotalConfirmedNumber(data:any) {
  confirmedTotal.innerText = data.Countries.reduce(
    (total:any, current:any) => (total += current.TotalConfirmed),
    0,
  );
}

function setTotalDeathsByWorld(data:any) {
  deathsTotal.innerText = data.Countries.reduce(
    (total:any, current:any) => (total += current.TotalDeaths),
    0,
  );
}

function setTotalRecoveredByWorld(data:any) {
  recoveredTotal.innerText = data.Countries.reduce(
    (total:any, current:any) => (total += current.TotalRecovered),
    0,
  );
}

function setCountryRanksByConfirmedCases(data:any) {
  const sorted = data.Countries.sort(
    (a:any, b:any) => b.TotalConfirmed - a.TotalConfirmed,
  );
  sorted.forEach(value => {
    const li = document.createElement('li');
    li.setAttribute('class', 'list-item flex align-center');
    li.setAttribute('id', value.Slug);
    const span = document.createElement('span');
    span.textContent = value.TotalConfirmed;
    span.setAttribute('class', 'cases');
    const p = document.createElement('p');
    p.setAttribute('class', 'country');
    p.textContent = value.Country;
    li.appendChild(span);
    li.appendChild(p);
    rankList.appendChild(li);
  });
}

function setLastUpdatedTimestamp(data:any) {
  lastUpdatedTime.innerText = new Date(data.Date).toLocaleString();
}

startApp();
