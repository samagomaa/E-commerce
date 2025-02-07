import React, { useContext } from 'react'
import './WishList.module.css'
import { wishContext } from '../../Context/WishListContext'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { Helmet } from 'react-helmet'
import { useQuery, useQueryClient } from 'react-query'
import { Oval } from 'react-loader-spinner'


export default function WishList() {
  const queryClient = useQueryClient();
  let { getUserWish , deleteUserWish } = useContext(wishContext)
  let {addToCart} = useContext(CartContext)

  async function addProductToCart(id){
    let response = await addToCart(id)
    if(response?.data?.status === 'success'){
      toast.success("it has been successfully added. 🚕",
      {
        position: "top-right",
        duration: 2000,
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
    await deleteUserWish(id)
    queryClient.setQueryData(["wishlist"], (oldData) => {
      if (oldData && Array.isArray(oldData.data)) {
        return {
          ...oldData, 
          data: oldData.data.filter((wish) => wish._id !== id)
        };
      }
      return oldData;
    });
  }


  async function getList() {
    let {data} = await getUserWish()
    return data
  }

  const { data: wishlist, isLoading, isError} = useQuery({
    queryKey: ["wishlist"],
    queryFn: getList,
    cacheTime:30000
  })

  


  return <>
  <Helmet><title>WishList</title></Helmet>
  <div className='my-5 py-4 bg-body-tertiary container'>
    <div className='mx-5'>
      <div className='d-flex justify-content-between py-3'>
        <span><h3 className='fw-bold main-color'>My wish List</h3></span>
      </div>
    </div>
    {isError? <div className='vh-100 d-flex justify-content-center align-items-center'>
    <div className=' bg-body-tertiary rounded-5 w-75 h-50 d-flex justify-content-center align-items-center'>
      <h3 className=''>Oops something bad might happen please reload the page</h3>
    </div>
  </div> : <>
  {isLoading?<div className='vh-100 d-flex justify-content-center align-items-center'>
    <Oval
visible={true}
height="100"
width="100"
color="#4fa94d"
ariaLabel="oval-loading"
wrapperStyle={{}}
wrapperClass=""
  />
  </div>: <>
  {wishlist && wishlist?.data?.length > 0? 
    <div className='mx-5'>
      {wishlist?.data.map((product)=>
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
    </div> :
    <div className='vh-100 d-flex justify-content-center align-items-center'>
        <h4>Your wishlist is empty</h4>
        </div>
        }
  </>}
  </>}
    </div>
  </>
}
