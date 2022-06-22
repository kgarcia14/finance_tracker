'use strict';
const transferForm = document.querySelector('.transfer-form');

transferForm.onsubmit = (e) => {
    e.preventDefault();

    let transfer_type = document.getElementById('transfer_type').value;
    let transfer_date = document.getElementById('transfer_date').value;
    let transfer_amount = parseInt(document.getElementById('transfer_amount').value);

    let transferSubmission = {
        id: Date.now(),
        type: transfer_type,
        date: transfer_date,
        amount: transfer_type === 'toSavings' ? - transfer_amount : parseInt(transfer_amount),
    }

    console.log(transferSubmission.amount);
    console.log(transferSubmission);
    console.log(totalSavingsBalance);

    if (transfer_type === 'toSavings' && totalBalance < transfer_amount) {
        alert('You are brokeeeee! Try again when you have more money');
        modal.classList.toggle('hidden');
    } else if (transfer_type === 'fromSavings' && totalSavingsBalance < transfer_amount) {
        alert('Your transfer amount exceeds your savings balance!');
        modal.classList.toggle('hidden');
    } else {
        transactions.push(transferSubmission);
        console.log(transactions)
        localStorage.setItem('data', JSON.stringify(transactions));
    
        alert('Transfer Submitted Successfully!');
        location.reload();
    }
};

let totalSavingsBalance = 0;
for(let i = 0; i <= transactions.length - 1; i++) {
    if (transactions[i].type === 'toSavings' || transactions[i].type === 'fromSavings') {
        totalSavingsBalance -= transactions[i].amount;
    }
}
console.log(totalSavingsBalance);
totalSavingsBalance = totalSavingsBalance.toFixed(2);

const savingsBalance = document.querySelector('.savings-balance');
if (totalSavingsBalance < 0) {
    savingsBalance.innerHTML = `- $ ${totalSavingsBalance.replace('-', '')}`
} else {
    savingsBalance.innerHTML = `$ ${totalSavingsBalance}`
}