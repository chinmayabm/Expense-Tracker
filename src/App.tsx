import { useState, useEffect } from "react";
import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";

const DUMMY_EXPENSES: any[] = [];

const App = () => {
  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);
  const [filteredYear, setFilteredYear] = useState("2021");

  useEffect(() => {
    fetch("http://localhost:4000/api/expenses")
      .then((res) => res.json())
      .then((data) => {
        const loaded = data.map((exp: any) => ({
          ...exp,
          date: new Date(exp.date),
        }));
        setExpenses(loaded);
      })
      .catch((err) => console.error(err));
  }, []);

  const addExpenseHandler = (expense) => {
    fetch("http://localhost:4000/api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(expense),
    })
      .then((res) => res.json())
      .then((saved) => {
        saved.date = new Date(saved.date);
        setExpenses((prev) => [saved, ...prev]);
        setFilteredYear(saved.date.getFullYear().toString());
      })
      .catch((err) => console.error(err));
  };

  const filterChangeHandler = (selectedYear) => {
    setFilteredYear(selectedYear);
  };

  return (
    <div>
      <h2>Let's get started!</h2>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses
        filteredYear={filteredYear}
        filterChange={filterChangeHandler}
        items={expenses}
      />
    </div>
  );
};

export default App;
