// scripts 👇
import userData from './data/users';
import UserRepository from './UserRepository';
import User from './User';
import AllTimeHydration from './AllTimeHydration';
import SleepRepository from './SleepRepository';
import getAllData from './apiCalls';
import ActivityRepository from './ActivityRepository';
// import domUpdates from './domUpdates';
import {
  makeWeeklyHydrationChart,
  makeDailyHydrationChart,
  makeNightsSleepChart,
  makeNightsQualityChart,
  makeWeeksSleepChart,
} from './chartDisplays';

// styling 👇
import './css/styles.css';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

// images 👇
import './images/running.png';
import './images/footsteps-silhouette-variant.png';
import './images/minutes.png';
import './images/miles.png';
import './images/stairs.png';
import './images/footsteps-silhouette-variant.png';
import './images/stride-length.png';
import './images/friends.png';

// global variables 👇
let currentUser;
let userRepo;
let hydrationStats;
let sleepStats;
let activityStats;

// query selectors 👇
const userInfo = document.getElementById('userInfo');

// event listeners 👇
window.addEventListener('load', loadUserData);

// handlers and helpers 👇
function loadUserData() {
  getAllData().then((data) => {
    const userID = getRandomUser(data[0].userData);

    getCurrentUser(data[0].userData, userID);
    instantiateHydration(data[1].hydrationData, userID);
    instantiateSleep(data[2].sleepData, userID);
    instantiateActivity(data[3].activityData, userID);

    displayProfileBox(); //DOM
    displayDailyHydration('2020/01/22');
    displayWeeklyHydration('2020/01/22');
    displayDailySleepStats('2020/01/19');
    displayWeeklySleep('2020/01/19');
    displayDailyActivity('2020/01/19');
  });
}

const getRandomUser = (userArray) => {
  const numOfUsers = userArray.length;
  return Math.ceil(Math.random() * numOfUsers);
};

// instantiations 👇
const getCurrentUser = (parsedData, user) => {
  userRepo = new UserRepository(parsedData);
  userRepo.instantiateAllUsers();
  currentUser = userRepo.getUserInfo(user);
};

const instantiateHydration = (parsedData, user) => {
  hydrationStats = new AllTimeHydration(parsedData);
  hydrationStats.getIndividualHydration(user);
};

const instantiateSleep = (parsedData, user) => {
  sleepStats = new SleepRepository(parsedData);
  sleepStats.getIndividualsSleep(user);
};

const instantiateActivity = (parsedData, user) => {
  activityStats = new ActivityRepository(parsedData);
  activityStats.getUserActivities(user);
};

// reports 👇
const reportDailyHydration = (date) => {
  const day = hydrationStats.individualHydration.find(
    (element) => element.date === date
  );
  const avg = hydrationStats.calculateAvgOunces();

  return { ounces: day.numOunces, average: avg };
};

const reportNightlySleep = (date, property) => {
  const night = sleepStats.individualsSleep.find(
    (sleep) => sleep.date === date
  );
  const avg = sleepStats.calculateAvg(property);

  return { date: date.slice(6, 10), value: night[property], average: avg };
};

const reportWeeklySleep = (date, property) => {
  const week = sleepStats.getSevenDays(date);
  const weeksSleep = week.map((day) => {
    return { date: day.date, [property]: day[property] };
  });

  return weeksSleep;
};

const reportDailyActivity = (date) => {
  const activityInfo = activityStats.getDayActivity(date);
  console.log(activityInfo);
};

// dom updates 👇
const displayProfileBox = () => {
  const friendNames = currentUser.friends.reduce((friendList, friendNumber) => {
    let firstName = userRepo.allUsers[friendNumber - 1].getFirstName();
    friendList.push(firstName);
    return friendList;
  }, []);

  let friendsDisplay = friendNames.join(', ');

  userInfo.innerHTML = `
    <div class="user-info-div">
      <h2 class="user-greeting" id="userGreeting">Hi, ${currentUser.getFirstName()}!</h2>
      <p id="address">Address: ${currentUser.address}</p>
      <p id="email">Email: ${currentUser.email}</p>
      <div class="user-spec">
        <img class="mini-icon" src="./images/footsteps-silhouette-variant.png" alt="foot steps">
        <p id="stepGoal">Step Goal: ${currentUser.dailyStepGoal}</p>
      </div>
      <div class="user-spec">
        <img class="mini-icon" src="./images/stride-length.png" alt="foot steps">
        <p id="strideLength">Stride Length: ${currentUser.strideLength}</p>
      </div>
      <div class="user-spec">
        <img class="mini-icon" src="./images/friends.png" alt="friends">
        <p>Friends: ${friendsDisplay}</p>
      </div>
    </div>`;
};

const displayDailyHydration = (date) => {
  const report = reportDailyHydration(date);
  makeDailyHydrationChart(report);
};

const displayWeeklyHydration = (date) => {
  const report = hydrationStats.getWeeklyHydration(date);
  makeWeeklyHydrationChart(report);
};

const displayDailySleepStats = (date) => {
  const hoursSlept = reportNightlySleep(date, 'hoursSlept');
  const sleepQuality = reportNightlySleep(date, 'sleepQuality');

  makeNightsSleepChart(hoursSlept);
  makeNightsQualityChart(sleepQuality);
};

const displayWeeklySleep = (date) => {
  const week = reportWeeklySleep(date, 'hoursSlept');

  makeWeeksSleepChart(week);
};

const displayDailyActivity = (date) => {
  const activity = reportDailyActivity(date);
};
