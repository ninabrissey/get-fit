import { Chart } from 'chart.js';
Chart.defaults.font.family = "'Oswald', sans-serif";
Chart.defaults.color = '#1a1919';

export const makeDailyHydrationChart = (dayData) => {
  const config = {
    type: 'doughnut',
    data: {
      // responsive: true,
      labels: ['Water Goal', 'Water Needed'],
      datasets: [
        {
          // responsive: true,
          label: "Daily Water Intake - (day's date)",
          backgroundColor: ['#4CDB63', '#2BBFAB'],
          data: [100, 100 - dayData.ounces],
        },
      ],
    },
  };
  const dailyWaterChartX = document.getElementById('dailyWaterChart');
  const dailyWaterChart = new Chart(dailyWaterChartX, config);
};

export const makeWeeklyHydrationChart = (weekOfWater) => {
  const labels2 = weekOfWater.map((day) => day.date.slice(6, 10));
  const data = {
    labels: labels2,
    datasets: [
      {
        label: 'Ounces of Water Per Day',
        data: weekOfWater.map((day) => day.numOunces),
        backgroundColor: [
          '#FEB904',
          '#FF5B28',
          '#FF2B55',
          '#6542DC',
          '#0391FA',
          '#2BBFAB',
          '#4CDB63',
        ],
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: Number.MAX_VALUE,
      },
    ],
  };
  const config = {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };
  const weeklyWaterChart = document.getElementById('weeklyWaterChart'); //added for test
  new Chart(weeklyWaterChart, config);
};

export const makeNightsSleepChart = (sleep) => {
  const data = {
    labels: [''],
    datasets: [
      {
        label: sleep.date,
        data: [sleep.value],
        borderColor: 'white',
        backgroundColor: '#0391FA',
      },
      {
        label: 'Avg.',
        data: [sleep.average],
        borderColor: 'white',
        backgroundColor: '#6542DC',
      },
    ],
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: 'y',
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      responsive: true,
      maintainAspectRatio: false,
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

  const sleepChart = document.getElementById('sleepChart'); //added for test
  new Chart(sleepChart, config);
};

export const makeNightsQualityChart = (sleep) => {
  const data = {
    labels: [''],
    datasets: [
      {
        label: sleep.date,
        data: [sleep.value],
        borderColor: 'white',
        backgroundColor: '#0391FA',
      },
      {
        label: 'Avg.',
        data: [sleep.average],
        borderColor: 'white',
        backgroundColor: '#6542DC',
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
      maintainAspectRatio: false,
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
};

export const makeWeeksSleepChart = (weekOfSleep) => {
  const labels2 = weekOfSleep.map((day) => day.date);
  const data = {
    labels: labels2,
    datasets: [
      {
        label: 'Hours of Sleep Per Night',
        data: weekOfSleep.map((day) => day.hoursSlept),
        backgroundColor: [
          '#FEB904',
          '#FF5B28',
          '#FF2B55',
          '#6542DC',
          '#0391FA',
          '#2BBFAB',
          '#4CDB63',
        ],
        borderColor: 'white',
        borderWidth: 2,
        borderRadius: Number.MAX_VALUE,
      },
    ],
  };
  const config = {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };
  const weeklySleepChart = document.getElementById('weeklySleepChart'); //added for test
  new Chart(weeklySleepChart, config);
};
