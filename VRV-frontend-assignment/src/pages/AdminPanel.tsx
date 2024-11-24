import React, { useState } from 'react';
import { Users, UserPlus, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AdminPanel = () => {
  const { users: registeredUsers, updateUser } = useAuth();
  const [showAddUser, setShowAddUser] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    role: 'user',
    permissions: ['read'],
  });

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    // Add user logic here (if needed)
    setShowAddUser(false);
    setNewUser({
      name: '',
      email: '',
      role: 'user',
      permissions: ['read'],
    });
  };

  const handleDeleteUser = (id: string) => {
    // Delete user logic here (if needed)
  };

  const togglePermission = (userId: string, permission: string) => {
    const user = registeredUsers.find(u => u.id === userId);
    if (user) {
      const hasPermission = user.permissions.includes(permission);
      const updatedPermissions = hasPermission
        ? user.permissions.filter(p => p !== permission)
        : [...user.permissions, permission];
      
      updateUser({
        ...user,
        permissions: updatedPermissions,
      });
    }
  };

  // Filter out sensitive information (password)
  const displayUsers = registeredUsers.map(({ password, ...user }) => user);

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Users className="h-6 w-6 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Permissions
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {displayUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        {['read', 'write', 'delete'].map((permission) => (
                          <button
                            key={permission}
                            onClick={() => togglePermission(user.id, permission)}
                            className={`px-2 py-1 text-xs font-medium rounded-full ${
                              user.permissions.includes(permission)
                                ? 'bg-green-100 text-green-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {permission}
                          </button>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;