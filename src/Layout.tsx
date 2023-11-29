import React, { useEffect } from 'react'
// import Header from './components/Header/Header'
// import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext';
import {  useNavigate } from 'react-router-dom';

function Layout() {
  const navigate = useNavigate();

  const { token } = useAuth();

  useEffect(()=>{
    if(!token){
     return navigate('/')
    }
    if(token){
      return navigate(`/dashboard/${token}`)
    }
  },[])
  return (
    <>
    {/* <Header/> */}
    <Outlet/> 
    {/* <Footer /> */}
    </>
  )
}

export default Layout