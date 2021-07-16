import { expect } from 'chai';
import SleepRepository from '../src/SleepRepository';
import Sleep from '../src/Sleep';

describe('SleepRepository', () => {
  let sleepRepo;
  let allSleepData;

  beforeEach(() => {
    allSleepData = [
      { userID: 1, date: '2019/06/15', hoursSlept: 6.1, sleepQuality: 2.2 },
      { userID: 2, date: '2019/06/15', hoursSlept: 7, sleepQuality: 4.7 },
      { userID: 1, date: '2019/06/14', hoursSlept: 10.8, sleepQuality: 4.7 },
      { userID: 2, date: '2019/06/14', hoursSlept: 5.4, sleepQuality: 3 },
      { userID: 1, date: '2019/06/13', hoursSlept: 4.1, sleepQuality: 3.6 },
      { userID: 2, date: '2019/06/13', hoursSlept: 9.6, sleepQuality: 2.9 },
      { userID: 1, date: '2019/06/12', hoursSlept: 5.7, sleepQuality: 2.4 },
      { userID: 2, date: '2019/06/12', hoursSlept: 5, sleepQuality: 3.6 },
      { userID: 1, date: '2019/06/11', hoursSlept: 6.6, sleepQuality: 4.4 },
      { userID: 2, date: '2019/06/11', hoursSlept: 9.5, sleepQuality: 4.2 },
      { userID: 1, date: '2019/06/10', hoursSlept: 9.4, sleepQuality: 4.4 },
      { userID: 2, date: '2019/06/10', hoursSlept: 7.5, sleepQuality: 4.7 },
      { userID: 1, date: '2019/06/09', hoursSlept: 5, sleepQuality: 2.5 },
      { userID: 2, date: '2019/06/09', hoursSlept: 10.1, sleepQuality: 4.7 },
      { userID: 1, date: '2019/06/08', hoursSlept: 5, sleepQuality: 3.6 },
      { userID: 2, date: '2019/06/08', hoursSlept: 6.6, sleepQuality: 4.4 },
    ];

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

  it.skip('should be able return how many hours an individual slept on a given date', () => {
    const sleepReport = sleepRepo.getOneSleep(1, '2019/06/14');

    expect(sleepReport).to.equal(10.8);
  });

  it.skip('should be able to return the number of hours slept for a different date', () => {
    const sleepReport = sleepRepo.getOneSleep(2, '2019/06/13');

    expect(sleepReport).to.equal(9.6);
  });

  it.skip('should be able to return the average number of hours an individual user slept', () => {
    const avgSleep = sleepRepo.calculateAvgSleep(1);

    expect(avgSleep).to.equal(6.6);
  });

  it.skip('should should be able to return the average sleep quality score for an individual user', () => {
    const avgScore = sleepRepo.calculateAvgScore(1);

    expect(avgScore).to.equal(3.5);
  });

  it.skip("should be able to return a week's worth of hours slept", () => {
    const weekOfSleep = sleepRepo.getSevenDays(1, '2019/06/15', 'sleep');

    expect(weekOfSleep).to.deep.equal([6.1, 10.8, 4.1, 5.7, 6.6, 9.4, 5]);
  });

  it.skip('should be able to handle an incomplete data for a selected 7 days', () => {
    const lessThanAWeek = sleepRepo.getSevenDays(1, '2019/06/10', 'hoursSlept');

    expect(lessThanAWeek).to.deep.equal([9.4, 5, 5]);
  });

  it.skip("should be able to return a week's worth of sleep quality scores", () => {
    const weekOfScores = sleepRepo.getSevenDays(
      1,
      '2019/06/15',
      'sleepQuality'
    );

    expect(weekOfScores).to.deep.equal([2.2, 4.7, 3.6, 2.4, 4.4, 4.4, 2.5]);
  });

  it.skip('should be able to handle an incomplete data for a selected 7 days', () => {
    const lessThanAWeek = sleepRepo.getSevenDays(
      1,
      '2019/06/10',
      'sleepQuality'
    );

    expect(lessThanAWeek).to.deep.equal([4.4, 2.5, 3.6]);
  });

  it.skip('should be able to return the average sleep quality of all user over all time', () => {
    const everyoneAvg = sleepRepo.getAvgSleepForAll();

    expect(everyoneAvg).to.equal(7.1);
  });
});
