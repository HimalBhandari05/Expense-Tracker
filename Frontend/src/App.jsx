import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter , Routes , Route , Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/Register'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Home /> } />
          <Route path='/register' element={ <Register /> } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
