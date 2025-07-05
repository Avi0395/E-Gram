import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CitizenNavBar from '../components/CitizenNavbar';
import Footer from '../components/Footer';

function CitizenMember() {
    const [members, setMembers] = useState([]);
    const token = JSON.parse(localStorage.getItem("admin"))?.token ||
        JSON.parse(localStorage.getItem("citizen"))?.token;

    useEffect(() => {
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

        fetchMembers();
    }, [token]);

    return (
        <div>
            <CitizenNavBar />
            <div className="min-h-screen px-6 py-10 bg-gray-50">
                <h2 className="text-3xl font-bold text-center mb-8 text-green-700">Grampanchayat Members</h2>

                <div className="space-y-4 max-w-3xl mx-auto">
                    {members.map((member) => (
                        <div
                            key={member.id}
                            className="bg-white rounded shadow px-6 py-4 border-l-4 border-green-600 flex items-center justify-between"
                        >
                            <span className="text-lg font-semibold text-green-800">{member.fullName}</span>
                            <span className="text-gray-700 font-medium">{member.designation}</span>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default CitizenMember;
