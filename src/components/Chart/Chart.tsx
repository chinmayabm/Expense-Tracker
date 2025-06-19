import React from "react";
import ChartBar from "./ChartBar";
import "./Chart.css";

export interface DataPoint {
  label: string;
  value: number;
}

interface Props {
  dataPoints: DataPoint[];
}

const Chart: React.FC<Props> = ({ dataPoints }) => {
  const dataPointValues = dataPoints.map((dataPoint) => dataPoint.value);
  const totalMax = Math.max(...dataPointValues);

  return (
    <div className="chart">
      {dataPoints.map((dataPoint) => (
        <ChartBar
          key={dataPoint.label}
          value={dataPoint.value}
          maxValue={totalMax}
          label={dataPoint.label}
        />
      ))}
    </div>
  );
};

export default Chart;
