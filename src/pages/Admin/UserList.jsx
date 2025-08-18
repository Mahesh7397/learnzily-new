import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Plus, Eye, Ban, Trash2, MoreHorizontal } from 'lucide-react';
import { mockUsers } from '../data/mockData';

const UserList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [users, setUsers] = useState(mockUsers);
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleBlockUser = (userId) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'blocked' ? 'active' : 'blocked' }
        : user
    ));
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
          <Plus className="w-5 h-5" />
          <span>Add User</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-background rounded-lg shadow-md border border-border p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-border bg-background rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-border rounded-lg bg-background px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="blocked">Blocked</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-background rounded-lg shadow-md border border-border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background border-b border-border">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">User</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Status</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Role</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Join Date</th>
                <th className="text-left py-4 px-6 font-semibold text-gray-900">Last Login</th>
                <th className="text-right py-4 px-6 font-semibold text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr key={user.id} className=" transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-gray-600 font-medium">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' :
                      user.status === 'blocked' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-900">{user.role}</td>
                  <td className="py-4 px-6 text-gray-900">{user.joinDate}</td>
                  <td className="py-4 px-6 text-gray-900">{user.lastLogin}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end space-x-2">
                      <Link
                        to={`/users/${user.id}`}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleBlockUser(user.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          user.status === 'blocked'
                            ? 'text-green-600 hover:bg-green-100'
                            : 'text-orange-600 hover:bg-orange-100'
                        }`}
                        title={user.status === 'blocked' ? 'Unblock User' : 'Block User'}
                      >
                        <Ban className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        title="Delete User"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setSelectedUser(selectedUser === user.id ? null : user.id)}
                        className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No users found matching your criteria</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between bg-background px-6 py-4 border border-border rounded-lg">
        <div className="text-sm text-gray-500">
          Showing {filteredUsers.length} of {users.length} users
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50">
            Previous
          </button>
          <button className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            1
          </button>
          <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            2
          </button>
          <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserList;