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

    if (!transfer_type || !transfer_date || !transfer_amount) {
        alert('Not Submitted! Please fill out all fields.');
    } else {
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
        
            location.reload();
        }
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

//Create Savings Goals
const addGoalBtn = document.querySelector('.add-savings-goal-btn');
const savingsModal = document.querySelector('.savings-modal-overlay');
const savingsForm = document.querySelector('.savings-goal-form');

addGoalBtn.addEventListener('click', () => {
    show([savingsModal]);

    // if modal does not contain element then...else...
    if(!savingsModal.classList.contains('hidden')) {
        disableNavClick([homeBtn, transactionsBtn, addTransactionBtn, chartBtn, savingsBtn]);
    } else {
        enableNavClick([homeBtn, transactionsBtn, addTransactionBtn, chartBtn, savingsBtn]);
    }
});

//save and fetch localstorage (must check if null first and if null then set item to empty array)
if(localStorage.getItem('savingsData') === null) {
    localStorage.setItem('savingsData', '[]');
}

let savingsGoals = JSON.parse(localStorage.getItem('savingsData'));
console.log(savingsGoals);

savingsForm.onsubmit = (e) => {
    e.preventDefault();

    let savings_name = document.getElementById('savings_name').value;
    let goal_amount = document.getElementById('goal_amount').value;
     
    let savingsGoalSubmission = {
        id: Date.now(),
        name: savings_name,
        goalAmount: +goal_amount,
        goalContributions: [],
    }

    savingsGoals.push(savingsGoalSubmission);
    console.log(savingsGoals);

    localStorage.setItem('savingsData', JSON.stringify(savingsGoals));
    
    inputs.forEach(input => {
        input.value = '';
    });

    location.reload();
}

//Display savings goals in a list
const goalList = document.querySelector('.savings-goals-list');

savingsGoals.map(goal => {
    const goalLi = document.createElement('li');
    goalLi.classList.add('goal-list-item');
    goalLi.setAttribute('id', goal.id);
    
    goalLi.innerHTML = `
    <div class="goal-content-wrapper">
        <div class="name-and-progress-div">
            <p>${goal.name}</p>
            <div class="progress-div">
                <div class="progress-bar-div">
                    <div class="goal-amount-div">
                        <p>$0 / $${goal.goalAmount}</p>
                    </div>
                    <div class="progress-bar-percentage-div">
                        <div class="progress-bar">
                            <div class="progress"></div>
                        </div>
                        <div class="progress-percentage">50%</div>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <button id=${goal.id} type="button" class="delete-btn delete-goal-btn"><i class="fa-regular fa-trash-can"></i></button>
        </div>
    </div>
    `;
    
    goalList.append(goalLi);
});

if (!savingsGoals.length) {
   goalList.innerHTML = `
        <p class="start-adding-transactions">Start Adding Savings Goals!!!</p>
    `
}

//Display savings goal details
const goalListItem = document.querySelectorAll('.goal-list-item');
const goalModal = document.querySelector('.goal-details-modal');
const goalDetails = document.querySelector('.savings-goal-details');
const goalDeleteBtn = document.querySelector('.goal-delete-btn');
const goalDetailsAndButtons = document.querySelector('.goal-details-and-buttons');

goalListItem.forEach(goalItem => {
    goalItem.addEventListener('click', () => {
        const clickedGoalId = goalItem.id;

        goalModal.classList.remove('hidden');

        yesDelete.forEach(yesDelete => {
            yesDelete.setAttribute('id', clickedGoalId);
        })

        for (let i = 0; i <= savingsGoals.length - 1; i++) {
            if (savingsGoals[i].id === parseInt(clickedGoalId)) {
                const goal = savingsGoals[i];
                goalDetails.innerHTML = `
                <div>${goal.id}</div>
                <div>${goal.name}</div>
                <div>${goal.goalAmount}</div>
            `;
            }
        }

    })
})

//Delete goals functionality
goalDeleteBtn.addEventListener('click', () => {
    areYouSure.forEach(areYouSure => {
        areYouSure.classList.remove('hidden');
    })
    goalDetailsAndButtons.classList.add('hidden');

    disableNavClick([homeBtn, transactionsBtn, addTransactionBtn, chartBtn, savingsBtn]);
})

noDelete.forEach(noDelete => {
    noDelete.addEventListener('click', () => {
        areYouSure.forEach(youSure => {
            youSure.classList.add('hidden');
        })
        goalDetailsAndButtons.classList.remove('hidden');
    })
})

yesDelete.forEach(yesDelete => {
    yesDelete.addEventListener('click', () => {
        for (let i = 0; i <= savingsGoals.length - 1; i++) {
            if (savingsGoals[i].id === parseInt(yesDelete.id)) {
                let newGoalsArr = [...savingsGoals];
                const indexOfGoal = newGoalsArr.findIndex(goal => {
                    //Return index if goal.id === deleteGoal.id
                    return goal.id === parseInt(yesDelete.id);
                })

                if (indexOfGoal !== -1) {
                    newGoalsArr.splice(indexOfGoal, 1);
                    savingsGoals = newGoalsArr;
                    localStorage.setItem('savingsData', JSON.stringify(savingsGoals));
                }
                location.reload();
            }
        }
    })
})