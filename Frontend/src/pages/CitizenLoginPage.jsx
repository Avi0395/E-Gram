import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function CitizenLoginPage() {
  const [form, setForm] = useState({ aadhaarNumber: '', dob: '' });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      const sanitizedForm = {
        aadhaarNumber: form.aadhaarNumber.trim(),
        dob: form.dob.trim()
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/citizens/login`,
        sanitizedForm,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      setMessage('Login successful!');
      localStorage.setItem('citizen', JSON.stringify(response.data));
      navigate('/citizen-dashboard');

    } catch (err) {
      console.error('Login Error:', err);

      const backendMessage =
        err.response?.data?.message ||
        (typeof err.response?.data === 'string' ? err.response.data : null) ||
        'Login failed. Please check Aadhaar and DOB.';

      setError(backendMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-green-600">
          Citizen Login
        </h2>

        <input
          type="text"
          name="aadhaarNumber"
          value={form.aadhaarNumber}
          onChange={handleChange}
          placeholder="Aadhaar Number"
          className="w-full px-4 py-2 mb-4 border rounded"
          pattern="\d{12}"
          title="Aadhaar must be 12 digits"
          maxLength="12"
          required
        />

        <input
          type="date"
          name="dob"
          value={form.dob}
          onChange={handleChange}
          className="w-full px-4 py-2 mb-4 border rounded"
          required
        />

        {error && <p className="text-red-500 mb-2">{error}</p>}
        {message && <p className="text-green-600 mb-2">{message}</p>}

        <button
          type="submit"
          className={`w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition ${loading && 'opacity-60 cursor-not-allowed'}`}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <div className="text-center mt-4">
          <button
            type="button"
            onClick={() => navigate('/admin-login')}
            className="text-sm text-green-600 hover:underline"
          >
            Login as Admin
          </button>
        </div>

      </form>
    </div>
  );
}

export default CitizenLoginPage;
