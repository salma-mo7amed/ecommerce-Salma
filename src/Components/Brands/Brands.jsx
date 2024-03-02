import axios from 'axios';
import React from 'react'
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import Loader from '../Loader/Loader';


export default function Brands() {
  function getAllBrands(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`)
    }
  
   const {data, isLoading}=useQuery('myBrand', getAllBrands);
   console.log('data', data);
   if(isLoading){
    return < Loader/>
   }


  return<>
  <Helmet>
    <title>Brands</title>
  </Helmet>
  <div className="container w-75 m-auto">
    <h1 className='text-main text-center mb-1 mt-4'> All Brands</h1>
  <div className="row gy-5 mt-3 ">
  {data?.data.data.map((brand, idx)=> <div class="card col-md-3 me-4 mybrand" key={idx}>
  <img style={{height:'200px'}} src={brand.image} class="card-img-top" alt={brand.name} className='w-100'/>
   <div className="card-body">
   <h5 class="card-title text-main text-center">{brand.name}</h5>
    
   </div>
  
</div>
  
  
  
  
  )}
  </div>
</div>
  
  
  
  </>
}
