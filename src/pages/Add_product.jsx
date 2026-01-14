import React from 'react'
import { Assets } from '../assets/Assets'
import { useState } from 'react'
import axios from 'axios'
import { backend_url } from '../App'
import { toast } from 'react-toastify'

export default function Add_product({token}) {
  //for image
  const [image1, setimage1] = useState(false)
  const [image2, setimage2] = useState(false)
  const [image3, setimage3] = useState(false)
  const [image4, setimage4] = useState(false)

  //for date
  const [name, setname] = useState('')
  const [description, setdescription] = useState('')
  const [price, setprice] = useState('')
  const [catrgory, setcatrgory] = useState('Men')
  const [subcatrgory, setsubcatrgory] = useState('Topwear')
  const [Bestseller, setBestseller] = useState(false)
  const [size, setsize] = useState([])
  
  const onsubmithandler = async (e)=>{
    //  alert('s')
    e.preventDefault();
   
    try {
      const formdata = new FormData()
      //form date
      formdata.append("name",name)
      formdata.append("description",description)
      formdata.append("price",price)
      formdata.append("categroy",catrgory)
      formdata.append("subCategroy",subcatrgory)
      formdata.append("bestseller",Bestseller)
      formdata.append("size",JSON.stringify(size))
      //form data image
      formdata.append("image1",image1)
      formdata.append("image2",image2)
      formdata.append("image3",image3)
      formdata.append("image4",image4)

       const response = await axios.post(backend_url+'/api/product/add',formdata,{headers:{token}});
      //  console.log(response)
      if(response.data.success){
        toast.success(response.data.message)
        setBestseller(false)
        setdescription('')
        setimage1(false)
        setimage2(false)
        setimage3(false)
        setimage4(false)
        setname('')
        setprice('')
        setsize([])
      }else{
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(response.data.message)
      console.log(error)
    }
  }

  return (
    <form onSubmit={onsubmithandler} className="flex flex-col w-full items-start gap-3">
      <div>
        <p>Upload image</p>
        <div className='flex gap-2'>
          <label htmlFor='image1'>
            <img className="w-20"src={!image1 ?Assets.upload:URL.createObjectURL(image1)} alt="" />
            <input onClick={(e)=>setimage1(e.target.files[0])} type="file" hidden id="image1" />
          </label>
          <label htmlFor='image2'>
            <img className="w-20"src={!image2 ?Assets.upload:URL.createObjectURL(image2)} alt="" />
            <input onClick={(e)=>setimage2(e.target.files[0])} type="file" hidden id="image2" />
          </label>
          <label htmlFor='image3'>
            <img className="w-20"src={!image3 ?Assets.upload:URL.createObjectURL(image3)} alt="" />
            <input onClick={(e)=>setimage3(e.target.files[0])} type="file" hidden id="image3" />
          </label>
          <label htmlFor='image4'>
            <img className="w-20"src={!image4 ?Assets.upload:URL.createObjectURL(image4)} alt="" />
            <input onClick={(e)=>setimage4(e.target.files[0])} type="file" hidden id="image4" />
          </label>
        </div>
      </div>
      <div className='w-full'>
        <p className='mb-2'>Product name</p>
        <input onChange={(e)=>setname(e.target.value)} value={name} className='w-full max-w-125 px-3 py-2 ' type="text" placeholder='Enter product name'required />
      </div>
      <div className='w-full'>
        <p className='mb-2'>Product description</p>
        <textarea onChange={(e)=>setdescription(e.target.value)} value={description} className='w-full max-w-125 px-3 py-2 ' type="text" placeholder='Enter description'required />
      </div>
      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2'>Prodcut category</p>
          <select onChange={(e)=>setcatrgory(e.target.value)} className='w-full px-3 py-2'>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className='mb-2'>Sub category</p>
          <select onChange={(e)=>setsubcatrgory(e.target.value)} className='w-full px-3 py-2'>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div>
          <p className='mb-2'>Product Price</p>
          <input onChange={(e)=>setprice(e.target.value)} required value={price} className='w-full px-3 py-2 sm:w-30'type="number" placeholder='enter price' />
        </div>
      </div>
      <div>
        <p>Prodcut size</p>
        <div className='flex gap-3'>
          <div onClick={()=>setsize(prev=>prev.includes('S')?prev.filter(item=>item!=='S'):[...prev,'S'])}>
            <p className={` ${size.includes('S')?"bg-pink-100":"bg-slate-200"} px-3 py-1 cursor-pointer`}>S</p></div>
          <div onClick={()=>setsize(prev=>prev.includes('M')?prev.filter(item=>item!=='M'):[...prev,'M'])}>
            <p className={` ${size.includes('M')?"bg-pink-100":"bg-slate-200"} px-3 py-1 cursor-pointer`}>M</p></div>
          <div onClick={()=>setsize(prev=>prev.includes('L')?prev.filter(item=>item!=='L'):[...prev,'L'])}>
            <p className={` ${size.includes('L')?"bg-pink-100":"bg-slate-200"} px-3 py-1 cursor-pointer`}>L</p></div>
          <div onClick={()=>setsize(prev=>prev.includes('XL')?prev.filter(item=>item!=='XL'):[...prev,'XL'])}>
            <p className={` ${size.includes('XL')?"bg-pink-100":"bg-slate-200"} px-3 py-1 cursor-pointer`}>XL</p></div>
          <div onClick={()=>setsize(prev=>prev.includes('XXL')?prev.filter(item=>item!=='XXL'):[...prev,'XXL'])}>
            <p className={` ${size.includes('XXL')?"bg-pink-100":"bg-slate-200"} px-3 py-1 cursor-pointer`}>XXL</p></div>
        </div>
      </div>
      <div className='flex gap-2 mt-2'>
        <input onChange={()=>setBestseller(prev=>!prev)} checked={Bestseller} type="checkbox" name="" id="bestseller" />
        <label className='cursor-pointer' htmlFor="bestseller">add to bestseller</label>
      </div>
      <button type='submit'className='w-28 py-3 mt-4 bg-black text-white'>Add</button>
    </form>
  )
}
