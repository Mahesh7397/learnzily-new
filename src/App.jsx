import { useState } from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './contexts/Themecontext'
import { AlertProvider } from './component/ui/Alert/alert-provider'
import { DataProvider } from './contexts/DataProvider'
import Router from './Router'


function App() {

  return (
    <ThemeProvider defaultTheme='system' storageKey='learnzily-theme'>
      <BrowserRouter>
          <AlertProvider>
            <DataProvider>
            <Router/>
          </DataProvider>
          </AlertProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
