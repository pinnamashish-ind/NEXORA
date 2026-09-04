import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Memory from "./pages/Memory";
import Goals from "./pages/Goals";
import Decisions from "./pages/Decisions";
import Actions from "./pages/Actions";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/memory" element={<Memory />} />
        <Route path="/goals" element={<Goals />} />
        <Route path="/decisions" element={<Decisions />} />
        <Route path="/actions" element={<Actions />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;