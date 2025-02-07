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


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          speed: 500,
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          autoplay: true,
          autoplaySpeed: 1000,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          speed: 500,
          slidesToShow: 2,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 1000,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          speed: 500,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 1000,
        }
      }
    ]
  }


  return <>
  <div className='py-5'> 
  <Slider {...settings}>
        {data?.data.data.map((e)=>
        <div key={e._id}>
        <img key={e._id} height={200} src={e?.image} className='w-100' alt={data?.data.data.name} />
        <h4 className='main-color' >{e.name}</h4>
        </div>
        
        )}
      </Slider>
  </div>
  </>
}
