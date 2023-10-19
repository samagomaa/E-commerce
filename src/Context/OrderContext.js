import axios from "axios";
import { createContext } from "react";

export let OrderContext = createContext()

export default function OrderContextProvider(props) {
    

    function getUserOrders() {
        return  axios.get(`https://ecommerce.routemisr.com/api/v1/orders/`)
        .then((response)=>response)
        .catch((error)=>error)
    }


    return <OrderContext.Provider values={{getUserOrders}}>
        {props.children}
    </OrderContext.Provider>
}