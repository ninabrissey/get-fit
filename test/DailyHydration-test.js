import { expect } from 'chai';
import DailyHydration from '../src/DailyHydration';

describe('DailyHydration', () => {
  let hydrationData;
  let dailyHydration;

  beforeEach(() => {
    hydrationData = {
      userID: 5,
      date: '2019/06/15',
      numOunces: 42,
    };
    dailyHydration = new DailyHydration(hydrationData);
  });

  it('should be a function', () => {
    expect(DailyHydration).to.be.a('function');
  });

  it('should be a instance', () => {
    expect(dailyHydration).to.be.instanceOf(DailyHydration);
  });

  it('should be have a user ID', () => {
    expect(dailyHydration.id).to.equal(5);
  });

  it('should have a date', () => {
    expect(dailyHydration.date).to.equal('2019/06/15');
  });

  it('should have a number of ounces consumed', () => {
    expect(dailyHydration.numOunces).to.equal(42);
  });

  it('should be able to return ounces consumed', () => {
    const ounces = dailyHydration.getOuncesByDay();

    expect(ounces).to.equal(42);
  });

  it('should return ounces as a number', () => {
    const ounces = dailyHydration.getOuncesByDay();

    expect(ounces).to.be.a('number');
  });
});
