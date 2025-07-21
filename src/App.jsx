import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Index from './pages/Index'
import { ThemeProvider } from './contexts/Themecontext'
import Login from './pages/Login'
import Signup from './pages/Signup'


function App() {

  return (
    <ThemeProvider defaultTheme='system' storageKey='learnzily-theme'>
       <BrowserRouter>
    <Routes>
      <Route path='/' element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
    </BrowserRouter>
    </ThemeProvider>
   
  )
}

export default App
