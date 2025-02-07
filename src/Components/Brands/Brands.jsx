import React, { useState } from 'react'
import './Brands.module.css'
import axios from 'axios'
import { useQuery } from 'react-query'
import {Helmet} from "react-helmet";
import { Oval } from 'react-loader-spinner';

export default function Brands() {
  const [selectedItem, setSelectedItem] = useState(null);

  function getBrands(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
  }

  let {data , isLoading} = useQuery("GetAllBrands" , getBrands)

  return <>
  <Helmet>
      <title>Brands</title>
  </Helmet>
    <div className='row g-3 my-2'>
      <div className="col-md-12">
      <div className='text-center'>
        <h1 className='main-color'>All Brands</h1>
      </div>
      </div>

    {isLoading?<div className='vh-100 d-flex justify-content-center align-items-center'>
    <Oval
visible={true}
height="100"
width="100"
color="#4fa94d"
ariaLabel="oval-loading"
wrapperStyle={{}}
wrapperClass=""
  />
  </div>
  : ""  }

      {data?.data.data.map((brand)=>
      <div key={brand._id} onClick={()=>setSelectedItem(brand)} className="col-md-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
        <div className='border rounded py-3 addParent'>
        <img key={brand._id} className='w-100' src={brand.image} alt={brand.name} />
        <h4 className='text-center'>{brand.name}</h4>
        </div>
      </div>
      )}
    </div>

    {/* modal */}
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">{selectedItem?.name}</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <img  className='w-100' src={selectedItem?.image} alt={selectedItem?.name} />
      </div>
    </div>
  </div>
</div>
  </>
}
