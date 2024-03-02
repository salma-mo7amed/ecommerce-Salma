import axios from 'axios';
import React, { useContext } from 'react'
import { useQuery } from 'react-query';
import { Navigate, useParams } from 'react-router-dom'
import Loader from '../Loader/Loader';
import { Helmet } from 'react-helmet';
import { cartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';




export default function ProductDetails() {

  const { id } = useParams();
 const{ addProductToCart}= useContext(cartContext);
 async function addProduct(id) {
  const res = await addProductToCart( id );
  console.log(res);
  if (res == res) {
    toast.success('Added successfully',{duration:1500 , position:'top-right'} );
  }
  else{
   toast.error('Error occured',{duration:1500 , position:'top-right'} );
  }
 }
  //  console.log(id);
  function getProductDetails() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id} `)
  }

  const { data, isError, isLoading } = useQuery('productDetails', getProductDetails);
  // console.log(data?.data.data);

  const productDetail = data?.data.data;
  if (isLoading) {

    return <Loader />

  }
   if(isError){

    return <Navigate to='products' />
   }


  return <>
    <Helmet>

      <title>{productDetail.title.split(' ').slice(0,2).join(' ')} </title>
    </Helmet>

    <div className="container">
      <div className="row mt-3">
        <div className="col-md-3">
          <figure>
            <img src={productDetail.imageCover} alt={productDetail.title} className='w-100' />
          </figure>
        </div>
        <div className="col-md-9">
          <article>
            <h2 className='text-main'>{productDetail.title}</h2>
            <p> Description : {productDetail.description}</p>
            <h5> Price: {productDetail.price} LE</h5>
            <button onClick={()=>addProduct(productDetail.id)} className='w-100 bg-main text-white mt-2 rounded-3'>Add To Cart + </button>


          </article>
        </div>
      </div>
    </div>












  </>
}

