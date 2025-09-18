import React, { useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

const ResourceList= () => {

  const location=useLocation()
  const Navigate=useNavigate()
  let isActive=location.pathname

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
                className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-all duration-200 border-b-2 ${
                  isActive=='/admin/resources/question-paper' || isActive=='/admin/resources/'
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