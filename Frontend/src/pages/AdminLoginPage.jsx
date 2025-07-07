import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminLoginPage() {
    const navigate = useNavigate();

    const [form, setForm] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/admin/login`,
                form
            );
            setMessage('Login successful!');
            console.log('Admin logged in:', response.data);
            localStorage.setItem('admin', JSON.stringify(response.data));
            navigate('/admin-dashboard');
        } catch (err) {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded shadow-md w-full max-w-sm"
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">
                    Admin Login
                </h2>

                <input
                    type="text"
                    name="username"
                    value={form.username}
                    onChange={handleChange}
                    placeholder="Username"
                    className="w-full px-4 py-2 mb-4 border rounded"
                    required
                />

                <input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full px-4 py-2 mb-4 border rounded"
                    required
                />

                {error && <p className="text-red-500 mb-2">{error}</p>}
                {message && <p className="text-green-600 mb-2">{message}</p>}

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Login
                </button>

                <div className="text-center mt-4">
                    <button
                        type="button"
                        onClick={() => navigate('/citizen-login')}
                        className="text-sm text-blue-600 hover:underline"
                    >
                        Login as Citizen
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AdminLoginPage;
