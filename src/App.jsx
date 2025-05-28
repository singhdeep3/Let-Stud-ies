import { useState } from 'react'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import Home from "./pages/Home"
import Navbar from './components/common/Navbar'
function App() {

  return (
      <div className='w-screen min-h-screen bg-rose-500 flex flex-col font-stretch-ultra-condensed'>
        <Navbar/>
       <Routes>
        <Route path='/' element={<Home/>}/>
       </Routes>
      </div>
  )
}

export default App
