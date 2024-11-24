import React from 'react';
import { useAuth } from '../context/AuthContext';
import { FileText } from 'lucide-react';

const mockResources = [
  {
    id: '1',
    title: 'Project Report Q1',
    description: 'Quarterly report for Q1 2024',
    createdAt: '2024-03-15',
  },
  {
    id: '2',
    title: 'Marketing Strategy',
    description: 'Annual marketing strategy document',
    createdAt: '2024-03-14',
  },
  {
    id: '3',
    title: 'Budget Analysis',
    description: 'Financial analysis for current year',
    createdAt: '2024-03-13',
  },
];

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Your Dashboard</h1>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">Role:</span>
              <span className="px-2 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm">
                {user?.role}
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Resources</h2>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {mockResources.map((resource) => (
                  <div
                    key={resource.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start space-x-3">
                      <FileText className="h-5 w-5 text-indigo-600 mt-1" />
                      <div>
                        <h3 className="font-medium text-gray-900">{resource.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{resource.description}</p>
                        <p className="text-xs text-gray-400 mt-2">
                          Created: {resource.createdAt}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Permissions</h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <ul className="space-y-2">
                  {user?.permissions.map((permission) => (
                    <li
                      key={permission}
                      className="flex items-center space-x-2 text-sm text-gray-600"
                    >
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span className="capitalize">{permission}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;