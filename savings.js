'use strict';
const addSavings = document.querySelector('.add-savings')
const testTransfer = () => {
    let transfer = {
        id: Date.now(),
        type: 'transfer',
        test2: 'test2',
        amount: - 10,
        test4: 'test4',
    }

    transactions.push(transfer);
    console.log(transactions)
    localStorage.setItem('data', JSON.stringify(transactions));
    
    location.reload();
}

addSavings.addEventListener('click', () => {
    testTransfer();
})