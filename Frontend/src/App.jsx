import React from 'react'
import {Route, Routes} from 'react-router-dom'
import Start from'./pages/Start'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import RiderLogin from './pages/RiderLogin'
import RiderSignup from './pages/RiderSignup'
import UserProtectWrapper from './pages/UserProtectWrapper'
import UserLogout from './pages/UserLogout'
import RiderHome from './pages/RiderHome'
function App() {

  return (
     <div>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/login' element={<UserLogin />} />
        <Route path='/signup' element={<UserSignup />} />
        <Route path='/rider-login' element={<RiderLogin />} />
        <Route path='/rider-signup' element={<RiderSignup />} />
        <Route path='/home' element={
          <UserProtectWrapper>
            <Home />
        </UserProtectWrapper>} />
        <Route path='/user/logout' element={
          <UserProtectWrapper>
            <UserLogout />
          </UserProtectWrapper>
        }/>
        <Route path='/rider-home' element={<RiderHome/>} />
      </Routes>
     </div>
  )
}

export default App
