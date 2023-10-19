import React, { useState }  from 'react'
import './Categories.module.css'
import { useQuery } from 'react-query'
import axios from 'axios'
import ShowSubCategories from '../ShowSubCategories/ShowSubCategories'
import { Helmet } from 'react-helmet'

export default function Categories() {
  let [showSub , setShowSub ] = useState(false)
  let [SubID , setSubID] = useState("")
  let [CateName , setCateName] = useState("")

  function showSubCategory(id , name){
    setShowSub(true)
    setSubID(id)
    setCateName(name)
  }

  function allCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
}

  let { data , isLoading } = useQuery("CategoriesProducts" , allCategories )


  
  return <>
  <Helmet>
      <title>Categories</title>
  </Helmet>
  <div className="row g-5 py-5">
    {data?.data.data.map((category)=> 
    <div key={category._id} className="col-md-4" onClick={()=>showSubCategory(category._id , category.name )}>
      <div className='border rounded addParent'>
        <div>
        <img className='w-100' height={300} src={category.image} alt={category.name} />
        </div>
      <div className='py-3 text-center'>
      <h3 className='main-color'>{category.name}</h3>
      </div>
      </div>
    </div>
    )}
  </div>
  {showSub? <ShowSubCategories key={SubID}  id={SubID} cate={CateName} /> :console.log(" No subCategory") }
  </>
}