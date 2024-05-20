import React, { useState } from 'react';
import './Register.module.css';
import { useFormik } from 'formik';
import * as yub from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Bars } from  'react-loader-spinner'
import { Helmet } from 'react-helmet';


let phoneRegex = /^\d{11}$|^\d{3}-\d{3}-\d{4}$|^\(\d{3}\) \d{3}-\d{4}$/;

let validateScheme = yub.object({
  name: yub.string().min(3 , "name minimum length is 3").max(10 , "name maximum length is 10").required("name is required"),
  phone: yub.string().matches(phoneRegex,"phone is invalid" ).required("phone is required"),
  email: yub.string().email("email is invalid").required("email is required"),
  password: yub.string().matches(/^[A-Z][a-z0-9]{5,10}$/, "Invalid password , password should begin with an uppercase letter and can be 5 to 10 characters  ").required("password is required"),
  rePassword: yub.string().oneOf([yub.ref("password")] , "password and repassword are not the same").required("rePassword is required"),
})
export default function Register() {
  
  let navigate = useNavigate()
  const [error , seterror] = useState(null)
  const [ isloading , setisloading] = useState(false)
  
  async function submitRegister(values){
    setisloading(true);
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup` , values )
    .catch(
    (err) => { 
      setisloading(false)
      seterror(err.response.data.message)
    }
    )
    if(data.message === 'success'){
      setisloading(false);
      navigate("/");
    }
  }
  
  let formik = useFormik({
    initialValues:{
      name:"",
      email:"",
      password:"",
      rePassword:"",
      phone:""
    },
    validationSchema:validateScheme,
    onSubmit:submitRegister
  })
  return <>
    <Helmet>
                <title>Register</title>
            </Helmet>
  
  <div className='py-5 mx-auto w-100'>
  <h2 className='py-3'>register now</h2>
  <form onSubmit={formik.handleSubmit}>
    {error?<div className='alert alert-dange'>{error}</div>:""}
    <label htmlFor="namef">Name :</label>
    <input id='namef' className='form-control mb-3' type="text" name='name' value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
    {formik.errors.name && formik.touched.name ? <div className='alert alert-danger py-2 my-2 text-danger py-3'>{formik.errors.name}</div> : ''}
    <label htmlFor="emailf">email :</label>
    <input id='emailf' className='form-control mb-3' type="email" name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
    {formik.errors.email && formik.touched.email ? <div className='alert alert-danger py-2 my-2 text-danger py-3'>{formik.errors.email}</div> : ''}
    <label htmlFor="passwordf">password :</label>
    <input id='passwordf' className='form-control mb-3' type="password" name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
    {formik.errors.password && formik.touched.password ? <div className='alert alert-danger py-2 my-2 text-danger py-3'>{formik.errors.password}</div> : ''}
    <label htmlFor="rePasswordf">rePassword :</label>
    <input id='rePasswordf' className='form-control mb-3' type="password" name='rePassword' value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />
    {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert alert-danger py-2 my-2 text-danger py-3'>{formik.errors.rePassword}</div> : ''}
    <label htmlFor="phonef">phone :</label>
    <input id='phonef' className='form-control mb-3' type="tel" name='phone' value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />
    {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger py-2 my-2 text-danger py-3'>{formik.errors.phone}</div> : ''}
    {isloading?<button className='btn btn-info my-3 fs-4 float-end mb-5' type='submit'>
    <Bars
      height="20"
      width="20"
      color="#4fa94d"
      ariaLabel="bars-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
/>
    </button>: <button disabled = {!(formik.isValid && formik.dirty)} className='btn btn-outline-secondary my-3 fs-4 float-end mb-5' type='submit'>Register now</button>} 
  </form>
  </div>
  
  </>
}
