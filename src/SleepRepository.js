import Sleep from './Sleep';

class SleepRepository {
  constructor(sleepData) {
    this.allSleeps = sleepData;
    this.individualsSleep = [];
  }

  getIndividualsSleep(id) {
    this.individualsSleep = this.allSleeps.reduce((accum, sleep) => {
      if (sleep.userID === id) {
        let nightlySleep = new Sleep(sleep);
        accum.push(nightlySleep);
      }
      return accum;
    }, []);
  }

  getOneSleep(date) {
    const oneNight = this.individualsSleep.find((sleep) => {
      return sleep.date === date;
    });

    return oneNight.hoursSlept;
  }

  calculateAvg(property) {
    const totaled = this.individualsSleep.reduce((total, sleep) => {
      return (total += sleep[property]);
    }, 0);

    return Number((totaled / this.individualsSleep.length).toFixed(1));
  }

  getSevenDays(date, property) {
    const dateIndex = this.individualsSleep.findIndex(
      (sleep) => sleep.date === date
    );
    const sevenDays = this.individualsSleep.slice(dateIndex, dateIndex + 7);
    return sevenDays.map((sleep) => sleep[property]);
  }

  getAvgSleepForAll() {
    const allSleep = this.allSleeps.reduce((total, sleep) => {
      return (total += sleep.hoursSlept);
    }, 0);
    return Number((allSleep / this.allSleeps.length).toFixed(1));
  }
}

/* 
For a user, their sleep quality for a specific day (identified by a date)
For a user, how many hours they slept for a specific day (identified by a date)

For a user (identified by their userID), the average number of hours slept per day

For a user, their average sleep quality per day over all time

For a user, their sleep quality each day over the course of a given week (7 days) - you should be able to calculate this for any week, not just the latest week

For a user, how many hours slept each day over the course of a given week (7 days) - you should be able to calculate this for any week, not just the latest week

For all users, the average sleep quality
*/
export default SleepRepository;

/* 
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
*/
