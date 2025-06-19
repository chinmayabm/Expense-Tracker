const express = require('express');
const Expense = require('../models/Expense');

const router = express.Router();

// Get all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new expense
router.post('/', async (req, res) => {
  const { title, amount, date } = req.body;
  try {
    const expense = new Expense({ title, amount, date });
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an expense
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, amount, date } = req.body;
  try {
    const expense = await Expense.findByIdAndUpdate(
      id,
      { title, amount, date },
      { new: true }
    );
    res.json(expense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an expense
router.delete('/:id', async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
