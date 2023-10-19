import React from 'react'
import './SliderCategories.module.css'
import Slider from 'react-slick'
import { useQuery } from 'react-query'
import axios from 'axios'




export default function SliderCategories() {


  function allCategories() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
}

  let { data } = useQuery("CategoriesProducts" , allCategories )
  console.log(data?.data);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1
  }


  return <>
  <div className='py-5'> 
  <Slider {...settings}>
        {data?.data.data.map((e)=>
        <div>
        <img key={e._id} height={200} src={e.image} className='w-100' alt={data?.data.data.name} />
        <h4 className='main-color' >{e.name}</h4>
        </div>
        
        )}
      </Slider>
  </div>
  </>
}
