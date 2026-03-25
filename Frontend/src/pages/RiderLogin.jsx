import React, { useState , useContext} from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import {RiderDataContext} from '../context/RiderContext'

const RiderLogin = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {rider, setRider} = useContext(RiderDataContext) 
    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault()
        
        const riderData = {
            email : email,
            password
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rider/login`, riderData)

        if(response.status === 200){
            const data = response.data
            setRider(data.rider)
            localStorage.setItem('token', data.token)
            navigate('/rider-home')

        }
        setEmail('')
        setPassword('')
    }

    return (
        <div className='p-7 h-screen flex flex-col justify-between'>

            <div>
                <img
                    className='w-16 mb-6'
                    src="https://www.svgrepo.com/show/505031/uber-driver.svg"
                    alt="logo"
                />
        {/* <h1 className='text-3xl font-semibold mb-8'>Uber Rider</h1> */}
                <form onSubmit={submitHandler}>

                    <h3 className='text-lg font-medium mb-2'>What's your email</h3>
                    <input
                        required
                        type="email"
                        placeholder='email@example.com'
                        className='bg-gray-200 mb-4 rounded px-4 py-2 w-full text-lg'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
                    <input
                        required
                        type="password"
                        placeholder='password'
                        className='bg-gray-200 mb-6 rounded px-4 py-2 w-full text-lg'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {/* GREEN BUTTON */}
                    <button
                        type='submit'
                        className='bg-green-600 hover:bg-green-700 text-white font-semibold mb-3 rounded-lg px-4 py-3 w-full text-lg transition duration-200'
                    >
                        Login
                    </button>

                </form>

                <p className='text-center'>
                    New here?{" "}
                    <Link to="/rider-signup" className='text-blue-600'>
                        Create new account
                    </Link>
                </p>
            </div>

            <div>
                <Link
                    to="/login"
                    className='bg-gray-300 flex items-center justify-center text-black font-semibold rounded-lg px-4 py-3 w-full text-lg'
                >
                    Sign in as User
                </Link>
            </div>

        </div>
    )
}

export default RiderLogin