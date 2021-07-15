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
        numOunces: 75,
      },
      {
        userID: 1,
        date: '2019/06/14',
        numOunces: 47,
      },
      {
        userID: 2,
        date: '2019/06/14',
        numOunces: 37,
      },
      {
        userID: 1,
        date: '2019/06/13',
        numOunces: 75,
      },
      {
        userID: 2,
        date: '2019/06/13',
        numOunces: 47,
      },
      {
        userID: 1,
        date: '2019/06/12',
        numOunces: 37,
      },
      {
        userID: 2,
        date: '2019/06/12',
        numOunces: 75,
      },
      {
        userID: 1,
        date: '2019/06/11',
        numOunces: 47,
      },
      {
        userID: 2,
        date: '2019/06/11',
        numOunces: 37,
      },
      {
        userID: 1,
        date: '2019/06/10',
        numOunces: 75,
      },
      {
        userID: 2,
        date: '2019/06/10',
        numOunces: 47,
      },
      {
        userID: 1,
        date: '2019/06/09',
        numOunces: 37,
      },
      {
        userID: 2,
        date: '2019/06/09',
        numOunces: 75,
      },
      {
        userID: 1,
        date: '2019/06/08',
        numOunces: 47,
      },
      {
        userID: 2,
        date: '2019/06/08',
        numOunces: 37,
      },
      {
        userID: 1,
        date: '2019/06/07',
        numOunces: 75,
      },
      {
        userID: 2,
        date: '2019/06/07',
        numOunces: 47,
      },
    ];

    allTimeHydration = new AllTimeHydration();
  });

  it('should be a function', () => {
    expect(AllTimeHydration).to.be.a('function');
  });

  it('should be an instance of AllTimeHydration', () => {
    expect(allTimeHydration).to.be.instanceOf(AllTimeHydration);
  });

  it("should start with an array of all user's hydration data", () => {
    expect(allTimeHydration.allUsersHydration).to.be.a('array');
  });

  it('should start with an empty individual user hydration array', () => {
    expect(allTimeHydration.individualHydration).to.equal([]);
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
    // second method total of all ounces divided by length of array
    let average = allTimeHydration.calculateAvgOunces();

    expect(average).to.equal(53);
  });

  it('should be able to return daily ounces for a seven day period', () => {
    //third method
  });

  it('should be able to return daily ounces for a different seven day period', () => {});

  it('should always return an array with a length of seven', () => {});

  it('should', () => {});

  it('should', () => {});
});
