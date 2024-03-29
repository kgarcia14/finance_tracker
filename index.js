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
const totalBalanceContainer = document.querySelector('.total-balance-container');
const savingsBalanceContainer = document.querySelector('.savings-balance-container');
const modal = document.querySelector('.modal-overlay');
const addTransactionBtn = document.querySelector('.add-transaction-btn');
const cancelBtn = document.querySelectorAll('.cancel-btn');
const expenseDepositBtn = document.querySelector('.expense-deposit-btn');
const expenseBtn = document.querySelector('.expense-btn');
const depositBtn = document.querySelector('.deposit-btn');
const transferBtn = document.querySelector('.transfer-btn');
const modalContentExpense = document.querySelector('.modal-content-expense');
const modalContentDeposit = document.querySelector('.modal-content-deposit');
const modalContentTransfer = document.querySelector('.modal-content-transfer');
const formSubmitBtns = document.querySelectorAll('.form-submit-btn');
const inputs = document.querySelectorAll('input, select');

//helper functions & button functionality
const active = (element) => {
    element.classList.add('active-nav-btn');
}

const inactive = (elements) => {
    elements.forEach(element => {
        element.classList.remove('active-nav-btn');
    })
}

const show = (elements) => {
    elements.forEach(element => {
        element.classList.remove('hidden');
    })
}

const hide = (elements) => {
    elements.forEach(element => {
        element.classList.add('hidden');
    })
}

const disableNavClick = (elements) => {
    elements.forEach(element => {
        element.classList.add('disable-click');
    })
}

const enableNavClick = (elements) => {
    elements.forEach(element => {
        element.classList.remove('disable-click');
    })
}

homeBtn.addEventListener('click', () => {
    active(homeBtn);
    inactive([transactionsBtn, chartBtn, savingsBtn]);
    show([homePage, homeTitle, totalBalanceContainer]);
    hide([transactionsPage, transactionsTitle, statisticsPage, statisticsTitle, savingsPage, savingsTitle, savingsBalanceContainer, transactionDetailsModal, allTransactionDetailsModal, goalModal]);
});

transactionsBtn.addEventListener('click', () => {
    active(transactionsBtn);
    inactive([homeBtn, chartBtn, savingsBtn]);
    show([transactionsPage, transactionsTitle, totalBalanceContainer]);
    hide([homePage, homeTitle, statisticsPage, statisticsTitle, savingsPage, savingsTitle, savingsBalanceContainer, transactionDetailsModal, allTransactionDetailsModal, goalModal]);
});

addTransactionBtn.addEventListener('click', () => {
    modal.classList.toggle('hidden');
    // if modal does not contain element then...else...
    if(!modal.classList.contains('hidden')) {
        disableNavClick([homeBtn, transactionsBtn, chartBtn, savingsBtn]);
    } else {
        enableNavClick([homeBtn, transactionsBtn, chartBtn, savingsBtn]);
    }

    hide([transactionDetailsModal, allTransactionDetailsModal, goalModal]);
});

chartBtn.addEventListener('click', () => {
    active(chartBtn);
    inactive([homeBtn, transactionsBtn, savingsBtn]);
    show([statisticsPage, statisticsTitle, totalBalanceContainer]);
    hide([homePage, homeTitle, transactionsPage, transactionsTitle, savingsPage, savingsTitle, savingsBalanceContainer, transactionDetailsModal, allTransactionDetailsModal, goalModal]);
});

savingsBtn.addEventListener('click', () => {
    active(savingsBtn);
    inactive([homeBtn, transactionsBtn, chartBtn]);
    show([savingsPage, savingsTitle, savingsBalanceContainer]);
    hide([homePage, homeTitle, transactionsPage, transactionsTitle, statisticsPage, statisticsTitle, totalBalanceContainer, transactionDetailsModal, allTransactionDetailsModal, goalModal]);
});

