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
  // Past (70 points for 3M to work properly)
  { x: "P1", price: 150.2 },
  { x: "P2", price: 152.1 },
  { x: "P3", price: 151.8 },
  { x: "P4", price: 153.4 },
  { x: "P5", price: 155.7 },
  { x: "P6", price: 154.3 },
  { x: "P7", price: 156.9 },
  { x: "P8", price: 158.1 },
  { x: "P9", price: 157.5 },
  { x: "P10", price: 159.8 },
  { x: "P11", price: 161.2 },
  { x: "P12", price: 160.4 },
  { x: "P13", price: 162.7 },
  { x: "P14", price: 164.3 },
  { x: "P15", price: 163.9 },
  { x: "P16", price: 165.8 },
  { x: "P17", price: 167.2 },
  { x: "P18", price: 166.5 },
  { x: "P19", price: 168.9 },
  { x: "P20", price: 170.1 },
  { x: "P21", price: 169.7 },
  { x: "P22", price: 171.4 },
  { x: "P23", price: 173.2 },
  { x: "P24", price: 172.8 },
  { x: "P25", price: 174.6 },
  { x: "P26", price: 176.3 },
  { x: "P27", price: 175.9 },
  { x: "P28", price: 177.8 },
  { x: "P29", price: 179.4 },
  { x: "P30", price: 178.9 },
  { x: "P31", price: 180.7 },
  { x: "P32", price: 182.1 },
  { x: "P33", price: 181.6 },
  { x: "P34", price: 183.4 },
  { x: "P35", price: 185.2 },
  { x: "P36", price: 184.8 },
  { x: "P37", price: 186.5 },
  { x: "P38", price: 188.1 },
  { x: "P39", price: 187.7 },
  { x: "P40", price: 189.3 },
  { x: "P41", price: 190.8 },
  { x: "P42", price: 190.2 },
  { x: "P43", price: 191.9 },
  { x: "P44", price: 193.4 },
  { x: "P45", price: 192.8 },
  { x: "P46", price: 194.6 },
  { x: "P47", price: 196.1 },
  { x: "P48", price: 195.5 },
  { x: "P49", price: 197.2 },
  { x: "P50", price: 198.7 },
  { x: "P51", price: 198.1 },
  { x: "P52", price: 199.8 },
  { x: "P53", price: 201.3 },
  { x: "P54", price: 200.7 },
  { x: "P55", price: 202.4 },
  { x: "P56", price: 203.9 },
  { x: "P57", price: 203.3 },
  { x: "P58", price: 205.1 },
  { x: "P59", price: 206.6 },
  { x: "P60", price: 206.0 },
  { x: "P61", price: 172.3 },
  { x: "P62", price: 174.8 },
  { x: "P63", price: 178.6 },
  { x: "P64", price: 181.2 },
  { x: "P65", price: 179.4 },
  { x: "P66", price: 176.1 },
  { x: "P67", price: 177.8 },
  { x: "P68", price: 182.5 },
  { x: "P69", price: 185.7 },
  { x: "P70", price: 183.2 },
  { x: "P71", price: 186.9 },
  { x: "P72", price: 189.1 },
  { x: "P73", price: 188.0 },
  { x: "P74", price: 190.4 },
  { x: "P75", price: 187.7 },
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

  // Get all historical and future data (not filtered by timeframe)
  const allPast = useMemo(() => RAW_SERIES.filter((d) => !d.isFuture), []);
  const allFuture = useMemo(() => RAW_SERIES.filter((d) => d.isFuture), []);

  // Apply timeframe filtering
  const past = useMemo(
    () => slicePast(allPast, timeframe),
    [allPast, timeframe]
  );

  const futureWithAnchor = useMemo(() => {
    const anchor = past[past.length - 1] ?? allPast[allPast.length - 1];
    if (!anchor) return allFuture;

    // Calculate the adjustment to connect future data to the last visible historical point
    const adjustment = anchor.price - allFuture[0]?.price || 0;

    return allFuture.map((d) => ({
      ...d,
      price: d.price + adjustment,
    }));
  }, [allFuture, past, allPast]);

  // Combine past and future data for overlapping lines
  const combinedData = useMemo(() => {
    const combined = [...past];
    // Add future data points, ensuring they connect properly
    futureWithAnchor.forEach((point) => {
      combined.push({
        ...point,
        futurePrice: point.price,
        price: null, // Set historical price to null for future points
      });
    });

    // Also add future prices to the last historical point for smooth connection
    if (combined.length > 0 && futureWithAnchor.length > 0) {
      const lastHistoricalIndex = past.length - 1;
      if (lastHistoricalIndex >= 0) {
        combined[lastHistoricalIndex] = {
          ...combined[lastHistoricalIndex],
          futurePrice: combined[lastHistoricalIndex].price,
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
