
// ===== GLOBALS =====
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
let editId = null;

// ===== DOM ELEMENTS =====
const form = document.querySelector("form");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const transactionList = document.getElementById("transaction-list");
const incomeTotal = document.getElementById("income-total");
const expenseTotal = document.getElementById("expense-total");
const balanceTotal = document.getElementById("balance-total");

// ===== UPDATE SUMMARY =====
function updateSummary() {
  const income = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + t.amount, 0);
  const expenses = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = income - expenses;

  incomeTotal.textContent = `$${income}`;
  expenseTotal.textContent = `$${expenses}`;
  balanceTotal.textContent = `$${balance}`;
}

// ===== RENDER TRANSACTION =====
function renderTransaction(transaction) {
  const li = document.createElement("li");
  li.className = `transaction ${transaction.type.toLowerCase()}`;

  // Generate formatted date
  const date = new Date(transaction.date || Date.now());
  const formattedDate = date.toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short'
  });

  li.innerHTML = `
    <span>${transaction.description}</span>
    <span>$${transaction.amount}</span>
    <span class="type">${transaction.type}</span>
    <small class="timestamp">🕓 ${formattedDate}</small>
    <button onclick="deleteTransaction(${transaction.id})">❌</button>
  `;

  transactionList.appendChild(li);
}

// ===== SAVE TRANSACTIONS TO LOCALSTORAGE =====
function saveTransactions() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// ===== DELETE TRANSACTION =====
function deleteTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  saveTransactions();
  renderAllTransactions();
  updateSummary();
}

// ===== RENDER ALL TRANSACTIONS =====
function renderAllTransactions() {
  transactionList.innerHTML = "";
  transactions.forEach(renderTransaction);
}

// ===== FORM SUBMIT =====
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const description = descriptionInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const type = typeInput.value;

  if (!description || isNaN(amount)) return;

  const newTransaction = {
  id: Date.now(),
  description,
  amount,
  type,
  date: new Date().toISOString() //  This line adds the creation time
};


  transactions.push(newTransaction);
  saveTransactions();
  renderTransaction(newTransaction);
  updateSummary();

  form.reset();
});

// ===== THEME TOGGLE =====
const toggleBtn = document.getElementById("toggle-theme");
const body = document.body;

document.addEventListener(`DOMContentLoaded`, () => {
  // Dummy values for now (we´ll make them dynamic later)
  let income = 500;
  let expenses = 300;

  const ctx = document.getElementById(`budgetChart`).getContext (`2d`);

  const budgetChart = new Chart(ctx, {
    type: `pie`,
    data: {
      labels: [`Income`, `Expenses`],
      datasets: [{
        label: `Budget Overview`,
        data: [income, expenses],
        backgroundColor: [`#36A2EB`, `#FF6384`],
        borderColor: [`#ffffff`, `#ffffff`],
        borderWidth: 1

      }]

    },
    options: {
      responsive: true,
      plgins: {
        legend: {
          position: `bottom`,
          labels: {
            color:`#333`,
            font: {
              size: 14
            }
          }
        },
        title: {
          display:true,
          text: `Income vs Expense`,
          font: {
            size: 16
          }
        }
      }
    }
  });
});
