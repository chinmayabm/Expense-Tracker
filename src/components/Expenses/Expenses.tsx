import React, { useState } from "react";
import { Expense } from "../../App";
import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesList from "./ExpensesList";
import ExpensesChart from "./ExpensesChart";
import Switch from "../UI/Switch";
import "./Expenses.css";

interface Props {
  filteredYear: string;
  filterChange: (year: string) => void;
  items: Expense[];
  onDelete: (id: string) => void;
  onUpdate: (expense: Expense) => void;
}

const Expenses: React.FC<Props> = ({ filteredYear, filterChange, items, onDelete, onUpdate }) => {
  const [switchOn, setSwitchOn] = useState(false);

  const filterChangeHandler = (selectedYear: string) => {
    filterChange(selectedYear);
  };

  let filteredExpenses = items.filter((expense) => {
    return expense.date.getFullYear().toString() === filteredYear;
  });

  if (switchOn) {
    filteredExpenses.sort((a, b) => b.date.getTime() - a.date.getTime());
  } else {
    filteredExpenses.sort((a, b) => a.date.getTime() - b.date.getTime());
  }

  const switchClickHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSwitchOn(true);
    } else {
      setSwitchOn(false);
    }
  };

  return (
    <Card className="expenses">
      <ExpensesFilter
        selected={filteredYear}
        onChangeFilter={filterChangeHandler}
      />
      <ExpensesChart expenses={filteredExpenses} />
      <Switch switchClick={switchClickHandler} />
      <ExpensesList
        switchOn={switchOn}
        items={filteredExpenses}
        onDelete={onDelete}
        onUpdate={onUpdate}
      />
    </Card>
  );
};

export default Expenses;
