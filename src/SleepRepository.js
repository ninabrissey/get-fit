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

export default SleepRepository;
