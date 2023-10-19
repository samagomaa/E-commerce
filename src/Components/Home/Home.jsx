import React from 'react'
import './Home.module.css'
import Products from '../Products/Products'
import MainSlider from '../MainSlider/MainSlider'
import SliderCategories from '../SliderCategories/SliderCategories'
import { Helmet } from 'react-helmet'



export default function Home() {
  
  return <>
  <Helmet>
                <title>Home</title>
            </Helmet>
      <MainSlider/>
      <SliderCategories/>
      <Products/>
  </>
}