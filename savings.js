'use strict';
const transferForm = document.querySelector('.transfer-form');

transferForm.onsubmit = (e) => {
    e.preventDefault();

    let transfer_type = document.getElementById('transfer_type').value;
    let transfer_date = document.getElementById('transfer_date').value;
    let transfer_amount = document.getElementById('transfer_amount').value;

    let transferSubmission = {
        id: Date.now(),
        type: transfer_type,
        date: transfer_date,
        amount: - transfer_amount,
    }

    console.log(transferSubmission.amount);
    console.log(transferSubmission);

    transactions.push(transferSubmission);
    console.log(transactions)
    localStorage.setItem('data', JSON.stringify(transactions));

    location.reload();
};

// const addSavings = document.querySelector('.add-savings')
// const testTransfer = () => {
//     let transfer = {
//         id: Date.now(),
//         type: 'transfer',
//         test2: 'test2',
//         amount: - 10,
//         test4: 'test4',
//     }

//     transactions.push(transfer);
//     console.log(transactions)
//     localStorage.setItem('data', JSON.stringify(transactions));
//     location.reload();
// }

// addSavings.addEventListener('click', () => {
//     testTransfer();
// })