import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Helmet } from 'react-helmet';
import { ColorRing } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import { authContext } from '../../Context/AuthContext';



export default function Login() {

  const userData= {
    
    email:"",
    password:"",
   
 }
 const [isLoading, setIsLoading] = useState(false);
 const[isSuccess, setIsSuccess] = useState(false);
 const[errorMessage, setErrorMessage] = useState(undefined);

 const myNav=useNavigate();
 const{myToken, setToken}= useContext(authContext);

  async function mySumbit(values) {
    console.log("sumbitted..." , values);
    setIsLoading(true);
   axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
  .then(function(x){
   if(x.data.message=="success"){
    console.log(  'token in login',x.data.token);
    localStorage.setItem('tkn', x.data.token);
    setToken(x.data.token);
    setIsSuccess(true);
   setTimeout(function(){
       setIsSuccess(false);
       myNav('/products'); 
   }, 2000);
   
   setIsLoading(false);
   }
    
     
    
   
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
           
            if (values.password.length <6 ||values.password.length > 12) {
                errors.password='password must be from 6 to 12 characters'
            };
            

          return errors;
        }
           
        
     })


  return <>
  <Helmet>
    <title>Login</title>
  </Helmet>
 <div className='w-75 m-auto p-5'>
    {isSuccess ? <div className="alert alert-success text-center">
     <p>Welcome back.
     <i className="fa-solid fa-hands-clapping"></i>
     </p>
    </div>:""}
    {errorMessage ? <div className="alert alert-danger text-center">{errorMessage}
    <i class="fa-solid fa-exclamation" ></i>
    </div> : ""}

    <h2>Login Now:</h2>
    <form onSubmit={registerFormik.handleSubmit}>
     <label htmlFor="email">email:</label>
     <input onBlur={registerFormik.handleBlur}   onChange={registerFormik.handleChange} value={registerFormik.values.email} id='email' type="email" className='form-control mb-3' placeholder='email....' />
     {registerFormik.errors.email && registerFormik.touched.email? <div className='alert alert-danger'>{registerFormik.errors.email}</div>: " " }

     <label  htmlFor="password">password:</label>
     <input onBlur={registerFormik.handleBlur}   onChange={registerFormik.handleChange}  value={registerFormik.values.password} id='password' type="password" className='form-control mb-3' placeholder='password....' />
     {registerFormik.errors.password && registerFormik.touched.password?<div className='alert alert-danger'>{registerFormik.errors.password}</div>: " " }

    <div className="mydiv d-flex justify-content-between align-items-center">
    <button type='sumbit' className='bg-main p-2 text-white rounded-3 mybtn '>
  {isLoading ?  <ColorRing
  visible={true}
  height="30"
  width="30"
  ariaLabel="color-ring-loading"
  wrapperStyle={{}}
  wrapperClass="color-ring-wrapper"
  colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
  />:" Login"}
       
       
     </button>
     
     <Link to='/passwordreset'>
     <p className='p-3 mypass fw-bold text-white'>Forget Password?</p>
     
     </Link>
    
    
    </div>
    </form>

   </div>
   </>
}

  
