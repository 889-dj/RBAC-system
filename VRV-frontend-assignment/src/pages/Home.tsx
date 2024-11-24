import React from 'react';
import { Shield } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <Shield className="mx-auto h-16 w-16 text-indigo-600" />
          <h1 className="mt-4 text-4xl font-bold tracking-tight text-gray-900">
            Welcome to RBAC Demo
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            A Role-Based Access Control system demonstration with React
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900">For Users</h2>
            <p className="mt-4 text-gray-600">
              Access your personal dashboard and manage your resources with secure
              role-based permissions.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-900">For Admins</h2>
            <p className="mt-4 text-gray-600">
              Manage users, control permissions, and oversee system resources through
              the admin dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;