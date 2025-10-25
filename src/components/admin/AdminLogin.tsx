import React, { useState } from 'react';

interface AdminLoginProps {
  onLogin: () => void;
}

const AdminLogin: React.FC<AdminLoginProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      onLogin();
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
        <div className="flex justify-center mb-6">
          <img 
            src="https://d64gsuwffb70l.cloudfront.net/68f9969a6672a19b16528a96_1761193305393_121a01f9.png" 
            alt="ECLH AI Consulting Logo" 
            className="h-24 w-auto"
          />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Admin Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-[#0066ff] focus:outline-none"
              placeholder="Enter admin password"
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-[#0066ff] text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-sm text-gray-500 text-center">Demo password: admin123</p>
      </div>
    </div>
  );
};

export default AdminLogin;
