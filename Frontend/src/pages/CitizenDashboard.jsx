// CitizenDashboard.jsx
import React from 'react';
import CitizenNavbar from '../components/CitizenNavbar';
import Footer from '../components/Footer';
import { Card, CardContent } from "../components/ui/card";
import { FileText, FileCheck, Users, Landmark, BadgeCheck } from 'lucide-react';

function CitizenDashboard() {
    return (
        <div className="min-h-screen bg-gray-50">
            <CitizenNavbar />

            <div className="max-w-6xl mx-auto py-10 px-4">
                <h1 className="text-3xl font-bold mb-6 text-center text-green-700">Welcome to Your Dashboard</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Certificates */}
                    <Card className="hover:shadow-lg transition cursor-pointer">
                        <CardContent className="p-6 flex flex-col items-center">
                            <FileText className="w-10 h-10 text-green-600 mb-2" />
                            <h3 className="text-xl font-semibold">Apply for Certificates</h3>
                            <p className="text-sm text-gray-500 text-center mt-1">Birth, Caste, Income etc.</p>
                        </CardContent>
                    </Card>

                    {/* Tax Info */}
                    <Card className="hover:shadow-lg transition cursor-pointer">
                        <CardContent className="p-6 flex flex-col items-center">
                            <FileCheck className="w-10 h-10 text-blue-600 mb-2" />
                            <h3 className="text-xl font-semibold">Tax Information</h3>
                            <p className="text-sm text-gray-500 text-center mt-1">Check and pay your village taxes</p>
                        </CardContent>
                    </Card>

                    {/* Members */}
                    <Card className="hover:shadow-lg transition cursor-pointer">
                        <CardContent className="p-6 flex flex-col items-center">
                            <Users className="w-10 h-10 text-purple-600 mb-2" />
                            <h3 className="text-xl font-semibold">Grampanchayat Members</h3>
                            <p className="text-sm text-gray-500 text-center mt-1">View elected members and officers
                            </p>
                            
                        </CardContent>
                    </Card>

                    {/* Schemes */}
                    <Card className="hover:shadow-lg transition cursor-pointer">
                        <CardContent className="p-6 flex flex-col items-center">
                            <BadgeCheck className="w-10 h-10 text-yellow-600 mb-2" />
                            <h3 className="text-xl font-semibold">Govt Schemes</h3>
                            <p className="text-sm text-gray-500 text-center mt-1">See available government benefits</p>
                        </CardContent>
                    </Card>

                    {/* Contact Office */}
                    <Card className="hover:shadow-lg transition cursor-pointer">
                        <CardContent className="p-6 flex flex-col items-center">
                            <Landmark className="w-10 h-10 text-red-600 mb-2" />
                            <h3 className="text-xl font-semibold">Grampanchayat Office</h3>
                            <p className="text-sm text-gray-500 text-center mt-1">Office contact, timings and address</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default CitizenDashboard;