formSubmitBtns.forEach(formSubmitBtn => {
    formSubmitBtn.addEventListener('click', () => {
        hide([modal]);
    })
})

cancelBtn.forEach(cancelButtons => {
    cancelButtons.addEventListener('click', (e) => {
        e.preventDefault();

        hide([modal, editModal, savingsModal, contributeModal]);

        if(!modal.classList.contains('hidden')) {
            disableNavClick([homeBtn, transactionsBtn, chartBtn, savingsBtn]);
        } else {
            enableNavClick([homeBtn, transactionsBtn, addTransactionBtn, chartBtn, savingsBtn]);
        }

        inputs.forEach(input => {
            input.value = '';
        });
    })
});

expenseBtn.addEventListener('click', () => {
    expenseBtn.classList.remove('gray-btn');
    expenseBtn.classList.add('active-expense-btn');
    depositBtn.classList.add('inactive-deposit-btn');
    depositBtn.classList.remove('active-deposit-btn', 'gray-btn');
    expenseBtn.classList.remove('inactive-expense-btn');
    transferBtn.classList.remove('active-transfer-btn');
    expenseDepositBtn.classList.remove('gray-expense-deposit-btn');
    hide([modalContentDeposit, modalContentTransfer]);
    show([modalContentExpense]);
});

depositBtn.addEventListener('click', () => {
    depositBtn.classList.add('active-deposit-btn');
    expenseBtn.classList.remove('active-expense-btn', 'gray-btn');
    expenseBtn.classList.add('inactive-expense-btn');
    transferBtn.classList.remove('active-transfer-btn');
    expenseDepositBtn.classList.remove('gray-expense-deposit-btn');
    hide([modalContentExpense, modalContentTransfer]);
    show([modalContentDeposit]);
});

transferBtn.addEventListener('click', () => {
    transferBtn.classList.add('active-transfer-btn');
    expenseDepositBtn.classList.add('gray-expense-deposit-btn');

    if (expenseBtn.classList.contains('active-expense-btn')) {
        expenseBtn.classList.remove('active-expense-btn');
        expenseBtn.classList.add('gray-btn');
    } 
    
    if (depositBtn.classList.contains('active-deposit-btn')){
        depositBtn.classList.remove('active-deposit-btn', 'inactive-deposit-btn');
        depositBtn.classList.add('gray-btn');
    }

    hide([modalContentExpense, modalContentDeposit]);
    show([modalContentTransfer]);
});


// FORM SUBMIT AND SAVE TO LOCAL STORAGE FUNCTIONALITY
const expenseForm = document.querySelector('.expense-form');
const depositForm = document.querySelector('.deposit-form');

//save and fetch localstorage (must check if null first and if null then set item to empty array)
if(localStorage.getItem('data') === null) {
    localStorage.setItem('data', '[]');
}

let transactions = JSON.parse(localStorage.getItem('data'));
console.log(transactions);

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

    if (!expense_date || !expense_amount || !expense_store || !expense_category) {
        alert('Not Submitted! Please fill out all fields.');
        enableNavClick([homeBtn, transactionsBtn, addTransactionBtn, chartBtn, savingsBtn]);
    } else {
        transactions.push(expenseSubmission);
    
        localStorage.setItem('data', JSON.stringify(transactions));
    
        inputs.forEach(input => {
            input.value = '';
        });
    
        location.reload();
    }
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

    if (!deposit_date || !deposit_amount || !deposit_store || !deposit_category) {
        alert('Not Submitted! Please fill out all fields.');
        enableNavClick([homeBtn, transactionsBtn, addTransactionBtn, chartBtn, savingsBtn]);
    } else {
        transactions.push(depositSubmission);
    
        localStorage.setItem('data', JSON.stringify(transactions));
        
        inputs.forEach(input => {
            input.value = '';
        });

        location.reload();
    }
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

