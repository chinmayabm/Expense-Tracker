import { useState } from "react";
import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesList from "./ExpensesList";
import ExpensesChart from "./ExpensesChart";
import Switch from "../UI/Switch";
import "./Expenses.css";

const Expenses = ({ filteredYear, filterChange, items }) => {
  const [switchOn, setSwitchOn] = useState(false);

  const filterChangeHandler = (selectedYear) => {
    filterChange(selectedYear);
  };

  let filteredExpenses = items.filter((expense) => {
    return expense.date.getFullYear().toString() === filteredYear;
  });

  if (switchOn) {
    filteredExpenses.sort((a, b) => b.date - a.date);
  } else {
    filteredExpenses.sort((a, b) => a.date - b.date);
  }

  const switchClickHandler = (event) => {
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
      <ExpensesList switchOn={switchOn} items={filteredExpenses} />
    </Card>
  );
};

export default Expenses;
