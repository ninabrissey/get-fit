import { Chart } from 'chart.js';
Chart.defaults.font.family = "'Oswald', sans-serif";

export function makeDailyHydrationChart(dayData) {
  const dailyWaterChartX = document.getElementById('dailyWaterChart');
  const dailyWaterChart = new Chart(dailyWaterChartX, {
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
  });
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
