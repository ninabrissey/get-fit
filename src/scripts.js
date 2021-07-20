// scripts 👇
import UserRepository from './UserRepository';
import AllTimeHydration from './AllTimeHydration';
import SleepRepository from './SleepRepository';
import ActivityRepository from './ActivityRepository';
import getAllData from './apiCalls';
// import domUpdates from './domUpdates';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import {
  makeWeeklyHydrationChart,
  makeDailyHydrationChart,
  makeNightsSleepChart,
  makeNightsQualityChart,
  makeWeeksSleepChart,
} from './chartDisplays';

// styling 👇
import './css/styles.css';

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
const dailyActivityContainer = document.getElementById(
  'dailyActivityContainer'
);

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

    const stats = hydrationStats.individualHydration;
    const todaysDate = stats[stats.length - 1].date;

    displayProfileBox(); //DOM
    displayDailyHydration(todaysDate);
    displayWeeklyHydration(todaysDate);
    displayDailySleepStats(todaysDate);
    displayWeeklySleep(todaysDate);
    displayDailyActivity(todaysDate);
  });
}

const getRandomUser = (userArray) => {
  const numOfUsers = userArray.length;
  return Math.ceil(Math.random() * numOfUsers - 1);
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
  return activityInfo;
};

// dom updates 👇
const displayProfileBox = () => {
  const friendNames = currentUser.friends.reduce((friendList, friendNumber) => {
    let firstName = userRepo.allUsers[friendNumber - 1].getFirstName();
    friendList.push(firstName);
    return friendList;
  }, []);
  let splitAddress = currentUser.address.split(', ');
  let friendsDisplay = friendNames.join(', ');

  userInfo.innerHTML = `
    <div class="user-info-div">
      <h2 class="user-greeting" id="userGreeting">Hi, ${currentUser.getFirstName()}!</h2>
      <p id="address">Address: ${splitAddress[0]}<br>${splitAddress[1]}</p>
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
  const miles = activity.calculateMiles(currentUser.strideLength);

  dailyActivityContainer.innerHTML = `
    <div class="steps-container daily-activity-div">
      <img class="icon" src="./images/footsteps-silhouette-variant.png" alt="foot steps">
      <h3>${activity.numSteps} steps</h3>
    </div>
    <div class="minutes-containter daily-activity-div">
      <img class="icon" src="./images/minutes.png" alt="stop watch">
      <h3>${activity.minutesActive} minutes</h3>
    </div>
    <div class="miles-container daily-activity-div">
      <img class="icon" src="./images/miles.png" alt="miles tile">
      <h3>${miles} miles</h3>
    </div>
    <div class="flights-container daily-activity-div">
      <img class="icon" src="./images/stairs.png" alt="stairs">
      <h3>${activity.flightsOfStairs} flights</h3>
    </div>`;
};
