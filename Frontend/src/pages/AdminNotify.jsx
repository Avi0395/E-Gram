import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from '../components/AdminNavBar';
import Footer from '../components/Footer';

function AdminNotify() {
    const [citizens, setCitizens] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [genderFilter, setGenderFilter] = useState('');
    const [ageRange, setAgeRange] = useState({ min: '', max: '' });
    const [selected, setSelected] = useState([]);
    const [showSendMode, setShowSendMode] = useState(false);
    const [message, setMessage] = useState('');
    const [sending, setSending] = useState(false);

    const token = JSON.parse(localStorage.getItem('admin'))?.token;

    useEffect(() => {
        fetchCitizens();
    }, []);

    const fetchCitizens = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/citizens`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCitizens(res.data);
        } catch (err) {
            console.error('Error fetching citizens:', err);
        }
    };

    const handleCheckboxChange = (id) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        if (selected.length === filteredCitizens.length) {
            setSelected([]);
        } else {
            setSelected(filteredCitizens.map((c) => c.id));
        }
    };

    const calculateAge = (dob) => {
        const birth = new Date(dob);
        const today = new Date();
        const age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        return m < 0 || (m === 0 && today.getDate() < birth.getDate()) ? age - 1 : age;
    };

    const filteredCitizens = [...citizens]
        .sort((a, b) => a.houseNo.localeCompare(b.houseNo))
        .filter((c) => {
            const matchSearch =
                c.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                c.aadhaarNumber.includes(searchTerm);
            const matchGender = genderFilter ? c.gender === genderFilter : true;
            const age = calculateAge(c.dob);
            const matchAge =
                (!ageRange.min || age >= parseInt(ageRange.min)) &&
                (!ageRange.max || age <= parseInt(ageRange.max));
            return matchSearch && matchGender && matchAge;
        });

    const handleSendMessages = async () => {
        if (!message.trim()) return alert("Message cannot be empty");
        setSending(true);

        try {
            const requests = selected.map((id) => {
                return axios.post(
                    `${import.meta.env.VITE_API_BASE_URL}/citizens/notify/${id}`,
                    { message },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );
            });

            await Promise.all(requests);
            alert('Message sent successfully to selected citizens!');
            setSelected([]);
            setMessage('');
            setShowSendMode(false);
        } catch (err) {
            console.error('Failed to send messages:', err);
            alert('Failed to send messages. Try again.');
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <AdminNavbar />

            <div className="max-w-6xl mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-4 text-blue-800">Citizen List & Notification</h2>

                {/* Filters */}
                <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
                    <input
                        type="text"
                        placeholder="Search by name or Aadhaar"
                        className="px-4 py-2 border rounded"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <select
                        value={genderFilter}
                        onChange={(e) => setGenderFilter(e.target.value)}
                        className="px-4 py-2 border rounded"
                    >
                        <option value="">All Genders</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                        <option value="OTHER">Other</option>
                    </select>
                    <input
                        type="number"
                        placeholder="Min Age"
                        className="px-4 py-2 border rounded"
                        value={ageRange.min}
                        onChange={(e) => setAgeRange({ ...ageRange, min: e.target.value })}
                    />
                    <input
                        type="number"
                        placeholder="Max Age"
                        className="px-4 py-2 border rounded"
                        value={ageRange.max}
                        onChange={(e) => setAgeRange({ ...ageRange, max: e.target.value })}
                    />
                    <button
                        onClick={() => setShowSendMode(!showSendMode)}
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        {showSendMode ? 'Cancel' : 'Send Message'}
                    </button>
                </div>

                {/* Message form */}
                {showSendMode && (
                    <div className="mb-6 bg-white p-4 rounded shadow border border-blue-200">
                        <textarea
                            className="w-full border px-4 py-2 rounded resize-none mb-4"
                            rows="4"
                            placeholder="Enter your message here..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        ></textarea>
                        <button
                            onClick={handleSendMessages}
                            disabled={sending || selected.length === 0}
                            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-green-700 disabled:opacity-50"
                        >
                            {sending ? 'Sending...' : `Send to ${selected.length} citizen(s)`}
                        </button>
                    </div>
                )}

                {/* Total */}
                <div className="mb-2 text-right font-medium text-gray-700">
                    Total Citizens: {filteredCitizens.length}
                </div>

                {/* Citizen List */}
                <div className="bg-white rounded shadow overflow-x-auto">
                    <table className="min-w-full table-auto text-left">
                        <thead className="bg-blue-600 text-white">
                            <tr>
                                {showSendMode && (
                                    <th className="px-4 py-2">
                                        <input
                                            type="checkbox"
                                            checked={
                                                filteredCitizens.length > 0 &&
                                                selected.length === filteredCitizens.length
                                            }
                                            onChange={handleSelectAll}
                                        />
                                    </th>
                                )}
                                <th className="px-4 py-2">#</th>
                                <th className="px-4 py-2">Full Name</th>
                                <th className="px-4 py-2">Aadhaar</th>
                                <th className="px-4 py-2">Age</th>
                                <th className="px-4 py-2">Gender</th>
                                <th className="px-4 py-2">Mobile</th>
                                <th className="px-4 py-2">House No</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCitizens.length === 0 ? (
                                <tr>
                                    <td colSpan="8" className="text-center px-4 py-6 text-gray-500">
                                        No matching citizens found.
                                    </td>
                                </tr>
                            ) : (
                                filteredCitizens.map((citizen, index) => (
                                    <tr
                                        key={citizen.id}
                                        className={`border-b ${selected.includes(citizen.id) ? 'bg-blue-50' : ''}`}
                                    >
                                        {showSendMode && (
                                            <td className="px-4 py-2">
                                                <input
                                                    type="checkbox"
                                                    checked={selected.includes(citizen.id)}
                                                    onChange={() => handleCheckboxChange(citizen.id)}
                                                />
                                            </td>
                                        )}
                                        <td className="px-4 py-2 font-medium">{index + 1}</td>
                                        <td className="px-4 py-2">{citizen.firstName} {citizen.lastName}</td>
                                        <td className="px-4 py-2">{citizen.aadhaarNumber}</td>
                                        <td className="px-4 py-2">{calculateAge(citizen.dob)}</td>
                                        <td className="px-4 py-2">{citizen.gender}</td>
                                        <td className="px-4 py-2">{citizen.mobileNo}</td>
                                        <td className="px-4 py-2">{citizen.houseNo}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default AdminNotify;
