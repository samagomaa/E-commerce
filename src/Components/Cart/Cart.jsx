import React, { useContext, useEffect, useState } from 'react'
import './Cart.module.css'
import { CartContext } from '../../Context/CartContext'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

export default function Cart() {

  let {getLoggedUserCart , removeProduct , updateCartCount , clearCart} = useContext(CartContext)
  let [CartDetails , setCartDetails] = useState(null)
  
  async function updateCount(id , count){
    let {data} = await updateCartCount(id , count)
    setCartDetails(data);
    console.log(CartDetails);
  }

  async function removeItem(id){
    let {data} = await removeProduct(id)
    setCartDetails(data);
  }

  async function clearItems(){
    let {data} = await clearCart()
    if(data.message === "success"){
      setCartDetails(null)
    }
  }

  async function getCart() {
    let {data} = await getLoggedUserCart()
    setCartDetails(data)
  }
  
  useEffect(()=> {getCart()} , [])

  return <>
  <Helmet>
      <title>Cart</title>
  </Helmet>
  <div className='vh-100'>
  <div className="row my-5 p-4 bg-body-tertiary">
    <div className="col-md-12">
      <div className='d-flex flex-column pb-3'>
      <h3 className='fw-bold main-color'>Cart Shop</h3>
      <h5 className='fw-bold main-color'>Total Cart Price : {CartDetails?.data.totalCartPrice} EGP</h5>
      <h5 className='fw-bold main-color'>Total Number of Items : {CartDetails?.numOfCartItems}</h5>
      </div>
    </div>
    
      {CartDetails && CartDetails?.data?.products.length > 0? <>
        <div className='col-md-12 bg-light-subtle cartBox overflow-auto custom-scroll'>
        <div className="row g-2">
      {CartDetails.data.products.map((product)=>
      <div key={product._id} className="col-md-12 p-2 border-bottom">
      <div className="row">
        <div className="col-md-4">
          <div className='d-flex justify-content-center'>
          <img className='w-50' src={product.product.imageCover} alt=""/>
          </div>
        </div>
        <div className="col-md-4">
          <div className='d-flex flex-column justify-content-center align-items-start h-100'>
          <h5 className='main-color'>{product.product.title.split(" ").slice(0 , 2 ).join(" ")}</h5>
          <h6 className='main-color'>{product.price} EGP</h6>
          <button onClick={()=>removeItem(product.product.id)} className='text-danger btn p-0 btnFocus' >
          <i className="fa-solid fa-trash "></i> Remove
          </button>
          </div>
        </div>
        <div className="col-md-4">
        <div className='d-flex justify-content-center align-items-center h-100'>
          <div><i onClick={()=>updateCount(product.product.id , product.count + 1)} className="btn  fa-solid fa-plus border border-success p-2 rounded"></i></div>
          <div className='mx-2'>{product.count}</div>
          <div><i onClick={()=>updateCount(product.product.id , product.count - 1)} className="btn fa-solid fa-minus  border border-success p-2 rounded"></i></div>
        </div>
        </div>
      </div>
    </div>)}
   </div>
    </div>
    <div className="col-md-6 col-sm-6">
     <div className='d-flex justify-content-center py-2 pt-4'>
     <Link to={"/Checkout"} className='btn btn-primary text-white px-4 py-2 fs-5' >check out</Link>
     </div>
   </div>
   <div className="col-md-6 col-sm-6">
     <div className='d-flex justify-content-center pb-4 pt-4'>
     <button onClick={()=>clearItems()} className='btn btn-outline-danger shadow-none fs-5'>Clear Your Cart</button>
     </div>
   </div>
    </>
    :<><div className="col-md-12">
    <div className='d-flex justify-content-center align-items-center py-5'>
      <h4>Your Cart is Empty</h4>
    </div>
  </div></>}
    </div>
    </div>
  </>
}
