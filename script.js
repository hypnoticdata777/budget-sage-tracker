document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('transaction-form');
  const descriptionInput = document.getElementById('description');
  const amountInput = document.getElementById('amount');
  const typeInput = document.getElementById('type');
  const transactionList = document.getElementById('transaction-list');
  const incomeDisplay = document.getElementById('income');
  const expensesDisplay = document.getElementById('expenses');
  const balanceDisplay = document.getElementById('balance');

  let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

  function saveTransactions() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }

  function renderTransactions() {
    transactionList.innerHTML = '';
    transactions.forEach((transaction, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${transaction.description} - $${transaction.amount}</span>
        <span class="date">${transaction.date}</span>
        <button class="delete-btn" onclick="deleteTransaction(${index})">❌</button>
      `;
      transactionList.appendChild(li);
    });
  }

function updateSummary() {
  const totalIncome = transactions
    .filter(t => t.type.toLowerCase() === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions
    .filter(t => t.type.toLowerCase() === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpenses;

  incomeDisplay.textContent = `$${totalIncome.toFixed(2)}`;
  expensesDisplay.textContent = `$${totalExpenses.toFixed(2)}`;
  balanceDisplay.textContent = `$${balance.toFixed(2)}`;

  renderChart(totalIncome, totalExpenses);
}


  function deleteTransaction(index) {
    transactions.splice(index, 1);
    saveTransactions();
    renderTransactions();
    updateSummary();
  }

  window.deleteTransaction = deleteTransaction;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value.trim());
    const type = typeInput.value;

    if (!description || isNaN(amount)) {
      alert('Please enter a valid description and amount');
      return;
    }

    const today = new Date();
    const dateString = today.toISOString().split('T')[0];

    transactions.push({
      description,
      amount,
      type,
      date: dateString
    });

    saveTransactions();
    renderTransactions();
    updateSummary();

    form.reset();
  });

  renderTransactions();
  updateSummary();
});

// === PIE CHART SECTION ===
let chart;

function renderChart(income, expense) {
  const ctx = document.getElementById('budgetChart').getContext('2d');

  if (chart) {
    chart.destroy(); // Avoid duplicate charts
  }

  chart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Income', 'Expenses'],
      datasets: [{
        data: [income, expense],
        backgroundColor: ['#4CAF50', '#F44336'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
        }
      }
    }
  });
}
