'use strict';

//display transactions on home page and transctions page
//map through transactions to display each transaction
const allTransactionsList = document.querySelector('.all-transactions-list');

transactions.map(transaction => {
    const transactionLi = document.createElement('li');
    transactionLi.classList.add('all-transaction-list-item', transaction.type);
    transactionLi.setAttribute('id', transaction.id);
    let transactionAmount = transaction.amount.toFixed(2);
    // console.log(transactions);

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
                    transaction.type === 'expense' ? `
                        <p class="expense-list-item-amount">- $ ${transactionAmount.replace('-', '')}</p>
                    ` : `
                        <p class="deposit-list-item-amount">+ $ ${transactionAmount.replace('-', '')}</p>
                    `
                }
                </div>
            </div>
        `
    
    allTransactionsList.append(transactionLi);
})

if (!transactions.length) {
    allTransactionsList.innerHTML = `
    <p class="start-adding-transactions">Start Adding Transactions!!!</p>
    `
}

//View details of each transaction
const allTransactionsListItem= document.querySelectorAll('.all-transaction-list-item');
const allTransactionDetailsModal = document.querySelector('.all-transaction-details-modal');
const allTransactionDetails = document.querySelector('.all-transaction-details');

allTransactionsListItem.forEach(transactionItem => {
    transactionItem.addEventListener('click', () => {
        const clickedTransaction = transactionItem;
        const clickedTransactionId = transactionItem.id;
        allTransactionDetailsModal.classList.remove('hidden');
        yesDelete.forEach(yesDelete => {
            yesDelete.setAttribute('id', `${clickedTransactionId}`);
        })
        //change edit transaction id to confirmation button id
        editExpenseForm.forEach(editExpenseForm => {
            editExpenseForm.setAttribute('id', `${clickedTransactionId}`);
        })
        editDepositForm.forEach(editDepositForm => {
            editDepositForm.setAttribute('id', `${clickedTransactionId}`);
        })

        console.log(clickedTransactionId);

        for (let i = 0; i <= transactions.length - 1; i++) {
            if (transactions[i].id === parseInt(clickedTransactionId)) {
                const transaction = transactions[i];
                // clickedTransaction.classList.remove(transaction.type);
                console.log(clickedTransaction);
                
                allTransactionDetails.innerHTML = `
                    <ul>
                        <li><p>Amount:</p> <p>${transaction.amount}</p></li>
                        <li><p>Date:</p> <p>${transaction.date}</p></li>
                        <li><p>Merchant:</p> <p>${transaction.store}</p></li>
                        <li><p>Category:</p> <p>${transaction.category}</p></li>
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