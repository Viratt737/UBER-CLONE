import React, { useState, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { UserDataContext } from '../context/UserContext'
import axios from 'axios'

const UserSignup = () => {

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {user, setUser } = useContext(UserDataContext)
  const navigate = useNavigate()

const submitHandler = async (e) => {
  e.preventDefault()

  const newUser = {
    email,
    fullname: {
      firstname: firstname,
      lastname: lastname
    },
    password
  }

  console.log(newUser)
    
  try {
    const response = await axios.post(
      `http://localhost:3000/users/register`,
      newUser
    )

    const data = response.data

    if (response.status === 201) {
      setUser(data.user)
      navigate('/home')
    }

    console.log(data.user) 

  } catch (error) {
    console.log(error.response?.data || error.message)
  }

  // reset
  setFirstname('')
  setLastname('')
  setEmail('')
  setPassword('')
}

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <h1 className='text-3xl font-semibold mb-8'>Uber</h1>

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

          <button
            type="submit"
            className='bg-black text-white w-full py-2 rounded mb-3'
          >
            Create Account
          </button>

          <p className='text-center text-sm'>
            Already have an account?{" "}
            <Link to="/login" className='text-blue-600'>
              Login here
            </Link>
          </p>

        </form>
      </div>

      <div>
        <p className='text-xs'>
          By proceeding, you consent to get calls, WhatsApp or SMS messages.
        </p>
      </div>
    </div>
  )
}

export default UserSignup