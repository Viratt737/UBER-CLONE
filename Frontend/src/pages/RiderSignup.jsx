import React, { useState, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { UserDataContext } from '../context/UserContext'

const RiderSignup = () => {

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { setUser } = useContext(UserDataContext)
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()

    const data = {
      role: 'rider', // important (differentiate user vs rider)
      email,
      fullname: {
        firstname: firstname,
        lastname: lastname
      },
      password
    }

    console.log(data)

    //  save in context
    setUser(data)

    //  redirect (rider dashboard)
    navigate('/rider-home')

    // reset
    setFirstname('')
    setLastname('')
    setEmail('')
    setPassword('')
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <h1 className='text-3xl font-semibold mb-8'>Uber Rider</h1>

        <form onSubmit={submitHandler}>

          <h3 className='text-lg font-medium mb-2'>First Name</h3>
          <input
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            className='bg-gray-200 rounded px-4 py-2 w-full text-lg mb-4'
            type="text"
            placeholder='First name'
            required
          />

          <h3 className='text-lg font-medium mb-2'>Last Name</h3>
          <input
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            className='bg-gray-200 rounded px-4 py-2 w-full text-lg mb-4'
            type="text"
            placeholder='Last name'
            required
          />

          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='bg-gray-200 rounded px-4 py-2 w-full text-lg mb-4'
            type="email"
            placeholder='email@example.com'
            required
          />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='bg-gray-200 mb-7 rounded px-4 py-2 w-full text-lg'
            type="password"
            placeholder='password'
            required
          />

          {/* GRAY BUTTON */}
          <button
            type="submit"
            className='bg-gray-800 hover:bg-gray-900 text-white w-full py-2 rounded mb-3 transition duration-200'
          >
            Create Rider Account
          </button>

          <p className='text-center text-sm'>
            Already have an account?{" "}
            <Link to="/rider-login" className='text-blue-600'>
              Login here
            </Link>
          </p>

        </form>
      </div>

      <div>
        <Link
          to='/signup'
          className='bg-black flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-2 w-full text-lg'
        >
          Sign up as User
        </Link>
      </div>
    </div>
  )
}

export default RiderSignup