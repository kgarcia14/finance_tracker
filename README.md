# Finance Tracker
##### *[Click Here](https://financetracker.kurtisgarcia.dev) for live site*

The purpose of this project is to allow users to keep track of their finances. FinanceTracker allows users to add, edit, delete, and view transactions such as deposits, expenses, and trasfer to and from the savings section. Users can also create savings goals with a target amount to contribute towards. 


### How To Use

- ##### *Bottom Navbar:*
    - Click "home" button to go to dashboard page.
    - Click "transaction" button to go to transactions page.
    - Click "add" button on navbar to add a transaction(expense, deposit, and transer).
    - Click "chart" button to go to statistics page.
    - Click "piggy bank" button to go to savings page.

- ##### *Dashboard page:*
    - Get an overview of your finances.
    - View your total balance.
    - Get a visual of the percentage of money spent on each expense category.
    - View the 10 most recent transactions.
    - Click on each transaction to view/edit details or delete transaction.

- ##### *Transactions page:*
    - View your total balance.
    - View all transactions.
    - Click on each transaction to view/edit details or delete transaction.

- ##### *Statistics page:*

    - View your total balance.
    - Get a "pie chart" visual comparison of expenses, income, and savings. 
    - View amount of money spent on each category and amount of money in savings.

- ##### *Savings page:*

    - View your savings balance.
    - Click "add" button at top right of screen to add a savings goal and goal amount.
    - Click on 


### Motivation
The motivation for this project came from being around friends and wanting to try new cocktails. I thought it would be cool to add a feature where if a user clicks on a type of alcohol, they will get a list of different cocktails that include that particular type of alcohol in its recipe.


### Challenges and Solutions
One of the bigger challenges I had was getting each unique cocktail to display in the popup modal when "view details" was clicked. When I would click "view details" the first cocktail in the list would show regardless of which cocktail I was selecting. I was correct in passing down the mapped cocktail object as a prop into the modal. I thought this is all i needed in order to have access to it in the modal. However, I was not passing the cocktail prop into the modal function that opens the modal when button is clicked. After hours of debugging and googling, I was able to solve this. 


### Screenshots
<div>
<img src="./images/readme_screenshots/dashboard-screenshot.jpg" width="120" height="240" alt="dashboard page"/>

<img src="./images/readme_screenshots/deposit-screenshot.jpg" width="120" height="240" alt="deposit details"/>

<img src="./images/readme_screenshots/transactions-screenshot.jpg" width="120" height="240" alt="transactions page"/>

<img src="./images/readme_screenshots/expense-screenshot.jpg" width="120" height="240" alt="expense-details"/>

<img src="./images/readme_screenshots/stats1-screenshot.jpg" width="120" height="240" alt="statistics page"/>

<img src="./images/readme_screenshots/stats2-screenshot.jpg" width="120" height="240" alt="statistics page"/>

<img src="./images/readme_screenshots/transfer-screenshot.jpg" width="120" height="240" alt="transfer details"/>

<img src="./images/readme_screenshots/savings-screenshot.jpg" width="120" height="240" alt="savings page"/>
</div>

### Features
- Users can search for different cocktails by cocktail name or part of cocktail name.
- Users can view cocktail recipe in a popup modal which contains cocktail ingredients as well as directions to make the cocktail.
- Users can search for cocktails by the type of alcohol the cocktails contain. 
- Users can save cocktails to "favorites" as well as remove them.
- Users are able to view application in "dark mode" for a more comfortable viewing experience.


**Technologies Used:**
- [React](https://reactjs.org/)
- [React-Router](https://reactrouter.com/)
- [Styled-Components](https://styled-components.com/)
- [TheCocktailDB API](https://www.thecocktaildb.com/)
- [Axios](https://axios-http.com/docs/intro)
- [Material UI](https://mui.com/)