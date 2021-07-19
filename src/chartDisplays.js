import { Chart } from 'chart.js';
Chart.defaults.font.family = "'Oswald', sans-serif";

export function makeDailyHydrationChart(dayData) {
  const config = {
    type: 'doughnut',
    data: {
      labels: ['Water Intake', 'Water Needed'],
      datasets: [
        {
          label: "Daily Water Intake - (day's date)",
          backgroundColor: ['#FF2B55', '#FF5B28'],
          data: [100, dayData.ounces],
        },
      ],
    },
  };
  const dailyWaterChartX = document.getElementById('dailyWaterChart');
  const dailyWaterChart = new Chart(dailyWaterChartX, config);
}

export function makeWeeklyHydrationChart(weekOfWater) {
  const labels2 = weekOfWater.map((day) => day.date);
  const data = {
    labels: labels2,
    datasets: [
      {
        label: 'Ounces of Water Per Day',
        data: weekOfWater.map((day) => day.numOunces),
        backgroundColor: [
          '#4CDB63',
          '#2BBFAB',
          '#0391FA',
          '#6542DC',
          '#FF2B55',
          '#FF5B28',
          '#FEB904',
        ],
        borderColor: 'white',
        borderWidth: 1,
      },
    ],
  };
  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };
  const weeklyWaterChart = document.getElementById('weeklyWaterChart'); //added for test
  new Chart(weeklyWaterChart, config);
}

export function makeNightsSleepChart(sleep) {
  const data = {
    labels: [''],
    datasets: [
      {
        label: 'Last Night',
        data: [sleep.value],
        borderColor: 'white',
        backgroundColor: 'black',
      },
      {
        label: 'Average',
        data: [sleep.average],
        borderColor: 'white',
        backgroundColor: 'red',
      },
    ],
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      indexAxis: 'y',
      // Elements options apply to all of the options unless overridden in a dataset
      // In this case, we are setting the border of each horizontal bar to be 2px wide
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      responsive: true,
      plugins: {
        legend: {
          position: 'right',
        },
        title: {
          display: true,
          text: 'Hours Slept',
        },
      },
    },
  };

  //const NUMBER_CFG = { count: 1, min: 0, max: 12 };

  //const labels = Utils.months({ count: 7 });
  const sleepChart = document.getElementById('sleepChart'); //added for test
  new Chart(sleepChart, config);
}

export function makeNightsQualityChart(sleep) {
  const data = {
    labels: [''],
    datasets: [
      {
        label: 'Last Night',
        data: [sleep.value],
        borderColor: 'white',
        backgroundColor: 'black',
      },
      {
        label: 'Average',
        data: [sleep.average],
        borderColor: 'white',
        backgroundColor: 'red',
      },
    ],
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      indexAxis: 'y',
      // Elements options apply to all of the options unless overridden in a dataset
      // In this case, we are setting the border of each horizontal bar to be 2px wide
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      // responsive: true,
      plugins: {
        legend: {
          position: 'right',
        },
        title: {
          display: true,
          text: 'Sleep Quality',
        },
      },
    },
  };

  const sleepScoreChart = document.getElementById('sleepScoreChart'); //added for test
  new Chart(sleepScoreChart, config);
}

export function makeWeeksSleepChart(weekOfSleep) {
  const labels2 = weekOfSleep.map((day) => day.date);
  const data = {
    labels: labels2,
    datasets: [
      {
        label: 'Hours of Sleep Per Night',
        data: weekOfSleep.map((day) => day.hoursSlept),
        backgroundColor: [
          '#4CDB63',
          '#2BBFAB',
          '#0391FA',
          '#6542DC',
          '#FF2B55',
          '#FF5B28',
          '#FEB904',
        ],
        borderColor: 'white',
        borderWidth: 1,
      },
    ],
  };
  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };
  const weeklySleepChart = document.getElementById('weeklySleepChart'); //added for test
  new Chart(weeklySleepChart, config);
}
