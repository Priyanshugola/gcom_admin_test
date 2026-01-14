import React ,{useState,useEffect} from 'react'
import Navbar from './componant/Navbar'
import Sidear from './componant/Sidear'
import { Route, Routes } from 'react-router-dom'
import Add_product from './pages/Add_product'
import List_product from './pages/List_product'
import Orders from './pages/Orders'
import Login from './componant/Login'
import {ToastContainer} from 'react-toastify'

// config.js
export const backend_url = import.meta.env.VITE_BACKEND_URL;

export default function App() {
  const [token, settoken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'')
  useEffect(() => {
    localStorage.setItem('token',token)
  }, [token])
  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer/>
      { token ===''?<Login settoken={settoken}/>:
      <>
      <Navbar settoken={settoken} />
      <hr style={{color:'gray'}} />
      <div className='flex w-full'>
        <Sidear />
        <div className='w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-700 text-base '>
          <Routes>
            <Route path='/add' element={<Add_product token={token}/>} />
            <Route path='/list' element={<List_product token={token}/>} />
            <Route path='/orders' element={<Orders token={token} />} />
          </Routes>
        </div>
      </div>
      </>
      }
    </div>
  )
}


// 07:24:23 Create Admin dashboard
// 08:01:55 Connect Backend APIs with Admin panel
// 09:24:00 Connect Backend APIs with eCommerce Website
// 10:32:55 Create Place Order feature
// 11:37:02 Display order details in Admin panel
// 12:10:59 Add Stripe payment gateway
// 12:45:52 Add Razorpay payment gateway
// 13:21:15 Deploy Full Stack project on Vercel