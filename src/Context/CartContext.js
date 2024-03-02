import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { authContext } from './AuthContext';

export const cartContext = createContext();

export default function CartContextProvider({children}) {
   const { myToken } = useContext(authContext)

  const[numofCartItems, setNumofCartItems]=useState(0);
  const[totalCartPrice, setTotalCartPrice]=useState(0);
  const[allProducts, setAllProducts]=useState(null);
  const [cartID, setCartID]=useState(null);

  async function addProductToCart( id){
     const res = await axios.post(`https://ecommerce.routemisr.com/api/v1/cart` , {
        "productId": id 

    } , {
        headers:{token : localStorage.getItem('tkn')}
    } ).then((res)=>{

      console.log('res', res.data);
          
      getUserCart();
      return res;
       
      
    })
    .catch((err)=>{
     console.log('err', err);
     
     
     
     return false;

    })
    return res.data;
 }
 
 function getUserCart(){
    const res= axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {headers:{
        token: localStorage.getItem('tkn')
    }
   }).then((res)=>{
    // console.log('res', res.data);
    setCartID(res.data.data._id)
    setAllProducts(res.data.data.products);
    setNumofCartItems(res.data.numOfCartItems);
    setTotalCartPrice(res.data.data.totalCartPrice);

   })
   .catch((err)=>{
    console.log('err', err);

   })



 }
  

   async  function updateCount( id , newCount) {
    
    const booleanFlag= await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${ id}`, {
        "count": newCount
      }, {headers:{
        token: localStorage.getItem('tkn')
      }}).then((res)=>{
        console.log('res', res);
        setTotalCartPrice(res.data.data.totalCartPrice);
        setNumofCartItems(res.data.data.numOfCartItems);
        setAllProducts(res.data.data.products);
        return true;

      }).catch((err)=>{
        console.log('err', err);

        return false;

      })
         
      return booleanFlag;

 }


 async  function deleteProduct( id){

     const res= await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${ id}`, {headers:{
        token: localStorage.getItem('tkn')
     }}).then((res)=>{
        setTotalCartPrice(res.data.data.totalCartPrice);
        setNumofCartItems(res.data.data.numOfCartItems);
        setAllProducts(res.data.data.products);

        return true;

     }).catch((err)=>{
       console.log('err', err);



       return false;

     })
    
     return res;

   }

   async  function clearCart( ){

    const res= await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {headers:{
       token: localStorage.getItem('tkn')
    }}).then((res)=>{

       setTotalCartPrice(0);
       setNumofCartItems(0);
       setAllProducts([]);

       return true;

    }).catch((err)=>{
      console.log('err', err);



      return false;

    })
   
    return res;

  }
 useEffect(()=>{
    
   getUserCart();
 }, [myToken])

  return <cartContext.Provider value={{
    addProductToCart,
    numofCartItems,
    totalCartPrice, 
    allProducts,
    getUserCart,
    updateCount,
    deleteProduct,
    clearCart,
     cartID,




  }}>
  
  {children}
  
  
  
  </cartContext.Provider>
}