//Calculate and display percentages for expense overview
const foodPercent = document.querySelector('.food-percent');
const shoppingPercent = document.querySelector('.shopping-percent');
const transportationPercent = document.querySelector('.transportation-percent');
const householdPercent = document.querySelector('.household-percent');

let foodTotal = 0;
let foodPercentage = 0;
let shoppingTotal = 0
let shoppingPercentage = 0;
let transportationTotal = 0;
let transportationPercentage = 0;
let householdTotal = 0;
let householdPercentage = 0;
for (let i = 0; i <= transactions.length - 1; i++) {
    if (transactions[i].category === 'Food') {
        foodTotal += transactions[i].amount;
    }
    if (transactions[i].category === 'Shopping') {
        shoppingTotal += transactions[i].amount;
    }
    if (transactions[i].category === 'Transportation' || transactions[i].category === 'Gas') {
        transportationTotal += transactions[i].amount;
    }
    if (transactions[i].category === 'Home' || transactions[i].category === 'Bills') {
        householdTotal += transactions[i].amount;
    }

    if (transactions[i].type === 'expense') {
        foodPercentage = Math.round((foodTotal/parseInt(expenseBalance)) * 100);
        shoppingPercentage = Math.round((shoppingTotal/parseInt(expenseBalance)) * 100);
        transportationPercentage = Math.round((transportationTotal/parseInt(expenseBalance)) * 100);
        householdPercentage = Math.round((householdTotal/parseInt(expenseBalance)) * 100);
    }
}

foodPercent.innerHTML = `${foodPercentage}%`;
shoppingPercent.innerHTML = `${shoppingPercentage}%`;
transportationPercent.innerHTML = `${transportationPercentage}%`;
householdPercent.innerHTML = `${householdPercentage}%`;

//progress circles for expense overview
let foodCirclePercentage = foodTotal/parseInt(expenseBalance);
let shoppingCirclePercentage = shoppingTotal/parseInt(expenseBalance);
let transportationCirclePercentage = transportationTotal/parseInt(expenseBalance);
let householdCirclePercentage = householdTotal/parseInt(expenseBalance);

var circle = new ProgressBar.Circle('#food-circle', {
    color: '#e56372',
    strokeWidth: 1.5,
    duration: 1400,
    easing: 'easeInOut',
    trailColor: '#e6e6e6',
});
circle.animate(foodCirclePercentage); 

var circle = new ProgressBar.Circle('#shopping-circle', {
    color: '#e56372',
    strokeWidth: 1.5,
    duration: 1400,
    easing: 'easeInOut',
    trailColor: '#e6e6e6',
    trailWidth: 1,
});
circle.animate(shoppingCirclePercentage); 

var circle = new ProgressBar.Circle('#transportation-circle', {
    color: '#e56372',
    strokeWidth: 1.5,
    duration: 1400,
    easing: 'easeInOut',
    trailColor: '#e6e6e6',
    trailWidth: 1,
});
circle.animate(transportationCirclePercentage);  

var circle = new ProgressBar.Circle('#household-circle', {
    color: '#e56372',
    strokeWidth: 1.5,
    duration: 1400,
    easing: 'easeInOut',
    trailColor: '#e6e6e6',
    trailWidth: 1,
});
circle.animate(householdCirclePercentage);  


//calculate income balance
let incomeBalance = 0;
for(let i = 0; i <= transactions.length - 1; i++) {
    if (transactions[i].type === 'deposit') {
        incomeBalance += transactions[i].amount;
    }
}
incomeBalance = incomeBalance.toFixed(2);


//display 10 most recent transactions on home page
//map through transactions to display each transaction
const transactionsList = document.querySelector('.home-transactions-list');
const reversedTransactions = [...transactions].reverse();
const tenRecentTransactions = reversedTransactions.slice(0, 10);

