import React from 'react'
import { Helmet } from 'react-helmet'
import { useQuery } from 'react-query';
import Loader from '../Loader/Loader';
import axios from 'axios';



export default function Categories() {

  function getAllCategories(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    }
  
   const {data, isLoading}=useQuery('myCategory', getAllCategories);
   console.log('data', data);
   if(isLoading){
    return < Loader/>
   }


  return<>
  <Helmet>
    <title>Categories</title>
  </Helmet>
<div className="container w-75 m-auto">
  <div className="row gy-5 mt-3">
  {data?.data.data.map((category, idx)=> <div class="card col-md-4 me-4 mybrand" key={idx}>
  <img style={{height:'200px'}} src={category.image} class="card-img-top" alt={category.name} className='w-100'/>
   <div className="card-body">
   <h5 class="card-title text-main text-center">{category.name}</h5>
    
   </div>
  
</div>
  
  
  
  
  )}
  </div>
</div>
  
  
  
  </>
}
