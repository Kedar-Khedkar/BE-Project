import  { useState,createContext, useContext } from "react"
const NotifyContext = createContext(null)

export const NotifyProvider = ({children}) => { 
    const [data,setData]=useState({})
    const [show,setShow]=useState(false)
    const addData = (data) => { 
        setData(data)
        console.log(data)
    }
    const showController=(state)=>{
        setShow(state)
        console.log(state)
    }
    const accessState=()=>{
        return show
    }
    return ( <NotifyContext.Provider value={{data,addData,showController,accessState,show}}>{children}</NotifyContext.Provider>)

 }
export const useNotify=()=>{
    return useContext(NotifyContext)
}