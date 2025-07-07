import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Users } from 'lucide-react';

function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-700 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-3xl w-full">

        {/* admin */}
        <div
          onClick={() => navigate('/admin-login')}
          className="bg-white shadow-xl rounded-xl p-8 flex flex-col items-center justify-center hover:scale-105 hover:shadow-2xl transition-transform cursor-pointer"
        >
          <ShieldCheck className="w-16 h-16 text-blue-600 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800">Admin Login</h2>
          <p className="text-sm text-gray-500 mt-2">For authorized officials</p>
        </div>

        {/* citizen */}
        <div
          onClick={() => navigate('/citizen-login')}
          className="bg-white shadow-xl rounded-xl p-8 flex flex-col items-center justify-center hover:scale-105 hover:shadow-2xl transition-transform cursor-pointer"
        >
          <Users className="w-16 h-16 text-green-600 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800">Citizen Login</h2>
          <p className="text-sm text-gray-500 mt-2">For village residents</p>
        </div>

      </div>
    </div>
  );
}

export default LoginPage;
