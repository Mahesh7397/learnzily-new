import React, { useEffect, useState } from 'react';
import { Search, Filter, Plus, Edit, Trash2, Database, HardDrive, Download, Upload } from 'lucide-react';
import { mockResources } from '../../data/mockData';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { UseDataProvider } from '../../contexts/DataProvider';


const ResourceList= () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [resources, setResources] = useState({});
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingResource, setEditingResource] = useState(null);
  const {getallresourcesdata}=UseDataProvider()

  //  const navigationTabs = [
  //   { path: '/resources/notes', label: 'Notes', icon: FileText, count: resources.filter(r => r.category === 'notes').length },
  //   { path: '/resources/questions', label: 'Questions', icon: HelpCircle, count: resources.filter(r => r.category === 'questions').length },
  // ];

  const location=useLocation()
  const Navigate=useNavigate()
  let isActive=location.pathname
  // const filteredResources = resources.filter(resource => {
  //   const matchesSearch = resource.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //                        resource.description.toLowerCase().includes(searchTerm.toLowerCase());
  //   const matchesType = typeFilter === 'all' || resource.type === typeFilter;
  //   return matchesSearch && matchesType;
  // });

  // const handleDeleteResource = (resourceId) => {
  //   if (window.confirm('Are you sure you want to delete this resource?')) {
  //     setResources(resources.filter(resource => resource.id !== resourceId));
  //   }
  // };

  // const getStorageIcon = (storage) => {
  //   return storage === 'S3' ? <HardDrive className="w-4 h-4" /> : <Database className="w-4 h-4" />;
  // };

  // const formatFileSize = (bytes) => {
  //   if (bytes === 0) return '0 Bytes';
  //   const k = 1024;
  //   const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  //   const i = Math.floor(Math.log(bytes) / Math.log(k));
  //   return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  // };

  const just=async()=>{
     try {
      const dt=await getallresourcesdata()
      setResources(dt)
      console.log(dt)
     } catch (error) {
      console.log(error)
     }
  }

  useEffect(()=>{
     just()
  },[])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Resource Management</h1>
        <div className="flex space-x-3">
          <button 
            onClick={() => Navigate('/admin/upload')}
            className="bg-blue-600 hover:bg-blue-700 text-foreground px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Resource</span>
          </button>
        </div>
      </div>
      <div className="bg-card rounded-lg shadow-md border border-border overflow-hidden">
        <div className="flex overflow-x-auto">
              <Link
                to={'/admin/resources/notes'}
                state={{data:resources.notes}}
                className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-all duration-200 border-b-2 ${
                  isActive=='/admin/resources/notes'
                    ? 'border-primary text-primary bg-primary/5'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                <span>Notes</span>
              </Link>
              <Link
                to={'/admin/resources/question-paper'}
                state={{data:resources.questionpaper}}
                className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-all duration-200 border-b-2 ${
                  isActive=='/admin/resources/question-paper'
                    ? 'border-primary text-primary bg-primary/5'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-accent'
                }`}
              >
                <span>Question Papers</span>
              </Link>
        </div>
      </div>
       <Outlet/>
    </div>
  );
};

export default ResourceList;