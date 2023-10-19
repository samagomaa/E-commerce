import React, { useState } from 'react'
import './Forgetpassword.module.css'
import { useFormik } from 'formik'
import * as yub from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'


let validateScheme = yub.object({
  email : yub.string().required("Email is required").email("enter valid email")
})

let validateScheme2 = yub.object({
  resetCode : yub.string().required("code is required").matches(/^[0-9]+$/ , "must be only numbers")
})

export default function Forgetpassword() {
  let navigate = useNavigate()
let [errs , setErrs] = useState("")
  let formik = useFormik({
    initialValues:{
      email : ""
    },
    validationSchema: validateScheme ,
    onSubmit:handleSubmit
  })

  let resetFormik = useFormik({
    initialValues :{
      resetCode : ""
    },
    validationSchema: validateScheme2 ,
    onSubmit:handleResetPassword
  })

  async function handleResetPassword(value){
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode` , value)
    .catch((error)=>{setErrs(error.response.data.message);})
    if(data.status === "Success"){
      navigate("/ResetPassword")
    }
  }

  async function handleSubmit(value) {
    let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords` , value)
    .catch((error)=>{
    })

    if(data?.statusMsg === "success"){
      document.getElementById("resetPassword").classList.remove("d-none")
      document.getElementById("forgetPassword").classList.add("d-none")
    }
  }



  return <>
    <Helmet>
                <title> Forgetpassword</title>
            </Helmet>
  <div id='forgetPassword' className='my-4'>
  <form onSubmit={formik.handleSubmit} >
    <h2>please enter your verification code</h2>
  <div className="form-floating mb-3">
  <input onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.name} name='email' type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
  <label htmlFor="floatingInput">Email </label>
  {formik.errors.email && formik.touched.email ? <div className='alert alert-danger py-2 my-2'>{formik.errors.email}</div> : ''}
  <button disabled = {!(formik.isValid && formik.dirty)} type='submit' className='btn btn-outline-success my-3 fs-5'>verify</button>
</div>
  </form>
  </div>
  <div id='resetPassword' className='my-4 d-none'>
  <form onSubmit={resetFormik.handleSubmit} >
    <h2>reset your account password</h2>
  <div className="form-floating mb-3">
  <input onBlur={resetFormik.handleBlur} onChange={resetFormik.handleChange} value={resetFormik.values.name} name='resetCode' type="text" className="form-control" id="floatingInput" placeholder="111111" />
  <label htmlFor="floatingInput">code </label>
  {errs ? <div className='alert alert-danger py-2 my-2 text-danger'>{errs}</div> : ''}
  {resetFormik.errors.resetCode && resetFormik.touched.resetCode ? <div className='alert alert-danger py-2 my-2'>{resetFormik.errors.resetCode}</div> : ''}
  <button disabled = {!(resetFormik.isValid && resetFormik.dirty)} type='submit' className='btn btn-outline-success my-3 fs-5'>verify</button>
</div>
  </form>
  </div>
  </>
}
