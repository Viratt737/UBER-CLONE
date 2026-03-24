import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Start from'./pages/Start'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import RiderLogin from './pages/RiderLogin'
import RiderSignup from './pages/RiderSignup'
function App() {

  return (
     <div>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/rider-login' element={<RiderLogin />} />
        <Route path='/rider-signup' element={<RiderSignup />} />
        <Route path='/home' element={<Home />} />
      </Routes>
     </div>
  )
}

export default App
