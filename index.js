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
const formSubmitBtns = document.querySelectorAll('.form-submit-btn');
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

formSubmitBtns.forEach(formSubmitBtn => {
    formSubmitBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    })
})

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


// FORM SUBMIT AND SAVE TO LOCAL STORAGE FUNCTIONALITY
const expenseForm = document.querySelector('.expense-form');
const depositForm = document.querySelector('.deposit-form');

//save and fetch localstorage (must check if null first and if null then set item to empty array)
if(localStorage.getItem('data') === null) {
    localStorage.setItem('data', '[]');
}

let transactions = JSON.parse(localStorage.getItem('data'));


//submit expense form
expenseForm.onsubmit = (e) => {
    e.preventDefault();

    let expense_date = document.getElementById('expense_date').value;
    let expense_amount = document.getElementById('expense_amount').value;
    let expense_store = document.getElementById('expense_store').value;
    let expense_category = document.getElementById('expense_category').value;

    let expenseSubmission = {
        id: Date.now(),
        type: 'expense',
        date: expense_date,
        amount: - expense_amount,
        store: expense_store,
        category: expense_category,
    }


    transactions.push(expenseSubmission);
    console.log(transactions);

    localStorage.setItem('data', JSON.stringify(transactions));

    inputs.forEach(input => {
        input.value = '';
    });

    location.reload();
};

//submit deposit form
depositForm.onsubmit = (e) => {
    e.preventDefault();

    let deposit_date = document.getElementById('deposit_date').value;
    let deposit_amount = document.getElementById('deposit_amount').value;
    let deposit_store = document.getElementById('deposit_type').value;
    let deposit_category = document.getElementById('deposit_category').value;

    let depositSubmission = {
        id: Date.now(),
        type: 'deposit',
        date: deposit_date,
        amount: +deposit_amount,
        store: deposit_store,
        category: deposit_category,
    }

    transactions.push(depositSubmission);
    console.log(transactions);

    localStorage.setItem('data', JSON.stringify(transactions));
    
    inputs.forEach(input => {
        input.value = '';
    });

    location.reload();
};

//calculate and display total balance of transactions
transactions = JSON.parse(localStorage.getItem('data'));

let totalBalance = 0;
for(let i = 0; i <= transactions.length - 1; i++) {
    totalBalance += transactions[i].amount;
}
totalBalance = totalBalance.toFixed(2);

const totalBalanceWrapper = document.querySelector('.balance');
if (totalBalance < 0) {
    totalBalanceWrapper.innerHTML = `- $ ${totalBalance.replace('-', '')}`
} else {
    totalBalanceWrapper.innerHTML = `$ ${totalBalance}`
}


//Calculate and display expenses balance
let expenseBalance = 0;
for(let i = 0; i <= transactions.length - 1; i++) {
    if (transactions[i].type === 'expense') {
        expenseBalance += transactions[i].amount;
    }
}
expenseBalance = expenseBalance.toFixed(2);

const expenseOverviewBalance = document.querySelector('.expenses-overview-balance');
expenseOverviewBalance.innerHTML = `- $ ${expenseBalance.replace('-', '')}`;


