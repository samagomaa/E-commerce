import axios from "axios";
import { createContext } from "react";

let userToken = localStorage.getItem("userToken")
let headers = {token : userToken} 
export let wishContext = createContext()



function addToWishList(productId){
    return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {productId } , {headers} )
    .then((response)=>response)
    .catch((error)=>error)
}

function getUserWish(){
    return  axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {headers} )
    .then((response)=>response)
    .catch((error)=>error)
}
function deleteUserWish(productId){
    return  axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}` ,{headers} )
    .then((response)=>response)
    .catch((error)=>error)
}

export default function WishlistProvider(props) {

    return <wishContext.Provider value={{addToWishList , getUserWish , deleteUserWish}} >
        {props.children}
    </wishContext.Provider>
}