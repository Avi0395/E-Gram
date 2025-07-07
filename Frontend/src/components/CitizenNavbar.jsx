// src/components/CitizenNavbar.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function CitizenNavbar() {
    const navigate = useNavigate();
    const citizen = JSON.parse(localStorage.getItem('citizen'));

    const handleLogout = async () => {
        try {
            await axios.post(`${import.meta.env.VITE_API_BASE_URL}/citizens/logout`);
        } catch (err) {
            console.error("Logout request failed:", err);
        } finally {
            localStorage.removeItem('citizen');
            navigate('/citizen-login');
        }
    };

    return (
        <nav className="bg-green-600 text-white px-6 py-4 shadow-md flex justify-between items-center">
            <div>
                <h1 className="text-xl font-bold">E-Gram</h1>
                {citizen && (
                    <p className="text-sm">Welcome, {citizen.firstName || citizen.aadhaarNumber}</p>
                )}
            </div>
            <ul className="flex space-x-6 items-center">
                <li><Link to="/citizen-dashboard" className="hover:underline">Home</Link></li>
                <li><Link to="/citizen/certificates" className="hover:underline">Certificates</Link></li>
                <li><Link to="/citizen/tax" className="hover:underline">Tax Info</Link></li>
                <li><Link to="/citizen-members" className="hover:underline">Members</Link></li>
                <li><Link to="/citizen/schemes" className="hover:underline">Schemes</Link></li>
                <li>
                    <button
                        onClick={handleLogout}
                        className="bg-white text-green-600 px-3 py-1 rounded hover:bg-green-100 transition"
                    >
                        Logout
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default CitizenNavbar;
