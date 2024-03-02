import axios from 'axios'
import React, { useContext } from 'react'
import { Helmet } from 'react-helmet'
import { cartContext } from '../../Context/CartContext'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'


export default function Payment() {

  const {cartID, getUserCart, clearCart} =useContext(cartContext)
 const MyNav= useNavigate();
 async  function confirmCashPayment(){
    const details= document.getElementById('details').value;
    const phone= document.getElementById('phone').value;
    const city= document.getElementById('city').value;

     var settings={
        
            "shippingAddress":{
                details,
                phone, 
                city
                }
        
     }
    const booleanFlag= await  axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartID}`,  settings , {
     headers:{
        token: localStorage.getItem('tkn')
     }
    }).then((res)=>{
        console.log(res);
        toast.success('payment finished.')
        getUserCart();
        clearCart();
         setTimeout(()=>{
          MyNav('/products');
         }, 1500);
          
        return true;


    }).catch((err)=>{
        console.log('err', err);
        toast.error('Error Occured.')

        return false;

    })
     return booleanFlag;
}








  return<>
  <Helmet>
    <title>Payment</title>
  </Helmet>

    <div className="w-50  m-auto mt-3 py-4">
        <h1 className='text-main text-center'>Payment Form</h1>
        <div className="form mb-4">
            <label htmlFor="city" className='text-main'>City</label>
            <input id='city' type="text" placeholder='city...'  className='form-control mb-2'/>
            <label htmlFor="phone" className='text-main'>Phone</label>
            <input id='phone' type="text" placeholder='phone...'  className='form-control mb-2'/>
            <label htmlFor="details" className='text-main'>Details</label>
            <textarea id='details' type="text" placeholder='details...'  className='form-control mb-3'></textarea>
            <button onClick={confirmCashPayment}  className='bg-main text-white me-3 m-auto'> Confirm Cash Payment</button>
        </div>




    </div>
  
  
  
  
  
  
  
  
  </>
}