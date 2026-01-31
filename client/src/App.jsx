import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ComplaintForm from './pages/ComplaintForm';
import AdminDashboard from './pages/AdminDashboard'; // Make sure you created this file!

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Member Routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/new-complaint" element={<ComplaintForm />} />
        
        {/* Leader Route */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;