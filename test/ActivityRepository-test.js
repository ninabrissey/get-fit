import { expect } from 'chai';
import Activity from '../src/Activity';
import ActivityRepository from '../src/ActivityRepository';
import { activityData } from '../src/data/users';

describe('ActivityRepository', () => {
  let activityRepo;

  beforeEach(() => {
    activityRepo = new ActivityRepository(activityData);
  });

  it('should be a function', () => {
    expect(ActivityRepository).to.be.a('function');
  });

  it('should be an instance of ActivityRepository', () => {
    expect(activityRepo).to.be.instanceOf(ActivityRepository);
  });

  it('should hold an array of activity data', () => {
    expect(activityRepo.data).to.deep.equal(activityData);
  });

  it('should start with an empty user array', () => {
    expect(activityRepo.userActivity).to.deep.equal([]);
  });

  it('should instantiate an array of user Activity', () => {
    activityRepo.getUserActivities(1);

    expect(activityRepo.userActivity[0]).to.be.instanceOf(Activity);
    expect(activityRepo.userActivity[0]).to.deep.equal({
      id: 1,
      date: '2019/06/15',
      numSteps: 3577,
      minutesActive: 140,
      flightsOfStairs: 16,
    });
  });

  it('should be able to return an activity report for a day', () => {
    activityRepo.getUserActivities(1);

    const dayActivity = activityRepo.getDayActivity('2019/06/15');

    expect(dayActivity).to.deep.equal({
      id: 1,
      date: '2019/06/15',
      numSteps: 3577,
      minutesActive: 140,
      flightsOfStairs: 16,
    });
  });
});
