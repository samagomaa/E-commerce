import React, { useContext } from 'react'
import './Navbar.module.css'
import { Link, Navigate } from 'react-router-dom'
import { UserContext } from '../../Context/UserContext'
import { useQuery } from 'react-query'

import axios from 'axios'

export default function Navbar() {
  let {userToken , setUserToken} = useContext(UserContext)
  let  headers = { token: userToken} 

  async function getCart() {
    if(userToken){
      return  axios.get(`https://ecommerce.routemisr.com/api/v1/cart` , {headers})
    }
  }
  
  let {data} = useQuery("Countitems" , getCart )
  
  function logOut(){
    localStorage.removeItem("userToken");
    setUserToken(null);
    <Navigate to={"/login"} />
  }
  return <>
  <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container">
    <Link className="navbar-brand" to="/"><i className="fa-solid fa-cart-shopping fa-xl main-color"></i> </Link>
    <Link className="navbar-brand" to="/"><h3 className='d-flex'>fresh cart</h3></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      
        {userToken !== null? <>
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
          <li className="nav-item">
          <Link className="nav-link" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/cart">Cart</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/WishList">Wish list</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/Products">Products</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/Categories">Categories</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/Brands">Brands</Link>
        </li>
        
      </ul>
        </> : ""}

        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          {userToken !== null ? <>
            <li className="nav-item">
          <Link className="nav-link position-relative" to="/cart">
            <i className="fa-solid fa-cart-shopping fa-xl"></i>
            <h6 className="position-absolute top-0 start-100  translate-middle border rounded px-2 text-white main-bg-color" >{data?.data.numOfCartItems}</h6>
            </Link>
        </li>
            <li className="nav-item ms-2">
          <button className="nav-link btn" onClick={()=>logOut()}>Log out</button>
        </li>
          </> : <>
          <li className="nav-item">
          <Link className="nav-link" to="/">Login</Link>
        </li>
      <li className="nav-item">
          <Link className="nav-link" to="/register" >Register</Link>
        </li>
          </>}
      
      
      </ul>
    </div>
  </div>
</nav>
  </>
}
