class User {
  constructor(userData) {
    this.name = userData.name;
    this.address = userData.address;
    this.email = userData.email;
    this.strideLength = userData.strideLength;
    this.dailyStepGoal = userData.dailyStepGoal;
    this.friends = userData.friends;
  }
}
//userData is the parameter
export default User;

// should have a paramter to take in userData object
// object property key for each of the keys in the userData object
// "id","name","address","email","strideLength","dailyStepGoal","friends"
// getFirstName(); method to return first name
