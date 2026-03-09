import React, { useState } from 'react'
import { Link } from "react-router-dom"

const UserLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState({})

  const submitHandler = async (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password
    }

    setUserData(data)
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <h1 className='text-3xl font-semibold mb-8'>Uber</h1>
        <form onSubmit={submitHandler}>
          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            className='bg-gray-200 rounded px-4 py-2 w-full text-lg placeholder:text-base mb-4'
            type="email"
            placeholder='email@example.com'
          />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input
            className='bg-gray-200 mb-7 rounded px-4 py-2 w-full text-lg placeholder:text-base'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            required
            type="password"
            placeholder='password'
          />

          <button
            type="submit"
            className='bg-black text-white w-full py-2 rounded mb-3'
          >
            Login
          </button>

          <p className='text-center text-sm'>
            New here?{" "}
            <Link to="/signup" className='text-blue-600'>
              Create new Account
            </Link>
          </p>
        </form>
      </div>

      <div>
        <Link
          to='/rider-login'
          className='bg-[#10b461] flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
        >Sign in as Rider</Link>
      </div>
    </div>
  )
}

export default UserLogin