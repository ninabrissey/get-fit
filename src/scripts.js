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
const allUsers = new UserRepository(userData);
// instantiate Jennie via getUserInfo(45);
const currentUser = allUsers.getUserInfo(45);

// query selectors 👇
const userGreeting = document.getElementById('userGreeting');
const address = document.getElementById('address');
const email = document.getElementById('email');
const stepGoal = document.getElementById('stepGoals');
const strideLength = document.getElementById('strideLength');
const friend1 = document.getElementById('friend1');
const friend2 = document.getElementById('friend2');
const friend3 = document.getElementById('friend3');

// event listeners 👇

// functions: handlers and helpers 👇

// We are writing all of this as if our frined Jennie has signed in the app

// determine how the initial page display is activated (as a page load listener?)
// initial display -->
//
