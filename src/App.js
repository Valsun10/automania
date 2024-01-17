import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Login from "./Pages/Login/Login";
import CreateCar from "./Pages/CreateCar/CreateCar";

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create" element={<CreateCar />} />
        <Route path="/create/:carID" element={<CreateCar />} />
      </Routes>
    </main>
  );
}

export default App;
