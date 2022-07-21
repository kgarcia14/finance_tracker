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
        // goalId: ,
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
    
    if (parseInt(goalLi.id) === goal.id) {
        const contributions = goal.goalContributions;
        const goalAmount = goal.goalAmount;  

        //show progress and percentage of progress
        let totalContributions = 0;
        let goalPercentage = 0;
        for (let i = 0; i <= contributions.length - 1; i++) {
            totalContributions += parseInt(contributions[i].amount);
        }
        goalPercentage = Math.round((totalContributions/goalAmount) * 100);
        
        goalLi.innerHTML = `
        <div class="goal-content-wrapper">
            <div class="name-and-progress-div">
                <p>${goal.name}</p>
                    <div class="progress-div">
                        <div class="progress-bar-div">
                            <div class="goal-amount-div">
                                <div class="total-progress-p-div">
                                    <p class="total-progress">${totalContributions}</p> / <p>$${goal.goalAmount}</p>
                                </div>
                                </div>
                                <div class="progress-bar-percentage-div">
                                <div class="progress-bar">
                                <div id=${goal.id} class="progress"></div>
                                </div>
                                <div class="progress-percentage">${goalPercentage}%</div>
                                </div>
                                </div>
                            </div>
                        </div>
                    <div>
                    <p id=${goal.id} class="goal-complete"></p>
            </div>
        </div>
        `;
        
        goalList.append(goalLi);
        
        //display percentage visual with progress bar
        const progress = document.querySelectorAll('.progress');
        const goalComplete = document.querySelectorAll('.goal-complete');

        const navBtns = document.querySelectorAll('.not-savings');

        navBtns.forEach(navBtn => {
            navBtn.addEventListener('click', () => {
                progress.forEach(progress => {
                    progress.style.width = `0`;
                })
                goalComplete.forEach(goalComplete => {
                    goalComplete.style.transform = '';
                })
            })
        })
        
        savingsBtn.addEventListener('click', () => {
            const progressFunctionality = () => {
                progress.forEach(progress => {
                    if (goalLi.id === progress.id && goalLi.id === progress.id) {
                        progress.style.width = `${goalPercentage}%`;
        
                        goalComplete.forEach(goalComplete => {
                            if (goalPercentage >= 100 && goalLi.id === goalComplete.id) {
                                goalComplete.innerHTML = '🎉';
                                goalComplete.style.transform = 'rotate(360deg)';
                            }
                        })
                    }
                })
            }
            setTimeout(progressFunctionality, 150)
        })
    }
});

if (!savingsGoals.length) {
   goalList.innerHTML = `
        <p class="start-adding-transactions">Start Adding Savings Goals!!!</p>
    `;
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

        goalDetails.innerHTML = '';

        yesDelete.forEach(yesDelete => {
            yesDelete.setAttribute('id', clickedGoalId);
        })

        contributeBtn.setAttribute('id', clickedGoalId);

        for (let i = 0; i <= savingsGoals.length - 1; i++) {
            if (savingsGoals[i].id === parseInt(clickedGoalId)) {
                const goal = savingsGoals[i];
                let contributionsArr = goal.goalContributions;
                console.log(goal);
                console.log(contributionsArr);

                //map through contributions and create a list of them
                contributionsArr.map(contribution => {
                    const li = document.createElement('li');

                    li.innerHTML = `
                        <div class="goal-li-wrapper">
                            <p>Contribution: $${contribution.amount}</p>
                            <button id="${contribution.id}" type="button" class="delete-contribution-btn">Remove</button>
                        </div>
                    `;

                    goalDetails.append(li);

                    //Delete contributions functionality 
                    const deleteContribution = document.querySelectorAll('.delete-contribution-btn');

                    deleteContribution.forEach(deleteContribution => {
                        deleteContribution.addEventListener('click', () => {
                            if (contribution.id === parseInt(deleteContribution.id)) {
                                console.log(contribution, deleteContribution.id);
                                let newContributionsArr = [...contributionsArr];
                                const indexOfGoal = newContributionsArr.findIndex(contribution => {
                                    return contribution.id === parseInt(deleteContribution.id);
                                })

                                if (indexOfGoal !== -1) {
                                    newContributionsArr.splice(indexOfGoal, 1);
                                    contributionsArr = newContributionsArr;
                                    goal.goalContributions = contributionsArr;
                                    localStorage.setItem('savingsData', JSON.stringify(savingsGoals));
                                }
                                console.log(contributionsArr);
                                location.reload();
                            }
                        })
                    })
                })

                if (!contributionsArr.length) {
                    goalDetails.innerHTML = `
                        <p>You have not contributed to this goal yet!<p>
                    `;
                }
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

//Contribute to savings goals
const contributeBtn = document.querySelector('.contribute-btn');
const contributeModal = document.querySelector('.contribute-modal-overlay');
const contributeForm = document.querySelector('.contribute-form');

contributeBtn.addEventListener('click', () => {
    contributeModal.classList.remove('hidden');
})

//Add and subtract when adding and removing goal contributions.
let allContributions = [];
let totalContributions = 0;
savingsGoals.map(savingsGoal => {
    const contributions = savingsGoal.goalContributions;

    contributions.forEach(contribution => {
        allContributions.push(contribution.amount);
        console.log(allContributions)

    })
})

for (let i = 0; i <= allContributions.length - 1; i++) {
    totalContributions += parseInt(allContributions[i]);
    console.log(totalContributions);
}

totalSavingsBalance = (totalSavingsBalance - totalContributions).toFixed(2);
console.log(totalSavingsBalance);

const savingsBalance = document.querySelector('.savings-balance');
if (totalSavingsBalance < 0) {
    savingsBalance.innerHTML = `- $ ${totalSavingsBalance.replace('-', '')}`
} else {
    savingsBalance.innerHTML = `$ ${totalSavingsBalance}`
}

contributeForm.onsubmit = (e) => {
    e.preventDefault();

    let contributionAmount = document.getElementById('contribution_amount').value;

    const contributionObj = {
        id: Date.now(),
        amount: contributionAmount,
    }

    if (parseInt(contributionAmount) > parseInt(totalSavingsBalance)) {
        alert('You will need to transfer more money into savings for this.');
    } else {
        for (let i = 0; i <= savingsGoals.length - 1; i++) {
            if (savingsGoals[i].id === parseInt(contributeBtn.id)) {
                console.log(savingsGoals[i]);
    
                savingsGoals[i].goalContributions.push(contributionObj);
            }
        }

        localStorage.setItem('savingsData', JSON.stringify(savingsGoals));

        location.reload();
    }
}

const totalSavingsAndContributions = parseInt(totalSavingsBalance) + parseInt(totalContributions);
localStorage.setItem('totalSavings', totalSavingsAndContributions);