import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export const VisitorsAnalyticsChart = () => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Generate random data for the chart (replace with your own data)
    const labels = ['January', 'February', 'March', 'April', 'May', 'June'];
    const data = [65, 59, 80, 81, 56, 55];

    // Destroy previous chart instance, if exists
    if (chartInstance.current !== null) {
      chartInstance.current.destroy();
    }

    // Create the chart
    const ctx = chartContainer.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [
          {
            label: 'Visitors',
            data,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, []);

  return (
    <div className="bg-white p-4 ">
      <canvas ref={chartContainer} ></canvas>
    </div>
  );
};