import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import Products from './Components/Products/Products';
import NotFound from './Components/NotFound/NotFound';
import PasswordReset from './Components/PasswordReset/PasswordReset';
import { AuthContextProvider } from './Context/AuthContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import Categories from './Components/Categories/Categories';
import Cart from './Components/Cart/Cart';
import Brands from './Components/Brands/Brands';
import Wishlist from './Components/Wishlist/Wishlist';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import CartContextProvider from './Context/CartContext';
import { Toaster } from 'react-hot-toast';
import Payment from './Components/Payment/Payment';














const myRouter= createBrowserRouter([
 {path:"/", element:<Layout/>, children:[
  {index:true, element:<Register/>},
  {path:"register", element:<Register/>},
  {path:"login", element:<Login/>},
  {path:"passwordreset", element:<PasswordReset/>},

  {path:"products", element:<ProtectedRoute>
    <Products/>
    </ProtectedRoute>},
    {path:"productdetails/:id", element:<ProtectedRoute>
    <ProductDetails/>
    </ProtectedRoute>},
    {path:"categories", element:<ProtectedRoute>
    <Categories/>
    </ProtectedRoute>},
    {path:"wishlist", element:<ProtectedRoute>
    <Wishlist/>
    </ProtectedRoute>},
   { path:"cart", element:<ProtectedRoute>
     <Cart/>
    </ProtectedRoute>},
    { path:"brands", element:<ProtectedRoute>
    <Brands/>
   </ProtectedRoute>},
   {path:'payment', element: <ProtectedRoute>
     <Payment/>
   </ProtectedRoute>},
    

  {path:"*", element:<NotFound/>},

  
    
  
 
 ]
}
  
]

)

export default function App() {

  const myClient = new QueryClient();
  return<>
    <QueryClientProvider  client={myClient}>
     
    <AuthContextProvider>
    <CartContextProvider>
    <RouterProvider router={myRouter} />
    </CartContextProvider>
    </AuthContextProvider>
    
    </QueryClientProvider>

    <Toaster/>
    
    
   

   
    
    


  
  </>
}