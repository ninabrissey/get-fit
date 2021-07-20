import Activity from './Activity';

class ActivityRepository {
  constructor(data) {
    this.data = data;
    this.userActivity = [];
  }

  getUserActivities(id) {
    this.userActivity = this.data.reduce((accum, activity) => {
      if (activity.userID === id) {
        let dailyActivity = new Activity(activity);
        accum.push(dailyActivity);
      }
      return accum;
    }, []);
  }

  getDayActivity(date) {
    return this.userActivity.find((activity) => activity.date === date);
  }
}

export default ActivityRepository;
