import React, { useEffect, useState } from 'react'
import './Products.module.css'
import axios from 'axios'
import ChildProduct from '../ChildProduct/ChildProduct'

export default function Products() {

  let [productList , setProducts] = useState([])
  let [result , setResult] = useState([])
  useEffect(()=>{getALLProducts()} , [])

  async function getALLProducts(value) {
    let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    setProducts(data.data)
    setResult(productList.filter((e) => e.category.name.toLowerCase().includes(value) || e.title.toLowerCase().includes(value)))  
    if(result.length === 0 ){
      setResult(data.data)
    }
    
  }
  
  const handleChange = (value)=>{
    getALLProducts(value)
  }

  return<>
  <input onChange={(e)=>handleChange(e.target.value)} type="text" className='form-control w-75 my-5 mx-auto' placeholder='search...' />
  <div className="row g-4 my-5">
  {result.map((product)=><ChildProduct key={product._id} productDetails={product}/> )}
  </div>
    
  </>
}
