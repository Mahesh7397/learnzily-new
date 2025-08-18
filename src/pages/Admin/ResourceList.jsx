import React, { useState } from 'react';
import { Search, Filter, Plus, Edit, Trash2, Database, HardDrive, Download, Upload } from 'lucide-react';
import { mockResources } from '../data/mockData';

const ResourceList= () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [resources, setResources] = useState(mockResources);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingResource, setEditingResource] = useState<any>(null);

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || resource.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleDeleteResource = (resourceId) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      setResources(resources.filter(resource => resource.id !== resourceId));
    }
  };

  const getStorageIcon = (storage) => {
    return storage === 'S3' ? <HardDrive className="w-4 h-4" /> : <Database className="w-4 h-4" />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Resource Management</h1>
        <div className="flex space-x-3">
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Upload className="w-4 h-4" />
            <span>Upload</span>
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Resource</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-background rounded-lg shadow-md border border-border p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-border bg-background rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full"
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="border border-border bg-background rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Types</option>
                <option value="document">Document</option>
                <option value="image">Image</option>
                <option value="video">Video</option>
                <option value="database">Database</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredResources.map((resource) => (
          <div key={resource.id} className="bg-background rounded-lg shadow-md border border-border p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  resource.storage === 'S3' ? 'bg-orange-100' : 'bg-green-100'
                }`}>
                  {getStorageIcon(resource.storage)}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{resource.name}</h3>
                  <p className="text-sm text-foreground">{resource.type}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setEditingResource(resource)}
                  className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                  title="Edit Resource"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors" title="Download">
                  <Download className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteResource(resource.id)}
                  className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                  title="Delete Resource"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-4">{resource.description}</p>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Size:</span>
                <span className="font-medium">{formatFileSize(resource.size)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Storage:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  resource.storage === 'S3' 
                    ? 'bg-orange-100 text-orange-800' 
                    : 'bg-green-100 text-green-800'
                }`}>
                  {resource.storage}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Created:</span>
                <span className="font-medium">{resource.createdDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Modified:</span>
                <span className="font-medium">{resource.modifiedDate}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No resources found matching your criteria</p>
        </div>
      )}

      {/* Add Resource Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Resource</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter resource name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="document">Document</option>
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                  <option value="database">Database</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Storage</label>
                <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                  <option value="S3">Amazon S3</option>
                  <option value="MongoDB">MongoDB</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  rows={3}
                  placeholder="Enter resource description"
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Add Resource
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceList;