import React from 'react';
import { Users, FileText, Database, Activity, TrendingUp, AlertCircle } from 'lucide-react';

const Dashboard= () => {
  const stats = [
    { label: 'Total Users', value: '12,847', icon: Users, color: 'bg-blue-500', change: '+12%' },
    { label: 'Active Sessions', value: '3,429', icon: Activity, color: 'bg-green-500', change: '+8%' },
    { label: 'Total Resources', value: '8,942', icon: Database, color: 'bg-purple-500', change: '+23%' },
    { label: 'System Logs', value: '45,821', icon: FileText, color: 'bg-orange-500', change: '+15%' },
  ];

  const recentUsers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active', joinDate: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'blocked', joinDate: '2024-01-14' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', status: 'active', joinDate: '2024-01-13' },
  ];

  const systemAlerts = [
    { id: 1, type: 'warning', message: 'High CPU usage detected on server-02', time: '5 min ago' },
    { id: 2, type: 'info', message: 'Database backup completed successfully', time: '1 hour ago' },
    { id: 3, type: 'error', message: 'Failed login attempts from IP 192.168.1.100', time: '2 hours ago' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <div className="text-sm text-foreground">
          Last updated: {new Date().toLocaleString()}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-card rounded-lg shadow-md p-6 border border-border hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-success" />
                  <span className="text-sm text-success ml-1">{stat.change}</span>
                </div>
              </div>
              <div className={`${stat.color} rounded-full p-3`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <div className="bg-card rounded-lg shadow-md border border-border">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">Recent Users</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      user.status === 'active' 
                        ? 'bg-success/10 text-success' 
                        : 'bg-destructive/10 text-destructive'
                    }`}>
                      {user.status}
                    </span>
                    <p className="text-xs text-muted-foreground mt-1">{user.joinDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* System Alerts */}
        <div className="bg-card rounded-lg shadow-md border border-border">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-semibold text-foreground">System Alerts</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {systemAlerts.map((alert) => (
                <div key={alert.id} className="flex items-start space-x-3">
                  <div className={`mt-1 rounded-full p-1 ${
                    alert.type === 'error' ? 'bg-destructive/10' :
                    alert.type === 'warning' ? 'bg-warning/10' : 'bg-info/10'
                  }`}>
                    <AlertCircle className={`w-4 h-4 ${
                      alert.type === 'error' ? 'text-destructive' :
                      alert.type === 'warning' ? 'text-warning' : 'text-info'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-foreground">{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;