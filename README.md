# Budget Sage Tracker

Welcome to **Budget Sage**, a clean, simple, and intuitive web app to help you track your income and expenses.  
Built with HTML, TailwindCSS, and JavaScript — this is the first official entry in my coding portfolio.

---

## Features

-  Add transactions (income or expenses)
-  Edit transactions in-place
-  Delete individual entries
-  Persistent storage using `localStorage`
- Live summary of Total Income, Expenses, and Balance
- Clean and responsive UI using TailwindCSS

---

## Tech Stack

| Tech         | Use                              |
|--------------|-----------------------------------|
| HTML         | Page structure                    |
| Tailwind CSS | Styling and layout                |
| JavaScript   | Logic and functionality           |
| localStorage | Data persistence (no backend yet) |

---

## Core Logic

Transactions are stored as an array of objects like this:

```js
{
  id: 1698349144921,
  description: "Pago mamá",
  amount: 1000,
  type: "Expense"
}
Actions Supported:
addTransaction() → Validates form, stores new data

editTransaction(id) → Replaces existing object with edits

deleteTransaction(id) → Filters out by ID

updateSummary() → Recalculates income, expense, and balance

Data saved to and loaded from localStorage
 How to Run
Clone this repo

Open index.html in your browser

Start tracking your transactions!
