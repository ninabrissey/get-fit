// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********
// An example of how you tell webpack to use a JS file
import userData from './data/users';
import UserRepository from './UserRepository';
import User from './User';

// An example of how you tell webpack to use a CSS file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/running.png';

// console.log('This is the JavaScript entry file - your code begins here.');

// global variables 👇
// instantiate UserRepo
const userRepo = new UserRepository(userData);
let currentUser;

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
function loadUserData() {
  userRepo.instantiateAllUsers();
  currentUser = userRepo.getUserInfo(45);
  displayProfileBox();
}

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
