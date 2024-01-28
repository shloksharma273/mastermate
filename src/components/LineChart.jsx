import React from "react";
import { Line, Pie } from "react-chartjs-2";
import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import { Box, Typography } from "@mui/material";

Chart.register(CategoryScale);

const LineChart = () => {
  const bodyParts = ["Elbow", "Knee", "Arms"];
  const totalSessionTime = 10; // Total session time in minutes
  const sessionTimes = [3, 8, 5]; // Session times for each body part

  // Calculate percentage of session time for each body part
  // const sessionTimePercentage = sessionTimes.map((time) => (time / totalSessionTime) * 100);

  const lineChartData = {
    labels: bodyParts,
    datasets: [
      {
        label: "Session Time",
        backgroundColor: [
          `rgba(255, 99, 132, 0.6)`,
          `rgba(75, 192, 192, 0.6)`,
          `rgba(255, 205, 86, 0.6)`,
        ],
        color: [
          `rgba(255, 99, 132, 1)`,
          `rgba(75, 192, 192, 1)`,
          `rgba(255, 205, 86, 1)`,
        ],
        borderWidth: 2,
        data: sessionTimes,
        stepped: true, // Use stepped line chart
      },
    ],
  };

  const pieChartData = {
    labels: bodyParts,
    datasets: [
      {
        data: sessionTimes,
        backgroundColor: [
          `rgba(255, 99, 132, 0.6)`,
          `rgba(75, 192, 192, 0.6)`,
          `rgba(255, 205, 86, 0.6)`,
        ],
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "category",
        position: "bottom",
      },
      y: {
        beginAtZero: true,
        max: totalSessionTime,
        ticks: {
          stepSize: 1,
        },
        title: {
          display: true,
          text: "Session Time (min)",
        },
      },
    },
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginLeft: "1rem", gap: "4rem", height: "100vh" }}>
      <Box sx={{ width: "100vw", height: "34rem" }}>
        <Typography variant="h6" gutterBottom>
          Line Chart
        </Typography>
        <Line type="line" data={lineChartData} options={options} />
      </Box>
      <Box sx={{ width: "70vw", height: "25rem" }}>
        <Typography variant="h6" gutterBottom>
          Pie Chart
        </Typography>
        <Pie type="pie" data={pieChartData} options={{ maintainAspectRatio: false }} />
      </Box>
    </Box>
  );
};

export default LineChart;