//display transactions on home page and transctions page
//map through transactions to display each transaction
transactions.map(transaction => {
    const transactionsList = document.querySelector('.home-transactions-list');
    const transactionLi = document.createElement('li');
    transactionLi.classList.add('transaction-list-item');
    transactionLi.setAttribute('id', `${transaction.id}`);
    let transactionAmount = transaction.amount.toFixed(2);
    console.log(transactions);

    if (transaction.category ==='Food') {
        transactionLi.innerHTML = `
            <div class="transaction-content-wrapper">
                <div class="transaction-icon">
                    <img src="./images/food_icon.svg" alt="fork and knife icon">
                    <div class="transaction-title-wrapper">
                        <h4 class="transaction-title">${transaction.store}</h4>
                        <p class="transaction-subtitle">${transaction.category}</p>
                    </div>
                </div>
                <div>
                    <p class="expense-list-item-amount">- $ ${transactionAmount.replace('-', '')}</p>
                </div>
            </div>
        `
    } else if (transaction.category ==='Shopping') {
        transactionLi.innerHTML = `
            <div class="transaction-content-wrapper">
                <div class="transaction-icon">
                    <img src="./images/shopping_icon.svg" alt="shopping bag">
                    <div class="transaction-title-wrapper">
                        <h4 class="transaction-title">${transaction.store}</h4>
                        <p class="transaction-subtitle">${transaction.category}</p>
                    </div>
                </div>
                <div>
                    <p class="expense-list-item-amount">- $ ${transactionAmount.replace('-', '')}</p>
                </div>
            </div>
        `
    } else if (transaction.category ==='Transportation') {
        transactionLi.innerHTML = `
            <div class="transaction-content-wrapper">
                <div class="transaction-icon">
                    <img src="./images/transportation_icon.svg" alt="car">
                    <div class="transaction-title-wrapper">
                        <h4 class="transaction-title">${transaction.store}</h4>
                        <p class="transaction-subtitle">${transaction.category}</p>
                    </div>
                </div>
                <div>
                    <p class="expense-list-item-amount">- $ ${transactionAmount.replace('-', '')}</p>
                </div>
            </div>
        `
    } else if (transaction.category ==='Home') {
        transactionLi.innerHTML = `
            <div class="transaction-content-wrapper">
                <div class="transaction-icon">
                    <img src="./images/home_icon.svg" alt="house">
                    <div class="transaction-title-wrapper">
                        <h4 class="transaction-title">${transaction.store}</h4>
                        <p class="transaction-subtitle">${transaction.category}</p>
                    </div>
                </div>
                <div>
                    <p class="expense-list-item-amount">- $ ${transactionAmount.replace('-', '')}</p>
                </div>
            </div>
        `
    } else if (transaction.category ==='Gas') {
        transactionLi.innerHTML = `
            <div class="transaction-content-wrapper">
                <div class="transaction-icon">
                    <img src="./images/gas_icon.svg" alt="gas tank">
                    <div class="transaction-title-wrapper">
                        <h4 class="transaction-title">${transaction.store}</h4>
                        <p class="transaction-subtitle">${transaction.category}</p>
                    </div>
                </div>
                <div>
                    <p class="expense-list-item-amount">- $ ${transactionAmount.replace('-', '')}</p>
                </div>
            </div>
        `
    } else if (transaction.category ==='Bills') {
        transactionLi.innerHTML = `
            <div class="transaction-content-wrapper">
                <div class="transaction-icon">
                    <img src="./images/home_icon.svg" alt="gas tank">
                    <div class="transaction-title-wrapper">
                        <h4 class="transaction-title">${transaction.store}</h4>
                        <p class="transaction-subtitle">${transaction.category}</p>
                    </div>
                </div>
                <div>
                    <p class="expense-list-item-amount">- $ ${transactionAmount.replace('-', '')}</p>
                </div>
            </div>
        `
    } else {
        transactionLi.innerHTML = `
            <div class="transaction-content-wrapper">
                <div class="transaction-icon">
                    <img src="./images/deposit_icon.svg" alt="fork and knife icon">
                    <div class="transaction-title-wrapper">
                        <h4 class="transaction-title">Deposit</h4>
                        <p class="transaction-subtitle">${transaction.category}</p>
                    </div>
                </div>
                <div>
                    <p class="deposit-list-item-amount">+ $ ${transactionAmount.replace('-', '')}</p>
                </div>
            </div>
        `
    }
    
    transactionsList.append(transactionLi);
})


//View details of each transaction
const transactionsListItem= document.querySelectorAll('.transaction-list-item');
const transactionDetailsModal = document.querySelector('.transaction-details-modal');
const transactionDetails = document.querySelector('.transaction-details');
const deleteButton = document.querySelector('.delete-btn');
const areYouSure = document.querySelector('.are-you-sure');
const noDelete = document.querySelector('.no-delete');
const yesDelete = document.querySelector('.yes-delete');

transactionsListItem.forEach(transactionItem => {
    transactionItem.addEventListener('click', (e) => {
        const clickedTransactionId = e.target.parentElement.id;
        transactionDetailsModal.classList.remove('hidden');
        transactionDetailsModal.setAttribute('id', `${clickedTransactionId}`);
        yesDelete.setAttribute('id', `${clickedTransactionId}`);
        console.log(clickedTransactionId);

        for (let i = 0; i <= transactions.length - 1; i++) {
            if (transactions[i].id === parseInt(clickedTransactionId)) {
                const transaction = transactions[i];
                
                transactionDetails.innerHTML = `
                    <p>${transaction.amount}</p>
                `
            }
        }
    })
})

// DELETE Transaction from list
yesDelete.addEventListener('click', () => {
    console.log(yesDelete.id);
    for (let i = 0; i <= transactions.length - 1; i++) {
        if (transactions[i].id === parseInt(yesDelete.id)) {
            let newTransactionsArr = [...transactions];
            console.log(transactions[i]);
            const indexOfTransaction = newTransactionsArr.findIndex(transaction => {
                return transaction.id === parseInt(yesDelete.id);
            })
            if (indexOfTransaction !== -1) {
                newTransactionsArr.splice(indexOfTransaction, 1);
                transactions = newTransactionsArr;
                localStorage.setItem('data', JSON.stringify(transactions));
            }
        }
        location.reload();
    }
})

const closeTransactions = document.querySelector('.close-transactions');
const transactionDetailsAndButtons = document.querySelector('.transaction-details-and-buttons'); 

closeTransactions.addEventListener('click', () => {
    transactionDetailsModal.classList.add('hidden');
})

deleteButton.addEventListener('click', () => {
    areYouSure.classList.remove('hidden');
    transactionDetailsAndButtons.classList.add('hidden');
})

noDelete.addEventListener('click', () => {
    areYouSure.classList.add('hidden');
    transactionDetailsAndButtons.classList.remove('hidden');
})


//Edit Transactions

