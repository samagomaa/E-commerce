import React from 'react'
import style from './Footer.module.css'
import amazonIcon from '../../Assets/images/amazon-pay-svgrepo-com.svg'
import paypalIcon from '../../Assets/images/paypal-svgrepo-com.svg'
import masterCardIcon from '../../Assets/images/mastercard-svgrepo-com.svg'
import googleplayIcon from '../../Assets/images/google-play-badge-1-logo-svgrepo-com.svg'
import appstoreIcon from '../../Assets/images/download-on-the-app-store-apple-logo-svgrepo-com.svg'
export default function Footer() {
  return <>
  <div className='bg-body-tertiary'>
  <div className="container py-3">
  <div className='row'>
      <div className="col-md-12">
          <h2 className=' fs-4'>Get the FrechCart app</h2>
          <h4 className={`${style.dark_gray_text} ${style.footer_subtitle} pb-2`}>we will send you link, open it on your phone to download the app</h4>
      </div>
      <div className="col-md-12">
        <div className='d-flex align-items-center  justify-content-between'>
        <input type="text" className='form-control form-control-sm' placeholder='Email...'/>
        <button className={`btn btn-success py-1 ms-2 w-25`}>Share app link</button>
        </div>
      </div>
      <div className="col-md-6">
        <div className='d-flex align-items-center'>
        <h5 className={style.footer_social}>Payment Partners</h5>
        <div className='px-2'>
        <img src={amazonIcon} alt="amazon payment"/>
        </div>
        <div>
        <img src={masterCardIcon} alt="masterCard"/>
        </div>
        <div className='px-2'>
        <img src={paypalIcon} alt="paypal"/>
        </div>
        </div>
      </div>
      <div className="col-md-6">
      <div className='d-flex align-items-center justify-content-end'>
        <h5 className={style.footer_social}>Get deliveries with FreshCart</h5>
        <div className='px-1'>
        <img src={googleplayIcon} alt="google play Icon"/>
        </div>
        <div>
        <img src={appstoreIcon} alt="app store Icon"/>
        </div>
        </div>
      </div>
    </div>
  </div>
  </div>
  
</>
}
