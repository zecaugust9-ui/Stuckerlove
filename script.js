// Budget Planner Functionality for script.js

// Initialize an empty array to store transactions
let transactions = [];

// Load transactions from localStorage
function loadTransactions() {
    const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    transactions = storedTransactions;
    renderTransactions();
}

// Save transactions to localStorage
function saveTransactions() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Add transaction
function addTransaction(transaction) {
    transactions.push(transaction);
    saveTransactions();
    renderTransactions();
}

// Delete transaction
function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    saveTransactions();
    renderTransactions();
}

// Calculate totals
function calculateTotal() {
    return transactions.reduce((total, transaction) => total + transaction.amount, 0);
}

// Filter transactions by category
function filterByCategory(category) {
    return transactions.filter(transaction => transaction.category === category);
}

// Render transactions
function renderTransactions() {
    const transactionList = document.getElementById('transactionList');
    transactionList.innerHTML = '';
    transactions.forEach(transaction => {
        const transactionItem = document.createElement('li');
        transactionItem.textContent = `${transaction.date}: ${transaction.description} - $${transaction.amount} (${transaction.category})`;
        transactionItem.appendChild(createDeleteButton(transaction.id));
        transactionList.appendChild(transactionItem);
    });
    updateTotalDisplay();
    renderChart();
}

// Create a delete button for a transaction
function createDeleteButton(id) {
    const button = document.createElement('button');
    button.textContent = 'Delete';
    button.onclick = () => deleteTransaction(id);
    return button;
}

// Update total display
function updateTotalDisplay() {
    const totalDisplay = document.getElementById('totalDisplay');
    totalDisplay.textContent = `Total: $${calculateTotal()}`;
}

// Render chart (placeholder function)
function renderChart() {
    // Chart rendering logic goes here...
}

// Event listeners and initialization
document.getElementById('addTransactionForm').onsubmit = (e) => {
    e.preventDefault();
    const transaction = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        description: e.target.description.value,
        amount: parseFloat(e.target.amount.value),
        category: e.target.category.value
    };
    addTransaction(transaction);
    e.target.reset();
};

// Load transactions on page load
window.onload = loadTransactions();