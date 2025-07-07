// src/components/CitizenNavbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminNavbar() {
    const navigate = useNavigate();
    const admin = JSON.parse(localStorage.getItem('admin'));

    const handleLogout = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/admin/logout`);
        } catch (err) {
            console.error("Logout request failed:", err);
        } finally {
            localStorage.removeItem('admin');
            navigate('/admin-login');
        }
    };

    return (
        <nav className="bg-blue-600 text-white px-6 py-4 shadow-md flex justify-between items-center">
            <div>
                <h1 className="text-xl font-bold">E-Gram</h1>
            </div>
            <ul className="flex space-x-6 items-center">
                <li><Link to="/admin-dashboard" className="hover:underline">Home</Link></li>
                <li><Link to="/citizen/certificates" className="hover:underline">Certificates</Link></li>
                <li><Link to="/admin/tax" className="hover:underline">Tax Info</Link></li>
                <li><Link to="/admin-members" className="hover:underline">Members</Link></li>
                <li><Link to="/admin/schemes" className="hover:underline">Schemes</Link></li>
                <li><Link to="/admin-notify" className="hover:underline">Notify</Link></li>

                <li>
                    <button
                        onClick={handleLogout}
                        className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-green-100 transition"
                    >
                        Logout
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default AdminNavbar;
