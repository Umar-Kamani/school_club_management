import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Clubs from "./pages/Clubs";
import Students from "./pages/Students";
import Memberships from "./pages/Memberships";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/clubs" element={<Clubs />} />
        <Route path="/students" element={<Students />} />
        <Route path="/memberships" element={<Memberships />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;