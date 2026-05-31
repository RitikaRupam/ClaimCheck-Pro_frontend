import React, { useEffect, useState } from "react";
import { getAnalytics } from "../api";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

function Dashboard() {
  const [data, setData] = useState({});
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    getAnalytics()
      .then((res) => {
        const apiData = res.data || {};
        setData(apiData);

        // Prepare chart data safely
        const errors = apiData.errors || {};
        const chart = Object.keys(errors).map((key) => ({
          name: key,
          count: errors[key],
        }));

        setChartData(chart);
      })
      .catch((err) => {
        console.error("Error fetching analytics:", err);
      });
  }, []);

  return (
    <div style={{ marginTop: "20px" }}>
      <h2>📊 Dashboard</h2>

      {/* KPI Cards */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <Card title="Total Claims" value={data.total} />
        <Card title="Approved" value={data.approved} />
        <Card title="Rejected" value={data.rejected} />
        <Card title="Review" value={data.review} />
        <Card title="Acceptance %" value={format(data.acceptanceRate)} />
        <Card
          title="Rejection %"
          value={(data?.rejectionRate ?? 0).toFixed(2)}
        />
      </div>

      {/* Extra KPIs */}
      <div style={{ marginTop: "20px" }}>
        <p>
          <b>Top Error:</b> {data.topError || "N/A"}
        </p>
        <p>
          <b>Top Error Contribution:</b> {format(data.topErrorPercent)}%
        </p>
      </div>

      {/* Chart */}
      <h3 style={{ marginTop: "20px" }}>📉 Rejection Reasons</h3>

      {chartData.length > 0 ? (
        <BarChart width={600} height={300} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#4CAF50" />
        </BarChart>
      ) : (
        <p>No data available. Generate or upload claims.</p>
      )}
    </div>
  );
}

/* ---------- Helper Functions ---------- */

function Card({ title, value }) {
  return (
    <div
      style={{
        padding: "15px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        width: "180px",
        textAlign: "center",
        background: "#f9f9f9",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      <h4>{title}</h4>
      <p style={{ fontSize: "18px", fontWeight: "bold" }}>
        {value !== undefined && value !== null ? value : 0}
      </p>
    </div>
  );
}

function format(val) {
  return val ? val.toFixed(2) : "0.00";
}

export default Dashboard;
