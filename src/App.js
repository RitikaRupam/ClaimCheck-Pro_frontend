import React from "react";
import Dashboard from "./pages/Dashboard";
import Claims from "./pages/Claims";
import Upload from "./components/Upload";

function App() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🏥 ClaimCheck Pro</h1>
      <Upload />
      <Dashboard />
      <Claims />
    </div>
  );
}

export default App;
