import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import { Helmet } from 'react-helmet';
import { ColorRing } from 'react-loader-spinner';
import { useNavigate } from 'react-router-dom';



export default function Register() {

  const userData= {
    name:"",
    email:"",
    password:"",
    rePassword:"",
    phone:"",
 }
 const [isLoading, setIsLoading] = useState(false);
 const[isSuccess, setIsSuccess] = useState(false);
 const[errorMessage, setErrorMessage] = useState(undefined);

 const myNav=useNavigate();

  async function mySumbit(values) {
    console.log("sumbitted..." , values);
    setIsLoading(true);
   axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, values)
  .then(function(x){
    console.log("in case of success:x", x);
    setIsSuccess(true);
    setTimeout(function(){
        setIsSuccess(false);
        myNav('/login'); 
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
            const nameRegex=/^[A-Z][a-z]{3,7}$/;
            const phoneRegex=/^01[0125][0-9]{8}$/;
            if (nameRegex.test(values.name) === false) {
                errors.name='Name must start with capital letter and have from 4 to 8 characters'
            };
            if (values.email.includes('@')!==true || values.email.includes('.')!==true ) {
                errors.email="Email must be in format"
            };
            if (phoneRegex.test(values.phone) === false) {
                errors.phone= 'phone must be an egyptian number'
            };
            if (values.password.length <6 ||values.password.length > 12) {
                errors.password='password must be from 6 to 12 characters'
            };
            if (values.rePassword !== values.password) {
                errors.rePassword='password and rePassword must match each other'
            
            }

          return errors;
        }
           
        
     })


  return <>
  <Helmet>
    <title>Register</title>
  </Helmet>
 <div className='w-75 m-auto p-5'>
    {isSuccess ? <div className="alert alert-success text-center">
     <p>Congratulations your account has been created successfully.
     <i className="fa-solid fa-hands-clapping"></i>
     </p>
    </div>:""}
    {errorMessage ? <div className="alert alert-danger text-center">{errorMessage}
    <i class="fa-solid fa-exclamation" ></i>
    </div> : ""}

    <h2>Register Now:</h2>
    <form onSubmit={registerFormik.handleSubmit}>
     <label htmlFor="name">name:</label>
     <input onBlur={registerFormik.handleBlur} onChange={registerFormik.handleChange} value={registerFormik.values.name} id='name' type="text" className='form-control mb-3' placeholder='name....' />
     {registerFormik.errors.name && registerFormik.touched.name?<div className='alert alert-danger'>{registerFormik.errors.name}</div>: " " }
     <label htmlFor="email">email:</label>
     <input onBlur={registerFormik.handleBlur}   onChange={registerFormik.handleChange} value={registerFormik.values.email} id='email' type="email" className='form-control mb-3' placeholder='email....' />
     {registerFormik.errors.email && registerFormik.touched.email? <div className='alert alert-danger'>{registerFormik.errors.email}</div>: " " }

     <label  htmlFor="password">password:</label>
     <input onBlur={registerFormik.handleBlur}   onChange={registerFormik.handleChange}  value={registerFormik.values.password} id='password' type="password" className='form-control mb-3' placeholder='password....' />
     {registerFormik.errors.password && registerFormik.touched.password?<div className='alert alert-danger'>{registerFormik.errors.password}</div>: " " }

     <label htmlFor="rePassword">rePassword:</label>
     <input  onBlur={registerFormik.handleBlur}  onChange={registerFormik.handleChange}  value={registerFormik.values.rePassword} id='rePassword' type="password" className='form-control mb-3' placeholder='rePassword....' />
     {registerFormik.errors.rePassword && registerFormik.touched.rePassword?<div className='alert alert-danger'>{registerFormik.errors.rePassword}</div>: " " }

     <label htmlFor="phone">phone:</label>
     <input onBlur={registerFormik.handleBlur} onChange={registerFormik.handleChange} value={registerFormik.values.phone} id='phone' type="text" className='form-control mb-3' placeholder='phone....' />
     {registerFormik.errors.phone && registerFormik.touched.phone?<div className='alert alert-danger'>{registerFormik.errors.phone}</div>: " " }

     <button type='sumbit' className='bg-main p-2 text-white rounded-3 mybtn '>
  {isLoading ?  <ColorRing
  visible={true}
  height="30"
  width="30"
  ariaLabel="color-ring-loading"
  wrapperStyle={{}}
  wrapperClass="color-ring-wrapper"
  colors={['#fff', '#fff', '#fff', '#fff', '#fff']}
  />:" Register"}
       
       
     </button>
    </form>

   </div>
   </>
}

  