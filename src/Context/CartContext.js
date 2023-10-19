import axios from "axios";
import { createContext, useEffect, useState } from "react";


let userToken = localStorage.getItem("userToken")
let  headers = { token: userToken} 
export let CartContext = createContext()


function addToCart(id) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart` ,{productId : id},{headers})
    .then((response)=> response)
    .catch((error)=> error)
}

function getLoggedUserCart(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart` , {headers})
    .then((response)=>response)
    .catch((error)=> error)
}

function removeProduct(productid){
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productid}`, {headers})
    .then((response)=>response)
    .catch((error)=>error)
}

function updateCartCount(id , count) {
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , {count} , {headers})
    .then((response)=>response)
    .catch((error)=>error)
}

function clearCart () {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart` , {headers})
    .then((response)=>response)
    .catch((error)=>error)
}

function onlinePayment(cartID , url , values) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}?url=${url}` , {
        shippingAddress : values
    } , {headers})
    .then((response)=>response)
    .catch((error)=>error)
}
export default function CartContextProvider(props) {
    const [cartid , setCartID] = useState(null)

    async function getCart() {
        let {data} = await getLoggedUserCart()
        setCartID(data?.data._id)
    }

    useEffect(()=>{
        getCart()
    } ,[])

    return <CartContext.Provider value={{ cartid ,  addToCart , getLoggedUserCart , removeProduct ,updateCartCount , clearCart , onlinePayment}}>
        {props.children}
    </CartContext.Provider>
}
