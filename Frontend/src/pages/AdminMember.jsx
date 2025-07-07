import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavBar from '../components/AdminNavBar';
import Footer from '../components/Footer';

const DESIGNATIONS = [
    'SARPANCH',
    'DEPUTY_SARPANCH',
    'MEMBER',
    'GRAMSEVAK',
    'HELPER',
];

function AdminMembers() {
    const [members, setMembers] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null);
    const [form, setForm] = useState({ fullName: '', designation: 'MEMBER' });

    const token =
        JSON.parse(localStorage.getItem('admin'))?.token ||
        JSON.parse(localStorage.getItem('citizen'))?.token;

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/members`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setMembers(response.data);
        } catch (err) {
            console.error('Failed to fetch members:', err);
        }
    };

    const handleEditClick = (member) => {
        setSelectedMember(member);
        setForm({ fullName: member.fullName, designation: member.designation });
    };

    const handleCancel = () => {
        setSelectedMember(null);
        setForm({ fullName: '', designation: 'MEMBER' });
    };

    const handleUpdate = async () => {
        try {
            await axios.put(
                `${import.meta.env.VITE_API_BASE_URL}/members/${selectedMember.id}`,
                form,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            setSelectedMember(null);
            fetchMembers();
        } catch (err) {
            console.error('Failed to update member:', err);
        }
    };

    return (
        <div>
            <AdminNavBar />
            <div className="min-h-screen px-6 py-10 bg-gray-50">
                <h2 className="text-3xl font-bold text-center mb-8 text-blue-700">
                    Manage Grampanchayat Members
                </h2>

                <div className="space-y-4 max-w-3xl mx-auto">
                    {members.map((member) => (
                        <div key={member.id}>
                            <div className="bg-white rounded shadow px-6 py-4 border-l-4 border-blue-600 flex justify-between items-center">
                                <div>
                                    <span className="text-lg font-semibold text-blue-800">{member.fullName}</span>
                                    <span className="ml-2 text-gray-600">({member.designation})</span>
                                </div>
                                <button
                                    className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                                    onClick={() => handleEditClick(member)}
                                >
                                    Update
                                </button>
                            </div>

                            {/* Inline update form below the selected member */}
                            {selectedMember?.id === member.id && (
                                <div className="mt-4 bg-white shadow rounded p-6 border border-blue-300">
                                    <h3 className="text-xl font-bold mb-4 text-blue-600">Update Member</h3>

                                    <div className="mb-4">
                                        <label className="block mb-1 font-medium text-gray-700">Full Name</label>
                                        <input
                                            type="text"
                                            value={form.fullName}
                                            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                                            className="border px-4 py-2 rounded w-full"
                                        />
                                    </div>

                                    <div className="mb-4">
                                        <label className="block mb-1 font-medium text-gray-700">Designation</label>
                                        <select
                                            value={form.designation}
                                            onChange={(e) => setForm({ ...form, designation: e.target.value })}
                                            className="border px-4 py-2 rounded w-full"
                                        >
                                            {DESIGNATIONS.map((des) => (
                                                <option key={des} value={des}>
                                                    {des}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="flex gap-4">
                                        <button
                                            onClick={handleUpdate}
                                            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={handleCancel}
                                            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default AdminMembers;
