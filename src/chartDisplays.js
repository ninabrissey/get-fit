import { Chart } from 'chart.js';

export function makeDailyHydrationChart(dayData) {
  const dailyWaterChartX = document.getElementById('dailyWaterChart');
  const dailyWaterChart = new Chart(dailyWaterChartX, {
    type: 'doughnut',
    data: {
      labels: ['Water Intake', 'Water Needed'],
      datasets: [
        {
          label: "Daily Water Intake - (day's date)",
          backgroundColor: ['#e8c3b9', '#c45850'],
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
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)',
        ],
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
