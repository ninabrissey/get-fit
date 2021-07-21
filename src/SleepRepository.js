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

  getSevenDays(date) {
    const i = this.individualsSleep.findIndex((sleep) => sleep.date === date);

    if (i < 7) {
      return this.individualsSleep.slice(0, i + 1);
    }
    return this.individualsSleep.slice(i - 6, i + 1);
  }

  getAvgSleepForAll() {
    const allSleep = this.allSleeps.reduce((total, sleep) => {
      return (total += sleep.hoursSlept);
    }, 0);
    return Number((allSleep / this.allSleeps.length).toFixed(1));
  }

  reportNightlySleep(date, property) {
    const night = this.individualsSleep.find((sleep) => sleep.date === date);
    const avg = this.calculateAvg(property);

    return { date: date.slice(6, 10), value: night[property], average: avg };
  }

  reportWeeklySleep(date, property) {
    const week = this.getSevenDays(date);
    const weeksSleep = week.map((day) => {
      return { date: day.date, [property]: day[property] };
    });

    return weeksSleep;
  }
}

export default SleepRepository;
