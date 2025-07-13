// script.js

const form = document.getElementById('transaction-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeInput = document.getElementById('type');
const transactionList = document.getElementById('transaction-list');
const incomeTotal = document.querySelector('.total-income');
const expenseTotal = document.querySelector('.total-expenses');
const balanceTotal = document.querySelector('.balance-total');

let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
let editId = null;

// Render all saved transactions
transactions.forEach(renderTransaction);
updateSummary();

form.addEventListener('submit', function (e) {
    e.preventDefault();

    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const type = typeInput.value;

    if (!description || isNaN(amount)) return;

    const transaction = {
        id: editId ?? Date.now(),
        description,
        amount,
        type
    };

    if (editId) {
        const index = transactions.findIndex(t => t.id === editId);
        transactions[index] = transaction;
        editId = null;
    } else {
        transactions.push(transaction);
    }

    localStorage.setItem('transactions', JSON.stringify(transactions));
    renderTransactionsList();
    updateSummary();
    form.reset();
});

function renderTransactionsList() {
    transactionList.innerHTML = '';
    transactions.forEach(renderTransaction);
}

function renderTransaction(transaction) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${transaction.description} - $${transaction.amount} (${transaction.type})</span>
        <div>
            <button onclick="editTransaction(${transaction.id})">✏️</button>
            <button onclick="deleteTransaction(${transaction.id})">❌</button>
        </div>
    `;
    transactionList.appendChild(li);
}

function deleteTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    renderTransactionsList();
    updateSummary();
}

function editTransaction(id) {
    const transaction = transactions.find(t => t.id === id);
    descriptionInput.value = transaction.description;
    amountInput.value = transaction.amount;
    typeInput.value = transaction.type;
    editId = id;
}

function updateSummary() {
    const income = transactions.filter(t => t.type === 'Income')
        .reduce((sum, t) => sum + t.amount, 0);
    const expenses = transactions.filter(t => t.type === 'Expense')
        .reduce((sum, t) => sum + t.amount, 0);
    const balance = income - expenses;

    incomeTotal.textContent = `$${income}`;
    expenseTotal.textContent = `$${expenses}`;
    balanceTotal.textContent = `$${balance}`;
}
