import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../component/ui/Admin-ui/Sidebar'
import Header from '../component/ui/Admin-ui/Header'
import { UseDataProvider } from '../contexts/DataProvider';

function Admin() {
 const [sidebarOpen, setSidebarOpen] = useState(false);
   const {getallresourcesdata, setResources}=UseDataProvider()
   const just=async()=>{
     try {
      const dt=await getallresourcesdata()
      setResources(dt)
      console.log(dt)
      console.log("jiji")
     } catch (error) {
      console.log(error)
     }
  }

  useEffect(()=>{
    just()
  },[])

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