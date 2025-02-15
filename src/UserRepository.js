import User from '../src/User';

class UserRepository {
  constructor(data) {
    this.allUsers = data;
  }

  instantiateAllUsers() {
    let users = this.allUsers.map((user) => {
      let userInfo = new User(user);
      return userInfo;
    });
    this.allUsers = users;
  }

  getUserInfo(userId) {
    return this.allUsers.find((user) => {
      if (user.id === userId) {
        return user;
      }
    });
  }

  calculateAverageStepGoal() {
    let totalStepGoals = this.allUsers.reduce((total, user) => {
      total += user.dailyStepGoal;
      return total;
    }, 0);
    return Math.round(totalStepGoals / this.allUsers.length);
  }
}

export default UserRepository;
