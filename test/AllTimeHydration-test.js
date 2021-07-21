import { expect } from 'chai';
import AllTimeHydration from '../src/AllTimeHydration';
import DailyHydration from '../src/DailyHydration';
import { hydrationData } from '../src/data/users';

describe('AllTimeHydration', () => {
  let allTimeHydration;
  let hydrationData2;

  beforeEach(() => {
    allTimeHydration = new AllTimeHydration(hydrationData);
  });

  it('should be a function', () => {
    expect(AllTimeHydration).to.be.a('function');
  });

  it('should be an instance of AllTimeHydration', () => {
    expect(allTimeHydration).to.be.instanceOf(AllTimeHydration);
  });

  it("should start with an array of all user's hydration data", () => {
    expect(allTimeHydration.allUsersHydration).to.be.a('array');
    expect(allTimeHydration.allUsersHydration[7].numOunces).to.equal(30);
  });

  it('should start with an empty individual user hydration array', () => {
    expect(allTimeHydration.individualHydration).to.be.a('array');
  });

  it('should be able populate user array with dailyHydration objects for that user', () => {
    allTimeHydration.getIndividualHydration(1);

    const isAllSame = allTimeHydration.individualHydration.every(
      (day) => day.id === 1
    );

    expect(allTimeHydration.individualHydration[0]).to.be.instanceOf(
      DailyHydration
    );
    expect(isAllSame).to.equal(true);
  });

  it("should be able to calculate an individual's average daily ounces", () => {
    allTimeHydration.getIndividualHydration(1);

    let average = allTimeHydration.calculateAvgOunces();

    expect(average).to.equal(54);
  });

  it('should be able to return daily ounces for a seven day period', () => {
    allTimeHydration.getIndividualHydration(1);

    const weeksHydration = allTimeHydration.getWeeklyHydration('2019/06/15');

    expect(weeksHydration[3]).to.deep.equal({
      id: 1,
      date: '2019/06/12',
      numOunces: 56,
    });
  });

  it('should be able to return daily ounces for a different seven day period', () => {
    allTimeHydration.getIndividualHydration(2);

    const weeksHydration = allTimeHydration.getWeeklyHydration('2019/06/14');

    expect(weeksHydration[1]).to.deep.equal({
      id: 2,
      date: '2019/06/09',
      numOunces: 20,
    });
  });

  it('should return the daily ounces array even if the length of the array is less than seven', () => {
    hydrationData2 = [
      {
        userID: 1,
        date: '2019/06/15',
        numOunces: 37,
      },
      {
        userID: 2,
        date: '2019/06/15',
        numOunces: 50,
      },
      {
        userID: 1,
        date: '2019/06/14',
        numOunces: 47,
      },
      {
        userID: 2,
        date: '2019/06/14',
        numOunces: 80,
      },
      {
        userID: 1,
        date: '2019/06/13',
        numOunces: 75,
      },
    ];
    allTimeHydration = new AllTimeHydration(hydrationData2);
    allTimeHydration.getIndividualHydration(1);

    const lessThanWeekHydration =
      allTimeHydration.getWeeklyHydration('2019/06/13');

    expect(lessThanWeekHydration).to.deep.equal([
      {
        id: 1,
        date: '2019/06/15',
        numOunces: 37,
      },
      {
        id: 1,
        date: '2019/06/14',
        numOunces: 47,
      },
      {
        id: 1,
        date: '2019/06/13',
        numOunces: 75,
      },
    ]);
  });

  it('should be handle data for an incomplete week', () => {
    allTimeHydration.getIndividualHydration(2);

    const lessThanWeekHydration =
      allTimeHydration.getWeeklyHydration('2019/06/08');

    expect(lessThanWeekHydration[1].numOunces).to.deep.equal(36);
  });

  it('should be able to report daily hydration and average hydration', () => {
    allTimeHydration.getIndividualHydration(1);

    const report = allTimeHydration.reportDailyHydration('2019/06/15');

    expect(report).to.deep.equal({ ounces: 37, average: 54 });
  });
});
