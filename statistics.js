'use strict';

window.onload = () => {
  let savingsBalanceStats = localStorage.getItem('totalSavings');

  if (!transactions.length) {
    const data = {
      labels: [
          'Expenses',
          'Income',
          'Savings',
      ],
      datasets: [{
        data: [1, 1, 1],
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
  } else {
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
  }


  //Filter transactions for card stats amount and display amount
  const foodCardAmount = document.querySelector('.food-card-amount');
  const shoppingCardAmount = document.querySelector('.shopping-card-amount');
  const transportationCardAmount = document.querySelector('.transportation-card-amount');
  const householdCardAmount = document.querySelector('.household-card-amount');
  const savingsCardAmount = document.querySelector('.savings-card-amount');


  let foodAmount = 0;
  let shoppingAmount = 0;
  let transportationAmount = 0;
  let householdAmount = 0;
  for (let i = 0; i <= transactions.length - 1; i++) {
      if (transactions[i].category === 'Food') {
        foodAmount += transactions[i].amount;
        foodCardAmount.innerHTML = `- $ ${JSON.stringify(foodAmount).replace('-', '')}`;
      }
      if (transactions[i].category === 'Shopping') {
        shoppingAmount += transactions[i].amount;
        shoppingCardAmount.innerHTML = `- $ ${JSON.stringify(shoppingAmount).replace('-', '')}`;
      }
      if (transactions[i].category === 'Transportation' || transactions[i].category === 'Gas') {
        transportationAmount += transactions[i].amount;
        transportationCardAmount.innerHTML = `- $ ${JSON.stringify(transportationAmount).replace('-', '')}`;
      } 
      if (transactions[i].category === 'Home' || transactions[i].category === 'Bills') {
        householdAmount += transactions[i].amount;
        householdCardAmount.innerHTML = `- $ ${JSON.stringify(householdAmount).replace('-', '')}`;
      } 
      
      savingsCardAmount.innerHTML = `+ $ ${savingsBalanceStats}`;
  }
}