import React, { useState } from 'react';
import { Search, Filter, Download, RefreshCw, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { mockLogs } from '../data/mockData';

const LogList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [logs] = useState(mockLogs);

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.source.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === 'all' || log.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  const getLogIcon = (level) => {
    switch (level) {
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
      default:
        return <Info className="w-4 h-4 text-blue-600" />;
    }
  };

  const getLogBgColor = (level) => {
    switch (level) {
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">System Logs</h1>
        <div className="flex space-x-3">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Levels</option>
                <option value="info">Info</option>
                <option value="warning">Warning</option>
                <option value="error">Error</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Logs List */}
      <div className="space-y-3">
        {filteredLogs.map((log) => (
          <div key={log.id} className={`rounded-lg border p-4 ${getLogBgColor(log.level)}`}>
            <div className="flex items-start space-x-3">
              <div className="mt-1">
                {getLogIcon(log.level)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      log.level === 'error' ? 'bg-red-100 text-red-800' :
                      log.level === 'warning' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {log.level.toUpperCase()}
                    </span>
                    <span className="text-sm font-medium text-gray-900">{log.source}</span>
                  </div>
                  <span className="text-sm text-gray-500">{log.timestamp}</span>
                </div>
                <p className="text-gray-900">{log.message}</p>
                {log.details && (
                  <div className="mt-2 p-3 bg-white bg-opacity-50 rounded border">
                    <pre className="text-xs text-gray-600 whitespace-pre-wrap">{log.details}</pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredLogs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No logs found matching your criteria</p>
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between bg-white px-6 py-4 border border-gray-200 rounded-lg">
        <div className="text-sm text-gray-500">
          Showing {filteredLogs.length} of {logs.length} logs
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50">
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

export default LogList;