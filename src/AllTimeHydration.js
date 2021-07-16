import DailyHydration from './DailyHydration';

class AllTimeHydration {
  constructor(data) {
    this.allUsersHydration = data;
    this.individualHydration = [];
  }

  getIndividualHydration(id) {
    this.individualHydration = this.allUsersHydration.reduce(
      (array, element) => {
        let dailyHydration;
        if (element.userID === id) {
          dailyHydration = new DailyHydration(element);
          array.push(dailyHydration);
        }
        return array;
      },
      []
    );
  }

  calculateAvgOunces() {
    let total = 0;
    this.individualHydration.forEach((element) => {
      total += element.numOunces;
    });
    return Math.round(total / this.individualHydration.length);
  }

  getWeeklyHydration(date) {
    console.log(this.individualHydration);
    const i = this.individualHydration.findIndex(
      (element) => element.date === date
    );
    console.log(i);
    return this.individualHydration.slice(i, i + 7);
  }
}
//array of all users/all days this.allUsersHydration
//this.individualHydration

//method that finds all daily hydration for a single user by an id  and converts it to class objects and adds it to a property in the constructor
//method for single user's average over all time
// method returns an array of ounces for a seven day period (takes in a beginning date)

export default AllTimeHydration;
