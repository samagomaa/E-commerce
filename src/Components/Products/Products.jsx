import React, { useEffect, useState } from 'react'
import './Products.module.css'
import axios from 'axios'
import ChildProduct from '../ChildProduct/ChildProduct'
import { Oval } from  'react-loader-spinner'

export default function Products() {
  const [ isloading , setisloading] = useState(false)
  const [ iserror , seterror] = useState(false)
  let [productList , setProducts] = useState([])
  let [result , setResult] = useState([])
  
  useEffect(()=>{getALLProducts()} , [])

  async function getALLProducts() {
    setisloading(true)
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    .catch((err)=>{ 
      setisloading(false)
      seterror(true)
  })
  if(data.data){
    setisloading(false)
    setResult(data?.data)
    setProducts(data?.data)
  }
  }
  
  const handleChange = (value)=>{
    setisloading(true)
    if(value === ""){
      setisloading(false)
      setProducts(result)
    }else{
      setisloading(false)
      setProducts(result.filter((e) => e.category.name.toLowerCase().includes(value) || e.title.toLowerCase().includes(value) ))
    }
  }

  return<>
  <div className=''>
  <input onChange={(e)=>handleChange(e.target.value)} type="text" className='form-control w-75 my-5 mx-auto' placeholder='search...' />
  <div className="row g-4 my-5">
    {iserror? <div className='vh-100 d-flex justify-content-center align-items-center'>
      <div className=' bg-body-tertiary rounded-5 w-75 h-50 d-flex justify-content-center align-items-center'>
        <h3 className=''>Oops something bad might happen please reload the page</h3>
      </div>
    </div> : ""}
    {isloading?<div className='vh-100 d-flex justify-content-center align-items-center'>
      <Oval
  visible={true}
  height="100"
  width="100"
  color="#4fa94d"
  ariaLabel="oval-loading"
  wrapperStyle={{}}
  wrapperClass=""
    />
    </div>: ""}
    {productList.length > 0 ? productList.map((product)=><ChildProduct key={product._id} productDetails={product}/>) 
    : <div className='vh-100 d-flex justify-content-center align-items-center'>
    <div className=' bg-body-tertiary rounded-5 w-75 h-50 d-flex justify-content-center align-items-center'>
      <h3 className=''>No matching products found</h3>
    </div>
  </div>}
  </div>
  </div>
  
    
  </>
}
