import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Index from './pages/Index'
import { ThemeProvider } from './contexts/Themecontext'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { AlertProvider } from './component/ui/Alert/alert-provider'
import { DataProvider } from './contexts/DataProvider'
import Onboarding from './pages/Onboarding'
import About from './pages/About'
import Dashboard from './pages/Dashboard'


function App() {

  return (
    <ThemeProvider defaultTheme='system' storageKey='learnzily-theme'>
      <BrowserRouter>
          <AlertProvider>
            <DataProvider>
             <Routes>
            {/* <Route path='/' element={<Index />} />*/}
            {/* <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} /> 
            <Route path="/about" element={<About />} /> */}
            {/* <Route path="/onboarding" element={<Onboarding/>} /> */}
            <Route path='/' element={<Dashboard/>} />
          </Routes>
          </DataProvider>
          </AlertProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
