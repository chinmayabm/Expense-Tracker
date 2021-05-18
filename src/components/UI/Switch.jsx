import "./Switch.css";

const Switch = ({ switchClick }) => {
  return (
    <div className="expenses-filter">
      <div className="expenses-filter__control">
        <label>Sort by Date</label>
        <label className="switch">
          <input onChange={switchClick} type="checkbox" />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  );
};

export default Switch;
