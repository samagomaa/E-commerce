import React, { useContext, useState } from 'react'
import './ProductDetails.module.css'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import axios from 'axios'
import Slider from 'react-slick'
import { CartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { wishContext } from '../../Context/WishListContext'
import { Helmet } from 'react-helmet'


export default function ProductDetails() {
  let params = useParams()
  let {addToWishList , deleteUserWish ,  getUserWish} = useContext(wishContext)
  let [isInWishlist, setIsInWishlist] = useState(false)
  let {addToCart} = useContext(CartContext)

  function getProductDetails(id){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
  }

  let { data } = useQuery(['productDetails', params.id], () => getProductDetails(params.id), {
    enabled: !!params.id,
    onSuccess: () => checkWishList(params.id), // Runs only after data is fetched
  });

  async function  checkWishList(id) {
    let {data} = await getUserWish()
    let found = data?.data?.some((item) => item._id === id);
    setIsInWishlist(found);
  }

  async function toggleWishlist(id) {
    if (isInWishlist) {
      let response = await deleteUserWish(id);
      if (response?.data.status === "success") {
        setIsInWishlist(false);
        toast.success("Product removed from wishlist", {
          position: "top-right",
          duration: 4000,
          style: {
            padding: "10px",
            color: "#fff",
            backgroundColor: "red",
          },
          icon: "❌",
        });
      } else {
        toast.error("Error in removing");
      }
    } else {
      let response = await addToWishList(id);
      if (response?.data.status === "success") {
        setIsInWishlist(true);
        toast.success("Added to wishlist ❤️", {
          position: "top-right",
          duration: 4000,
          style: {
            padding: "10px",
            color: "#fff",
            backgroundColor: "#4fa74f",
          },
          icon: "✔️",
        });
      } else {
        toast.error("Please reload the page");
      }
    }
  }


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  }

  async function addProductToCart(id){
    let response = await addToCart(id)
    if(response?.data.status === 'success'){
      toast.success("product added sucessfully",
      {
        duration: 4000,
        style: {
          padding: '16px',
          color:'#fff',
          backgroundColor: 'green'
        }
      })
    }
    else{
      toast.error("Error in adding")
    }
  }

  return <>
  {data?.data.data? <div className='row vh-100 align-items-center py-4'>
          <Helmet>
            <title>{data?.data.data.title}</title>
          </Helmet>
    <div className='col-md-4 col-sm-12 '>
      <div className='p-4'>
      <Slider {...settings}>
        {data?.data.data.images.map((pro)=>
        <img key={params.id} src={pro} className='w-100' alt={data?.data.data.title} />
        )}
      </Slider>
      </div>
    </div>
    <div className='col-md-8 col-sm-12'>
    <h3 className='main-color' >{data?.data.data.title.split(" ").slice(0 , 2 ).join(" ")}</h3>
    <h5 className='main-color'>{data?.data.data.description}</h5>
    <div className='d-flex justify-content-between py-3'>
          <span className='main-color'>{data?.data.data.price} EGp</span>
          <span className='main-color'>
          <i className="fa-solid fa-star rating-color"></i>{data?.data.data.ratingsAverage}
          </span>
        </div>
        <div  className='d-flex justify-content-between py-3 align-items-center'>
          <button  onClick={()=>addProductToCart(data?.data.data._id)} className='btn btn-success w-75 addColorChange text-white'> + Add</button>
          <button className='btn btnFocus'>
          <i onClick={()=>toggleWishlist(data?.data.data._id)}
          className=" fa-solid fa-heart fa-2xl" 
          style={{ color: isInWishlist ? "red" : "green" }}>
            </i></button>
          </div>
    </div>
  </div> : ''}
  </>
}