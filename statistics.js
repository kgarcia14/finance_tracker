'use strict';

const labels = [
    'January',
    'February',
    
];

const data = {
    labels: [
        'Expenses',
        'Income',
        'Savings',
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [60, 50, 100],
      backgroundColor: [
        '#6488E5',
        '#F9BE7D',
        '#E56372',
      ],
      hoverOffset: 4
    }]
};

const config = {
    type: 'doughnut',
    data: data,
};

const myChart = new Chart(
    document.getElementById('myChart'),
    config
);