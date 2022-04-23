'use strict';

const modal = document.querySelector('.modal-overlay');
const addTransactionBtn = document.querySelector('.add-transaction-btn');
const cancelBtn = document.querySelectorAll('.cancel-btn');
const expenseBtn = document.querySelector('.expense-btn');
const depositBtn = document.querySelector('.deposit-btn');
const modalContentExpense = document.querySelector('.modal-content-expense');
const modalContentDeposit = document.querySelector('.modal-content-deposit');

addTransactionBtn.addEventListener('click', () => {

});

cancelBtn.forEach((cancelButtons) => {
    cancelButtons.addEventListener('click', (e) => {
        e.preventDefault();
        console.log('cancel clickeddd')
        modal.classList.add('hidden');
    })
});

expenseBtn.addEventListener('click', () => {
    expenseBtn.classList.add('active-expense-btn');
    depositBtn.classList.remove('active-deposit-btn');
    expenseBtn.classList.remove('inactive-expense-btn');
    modalContentExpense.classList.remove('hidden');
    modalContentDeposit.classList.add('hidden');
});

depositBtn.addEventListener('click', () => {
    depositBtn.classList.add('active-deposit-btn');
    expenseBtn.classList.remove('active-expense-btn');
    expenseBtn.classList.add('inactive-expense-btn');
    modalContentExpense.classList.add('hidden');
    modalContentDeposit.classList.remove('hidden');
});
