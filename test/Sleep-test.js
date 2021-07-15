import { expect } from 'chai';
import Sleep from '../src/Sleep';

describe('Sleep', () => {
  let sleep;
  let sleepData;

  beforeEach(() => {
    sleepData = {
      userID: 3,
      date: '2021/07/15',
      hoursSlept: 7.5,
      sleepQuality: 4.7,
    };

    sleep = new Sleep(sleepData);
  });

  it('should be a function', () => {
    expect(Sleep).to.be.a('function');
  });

  it('should be an instance of Sleep', () => {
    expect(sleep).to.be.instanceOf(Sleep);
  });

  it('should have a user id', () => {
    expect(sleep.id).to.equal(3);
  });

  it('should have a date', () => {
    expect(sleep.date).to.equal('2021/07/15');
  });

  it('should should hold the number of hours slept', () => {
    expect(sleep.hoursSlept).to.equal(7.5);
  });

  it('should have a sleep quality score', () => {
    expect(sleep.sleepQuality).to.equal(4.7);
  });
});
