class DailyHydration {
  constructor(data) {
    this.id = data.userID;
    this.date = data.date;
    this.numOunces = data.numOunces;
  }

  getOuncesByDay() {
    return this.numOunces;
  }
}

export default DailyHydration;
