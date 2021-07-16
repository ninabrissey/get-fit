import { expect } from 'chai';
import AllTimeHydration from '../src/AllTimeHydration';
import DailyHydration from '../src/DailyHydration';

describe('AllTimeHydration', () => {
  let allTimeHydration;
  let hydrationData;

  beforeEach(() => {
    hydrationData = [
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
      {
        userID: 2,
        date: '2019/06/13',
        numOunces: 100,
      },
      {
        userID: 1,
        date: '2019/06/12',
        numOunces: 56,
      },
      {
        userID: 2,
        date: '2019/06/12',
        numOunces: 28,
      },
      {
        userID: 1,
        date: '2019/06/11',
        numOunces: 49,
      },
      {
        userID: 2,
        date: '2019/06/11',
        numOunces: 39,
      },
      {
        userID: 1,
        date: '2019/06/10',
        numOunces: 30,
      },
      {
        userID: 2,
        date: '2019/06/10',
        numOunces: 29,
      },
      {
        userID: 1,
        date: '2019/06/09',
        numOunces: 64,
      },
      {
        userID: 2,
        date: '2019/06/09',
        numOunces: 20,
      },
      {
        userID: 1,
        date: '2019/06/08',
        numOunces: 48,
      },
      {
        userID: 2,
        date: '2019/06/08',
        numOunces: 36,
      },
      {
        userID: 1,
        date: '2019/06/07',
        numOunces: 76,
      },
      {
        userID: 2,
        date: '2019/06/07',
        numOunces: 87,
      },
    ];
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
    expect(allTimeHydration.allUsersHydration[7].numOunces).to.equal(28);
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
    // second method total of all ounces divided by length of array
    let average = allTimeHydration.calculateAvgOunces();
    //need to use Math.round
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
    //most recent date is last in the array
  });

  it.only('should be able to return daily ounces for a different seven day period', () => {
    allTimeHydration.getIndividualHydration(2);

    const weeksHydration = allTimeHydration.getWeeklyHydration('2019/06/09');

    expect(weeksHydration).to.deep.equal([87, 36, 20, 29, 39, 28, 100]);
    //most recent date is last in the array
  });

  it('should return the daily ounces array even if the length of the array is less than seven', () => {
    hydrationData = [
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
    //if the length of the array is less then 7 or less return the whole array
    allTimeHydration.getIndividualHydration(1);

    const weeksHydration = allTimeHydration.getWeeklyHydration('2019/06/14');

    expect(weeksHydration).to.deeply.equal([75, 47, 37]);
  });
});
