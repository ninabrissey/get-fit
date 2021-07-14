// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
// An example of how you tell webpack to use a JS file
import userData from './data/users';
import UserRepository from './UserRepository';
import User from './User';
import getAllData from './apiCalls';
// import domUpdates from './domUpdates';

// An example of how you tell webpack to use a CSS file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/running.png';

// console.log('This is the JavaScript entry file - your code begins here.');

//FETCH CALL 1

// const printData = () => {
//   apiData1.then((a) => {
//     console.log(a);
//     return a;
//   });
// };

// let check = printData();
// console.log(check);

// global variables 👇
// instantiate UserRepo
let currentUser;
let userRepo; /* = new UserRepository(userData); */
let fetchSleepData;

// query selectors 👇
const userGreeting = document.getElementById('userGreeting');
const address = document.getElementById('address');
const email = document.getElementById('email');
const stepGoal = document.getElementById('stepGoal');
const strideLength = document.getElementById('strideLength');
const friend1 = document.getElementById('friend1');
const friend2 = document.getElementById('friend2');
const friend3 = document.getElementById('friend3');

// event listeners 👇
window.addEventListener('load', loadUserData);

// functions: handlers and helpers 👇
function getData() {
  fetch('http://localhost:3001/api/v1/users')
    .then((response) => response.json())
    .then((data) => {
      userRepo = new UserRepository(data.userData);
      userRepo.instantiateAllUsers();
      currentUser = userRepo.getUserInfo(45);
      displayProfileBox();
      // console.log(userRepo);
      // // return userRepo;
    });
  // return userRepo;
  // .catch((err) => console.log('oh butts'));
}

function loadUserData() {
  getAllData().then((data) => {
    userRepo = new UserRepository(data[0].userData);
    console.log(userRepo);
    //userRepo = new UserRepository(data.userData);
    userRepo.instantiateAllUsers();
    currentUser = userRepo.getUserInfo(45);
    displayProfileBox();
  });
  // getData();
  // userRepo.instantiateAllUsers();
  // currentUser = userRepo.getUserInfo(45);
  // displayProfileBox();
}

console.log('check', userRepo);

function displayProfileBox() {
  userGreeting.innerText = currentUser.getFirstName();
  address.innerText = currentUser.address;
  email.innerText = currentUser.email;
  stepGoal.innerText = currentUser.dailyStepGoal;
  strideLength.innerText = currentUser.strideLength;
  friend1.innerText = userRepo.allUsers[currentUser.friends[0]].getFirstName();
  friend2.innerText = userRepo.allUsers[currentUser.friends[1]].getFirstName();
  friend3.innerText = userRepo.allUsers[currentUser.friends[2]].getFirstName();
}
