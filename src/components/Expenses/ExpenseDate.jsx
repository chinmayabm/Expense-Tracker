import "./ExpenseDate.css";

const ExpenseDate = ({ date }) => {
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();
  const day = date.getDate();

  return (
    <div className="expense-date">
      <div className="expense-date_month">{month}</div>
      <div className="expense-date_year">{year}</div>
      <div className="expense-date_day">{day}</div>
    </div>
  );
};

export default ExpenseDate;
