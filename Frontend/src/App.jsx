import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminLoginPage from './pages/AdminLoginPage';
import CitizenLoginPage from './pages/CitizenLoginPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route path="/citizen-login" element={<CitizenLoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
