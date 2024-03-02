import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import Loader from '../Loader/Loader';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import SimpleSlider from '../HomeSlider/HomeSlider';
import CategorySlider from '../CategorySlider/CategorySlider';
import { Link } from 'react-router-dom';
import { cartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

export default function Products() {

  const{ addProductToCart }= useContext(cartContext);
 async function addMyProduct( id){
    const res = await addProductToCart( id);
    console.log(res);
    if (res == res) {
      toast.success('Added successfully',{duration:1500 , position:'top-right'} );
    }
    else{
     toast.error('Error occured',{duration:1500 , position:'top-right'} );
    }
  }

  async function getAllProducts() {

    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)

  }

  const { isError, isLoading, isFetching, data } = useQuery('getAllProducts', getAllProducts, {
    refetchInterval: 3000
  });
  // console.log('data', data?.data.data);

  if (isLoading) {
    return <Loader />
  }
  return <>
    <Helmet>
      <title>Products</title>
    </Helmet>

    <div className="container">
      <div className="row mt-3 my-4">
        <div className="col-md-9">
          <SimpleSlider />
        </div>
        <div className="col-md-3">
          <div>
            <img style={{ height: '150px' }} src={require('../../images/grocery-banner-2.jpeg')} alt="banner" className='w-100' />
          </div>
          <div>
            <img style={{ height: '150px' }} src={require('../../images/banner-4.jpeg')} alt="banner" className='w-100' />
          </div>
          
        </div>
      </div>
        
        <CategorySlider/>

      <div className="row  products gy-3">

        {data.data.data.map((product, idx) => <div key={idx} className="col-md-2 overflow-hidden">
         
         <Link className="product" to={`/productdetails/${product.id}`}>
         <div >
            <img src={product.imageCover} alt={product.title} className='w-100' />
            <h3 className='h6 text-main'>{product.category.name}</h3>
            <h4 className='h6 text-main'>{product.brand.name}</h4>
            <h2 className='h4 text-center'>{product.title.split(' ').slice(0, 2).join(' ')}</h2>
            <div className="d-flex justify-content-between ">
              {product.priceAfterDiscount ? <p> <span className='text-decoration-line-through'>{product.price} </span> - {product.priceAfterDiscount} LE</p> : <p>{product.price} </p>}

              <p> <span><i style={{ color: 'yellowgreen' }} className='fa-solid fa-star'></i></span>   {product.ratingsAverage}</p>
            </div>
          </div>
         
         
         </Link>
         
          <button onClick={()=> addMyProduct(product.id)} className='bg-main text-white d-block m-auto  addbtn'> +</button>
        </div>
        )}

      </div>
    </div>

  </>
}

