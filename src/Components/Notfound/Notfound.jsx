import React from 'react'
import './Notfound.module.css'
import { Helmet } from 'react-helmet'
import errorIcon from '../../Assets/images/error.svg'

export default function Notfound() {
  return <>
    <Helmet><title>Not Found</title></Helmet>
      <div className='w-100 vh-100 d-flex align-items-center justify-content-center'>
        <div>
        <img src={errorIcon} className='w-100' alt="error Icon" />
        </div>
    </div>
    
  </>
}
