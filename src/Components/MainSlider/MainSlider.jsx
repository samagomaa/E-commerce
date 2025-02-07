import React from 'react'
import './MainSlider.module.css'
import Slider from 'react-slick'
import slide1 from '../../Assets/images/61cSNgtEISL._AC_SY200_.jpg'
import slide2 from '../../Assets/images/XCM_Manual_1396328_4379574_Egypt_EG_BAU_GW_DC_SL_Jewelry_379x304_1X._SY304_CB650636675_.jpg'
import slide3 from '../../Assets/images/41nN4nvKaAL._AC_SY200_.jpg'
import blog1 from '../../Assets/images/XCM_Manual_1396328_4379575_Egypt_EG_BAU_GW_DC_SL_Bags_Wallets_379x304_1X._SY304_CB650636675_.jpg'
import blog2 from '../../Assets/images/XCM_Manual_1533480_5305769_379x304_1X._SY304_CB616236518_.jpg'

export default function MainSlider() {
  const settings = {
    arrows : false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1, 
    autoplay: true,
    autoplaySpeed: 2500
  };
  return <>
  <div className="container">
  <div className='row gx-0 w-50 mx-auto py-4'>
      <div className="col-md-6 col-sm-6">
      <Slider {...settings}>
        <img  className='w-100' src={slide1} alt="img1"  />
        <img  className='w-100' src={slide2} alt="img2"  />
        <img  className='w-100' src={slide3} alt="img3"  />
      </Slider>
      </div>
      <div className="col-md-6 col-sm-6">
        <div className='d-flex flex-column'>
        <img className='w-100' src={blog1} alt="img4" />
        <img className='w-100' src={blog2} alt="img5" />
        </div>
      </div>
    </div>
  </div>
  
    
  </>
}
