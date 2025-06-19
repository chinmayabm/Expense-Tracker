import React, { useState } from "react";
import axios from "axios";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";
import ExpenseForm from "../NewExpense/ExpenseForm";
import "./ExpenseItem.css";
import { Expense } from "../../App";

interface Props extends Expense {
  onDelete: (id: string) => void;
  onUpdate: (expense: Expense) => void;
}

const ExpenseItem: React.FC<Props> = ({ _id, title, amount, date, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);

  const deleteHandler = () => {
    if (!_id) return;
    axios.delete(`/api/expenses/${_id}`).then(() => onDelete(_id));
  };

  const saveExpenseDataHandler = (updated: Expense) => {
    if (!_id) return;
    axios
      .put(`/api/expenses/${_id}`, updated)
      .then((res) => ({ ...res.data, date: new Date(res.data.date) }))
      .then((saved) => {
        onUpdate(saved as Expense);
        setIsEditing(false);
      });
  };

  return (
    <li>
      <Card className="expense-item">
        {isEditing ? (
          <ExpenseForm
            onSaveExpenseData={saveExpenseDataHandler}
            onCancel={() => setIsEditing(false)}
            initialExpense={{ title, amount, date }}
          />
        ) : (
          <>
            <ExpenseDate date={date} />
            <div className="expense-item__description">
              <h2>{title}</h2>
              <div className="expense-item__price">${amount}</div>
            </div>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={deleteHandler}>Delete</button>
          </>
        )}
      </Card>
    </li>
  );
};

export default ExpenseItem;
