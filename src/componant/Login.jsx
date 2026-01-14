import React ,{useState}from 'react'
import axios from 'axios'
import { backend_url } from '../App'
import { toast } from 'react-toastify'
export default function Login({settoken}) {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const onsubmithandler = async (e)=>{
        try {
            e.preventDefault();
            const response = await axios.post(backend_url+'/api/user/admin/login',{email,password})
            // console.log(response);
            
            if(response.data.success){
                settoken(response.data.token)
            }else{
                toast.error(response.data.massage)
            }
        } catch (error) {
            console.log(error)
            toast.error(error)
        }
    }


  return (
    <div className='min-h-screen flex items-center justify-center w-full'>
        <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
            <h1 className='text-2x1 font-bold mb-4 '>Admin Login</h1>
            <form onSubmit={onsubmithandler}>
                <div className='mb-3 min-w-72'>
                    <p className='text-sm font-medium text-gray-600 mb-2'>Email</p>
                    <input onChange={(e) =>setemail(e.target.value)} value={email} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'type="email" placeholder='enter mail'  required />
                </div>
                <div  className='mb-3 min-w-72'>
                    <p className='text-sm font-medium text-gray-600 mb-2'>Password</p>
                    <input onChange={(e) =>setpassword(e.target.value)} value={password} className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none' type="password" placeholder='enter password'  required />
                </div>
                <button className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black' type='submit'>login</button>
            </form>
        </div>
    </div>
  )
}
