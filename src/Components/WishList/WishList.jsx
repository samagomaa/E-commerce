import React, { useContext, useEffect, useState } from 'react'
import './WishList.module.css'
import { wishContext } from '../../Context/WishListContext'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { Helmet } from 'react-helmet'


export default function WishList() {

  let { getUserWish , deleteUserWish } = useContext(wishContext)
  let [ListDetails , setListDetails] = useState(null)
  let {addToCart} = useContext(CartContext)

  async function addProductToCart(id){
    let response = await addToCart(id)
    if(response?.data?.status === 'success'){
      toast.success("it has been successfully added. 🚕",
      {
        position: "top-right",
        duration: 4000,
        style: {
          padding: '30px',
          color:'#fff',
          backgroundColor: 'green'
        },
        icon: '✔️'
      })
    }
    else{
      toast.error("Error in adding" , {
        duration: 4000,
        style: {
          padding: '30px',
          color:'#fff',
          backgroundColor: 'red'
        },
        icon:'❌'
      })
    }
    
  }

  async function removeWish(id) {
    let {data} = await deleteUserWish(id)
    setListDetails(data);
  }


  async function getList() {
    let {data} = await getUserWish()
    setListDetails(data);
  }
  console.log( "user get wish list",ListDetails?.data);
  
  useEffect(()=> getList() , [])


  return <>
  <Helmet><title>WishList</title></Helmet>

  {ListDetails? <div className='w-100 mx-auto my-5 py-4 bg-body-tertiary container'>
    <div className='mx-5'>
      <div className='d-flex justify-content-between py-3'>
        <span><h3 className='fw-bold main-color'>My wish List</h3></span>
      </div>
    </div>
    <div className='mx-5'>
      {ListDetails?.data.map((product)=>
      <div key={product._id} className='d-flex justify-content-between align-items-center py-3 row border-bottom'>
      <div className="col-md-2 col-sm-12">
        <img className='w-100' src={product.imageCover} alt=""/>
      </div>
      <div className="col-md-10 col-sm-12 ">
        <div className='d-flex justify-content-between align-items-center'>
        <span>
          <h5 className='main-color'>{product.title?.split(" ").slice(0 , 2 ).join(" ")}</h5>
          <h6 className='main-color'>{product.price} EGP</h6>
          <button onClick={()=> removeWish(product._id)}  className='text-danger btn p-0 btnFocus'>
          <i className="fa-solid fa-trash"></i> Remove
          </button>
        </span>
        <span>
          <button onClick={()=> addProductToCart(product._id)} className='btn btn-outline-success fs-5'>add To Cart </button>
        </span>
        </div>
        
      </div>
    </div>
      )}
    </div>
  </div> :""}
  
  </>
}
