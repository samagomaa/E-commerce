import React, { useState } from 'react'
import { createContext } from 'react'

export let CounterContext = createContext();

export default function CounterContextProvider(props) {
    
    let [counter , setCounter] = useState(0)
    function changeCounter(){
        
        setCounter(Math.random())
    }
    
    return <CounterContext.Provider value={{counter , changeCounter}}> 
    {props.children}
    </CounterContext.Provider>
}
