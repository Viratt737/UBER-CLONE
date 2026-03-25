import React, { useState, useContext } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { RiderDataContext } from '../context/RiderContext'  // ✅ RiderContext se import
import axios from 'axios'

const RiderSignup = () => {

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [vehicleColor, setVehicleColor] = useState('')
  const [vehiclePlate, setVehiclePlate] = useState('')
  const [vehicleCapacity, setVehicleCapacity] = useState('')
  const [vehicleType, setVehicleType] = useState('')

  const { rider, setRider } = useContext(RiderDataContext)
  const navigate = useNavigate()

  const submitHandler = async (e) => {  
    e.preventDefault()

    const RiderData = {
      fullname: {
        firstname: firstname,
        lastname: lastname
      },
      email : email,
      password : password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rider/register`,
        RiderData
      )

      if (response.status === 201) {
        const data = response.data
        setRider(data.rider)
        localStorage.setItem('token', data.token)
        navigate('/rider-home')
      }

    } catch (error) {
      console.log("ERROR:", JSON.stringify(error.response?.data, null, 2))
    }

    // reset
    setFirstname('')
    setLastname('')
    setEmail('')
    setPassword('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
    setVehicleType('')
  }

  return (
    <div className='p-7 h-screen flex flex-col justify-between'>
      <div>
        <h1 className='text-3xl font-semibold mb-5'>Uber →</h1>

        <form onSubmit={submitHandler}>

          <h3 className='text-lg font-medium mb-2'>What's our Captain's name</h3>
          <div className='flex gap-2 mb-4'>
            <input
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className='bg-gray-200 rounded px-4 py-2 w-1/2 text-lg'
              type="text"
              placeholder='First name'
              required
            />
            <input
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className='bg-gray-200 rounded px-4 py-2 w-1/2 text-lg'
              type="text"
              placeholder='Last name'
              required
            />
          </div>

          <h3 className='text-lg font-medium mb-2'>What's our Captain's email</h3>
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
            className='bg-gray-200 mb-4 rounded px-4 py-2 w-full text-lg'
            type="password"
            placeholder='password'
            required
          />

          <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-2 mb-4'>
            <input
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              className='bg-gray-200 rounded px-4 py-2 w-1/2 text-lg'
              type="text"
              placeholder='Vehicle Color'
              required
            />
            <input
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              className='bg-gray-200 rounded px-4 py-2 w-1/2 text-lg'
              type="text"
              placeholder='Vehicle Plate'
              required
            />
          </div>

          <div className='flex gap-2 mb-7'>
            <input
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
              className='bg-gray-200 rounded px-4 py-2 w-1/2 text-lg'
              type="number"
              placeholder='Vehicle Capacity'
              required
            />
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className='bg-gray-200 rounded px-4 py-2 w-1/2 text-lg'
              required
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="motorcycle">Motorcycle</option>
              <option value="auto">Auto</option>
            </select>
          </div>

          <button
            type="submit"
            className='bg-black text-white w-full py-2 rounded mb-3'
          >
            Create Captain Account
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
        <p className='text-xs'>
          This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
        </p>
      </div>
    </div>
  )
}

export default RiderSignup