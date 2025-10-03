import "../styles/Dashboard.css";
import React, { useMemo, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const MOCK_KPIS = [
  { label: "MAPE", value: "7.8%" },
  { label: "Hit rate", value: "59.2%" },
  { label: "Sharpe", value: "0.71" },
  { label: "Max drawdown", value: "-1.13%" },
];

const RAW_SERIES = [
  // Past
  { x: "P1", price: 172.3 },
  { x: "P2", price: 174.8 },
  { x: "P3", price: 178.6 },
  { x: "P4", price: 181.2 },
  { x: "P5", price: 179.4 },
  { x: "P6", price: 176.1 },
  { x: "P7", price: 177.8 },
  { x: "P8", price: 182.5 },
  { x: "P9", price: 185.7 },
  { x: "P10", price: 183.2 },
  { x: "P11", price: 186.9 },
  { x: "P12", price: 189.1 },
  { x: "P13", price: 188.0 },
  { x: "P14", price: 190.4 },
  { x: "P15", price: 187.7 },
  { x: "T0", price: 188.9 }, // Today

  // Forecast
  { x: "F1", price: 190.5, isFuture: true },
  { x: "F2", price: 192.1, isFuture: true },
  { x: "F3", price: 194.8, isFuture: true },
  { x: "F4", price: 197.3, isFuture: true },
  { x: "F5", price: 199.6, isFuture: true },
];

const TF_COUNTS = { "1W": 7, "1M": 30, "3M": 66, YTD: Infinity };

const MOCK_SIDEBAR = {
  price: 198.45,
  volume: 18.28,
  ratio: 0.47,
  dailyChangePct: 0.54,
};

function SidebarRow({ label, value }) {
  return (
    <div className="sidebar-row">
      <div className="sidebar-value">{value}</div>
      <div className="sidebar-label">{label}</div>
    </div>
  );
}

function slicePast(pastArr, tfkey) {
  const count = TF_COUNTS[tfkey] ?? Infinity;
  if (count === Infinity) return pastArr;
  return pastArr.slice(-count);
}

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [timeframe, setTimeframe] = useState("1M");

  const allPast = useMemo(
    () =>
      slicePast(
        RAW_SERIES.filter((d) => !d.isFuture),
        "1M"
      ),
    []
  );
  const allFuture = useMemo(
    () =>
      slicePast(
        RAW_SERIES.filter((d) => d.isFuture),
        "1M"
      ),
    []
  );

  const past = useMemo(
    () => slicePast(allPast, timeframe),
    [allPast, timeframe]
  );

  const futureWithAnchor = useMemo(() => {
    const anchor = past[past.length - 1] ?? allPast[allPast.length - 1];
    return allFuture.map((d) => ({
      ...d,
      price: d.price + (anchor.price - past[past.length - 1]?.price || 0),
    }));
  }, [allFuture, past, allPast]);

  // Combine past and future data for overlapping lines
  const combinedData = useMemo(() => {
    const combined = [...past];
    // Add future data points, ensuring they connect properly
    futureWithAnchor.forEach(point => {
      combined.push({
        ...point,
        futurePrice: point.price,
        price: null // Set historical price to null for future points
      });
    });
    
    // Also add future prices to the last historical point for smooth connection
    if (combined.length > 0 && futureWithAnchor.length > 0) {
      const lastHistoricalIndex = past.length - 1;
      if (lastHistoricalIndex >= 0) {
        combined[lastHistoricalIndex] = {
          ...combined[lastHistoricalIndex],
          futurePrice: combined[lastHistoricalIndex].price
        };
      }
    }
    
    return combined;
  }, [past, futureWithAnchor]);

  // tight y-domain for visible series
  const allVisible = [...past, ...futureWithAnchor];
  const minPrice = Math.min(...allVisible.map((d) => d.price));
  const maxPrice = Math.max(...allVisible.map((d) => d.price));
  const pad = Math.max(1, Math.round((maxPrice - minPrice) * 0.1));

  return (
    <div>
      {/* LEFT */}
      <div className="left-column">
        <h1>Dashboard</h1>
        <p>Historical vs. forecast price</p>

        {/* KPIs */}
        <div className="kpi-container">
          {MOCK_KPIS.map((kpi) => (
            <div key={kpi.label} className="kpi-box">
              <div className="kpi-value">{kpi.value}</div>
              <div className="kpi-label">{kpi.label}</div>
            </div>
          ))}
        </div>

        {/* Button filters */}
        <div className="button-group">
          {Object.keys(TF_COUNTS).map((tf) => (
            <button
              key={tf}
              className="filter-button"
              onClick={() => setTimeframe(tf)}
            >
              {tf}
            </button>
          ))}
        </div>

        {/* Chart */}
        <div>
          <h3>Chart</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={combinedData}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="x" tick={false} />
              <YAxis domain={[minPrice - pad, maxPrice + pad]} tickCount={6} />
              <Tooltip />
              {/* Historical price line */}
              <Line
                type="monotone"
                dataKey="price"
                stroke="#8884d8"
                strokeWidth={2}
                dot={false}
              />
              {/* Future price line */}
              <Line
                type="monotone"
                dataKey="futurePrice"
                stroke="#82ca9d"
                strokeDasharray="5 5"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* RIGHT SIDEBAR */}
      {sidebarOpen && (
        <div className="sidebar-expanded">
          <button onClick={() => setSidebarOpen(false)}>Close</button>
          <SidebarRow label="Price" value={MOCK_SIDEBAR.price} />
          <SidebarRow label="Volume" value={MOCK_SIDEBAR.volume} />
          <SidebarRow label="Ratio" value={MOCK_SIDEBAR.ratio} />
          <SidebarRow
            label="Daily Change"
            value={MOCK_SIDEBAR.dailyChangePct}
          />
        </div>
      )}
      {!sidebarOpen && (
        <div className="sidebar-collapsed">
          <button onClick={() => setSidebarOpen(true)}>Open</button>
          closed
        </div>
      )}
    </div>
  );
}

export default Dashboard;
