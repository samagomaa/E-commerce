import React, { useState } from 'react'
import './ResetPassword.module.css'
import { useFormik } from 'formik'
import axios from 'axios'
import * as yub from 'yup'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import { Bars } from 'react-loader-spinner'


let validateScheme = yub.object({
  email : yub.string().required("Email is required").email("enter valid email"),
  newPassword: yub.string().matches(/^[A-Z][a-z0-9]{5,11}$/, "Invalid password , password should begin with an uppercase letter and can be 5 to 10 characters  ").required("password is required")
})

export default function ResetPassword() {
let nav = useNavigate()
const [ isloading , setisloading] = useState(false)

  async function handleUpdatePassword(value) {
    setisloading(true)
    let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword` , value)
    .catch((error)=>{
      setisloading(false)
      console.log(error.response.data.message);
    })
    if(data.token){
      setisloading(false)
      nav("/")
    }
    else{
      setisloading(false)
      console.log("msh shghal");
    }
  }

  let formik = useFormik({
    initialValues :{
      email :"",
      newPassword:""
    },
    validationSchema:validateScheme,
    onSubmit: handleUpdatePassword
  })


  return <>
  <Helmet><title>Reset Password</title></Helmet>
  <div className='vh-100 my-5 d-flex justify-content-center align-items-center'>
    <form onSubmit={formik.handleSubmit} className='w-75'>
      <div>
      <h4>Reset your account password</h4>
      </div>
  <div className="form-floating mb-3">
  <input value={formik.values.name} onBlur={formik.handleBlur} onChange={formik.handleChange} name='email' type="text" className="form-control" id="floatingInput" placeholder="name@example.com" />
  <label htmlFor="floatingInput">email </label>
  {formik.errors.email && formik.touched.email ? <div className='alert alert-danger py-2 my-2'>{formik.errors.email}</div> : ''}
  </div>
  <div className="form-floating mb-3">
  <input value={formik.values.name} onBlur={formik.handleBlur} onChange={formik.handleChange} name='newPassword' type="password" className="form-control" id="passwordInput" placeholder="abcd123" />
  <label htmlFor="passwordInput">password </label>
  {formik.errors.newPassword && formik.touched.newPassword ? <div className='alert alert-danger py-2 my-2'>{formik.errors.newPassword}</div> : ''}
  </div>
  {isloading?<button className='btn btn-info' type='submit'>
    <Bars
      height="20"
      width="30"
      color="#4fa94d"
      ariaLabel="bars-loading"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
/>
    </button>:<button type='submit' className='btn btn-outline-success'>Reset password</button> }
    </form>
  </div>
  </>
}
