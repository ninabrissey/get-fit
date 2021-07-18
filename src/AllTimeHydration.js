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
    const i = this.individualHydration.findIndex(
      (element) => element.date === date
    );

    if (i < 7) {
      return this.individualHydration.slice(0, i + 1);
    }
    return this.individualHydration.slice(i - 6, i + 1);
  }
}

export default AllTimeHydration;
