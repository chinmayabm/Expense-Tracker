import React, { useState, useEffect } from "react";
import axios from "axios";
import Expenses from "./components/Expenses/Expenses";
import NewExpense from "./components/NewExpense/NewExpense";

export interface Expense {
  _id?: string;
  title: string;
  amount: number;
  date: Date;
}

const App = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filteredYear, setFilteredYear] = useState<string>("2021");

  useEffect(() => {
    axios.get<Expense[]>("/api/expenses").then((res) => {
      const loaded = res.data.map((e) => ({ ...e, date: new Date(e.date) }));
      setExpenses(loaded);
    });
  }, []);

  const addExpenseHandler = (expense: Expense) => {
    axios.post<Expense>("/api/expenses", expense).then((res) => {
      const saved = { ...res.data, date: new Date(res.data.date) };
      setExpenses((prevExpenses) => [saved, ...prevExpenses]);
      setFilteredYear(saved.date.getFullYear().toString());
    });
  };

  const deleteExpenseHandler = (id: string) => {
    setExpenses((prev) => prev.filter((exp) => exp._id !== id));
  };

  const updateExpenseHandler = (expense: Expense) => {
    setExpenses((prev) => prev.map((e) => (e._id === expense._id ? expense : e)));
  };

  const filterChangeHandler = (selectedYear: string) => {
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
        onDelete={deleteExpenseHandler}
        onUpdate={updateExpenseHandler}
      />
    </div>
  );
};

export default App;
