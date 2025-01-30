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
    console.log(data);
  }
  
  useEffect(()=> {getCart()} , [])

  return <>
  <Helmet>
      <title>Cart</title>
  </Helmet>
  {CartDetails? <div className='w-100 vh-100 mx-auto my-5 py-4 bg-body-tertiary container'>
    <div className='mx-5'>
      <div className='d-flex justify-content-between py-3'>
        <span><h3 className='fw-bold main-color'>Cart Shop</h3></span>
        <span><Link to={"/Checkout"} className='btn btn-primary text-white px-4 py-2 fs-5' >check out</Link></span>
      </div>
      <div className='d-flex justify-content-between'>
        <span className='h5 fw-bold'><span className='main-color'>total price :</span> <span className='sub-color'> {CartDetails.data.totalCartPrice}</span></span>
        <span className='h5 fw-bold' ><span className='main-color'>total number of items :</span> <span className='sub-color'>{CartDetails.numOfCartItems}</span> </span>
      </div>
    </div>
    <div className='mx-5'>
      {CartDetails.data.products.map((product)=>
      <div key={product._id} className='d-flex justify-content-between align-items-center py-3 row border-bottom'>
      <div className="col-md-2 col-sm-12">
        <img className='w-100' src={product.product.imageCover} alt=""/>
      </div>
      <div className="col-md-10 col-sm-12 ">
        <div className='d-flex justify-content-between align-items-center'>
        <span>
          <h5 className='main-color'>{product.product.title.split(" ").slice(0 , 2 ).join(" ")}</h5>
          <h6 className='main-color'>{product.price} EGP</h6>
          <button onClick={()=>removeItem(product.product.id)} className='text-danger btn p-0 btnFocus' >
          <i className="fa-solid fa-trash "></i> Remove
          </button>
        </span>
        <span>
          <span><i onClick={()=>updateCount(product.product.id , product.count + 1)} className="btn  fa-solid fa-plus border border-success p-2 rounded"></i></span>
          <span className='mx-2'>{product.count}</span>
          <span><i onClick={()=>updateCount(product.product.id , product.count - 1)} className="btn fa-solid fa-minus  border border-success p-2 rounded"></i></span>
        </span>
        </div>
        
      </div>
    </div>
      ) }
      
    </div>
    <div className='mx-5 d-flex justify-content-center py-3'>
      <button onClick={()=>clearItems()} className='btn btn-outline-success shadow-none fs-4'>Clear Your Cart</button>
    </div>
  </div> :
  <div className='w-100 vh-100 mx-auto my-5 py-4 bg-body-tertiary container'>
  <div className='mx-5'>
      <h2 className='fw-bold main-color py-3'>Cart Shop</h2>
      <h3 className='main-color'> Your Cart is Empty </h3>
  </div>
  </div>
  }
  
  </>
}
