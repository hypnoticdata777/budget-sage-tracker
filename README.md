# Budget Sage Tracker 

Welcome to **Budget Sage**, a clean, simple, and intuitive web app to help you track your income and expenses.

Built with **HTML**, **TailwindCSS**, and **JavaScript** — this is the first official entry in my coding portfolio.

---

![HTML](https://img.shields.io/badge/HTML-5-orange)
![CSS](https://img.shields.io/badge/TailwindCSS-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)
![localStorage](https://img.shields.io/badge/localStorage-active-success)
![Status](https://img.shields.io/badge/status-in%20progress-blue)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

---

##  Features

-  Add transactions (income or expenses)
-  Edit transactions in-place
-  Delete individual entries
-  Persistent storage using `localStorage`
-  Live summary of Total Income, Expenses, and Balance
-  Clean and responsive UI using TailwindCSS
-  Pie Chart (using Chart.js) — Income vs Expenses
-  Timestamps stored on creation (not saved yet)

---

##  Tech Stack

| Tech           | Use                                 |
|----------------|--------------------------------------|
| HTML           | Page structure                       |
| Tailwind CSS   | Styling and layout                   |
| JavaScript     | Logic and functionality              |
| localStorage   | Data persistence (no backend yet)    |
| Chart.js       | Data visualization                   |

---

##  Core Logic

Transactions are stored as an array of objects like this:

```js
{
  id: 1698349144921,
  description: "Pago mamá",
  amount: 1000,
  type: "Expense",
  timestamp: "2025-07-20T20:34:50"
}
Actions Supported:
addTransaction() → Validates form, stores new data

editTransaction(id) → Replaces existing object with edits

deleteTransaction(id) → Filters out by id

updateSummary() → Recalculates income, expense, and balance

renderPieChart() → Updates income vs expense visualization
How to Run
Clone this repo

Open index.html in your browser

Start tracking your transactions!
Roadmap
 1. Persist timestamps in localStorage (currently only visible on creation)

 2. Connect Pie Chart to transaction history dynamically

 3. Add collapsible Loans section

 4. Add dark/light theme switcher

 5. Optimize mobile-first design and deploy via GitHub Pages

 6. Save user preferences in localStorage

 7. Connect to backend (Node.js + MongoDB or Firebase)

