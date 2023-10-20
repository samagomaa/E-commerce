import React from 'react'
import './ShowSubCategories.module.css'
import axios from 'axios'
import { useQuery } from 'react-query'
import { Bars } from  'react-loader-spinner'

export default function ShowSubCategories(props) {

  function getSubCate(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${props.id}/subcategories`)
  }

  let {data , isLoading} = useQuery("SuCategory" , getSubCate)
  console.log(data?.data);

  return <>
  {isLoading? 
  <div className='d-flex justify-content-center'>
<Bars
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="bars-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/>
  </div>
: 
<div className='mb-5'>
  <h2 className='py-4 d-flex justify-content-center main-color'> {props.cate} subcategories</h2>
<div className="row g-3">
    {data?.data.data.map((sub)=>
    <div className="col-md-4">
      <div className='addParent border border-success rounded text-center py-3'>
        <h3>{sub.name}</h3>
      </div>
    </div>)}
  </div>
</div>
    } 
  
  </>
}
