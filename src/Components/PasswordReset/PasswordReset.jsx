import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';


export default function PasswordReset() {
    const userData= {
     email:"",
    
     }
     const [isLoading, setIsLoading] = useState(false);
     const[isSuccess, setIsSuccess] = useState(false);
     const[errorMessage, setErrorMessage] = useState(undefined);
     const[successMessage, setSuccessMessage] = useState(undefined);
     
    
     const myNav=useNavigate();
    
      async function mySumbit(values) {
        console.log("sumbitted..." , values);
        setIsLoading(true);
        
       axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, values)
      .then(function(x){
        console.log("in case of success:x", x.data.message);
        setSuccessMessage(x.data.message);
        setIsSuccess(true);
        setTimeout(function(){
            setIsSuccess(false);
            setSuccessMessage(undefined);
            myNav('/products'); 
        }, 2000);
        
        setIsLoading(false);
       
      })
      .catch(function(x){
        console.log("in case of error:x", x);
        setErrorMessage(x.response.data.message);
       setTimeout(function(){
        setErrorMessage(undefined); 
    }, 2000);
    
    setIsLoading(false);
        
      })
        
      }
    
    
        const registerFormik= useFormik({
            initialValues: userData,
            onSubmit: mySumbit,
               
            
    
            validate: function(values){
                // console.log(values);
                const errors={}
               
                if (values.email.includes('@')!==true || values.email.includes('.')!==true ) {
                    errors.email="Email must be in format"
                };
               
                
    
              return errors;
            }
               
            
         })
    
    
  return <>
  <Helmet>
    <title>Forget-password</title>
  </Helmet>
  {isSuccess ? <div className="alert alert-success text-center">
     <p>{successMessage}
     <i className="fa-solid fa-hands-clapping"></i>
     </p>
    </div>:""}
    {errorMessage ? <div className="alert alert-danger text-center">{errorMessage}
    <i className="fa-solid fa-exclamation" ></i>
    </div> : ""}
  <h1 className='mb-3 ms-3'>please enter your verification code</h1>
  <div className="w-75 m-auto">
    <form onSubmit={registerFormik.handleSubmit}>
      
   <label htmlFor="email" className='mb-2'>Email:</label>
     <input onBlur={registerFormik.handleBlur}   onChange={registerFormik.handleChange} value={registerFormik.values.email} id='email' type="email" className='form-control mb-3' placeholder='Email....' />
     {registerFormik.errors.email && registerFormik.touched.email? <div className='alert alert-danger'>{registerFormik.errors.email}</div>: " " }
      <button type='sumbit' className='bg-main p-2 text-white rounded-3 w-25 m-auto mb-4'>Verify</button>
    </form>
  </div>
  
  </>
}