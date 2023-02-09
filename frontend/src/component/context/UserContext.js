import  { useState,createContext, useContext } from "react"
import axios from 'axios';


const AuthContext = createContext(null)

export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null)

    const login =user =>{
        setUser(user)
        localStorage.setItem('user',user)
    }
    const logout =() =>{
        axios.get('http://localhost:5000/student/1')
        .then(function(response){
            console.log(response.data)
        })
        setUser(null)
        localStorage.removeItem('user');

    }
    return <AuthContext.Provider value={{user,login,logout}}>{children}</AuthContext.Provider>
}
export const useAuth=()=>{
    return useContext(AuthContext)
}