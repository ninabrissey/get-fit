// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
// An example of how you tell webpack to use a JS file
import userData from './data/users';
import UserRepository from './UserRepository';
import User from './User';
import AllTimeHydration from './AllTimeHydration';
import SleepRepository from './SleepRepository';
import getAllData from './apiCalls';
import chartDisplays from './chartDisplays';
import {
  makeWeeklyHydrationChart,
  makeDailyHydrationChart,
} from './chartDisplays';
// import domUpdates from './domUpdates';

// An example of how you tell webpack to use a CSS file
import './css/styles.css';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/running.png';

// console.log('This is the JavaScript entry file - your code begins here.');

// global variables 👇

let currentUser;
let userRepo;
let hydrationStats;
let sleepStats;
//let fetchSleepData;

// query selectors 👇
const userGreeting = document.getElementById('userGreeting');
const address = document.getElementById('address');
const email = document.getElementById('email');
const stepGoal = document.getElementById('stepGoal');
const strideLength = document.getElementById('strideLength');
const friend1 = document.getElementById('friend1');
const friend2 = document.getElementById('friend2');
const friend3 = document.getElementById('friend3');
const dailyWater = document.getElementById('dailyWater');
const weeklyWater = document.getElementById('weeklyWater');
const sleepReport = document.getElementById('sleepReport');
const weeklySleep = document.getElementById('weeklySleep');
const dailyActivity = document.getElementById('dailyActivity');
const weeklyActivity = document.getElementById('weeklyActivity');
const extraBox = document.getElementById('extraBox');

// event listeners 👇
window.addEventListener('load', loadUserData);

// functions: handlers and helpers 👇
function loadUserData() {
  getAllData().then((data) => {
    //this is retrieving the array of data array from Promise.all in apiCalls.js
    const userID = getRandomUser(data[0].userData);

    getCurrentUser(data[0].userData, userID);
    instantiateHydration(data[1].hydrationData, userID);
    instantiateSleep(data[2].sleepData, userID);

    displayProfileBox(); //DOM
    displayDailyHydration('2020/01/22');
    displayWeeklyHydration('2020/01/22');
    displayDailySleepStats('2019/06/15');
    //displayWeeklySleep('2019/06/15')
  });
}

function getRandomUser(userArray) {
  const numOfUsers = userArray.length;
  return Math.ceil(Math.random() * numOfUsers);
}

/* INSTANTIATIONS */

function getCurrentUser(parsedData, user) {
  userRepo = new UserRepository(parsedData);
  userRepo.instantiateAllUsers();
  currentUser = userRepo.getUserInfo(user);
}

function instantiateHydration(parsedData, user) {
  hydrationStats = new AllTimeHydration(parsedData);
  hydrationStats.getIndividualHydration(user);
}

function instantiateSleep(parsedData, user) {
  sleepStats = new SleepRepository(parsedData);
  sleepStats.getIndividualsSleep(user);
}

//

function reportDailyHydration(date) {
  const day = hydrationStats.individualHydration.find(
    (element) => element.date === date
  );
  const avg = hydrationStats.calculateAvgOunces();

  return { ounces: day.numOunces, average: avg };
}

// function reportWeeklyHydration(date) {
//   return hydrationStats.getWeeklyHydration(date);
// }

function reportNightlySleep(date, property) {
  const night = sleepStats.individualsSleep.find(
    (sleep) => sleep.date === date
  );
  const avg = sleepStats.calculateAvg(property);

  return { date: date, value: night[property], average: avg };
}

function reportWeeksSleep(date) {}

/* DOM Manipulation */
function displayProfileBox() {
  userGreeting.innerText = currentUser.getFirstName();
  address.innerText = currentUser.address;
  email.innerText = currentUser.email;
  stepGoal.innerText = currentUser.dailyStepGoal;
  strideLength.innerText = currentUser.strideLength;
  friend1.innerText = userRepo.allUsers[currentUser.friends[0]].getFirstName();
  friend2.innerText = userRepo.allUsers[currentUser.friends[1]].getFirstName();
  //friend3.innerText = userRepo.allUsers[currentUser.friends[2]].getFirstName();
}

function displayDailyHydration(date) {
  const report = reportDailyHydration(date);
  makeDailyHydrationChart(report);
}

function displayWeeklyHydration(date) {
  const report = hydrationStats.getWeeklyHydration(date);
  makeWeeklyHydrationChart(report);
}

/* ---------- */
function displayDailySleepStats(date) {
  // will make to report objects using reportNightlySleep()
  const hoursSlept = reportNightlySleep(date, 'hoursSlept');
  const sleepQuality = reportNightlySleep(date, 'sleepQuality');

  console.log(hoursSlept); //remove after chart added
  console.log(sleepQuality);
  //make 2 charts
  //one for night's sleep vs avg // makeNightsSleepChart(hoursSlept);
  //one for night's score vs avg  // makeNightsQualityChart(sleepQuality)
}

function displayWeeklySleep(date) {
  // will use the getSevenDays method to
}

// Charts!!
function makeNightsSleepChart() {}

function makeNigthsQualityChart() {}
