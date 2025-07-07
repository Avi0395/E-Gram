import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminLoginPage from './pages/AdminLoginPage';
import CitizenLoginPage from './pages/CitizenLoginPage';
import CitizenDashboard from './pages/CitizenDashboard';
import AdminDashBoard from './pages/AdminDashBoard';
import CitizenMember from './pages/CitizenMember';
import AdminMember from './pages/AdminMember';
import AdminNotify from './pages/AdminNotify';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route path="/citizen-login" element={<CitizenLoginPage />} />
        <Route path="/citizen-dashboard" element={<CitizenDashboard />} />
        <Route path='/admin-dashboard' element={<AdminDashBoard />} />
        <Route path='/citizen-members' element={<CitizenMember />} />
        <Route path='/admin-members' element={<AdminMember />} />
        <Route path='/admin-notify' element={<AdminNotify />} />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
