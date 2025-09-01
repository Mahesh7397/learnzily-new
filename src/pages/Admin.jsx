import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../component/ui/Admin-ui/Sidebar'
import Header from '../component/ui/Admin-ui/Header'

function Admin() {
 const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
     <div className="min-h-screen bg-background flex transition-colors">
          <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} /> 
          <div className="flex-1 flex flex-col min-w-0">
            <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
            <main className="flex-1 p-6 overflow-auto">
              <Outlet/>
            </main>
          </div>
        </div>
  )
}

export default Admin