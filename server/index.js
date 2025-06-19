const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

let expenses = [
  { id: 'e1', title: 'Toilet Paper', amount: 94.12, date: '2020-08-14' },
  { id: 'e2', title: 'New TV', amount: 799.49, date: '2021-03-12' },
  { id: 'e3', title: 'Car Insurance', amount: 294.67, date: '2021-03-28' },
  { id: 'e4', title: 'New Desk (Wooden)', amount: 450, date: '2021-06-12' }
];

app.get('/api/expenses', (req, res) => {
  res.json(expenses);
});

app.post('/api/expenses', (req, res) => {
  const expense = req.body;
  expense.id = `e${expenses.length + 1}`;
  expenses.push(expense);
  res.status(201).json(expense);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
