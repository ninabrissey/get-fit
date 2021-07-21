import { expect } from 'chai';
import SleepRepository from '../src/SleepRepository';
import Sleep from '../src/Sleep';
import { allSleepData } from '../src/data/users';

describe('SleepRepository', () => {
  let sleepRepo;

  beforeEach(() => {
    sleepRepo = new SleepRepository(allSleepData);
  });

  it('should be a function', () => {
    expect(SleepRepository).to.be.a('function');
  });

  it('should be an instance of SleepRepository', () => {
    expect(sleepRepo).to.be.instanceOf(SleepRepository);
  });

  it('should hold an array of all user sleep data', () => {
    expect(sleepRepo.allSleeps).to.be.a('array');
  });

  it('should start with an empty individual user sleep array', () => {
    expect(sleepRepo.individualsSleep).to.deep.equal([]);
  });

  it('should be able to populate the individual user array with instance of Sleep', () => {
    sleepRepo.getIndividualsSleep(1);

    expect(sleepRepo.individualsSleep[0]).to.be.instanceOf(Sleep);
  });

  it('should be able return how many hours an individual slept on a given date', () => {
    sleepRepo.getIndividualsSleep(1);

    const sleepReport = sleepRepo.getOneSleep('2019/06/14');

    expect(sleepReport).to.equal(10.8);
  });

  it('should be able to return the number of hours slept for a different date', () => {
    sleepRepo.getIndividualsSleep(2);

    const sleepReport = sleepRepo.getOneSleep('2019/06/13');

    expect(sleepReport).to.equal(9.6);
  });

  it('should be able to return the average number of hours an individual user slept', () => {
    sleepRepo.getIndividualsSleep(1);

    const avgSleep = sleepRepo.calculateAvg('hoursSlept');

    expect(avgSleep).to.equal(6.6);
  });

  it('should should be able to return the average sleep quality score for an individual user', () => {
    sleepRepo.getIndividualsSleep(1);

    const avgScore = sleepRepo.calculateAvg('sleepQuality');

    expect(avgScore).to.equal(3.5);
  });

  it("should be able to return a week's worth of data", () => {
    sleepRepo.getIndividualsSleep(1);

    const weekOfSleep = sleepRepo.getSevenDays('2019/06/15');

    expect(weekOfSleep[0]).to.deep.equal({
      id: 1,
      date: '2019/06/09',
      hoursSlept: 5,
      sleepQuality: 2.5,
    });
    expect(weekOfSleep.length).to.equal(7);
  });

  it('should be able to handle an incomplete data for a selected 7 days', () => {
    sleepRepo.getIndividualsSleep(1);

    const lessThanAWeek = sleepRepo.getSevenDays('2019/06/10');

    expect(lessThanAWeek[0]).to.deep.equal({
      id: 1,
      date: '2019/06/08',
      hoursSlept: 5,
      sleepQuality: 3.6,
    });
    expect(lessThanAWeek.length).to.equal(3);
  });

  it('should be able to return the average sleep quality of all user over all time', () => {
    const everyoneAvg = sleepRepo.getAvgSleepForAll();

    expect(everyoneAvg).to.equal(7.1);
  });

  it("should be able to report a night's sleep and average", () => {
    sleepRepo.getIndividualsSleep(1);

    const night = sleepRepo.reportNightlySleep('2019/06/08', 'hoursSlept');

    expect(night).to.deep.equal({ date: '6/08', value: 5, average: 6.6 });
  });

  it("should be able to report a week's worth of sleep", () => {
    sleepRepo.getIndividualsSleep(1);

    const week = sleepRepo.reportWeeklySleep('2019/06/15', 'hoursSlept');

    expect(week[0]).to.deep.equal({ date: '2019/06/09', hoursSlept: 5 });
  });
});
