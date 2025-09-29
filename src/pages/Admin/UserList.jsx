import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Plus, Eye, Ban, Trash2, MoreHorizontal } from 'lucide-react';
import { mockUsers } from '../../data/mockData';
import { UseDataProvider } from '../../contexts/DataProvider';

const UserList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const {Getallusers}=UseDataProvider()
 
  const handleuser=async()=>{
    try {
      const response=await Getallusers()
      setUsers(response.Users)
      console.log(response.Users)
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  useEffect(()=>{
    handleuser()
  },[])
  
// 
  const filteredUsers = users.filter(user => {

    const matchesSearch = user?.Userdata?.displayName?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
                         user?.email?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch ;
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

  // useEffect(()=>{
  //   Admincontroller.Getallusers()
  // },[])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">User Management</h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-foreground px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
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
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-background rounded-lg shadow-md border border-border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-background border-b border-border">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-foreground">User</th>
                <th className="text-left py-4 px-6 font-semibold text-foreground">Role</th>
              </tr>
            </thead>
            <tbody className="divide-y border-border">
              {filteredUsers.map((user) => (
                <tr key={user._id} className=" transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      {/* <div className="w-10 h-10 bg-background rounded-full flex items-center justify-center">
                        <span className="text-foreground font-medium">
                          {user.Userdata.displayName.split('')[0].toUpperCase()}
                        </span>
                      </div> */}
                      <div>
                        <p className="font-medium text-foreground">{user.Userdata.displayName}</p>
                        <p className="text-sm text-foreground">{user.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-foreground">{user.Role}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end space-x-2">
                      <Link
                        to={`/users/${user._id}`}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleBlockUser(user._id)}
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
                        onClick={() => handleDeleteUser(user._id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        title="Delete User"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setSelectedUser(selectedUser === user._id ? null : user._id)}
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
    </div>
  );
};

export default UserList;