tenRecentTransactions.map(transaction => {
    const transactionLi = document.createElement('li');
    transactionLi.classList.add('transaction-list-item', transaction.type);
    transactionLi.setAttribute('id', transaction.id);
    let transactionAmount = transaction.amount.toFixed(2);

    transactionLi.innerHTML = `
            <div class="transaction-content-wrapper">
                <div class="transaction-icon">
                    ${
                        transaction.category === 'Food' ? `
                            <i class="fa-solid fa-utensils expense-transaction-icon"></i>
                        ` : transaction.category === 'Shopping' ? `
                            <i class="fa-solid fa-bag-shopping expense-transaction-icon"></i>
                        ` : transaction.category === 'Transportation' ? `
                            <i class="fa-solid fa-car expense-transaction-icon"></i>
                        ` : transaction.category === 'Home' ? `
                            <i class="fa-solid fa-house-chimney expense-transaction-icon"></i>
                        ` : transaction.category === 'Gas' ? `
                            <i class="fa-solid fa-gas-pump expense-transaction-icon"></i>
                        ` : transaction.category === 'Bills' ? `
                            <i class="fa-solid fa-file-invoice expense-transaction-icon"></i>
                        ` : transaction.type === 'toSavings' || transaction.type === 'fromSavings' ? `
                            <i class="fa-solid fa-money-bill-transfer transfer-transaction-icon"></i>
                        ` : `
                            <i class="fa-solid fa-money-bill-trend-up deposit-transaction-icon"></i>
                        `
                    }
                    <div class="transaction-title-wrapper">
                        <h4 class="transaction-title">
                        ${
                            transaction.type === 'toSavings' || transaction.type === 'fromSavings' ? `
                                Transfer
                            ` : 
                                transaction.store
                        }
                        </h4>
                        <p class="transaction-subtitle">
                            ${
                                transaction.type === 'toSavings' ? `
                                    To Savings
                                ` : transaction.type === 'fromSavings' ? `
                                    From Savings
                                ` :
                                    transaction.category
                            }
                        </p>
                    </div>
                </div>
                <div class="transaction-list-item-amount">
                    ${
                        transaction.type === 'expense' || transaction.type === 'transfer' || transaction.type === 'toSavings' ? `
                            <p class="expense-list-item-amount">- $ ${transactionAmount.replace('-', '')}</p>
                        ` : `
                            <p class="deposit-list-item-amount">+ $ ${transactionAmount.replace('-', '')}</p>
                        `
                    }
                </div>
            </div>
        `
    transactionsList.append(transactionLi);
})

if (!transactions.length) {
    transactionsList.innerHTML = `
        <p class="start-adding-transactions">Start Adding Transactions!!!</p>
    `
}

//View details of each transaction
const transactionsListItem= document.querySelectorAll('.transaction-list-item');
const transactionDetailsModal = document.querySelector('.transaction-details-modal');
const transactionDetails = document.querySelector('.transaction-details');
const deleteButtons = document.querySelectorAll('.delete-btn');
const areYouSure = document.querySelectorAll('.are-you-sure');
const noDelete = document.querySelectorAll('.no-delete');
const yesDelete = document.querySelectorAll('.yes-delete');
const editTransaction = document.querySelectorAll('.edit-transaction');
const editModal = document.querySelector('.edit-modal-overlay');
const editExpenseForm = document.querySelectorAll('.edit-expense-form');
const editDepositForm = document.querySelectorAll('.edit-deposit-form');

