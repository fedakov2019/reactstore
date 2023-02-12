import React, { useContext, useEffect, useState } from 'react';
import LoginForm from './pages/LoginForm';

import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AppRoute from './components/AppRoute';
import { Loader } from './components/Loader';
import { Context } from './index';
import { observer } from 'mobx-react-lite';

export function  App() 
{
  const {store} = useContext(Context)
  const [loading, setLoading] = useState(false)

  useEffect(() => {

    if (store.isRedirect && localStorage.getItem('accessToken')) {
     setLoading(true);
      store.checkAuth().finally(() => setLoading(false))
    }
     
  }, [])

  if (loading) {
      return <Loader/>
  }

  return (
    <div>
    <div className="container">
       
      
   
      <BrowserRouter>
     
      <div className="item ">
      <NavBar/>
    
      
    </div>
   <div className="item"> 2</div>
   
   <div className="item"> 
   
   <AppRoute/>
      </div>
      
      
      </BrowserRouter>
      


      
      
      
      
      
      <div className="item"></div>
      
    </div>
   
    </div>
  );
}

export default observer(App);
