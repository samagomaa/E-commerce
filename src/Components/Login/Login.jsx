import React, { useContext, useState } from 'react';
import './Login.module.css';
import { useFormik } from 'formik';
import * as yub from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Bars } from  'react-loader-spinner'
import { UserContext } from '../../Context/UserContext';

let validateScheme = yub.object({
  email: yub.string().email("email is invalid").required("email is required"),
  password: yub.string().matches(/^[A-Z][a-z0-9]{5,10}$/, "Invalid password , password should begin with an uppercase letter and can be 5 to 10 characters  ").required("password is required")
})
export default function Login() {
  
  let navigate = useNavigate()
  const [error , seterror] = useState(null)
  const [ isloading , setisloading] = useState(false)
  let {setUserToken} = useContext(UserContext)
  async function loginSubmit(values){
    setisloading(true);
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin` , values )
    .catch(
    (err) => { 
      setisloading(false)
      seterror(err.response.data.message)
    }
    )
    if(data.message === 'success'){
      setisloading(false);
      localStorage.setItem("userToken" , data.token);
      setUserToken(data.token);
      navigate("/");
    }
  }
  
  let formik = useFormik({
    initialValues:{
      email:"",
      password:"",
    },
    validationSchema:validateScheme,
    onSubmit:loginSubmit
  })
  return <>
  
  <div className='py-3 mx-auto w-100 my-5'>
  <h1>Login now</h1>
  <form onSubmit={formik.handleSubmit}>
    {error?<div className='alert alert-danger'>{error}</div>:""}
    <label htmlFor="emailf">Email :</label>
    <input id='emailf' className='form-control mb-3' type="email" name='email' value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
    {formik.errors.email && formik.touched.email ? <div className='alert alert-danger py-2 my-2'>{formik.errors.email}</div> : ''}
    <label htmlFor="passwordf">Password :</label>
    <input id='passwordf' className='form-control mb-3' type="password" name='password' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
    {formik.errors.password && formik.touched.password ? <div className='alert alert-danger py-2 my-2'>{formik.errors.password}</div> : ''}
    <div>
    <Link className='btn p-0 m-3 ms-0 btnFocus fs-5 fw-medium ' to={"/Forgetpassword"}> <span className='textChange'>forget your password ?</span></Link>
    {isloading?<button className='btn btn-success m-3 me-0 fa-pull-right px-4 py-2' type='submit'>
    <Bars
      height="20"
      width="20"
      color="#fff"
      ariaLabel="bars-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
/>
    </button>: (formik.isValid && formik.dirty) ? 
    <button className='btn btn-success m-3 me-0 fa-pull-right fs-5' type='submit'>Login now</button> :
      <button disabled = {!(formik.isValid && formik.dirty)} className='btn btn-outline-secondary m-3 me-0 fa-pull-right fs-5 ' type='submit'>Login now</button>
    } 
    </div>
  </form>
  </div>
  
  </>
}

