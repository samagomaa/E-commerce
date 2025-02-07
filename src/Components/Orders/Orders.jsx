import React, { useContext } from 'react'
import './Orders.module.css'
import { OrderContext } from '../../Context/OrderContext'

export default function Orders() {
  let {getUserOrders} = useContext(OrderContext)

  async function showUserOrder() {
    let response = await getUserOrders("652d666ad588ddacc6a608f9")
    console.log(response?.data);
  }

  return <>
  <div className='w-100 mx-auto my-5 py-4 bg-body-tertiary container'>
  <div className='mx-5'>
    <div className='d-flex justify-content-between py-3'>
      <span><h3 className='fw-bold'>Order Details</h3></span>
    </div>
    <div className='d-flex justify-content-between'>
      <span className='h3'> Your order is Empty </span>
    </div>
  </div>
  </div>
  </>
}
