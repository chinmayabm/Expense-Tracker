import React from "react";
import ExpenseItem from "./ExpenseItem";
import "./ExpensesList.css";
import { Expense } from "../../App";

interface Props {
  switchOn: boolean;
  items: Expense[];
  onDelete: (id: string) => void;
  onUpdate: (expense: Expense) => void;
}
const ExpensesList: React.FC<Props> = ({ switchOn, items, onDelete, onUpdate }) => {
  if (items.length === 0) {
    return <h2 className="expenses-list__fallback">Found no expenses.</h2>;
  }

  return (
    <ul className="expenses-list">
      {items.map((expense) => (
        <ExpenseItem
          key={expense._id}
          {...expense}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
};

export default ExpensesList;
