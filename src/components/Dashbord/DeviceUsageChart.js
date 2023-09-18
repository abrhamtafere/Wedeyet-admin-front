import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

export const DeviceUsageChart = () => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    // Mock data for device usage
    const data = [
      { label: 'Mobile', value: 500 },
      { label: 'Desktop', value: 300 },
      { label: 'Tablet', value: 1005 },
      { label: 'Unknown', value: 1235 },
    ];

    // Destroy previous chart instance, if exists
    if (chartInstance.current !== null) {
      chartInstance.current.destroy();
    }

    // Calculate total visitors
    const totalVisitors = data.reduce((total, item) => total + item.value, 0);

    // Create the chart
    const ctx = chartContainer.current.getContext('2d');
    chartInstance.current = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: data.map((item) => item.label),
        datasets: [
          {
            data: data.map((item) => item.value),
            backgroundColor: [
              '#7c3aed',
              '#84cc16',
              '#2563eb',
              '#06b6d4',
            ],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true, // Hide the legend
            position: 'bottom',
          },
          tooltip: {
            enabled: true, // Disable tooltip
          },
          doughnutlabel: {
            display: true,
            labels: [
              {
                text: totalVisitors.toString(),
                font: {
                  size: '40',
                  weight: 'bold',
                },
              },
              {
                text: 'Total Visitors',
                font: {
                  size: '16',
                },
              },
            ],
          },
        },
      },
      plugins: [
        {
          id: "center-label",
          beforeDraw: (chart) => {
            const width = chart.width;
            const height = chart.height;
            const ctx = chart.ctx;
      
            ctx.restore();
            const fontSize1 = (height / 150).toFixed(2);
            const fontSize2 = (height / 250).toFixed(2);
            ctx.font = fontSize1 + "em sans-serif";
            ctx.textBaseline = "middle";
            const text1 = totalVisitors.toString();
            const text2 = "Visitors";
            const textWidth1 = ctx.measureText(text1).width;
            const textWidth2 = ctx.measureText(text2).width;
            const textX1 = Math.round((width - textWidth1) / 2);
            const textX2 = Math.round((width - textWidth2) / 2 + 15);
            const textY1 = height / 2 - fontSize1 / 2 - 35;
            const textY2 = height / 2 + fontSize2 / 2 - 15;
            
            ctx.fillStyle = "black";
            ctx.font = `bold ${fontSize1}em sans-serif`;
            ctx.fillText(text1, textX1, textY1);
      
            ctx.fillStyle = "lightgray";
            ctx.font = `bold ${fontSize2}em sans-serif`;            
            ctx.fillText(text2, textX2, textY2);
      
            ctx.save();
          },
        },
      ],
    });
  }, []);

  return (
    <div className="bg-white p-4">
      <canvas ref={chartContainer}></canvas>
    </div>
  );
};