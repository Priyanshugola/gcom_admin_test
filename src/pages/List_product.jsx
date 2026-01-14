import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { backend_url } from '../App'
import { toast } from 'react-toastify'

export default function List_product({token}) {
  const [list, setlist] = useState([])
  const fetchlist = async ()=>{
    try {
      const response = await axios.post(backend_url+'/api/product/list',{},{headers:{token}});

      if(response.data.success){
        setlist(response.data.products)
        console.log(response.data.products)
      }else{
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const removeproduct = async (id) =>{
    
    try {
       const response = await axios.post(backend_url+'/api/product/remove',{id},{headers:{token}});

        if(response.data.success){
        toast.success(response.data.message)
        await fetchlist();
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
       console.log(error);
      toast.error(error.message)
    }

    
  }

  const currency = 'Rs.';
  useEffect(() => {
    fetchlist()   
  }, [])

  return (
    <>
    <p>All products list</p> 
    <div className='flex flex-col gap-2'>
      <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2 broder bg-gray-200 text-sm  '>
        <b>Image</b>
        <b>Name</b>
        <b>category</b>
        <b>Price</b>
        <b>Action</b>
      </div>
      {
        list.map((item,index)=>(
          <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr]
           items-center gap-2 py-1 px-2 bg-gray-100 text-sm' key={index}>
            <img className='w-12'src={item.image[0]} alt="" />
            <p>{item.name}</p>
            <p>{item.categroy}</p>
            <p>{currency}{item.price}</p>
            <p onClick={()=>removeproduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
          </div>

        ))
      }
    </div>
    </>
  )
}
