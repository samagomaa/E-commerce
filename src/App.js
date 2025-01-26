import React, { useContext, useEffect } from 'react'
import {RouterProvider,  createHashRouter} from "react-router-dom";
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Cart from './Components/Cart/Cart';
import Login from './Components/Login/Login';
import Products from './Components/Products/Products';
import Register from './Components/Register/Register';
import Notfound from './Components/Notfound/Notfound';
import Brands from './Components/Brands/Brands';
import Categories from './Components/Categories/Categories';
import  {UserContext} from './Context/UserContext'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import WishList from './Components/WishList/WishList'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import CartContextProvider from './Context/CartContext';
import PasswordContextProvider from './Context/PasswordContext';
import { Toaster } from 'react-hot-toast';
import WishlistProvider from './Context/WishListContext';
import Checkout from './Components/Checkout/Checkout';
import Orders from './Components/Orders/Orders';
import OrderContextProvider from './Context/OrderContext';
import Forgetpassword from './Components/Forgetpassword/Forgetpassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';



export default function App() {
  let {setUserToken} = useContext(UserContext)
  useEffect(()=>{
    if(localStorage.getItem("userToken") !== null){
      setUserToken(localStorage.getItem("userToken"))
    }
  } , [])

  // Define index routes
  const indexRoutes = [
    { path: '', element: <Layout /> },
  ];

  // Define authenticated routes
  const authenticatedRoutes = [
        { index: true, element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: 'Brands', element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: 'Cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: 'Products', element: <ProtectedRoute><Products /></ProtectedRoute> },
        { path: 'productDetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
        { path: 'Categories', element: <ProtectedRoute><Categories /></ProtectedRoute> },
        { path: 'WishList', element: <ProtectedRoute><WishList /></ProtectedRoute> },
        { path: 'Checkout', element: <ProtectedRoute><Checkout /></ProtectedRoute> },
        { path: 'allorders', element: <ProtectedRoute><Orders /></ProtectedRoute> },
        { path: '*', element: <Notfound /> },
    
  ];

  // Define authentication routes
  const authenticationRoutes = [
    { index: true, element: <Login/> },
    { path: 'register', element: <Register /> },
    { path: 'Forgetpassword', element: <Forgetpassword /> },
    { path: 'ResetPassword', element: <ResetPassword /> },
    { path: '*', element: <Notfound /> },
  ];

  // Choose the appropriate routes based on authentication
  const selectedRoutes = localStorage.getItem('userToken') !== null ? authenticatedRoutes : authenticationRoutes;

  // Create the router
  const mainRouter =  createHashRouter([
    ...indexRoutes,
    {
      path: '',
      element: <Layout />,
      children: selectedRoutes
    }
  ]);

  return <PasswordContextProvider>
  <CartContextProvider>
    <OrderContextProvider>
    <WishlistProvider>
    <RouterProvider router={mainRouter}></RouterProvider>
    <Toaster/>
  </WishlistProvider>
  </OrderContextProvider>
  </CartContextProvider>
  </PasswordContextProvider>
  
}
