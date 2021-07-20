class Activity {
  constructor(data) {
    this.id = data.userID;
    this.date = data.date;
    this.numSteps = data.numSteps;
    this.minutesActive = data.minutesActive;
    this.flightsOfStairs = data.flightsOfStairs;
  }

  calculateMiles(stride) {
    const miles = (this.numSteps * stride) / 5280;
    return Math.round(miles * 100) / 100;
  }
}

export default Activity;