transactionsListItem.forEach(transactionItem => {
    transactionItem.addEventListener('click', () => {
        const clickedTransaction = transactionItem;
        const clickedTransactionId = transactionItem.id;

        transactionDetailsModal.classList.remove('hidden');

        yesDelete.forEach(yesDelete => {
            yesDelete.setAttribute('id', clickedTransactionId);
        })
        //change edit transaction id to confirmation button id
        editExpenseForm.forEach(editExpenseForm => {
            editExpenseForm.setAttribute('id', `${clickedTransactionId}`);
        })
        editDepositForm.forEach(editDepositForm => {
            editDepositForm.setAttribute('id', `${clickedTransactionId}`);
        })

        for (let i = 0; i <= transactions.length - 1; i++) {
            if (transactions[i].id === parseInt(clickedTransactionId)) {
                const transaction = transactions[i];
                
                transactionDetails.innerHTML = `
                    <ul>
                        <li>
                            <p>Amount:</p> 
                            <p>${transaction.amount}</p>
                        </li>
                        <li>
                            <p>Date:</p> 
                            <p>${transaction.date}</p>
                        </li>
                        <li>
                            <p>${transaction.store === 'Deposit' ? 'Category:' : transaction.type === 'toSavings' ||  transaction.type === 'fromSavings' ? '' : 'Merchant:'}</p> 
                            <p>${transaction.type === 'toSavings' ||  transaction.type === 'fromSavings' ? '' : transaction.store}</p>
                        </li>
                        <li>
                            <p>${transaction.store === 'Deposit' ? 'Type:' : 'Category:'}</p> 
                            <p>${transaction.type === 'toSavings' ? 'To Savings' : transaction.type === 'fromSavings' ? 'From Savings' : transaction.category}</p>
                        </li>
                    </ul>
                `
            }
        }

        if (clickedTransaction.classList.contains('expense')) {
            editTransaction.forEach(editTransaction => {
                editTransaction.classList.add('expense');
            })
            editTransaction.forEach(editTransaction => {
                editTransaction.classList.remove('deposit');
            })
        } else {
            editTransaction.forEach(editTransaction => {
                editTransaction.classList.add('deposit');
            })
            editTransaction.forEach(editTransaction => {
                editTransaction.classList.remove('expense');
            })
        }
    })
})

