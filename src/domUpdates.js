// scripts 👇
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
import {
  makeWeeklyHydrationChart,
  makeDailyHydrationChart,
  makeNightsSleepChart,
  makeNightsQualityChart,
  makeWeeksSleepChart,
} from './chartDisplays';

// global variables 👇
import {
  currentUser,
  userRepo,
  hydrationStats,
  sleepStats,
  activityStats,
} from './scripts.js';

// query selectors 👇
const userInfo = document.getElementById('userInfo');
const dailyActivityContainer = document.getElementById(
  'dailyActivityContainer'
);
const weeksWaterInput = document.getElementById('weekWaterInput');

export const displayAllData = () => {
  const stats = hydrationStats.individualHydration;
  const todaysDate = stats[stats.length - 1].date;

  displayProfileBox();
  displayDailyHydration(todaysDate);
  displayWeeklyHydration(todaysDate);
  displayDailySleepStats(todaysDate);
  displayWeeklySleep(todaysDate);
  displayDailyActivity(todaysDate);
};

// display functions 👇
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
  const report = hydrationStats.reportDailyHydration(date);
  makeDailyHydrationChart(report);
};

const displayWeeklyHydration = (date) => {
  const report = hydrationStats.getWeeklyHydration(date);
  makeWeeklyHydrationChart(report);
};

const displayDailySleepStats = (date) => {
  const hoursSlept = sleepStats.reportNightlySleep(date, 'hoursSlept');
  const sleepQuality = sleepStats.reportNightlySleep(date, 'sleepQuality');

  makeNightsSleepChart(hoursSlept);
  makeNightsQualityChart(sleepQuality);
};

const displayWeeklySleep = (date) => {
  const week = sleepStats.reportWeeklySleep(date, 'hoursSlept');

  makeWeeksSleepChart(week);
};

const displayDailyActivity = (date) => {
  const activity = activityStats.getDayActivity(date);
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
