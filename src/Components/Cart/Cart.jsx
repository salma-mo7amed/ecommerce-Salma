import React, { useContext } from 'react'
import { Helmet } from 'react-helmet'
import { cartContext } from '../../Context/CartContext'
import Loader from '../Loader/Loader';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

export default function Cart() {

  const { numofCartItems, totalCartPrice, allProducts, updateCount, deleteProduct, clearCart } = useContext(cartContext);

  if (!allProducts) {
    return <Loader />
  }

  async function updateCartCount(id, newCount) {

    const res = await updateCount(id, newCount);
    if (res) {
      toast.success('product updated successfully', { position: 'top-center' })
    }
    else {
      toast.error('Error occured.', { position: 'top-center' })

    }
  }

  async function myDelete(id) {

    const res = await deleteProduct(id);
    if (res) {
      toast.success('product deleted successfully', { position: 'top-center' })
    }
    else {
      toast.error('Error occured.', { position: 'top-center' })

    }
  }


  return <>
    <Helmet>
      <title>Cart</title>
    </Helmet>
    {allProducts.length ? <  div className="container">

      <div className="d-flex justify-content-between">
        <div className="div">
          <h2 >Shop Cart</h2>
          <p className='text-main'>Total Cart Price : {totalCartPrice} LE</p>
        </div>
        <Link to='/payment'>
          <button className='bg-main text-center text-white mt-3 rounded-3'>Confirm Payment</button>
        </Link>

      </div>


      <button onClick={clearCart} className='bg-main text-center text-white'>Clear</button>

      {allProducts.map((product, idx) => <div className="row align-items-center border-1 border-bottom border-success py-3" key={idx}>
        <div className="col-1">
          <figure>
            <img src={product.product.imageCover} alt={product.product.title} className='w-100' />
          </figure>
        </div>
        <div className="col-9">
          <article>
            <h3>{product.product.title}</h3>
            <p>Price : {product.price}</p>
            <button onClick={() => myDelete(product.product.id)} className='bg-main text-white mb-2'>remove</button>
          </article>
        </div>
        <div className="col-2">
          <div className='d-flex justify-content-center align-items-center'>
            <button onClick={() => updateCartCount(product.product.id, product.count + 1)} className='bg-main me-2 text-white'>+</button>
            <p>{product.count}</p>
            <button disabled={product.count == 1} onClick={() => updateCartCount(product.product.id, product.count - 1)} className='bg-main ms-2 text-white' >-</button>

          </div>
        </div>

      </div>)}

    </div> : <h1 className='text-center text-main'>Your Cart is Empty...</h1>}







  </>
}