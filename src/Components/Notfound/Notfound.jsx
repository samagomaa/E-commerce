import React from 'react'
import './Notfound.module.css'
import { Helmet } from 'react-helmet'

export default function Notfound() {
  return <>
    <Helmet>
      <title>Not Found</title>
    </Helmet>
    <h1 className='position-absolute top-50 start-50 translate-middle' >NOT FOUND</h1>
  </>
}
