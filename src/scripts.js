// scripts 👇
import UserRepository from './UserRepository';
import AllTimeHydration from './AllTimeHydration';
import SleepRepository from './SleepRepository';
import ActivityRepository from './ActivityRepository';
import {
  displayAllData,
  weeksWaterInput,
  displayUserSelectWeek,
} from './domUpdates';
import getAllData from './apiCalls';

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

// exports 👇
export { currentUser, userRepo, hydrationStats, sleepStats, activityStats };

// global variables 👇
let currentUser;
let userRepo;
let hydrationStats;
let sleepStats;
let activityStats;

// event listeners 👇
window.addEventListener('load', loadUserData);
weeksWaterInput.addEventListener('change', displayUserSelectWeek);

// handlers and helpers 👇
function loadUserData() {
  getAllData()
    .then((data) => {
      const userID = getRandomUser(data[0].userData);

      getCurrentUser(data[0].userData, userID);
      instantiateHydration(data[1].hydrationData, userID);
      instantiateSleep(data[2].sleepData, userID);
      instantiateActivity(data[3].activityData, userID);
    })
    .then(displayAllData);
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
