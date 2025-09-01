import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Calendar, Shield, Activity, Ban, Edit, Trash2 } from 'lucide-react';
import { mockUsers } from '../../data/mockData';

const UserDetails= () => {
  const { id } = useParams();
  const user = mockUsers.find(u => u.id === parseInt(id || '0'));

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">User not found</p>
        <Link 
          to="/users"
          className="text-blue-600 hover:text-blue-800 mt-4 inline-block"
        >
          Back to Users
        </Link>
      </div>
    );
  }

  const activityLog = [
    { id: 1, action: 'Login', timestamp: '2024-01-15 10:30:00', ip: '192.168.1.100' },
    { id: 2, action: 'Profile Update', timestamp: '2024-01-14 15:45:00', ip: '192.168.1.100' },
    { id: 3, action: 'Password Change', timestamp: '2024-01-13 09:15:00', ip: '192.168.1.101' },
    { id: 4, action: 'Login', timestamp: '2024-01-12 14:20:00', ip: '192.168.1.100' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/users"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">User Details</h1>
        </div>
        <div className="flex space-x-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Edit className="w-4 h-4" />
            <span>Edit User</span>
          </button>
          <button className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Ban className="w-4 h-4" />
            <span>{user.status === 'blocked' ? 'Unblock' : 'Block'}</span>
          </button>
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* User Profile */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="text-center mb-6">
              <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto flex items-center justify-center mb-4">
                <span className="text-gray-600 text-2xl font-medium">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
              <p className="text-gray-500">{user.email}</p>
              <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full mt-2 ${
                user.status === 'active' ? 'bg-green-100 text-green-800' :
                user.status === 'blocked' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {user.status}
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-gray-600">
                <Mail className="w-5 h-5" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Calendar className="w-5 h-5" />
                <span>Joined {user.joinDate}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Shield className="w-5 h-5" />
                <span>{user.role}</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Activity className="w-5 h-5" />
                <span>Last login: {user.lastLogin}</span>
              </div>
            </div>
          </div>
        </div>

        {/* User Stats and Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-blue-600">247</h3>
                <p className="text-gray-500">Total Sessions</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-green-600">42h 15m</h3>
                <p className="text-gray-500">Time Spent</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-purple-600">89</h3>
                <p className="text-gray-500">Resources Created</p>
              </div>
            </div>
          </div>

          {/* Activity Log */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {activityLog.map((log) => (
                  <div key={log.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <Activity className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{log.action}</p>
                        <p className="text-sm text-gray-500">IP: {log.ip}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-900">{log.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;