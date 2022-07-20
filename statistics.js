'use strict';

let savingsBalanceStats = localStorage.getItem('totalSavings');

const data = {
    labels: [
        'Expenses',
        'Income',
        'Savings',
    ],
    datasets: [{
      data: [parseInt(expenseBalance), parseInt(incomeBalance), parseInt(savingsBalanceStats)],
      backgroundColor: [
        '#E56372',
        '#6488E5',
        '#F9BE7D',
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