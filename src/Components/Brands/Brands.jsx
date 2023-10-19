import React from 'react'
import './Brands.module.css'
import axios from 'axios'
import { useQuery } from 'react-query'
import {Helmet} from "react-helmet";

export default function Brands() {

  function brandNotification(name){
    console.log(`halllloooo ${name}`);
  }

  function getBrands(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }

  let {data} = useQuery("GetAllBrands" , getBrands)

  return <>
  <Helmet>
      <title>Brands</title>
  </Helmet>
  <div className='my-5 text-center'>
  <h1 className='main-color'>All Brands</h1>
  </div>
    <div className='row g-3'>
      {data?.data.data.map((brand)=>
      <div onClick={()=>brandNotification(brand.name)} className="col-md-3">
        <div className='border rounded py-3 addParent'>
        <img key={brand._id} className='w-100' src={brand.image} alt={brand.name} />
        <h4 className='text-center'>{brand.name}</h4>
        </div>
      </div>
      )}
    </div>
  </>
}
