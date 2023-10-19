import React from 'react'
import './ResetPassword.module.css'
import { useFormik } from 'formik'
import axios from 'axios'
import * as yub from 'yup'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet'


let validateScheme = yub.object({
  email : yub.string().required("Email is required").email("enter valid email"),
  newPassword: yub.string().matches(/^[A-Z][a-z0-9]{5,11}$/, "Invalid password , password should begin with an uppercase letter and can be 5 to 10 characters  ").required("password is required")
})

export default function ResetPassword() {

  let nav = useNavigate()

  let formik = useFormik({
    initialValues :{
      email :"",
      newPassword:""
    },
    validationSchema:validateScheme,
    onSubmit: handleUpdatePassword
  })

  async function handleUpdatePassword(value) {
    let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword` , value)
    .catch((error)=>{
      console.log(error.response.data.message);
    })
    if(data.token){
      nav("/login")
    }
    else{
      console.log("msh shghal");
    }
  }
  return <>
  <Helmet>
                <title>Reset Password</title>
            </Helmet>
  <div className='my-5'>
    <form onSubmit={formik.handleSubmit}>
    <h2>reset your account password</h2>
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
  <button type='submit' className='btn btn-outline-success fs-4'>reset password</button>
    </form>
  </div>
  </>
}
