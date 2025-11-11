import React from "react";
import RegistrationList from "../src/components/RegistrationList";
import Dashboard from "../src/pages/Dashboard"

function App() {
  return (
    <div>
      <h1>Conference Dashboard</h1>
      <RegistrationList />
      <Dashboard/>
    </div>
  );
}

export default App;
