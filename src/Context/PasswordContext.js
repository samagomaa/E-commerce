import axios from 'axios'
import React, { createContext } from 'react'


async function forgetPasswordEmail(email){
    return await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords` , {email} )
    .then((response)=> response)
}



export let PasswordContext = createContext()
export default function PasswordContextProvider(props) {
    return <>
    <PasswordContext.Provider value={{forgetPasswordEmail}}>
        {props.children}
    </PasswordContext.Provider>
    </>
}
