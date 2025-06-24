import { useState } from 'react'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import Home from "./pages/Home"
import Navbar from './components/common/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'
import UpdatePassword from './pages/UpdatePassword'
import VerifyEmail from './pages/VerifyEmail'
import About from './pages/About'
function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
      <div className='w-screen min-h-screen bg-rose-500 flex flex-col font-stretch-ultra-condensed'>
        <Navbar/>
       <Routes>
        <Route path='/' element={<Home/>}/>
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/signup"
          element={<Signup setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route
          path="/forgot-password"
          element={<ForgotPassword/>}
        />
        <Route
          path="/update-password/:id"
          element={<UpdatePassword/>}
        />
        <Route
          path="/verify-email"
          element={<VerifyEmail/>}
        />
        <Route
          path="/about"
          element={<About/>}
        />
       </Routes>
      </div>
  )
}

export default App
