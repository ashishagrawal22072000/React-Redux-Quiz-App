import React from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(...registerables);

export default function Chart({ data, label }) {
  return (
    <div>
      <Bar
        data={{
          labels: label,
          datasets: [
            {
              label: "Score",
              data: data,

              backgroundColor: ["#581b98"],
            },
          ],
        }}
        height={300}
        width={50}
        options={{
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
}
