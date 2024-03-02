import { createContext, useEffect, useState } from "react"


export const authContext= createContext();

export function AuthContextProvider({children}){

   const[token, setToken] =useState(null);
   useEffect(function(){
    const value=localStorage.getItem('tkn');
   if (value!= null){
     setToken(value);
   }
   }, []);



    return<authContext.Provider   value={ { myToken:token, setToken} } >
    
    

     {children}
    
    
    </authContext.Provider>


}