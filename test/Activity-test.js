import { expect } from 'chai';
import Activity from '../src/Activity';
import userData from '../src/data/users';

describe('Activity', () => {
  let activity;
  let activityData;

  beforeEach(() => {
    activityData = {
      userID: 1,
      date: '2019/06/15',
      numSteps: 3577,
      minutesActive: 140,
      flightsOfStairs: 16,
    };

    activity = new Activity(activityData);
  });

  it('should be a function', () => {
    expect(Activity).to.be.a('function');
  });

  it('should be an instance of Activity', () => {
    expect(activity).to.be.instanceOf(Activity);
  });

  it('should have a user id', () => {
    expect(activity.id).to.equal(1);
  });

  it('should have a date', () => {
    expect(activity.date).to.equal('2019/06/15');
  });

  it('should should hold the number of steps', () => {
    expect(activity.numSteps).to.equal(3577);
  });

  it('should hold a number of minutes active', () => {
    expect(activity.minutesActive).to.equal(140);
  });

  it('should hold a number of stairs climbed', () => {
    expect(activity.flightsOfStairs).to.equal(16);
  });

  it.only('should calculate the number of miles walked', () => {
    const strideLength = userData[0].strideLength;
    const miles = activity.calculateMiles(strideLength);

    expect(miles).to.equal(2.91);
  });
});
