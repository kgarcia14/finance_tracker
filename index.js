'use strict';

// Button Functionality
const homeBtn = document.querySelector('.home-btn');
const transactionsBtn = document.querySelector('.transactions-btn');
const chartBtn = document.querySelector('.chart-btn');
const savingsBtn = document.querySelector('.savings-btn');
const homePage = document.querySelector('.home-page');
const transactionsPage = document.querySelector('.transactions-page');
const statisticsPage = document.querySelector('.statistics-page');
const savingsPage = document.querySelector('.savings-page');
const homeTitle = document.querySelector('.home-title');
const transactionsTitle = document.querySelector('.transactions-title');
const statisticsTitle = document.querySelector('.statistics-title');
const savingsTitle = document.querySelector('.savings-title');
const modal = document.querySelector('.modal-overlay');
const addTransactionBtn = document.querySelector('.add-transaction-btn');
const cancelBtn = document.querySelectorAll('.cancel-btn');
const expenseBtn = document.querySelector('.expense-btn');
const depositBtn = document.querySelector('.deposit-btn');
const modalContentExpense = document.querySelector('.modal-content-expense');
const modalContentDeposit = document.querySelector('.modal-content-deposit');
const inputs = document.querySelectorAll('input, select');

homeBtn.addEventListener('click', () => {
    homeBtn.classList.add('active-nav-btn');
    transactionsBtn.classList.remove('active-nav-btn');
    chartBtn.classList.remove('active-nav-btn');
    savingsBtn.classList.remove('active-nav-btn');

    homePage.classList.remove('hidden');
    homeTitle.classList.remove('hidden');
    transactionsPage.classList.add('hidden');
    transactionsTitle.classList.add('hidden');
    statisticsPage.classList.add('hidden');
    statisticsTitle.classList.add('hidden');
    savingsPage.classList.add('hidden');
    savingsTitle.classList.add('hidden');
});

transactionsBtn.addEventListener('click', () => {
    transactionsBtn.classList.add('active-nav-btn');
    homeBtn.classList.remove('active-nav-btn');
    chartBtn.classList.remove('active-nav-btn');
    savingsBtn.classList.remove('active-nav-btn');

    transactionsPage.classList.remove('hidden');
    transactionsTitle.classList.remove('hidden');
    homePage.classList.add('hidden');
    homeTitle.classList.add('hidden');
    statisticsPage.classList.add('hidden');
    statisticsTitle.classList.add('hidden');
    savingsPage.classList.add('hidden');
    savingsTitle.classList.add('hidden');
});

addTransactionBtn.addEventListener('click', () => {
    modal.classList.toggle('hidden');
    // if modal does not contain element then...else...
    if(!modal.classList.contains('hidden')) {
        homeBtn.classList.add('disable-click');
        transactionsBtn.classList.add('disable-click');
        chartBtn.classList.add('disable-click');
        savingsBtn.classList.add('disable-click');
    } else {
        homeBtn.classList.remove('disable-click');
        transactionsBtn.classList.remove('disable-click');
        chartBtn.classList.remove('disable-click');
        savingsBtn.classList.remove('disable-click');
    }
});

chartBtn.addEventListener('click', () => {
    chartBtn.classList.add('active-nav-btn');
    homeBtn.classList.remove('active-nav-btn');
    transactionsBtn.classList.remove('active-nav-btn');
    savingsBtn.classList.remove('active-nav-btn');

    statisticsPage.classList.remove('hidden');
    statisticsTitle.classList.remove('hidden');
    homePage.classList.add('hidden');
    homeTitle.classList.add('hidden');
    transactionsPage.classList.add('hidden');
    transactionsTitle.classList.add('hidden');
    savingsPage.classList.add('hidden');
    savingsTitle.classList.add('hidden');
});

savingsBtn.addEventListener('click', () => {
    savingsBtn.classList.add('active-nav-btn');
    homeBtn.classList.remove('active-nav-btn');
    transactionsBtn.classList.remove('active-nav-btn');
    chartBtn.classList.remove('active-nav-btn');

    savingsPage.classList.remove('hidden');
    savingsTitle.classList.remove('hidden');
    homePage.classList.add('hidden');
    homeTitle.classList.add('hidden');
    transactionsPage.classList.add('hidden');
    transactionsTitle.classList.add('hidden');
    statisticsPage.classList.add('hidden');
    statisticsTitle.classList.add('hidden');
});

cancelBtn.forEach(cancelButtons => {
    cancelButtons.addEventListener('click', (e) => {
        e.preventDefault();

        modal.classList.add('hidden');

        if(!modal.classList.contains('hidden')) {
            homeBtn.classList.add('disable-click');
            transactionsBtn.classList.add('disable-click');
            chartBtn.classList.add('disable-click');
            savingsBtn.classList.add('disable-click');
        } else {
            homeBtn.classList.remove('disable-click');
            transactionsBtn.classList.remove('disable-click');
            chartBtn.classList.remove('disable-click');
            savingsBtn.classList.remove('disable-click');
        }

        inputs.forEach(input => {
            input.value = '';
        });
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

// Form Submit Functionality
const expenseForm = document.querySelector('.expense-form');
const depositForm = document.querySelector('.deposit-form');

let transactions = [];
console.log(transactions);

let transactionsObj = {};

expenseForm.onsubmit = (e) => {
    e.preventDefault();

    let expense_date = document.getElementById('expense_date').value;
    let expense_amount = document.getElementById('expense_amount').value;
    let expense_store = document.getElementById('expense_store').value;
    let expense_category = document.getElementById('expense_category').value;

    let expenseSubmission = {
        type: 'expense',
        date: expense_date,
        amount: expense_amount,
        store: expense_store,
        category: expense_category,
    }

    if(transactions === null || [] ) {
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }

    transactions = JSON.parse(localStorage.getItem('transactions'));
    console.log(transactions);

    transactions.push(expenseSubmission);

    localStorage.setItem('transactions', JSON.stringify(transactions));
    
    inputs.forEach(input => {
        input.value = '';
    });
};

depositForm.onsubmit = (e) => {
    e.preventDefault();

    let deposit_date = document.getElementById('deposit_date').value;
    let deposit_amount = document.getElementById('deposit_amount').value;
    let deposit_store = document.getElementById('deposit_type').value;
    let deposit_category = document.getElementById('deposit_category').value;

    let depositSubmission = {
        type: 'deposit',
        date: deposit_date,
        amount: deposit_amount,
        store: deposit_store,
        category: deposit_category,
    }

    if(transactions === null || [] ) {
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }

    transactions = JSON.parse(localStorage.getItem('transactions'));
    console.log(transactions);

    transactions.push(depositSubmission);

    localStorage.setItem('transactions', JSON.stringify(transactions));

    inputs.forEach(input => {
        input.value = '';
    });
};