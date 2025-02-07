import React from 'react'
import './Checkout.module.css'
import {useFormik} from 'formik';
import * as yub from 'yup'
import { useContext } from 'react';
import { CartContext } from '../../Context/CartContext';
import { Helmet } from 'react-helmet';


let validationSchema = yub.object({
  details : yub.string().required("details is required"),
  phone : yub.string().required("phone is required"),
  city: yub.string().required("city is required")
})

export default function Checkout() {

  let {onlinePayment , cartid} = useContext(CartContext)

  async function handleOnlinePayment(values) {
    let response = await onlinePayment(cartid , "http://localhost:3000" , values )
    window.location.href = response?.data.session.url
  }

  function handleCheckOutSubmit(values) {
    handleOnlinePayment(values)
  }

  let formik = useFormik({
    initialValues:{
        details : "",
        phone: "",
        city: ""
    }, 
    validationSchema,
    onSubmit: handleCheckOutSubmit
  })

  return <>
  <Helmet>
      <title>Checkout</title>
  </Helmet>
  <div className="vh-100 my-5">
  <form onSubmit={formik.handleSubmit} className='bg-light p-5 rounded-3' >
    <label htmlFor="details">Details</label>
    <input id='details' type="text" className='form-control mb-3' name='details' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.details} />
    {formik.errors.details && formik.touched.details ? <div className='alert alert-danger'>{formik.errors.details}</div> : ''}

    <label htmlFor="phone">Phone</label>
    <input id='phone' type="text" className='form-control mb-4' name='phone' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} />
    {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger'>{formik.errors.phone}</div> : ''}

    <label htmlFor="city">City</label>
    <input id='city' type="text" className='form-control mb-4' name='city' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.city} />
    {formik.errors.city && formik.touched.city ? <div className='alert alert-danger'>{formik.errors.city}</div> : ''}
  
    <button type='submit' className='btn btn-outline-info w-100' disabled={!(formik.isValid && formik.dirty)}>Pay</button>
  </form>
  </div>
  </>
}