// DELETE Transaction from list
yesDelete.forEach(yesDelete => {
    yesDelete.addEventListener('click', () => {
        for (let i = 0; i <= transactions.length - 1; i++) {
            if (transactions[i].id === parseInt(yesDelete.id)) {
                let newTransactionsArr = [...transactions];
                const indexOfTransaction = newTransactionsArr.findIndex(transaction => {
                    //Return index if transaction.id === yesDelete.id
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
})


//Edit Transaction
editTransaction.forEach(editTransaction => {
    editTransaction.addEventListener('click', () => {
        editModal.classList.remove('hidden');
        if (editTransaction.classList.contains('expense')) {
            editExpenseForm.forEach(editExpenseForm => {
                editExpenseForm.classList.remove('hidden');
                transactions.forEach(transaction => {
                    if (transaction.id === parseFloat(editExpenseForm.id)) {
                        let edit_expense_date = document.getElementById('edit_expense_date');
                        let edit_expense_amount = document.getElementById('edit_expense_amount');
                        let edit_expense_store = document.getElementById('edit_expense_store');
                        
                        edit_expense_date.value = transaction.date;
                        edit_expense_amount.value = transaction.amount;
                        edit_expense_store.value = transaction.store;
                        edit_expense_category.value = transaction.category;
                    }
                })
            })

            editDepositForm.forEach(editDepositForm => {
                editDepositForm.classList.add('hidden');
            })
        } else {
            editDepositForm.forEach(editDepositForm => {
                editDepositForm.classList.remove('hidden');
                transactions.forEach(transaction => {
                    if (transaction.id === parseFloat(editDepositForm.id)) {
                        let edit_deposit_date = document.getElementById('edit_deposit_date');
                        let edit_deposit_amount = document.getElementById('edit_deposit_amount');
                        let edit_deposit_store = document.getElementById('edit_deposit_type');
                        let edit_deposit_category = document.getElementById('edit_deposit_category');
                        
                        edit_deposit_date.value = transaction.date;
                        edit_deposit_amount.value = transaction.amount;
                        edit_deposit_store.value = transaction.store;
                        edit_deposit_category.value = transaction.category;
                    }
                })
            })

            editExpenseForm.forEach(editExpenseForm => {
                editExpenseForm.classList.add('hidden');
            })
        }
    })
})

editExpenseForm.forEach(editExpenseForm => {
    editExpenseForm.onsubmit = () => {
        let edit_expense_date = document.getElementById('edit_expense_date').value;
        let edit_expense_amount = document.getElementById('edit_expense_amount').value;
        let edit_expense_store = document.getElementById('edit_expense_store').value;
        let edit_expense_category = document.getElementById('edit_expense_category').value;
    
        if (!edit_expense_date || !edit_expense_amount || !edit_expense_store || !edit_expense_category) {
            alert('Not Submitted! Please fill out all fields.');
        } else {
            for (let i = 0; i <= transactions.length - 1; i++) {
                if (transactions[i].id === parseFloat(editExpenseForm.id)) {
                    transactions[i].date = edit_expense_date;
                    transactions[i].amount = - edit_expense_amount;
                    transactions[i].store = edit_expense_store;
                    transactions[i].category = edit_expense_category
                }
            }
            location.reload();
            localStorage.setItem('data', JSON.stringify(transactions));
        }
    }
})


editDepositForm.forEach(editDepositForm => {
    editDepositForm.onsubmit = () => {
        let edit_deposit_date = document.getElementById('edit_deposit_date').value;
        let edit_deposit_amount = document.getElementById('edit_deposit_amount').value;
        let edit_deposit_store = document.getElementById('edit_deposit_type').value;
        let edit_deposit_category = document.getElementById('edit_deposit_category').value;
    
        if (!edit_deposit_date || !edit_deposit_amount || !edit_deposit_store || !edit_deposit_category) {
            alert('Not Submitted! Please fill out all fields.');
        } else {
            for (let i = 0; i <= transactions.length - 1; i++) {
                if (transactions[i].id === parseInt(editDepositForm.id)) {
                    transactions[i].date = edit_deposit_date;
                    transactions[i].amount = parseInt(edit_deposit_amount);
                    transactions[i].store = edit_deposit_store;
                    transactions[i].category = edit_deposit_category
                }
            }
            location.reload();
            localStorage.setItem('data', JSON.stringify(transactions));
        }
    }
})


const closeTransactions = document.querySelectorAll('.close-transactions');
const transactionDetailsAndButtons = document.querySelectorAll('.transaction-details-and-buttons'); 

closeTransactions.forEach(closeTransaction => {
    closeTransaction.addEventListener('click', () => {
        transactionDetailsModal.classList.add('hidden');
        allTransactionDetailsModal.classList.add('hidden');
        goalModal.classList.add('hidden');

        editTransaction.forEach(editTransaction => {
            editTransaction.removeAttribute('id');
        })
        editExpenseForm.forEach(editExpenseForm => {
            editExpenseForm.removeAttribute('id');
        })
        editDepositForm.forEach(editDepositForm => {
            editDepositForm.removeAttribute('id');
        })
    })
})

deleteButtons.forEach(deleteButton => {
    deleteButton.addEventListener('click', () => {
        areYouSure.forEach(youSure => {
            youSure.classList.remove('hidden');
        })
        transactionDetailsAndButtons.forEach(transDetailsAndButtons => {
            transDetailsAndButtons.classList.add('hidden');
        })
        
        disableNavClick([homeBtn, transactionsBtn, addTransactionBtn, chartBtn, savingsBtn]);
    })
})

noDelete.forEach(noDelete => {
    noDelete.addEventListener('click', () => {
        areYouSure.forEach(youSure => {
            youSure.classList.add('hidden');
        })
        transactionDetailsAndButtons.forEach(transDetailsAndButtons => {
            transDetailsAndButtons.classList.remove('hidden');
        })

        enableNavClick([homeBtn, transactionsBtn, addTransactionBtn, chartBtn, savingsBtn]);
    })
})



