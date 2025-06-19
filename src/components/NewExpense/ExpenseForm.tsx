import React, { useState } from "react";
import "./ExpenseForm.css";
import { Expense } from "../../App";

interface Props {
  onSaveExpenseData: (exp: Expense) => void;
  onCancel: () => void;
  initialExpense?: { title: string; amount: number; date: Date };
}

const ExpenseForm: React.FC<Props> = ({ onSaveExpenseData, onCancel, initialExpense }) => {
  const [enteredTitle, setEnteredTitle] = useState(initialExpense?.title || "");
  const [enteredAmount, setEnteredAmount] = useState(initialExpense?.amount.toString() || "");
  const [enteredDate, setEneteredDate] = useState(
    initialExpense ? new Date(initialExpense.date).toISOString().slice(0, 10) : ""
  );

  const titleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredTitle(event.target.value);
  };
  const amountChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredAmount(event.target.value);
  };
  const dateChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEneteredDate(event.target.value);
  };

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const expenseData: Expense = {
      title: enteredTitle,
      amount: +enteredAmount,
      date: new Date(enteredDate),
    };

    onSaveExpenseData(expenseData);

    setEnteredTitle("");
    setEnteredAmount("");
    setEneteredDate("");
  };

  return (
    <form onSubmit={submitHandler}>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input
            type="text"
            onChange={titleChangeHandler}
            value={enteredTitle}
          />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input
            type="number"
            min="0.01"
            step="0.01"
            onChange={amountChangeHandler}
            value={enteredAmount}
          />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            type="date"
            min="2019-01-01"
            max="2022-12-31"
            onChange={dateChangeHandler}
            value={enteredDate}
          />
        </div>
        <div className="new-expense__actions">
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit">Add Expense</button>
        </div>
      </div>
    </form>
  );
};

export default ExpenseForm;
