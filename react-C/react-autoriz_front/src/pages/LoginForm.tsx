
import axios from 'axios';
import React, { useEffect, useState} from 'react';
import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Context } from '../index';
import { AuthResponse } from '../models/response/AuthResponse';
import { Loader } from '../components/Loader';
import { ErrorMessage } from '../components/ErrorMesage';
import { observer } from 'mobx-react-lite/';

import { Home_ROUTE, LOGIN_ROUTE } from '../utils/const';
import {createBrowserHistory} from 'history';


const LoginForm = ()=> {
  const {store}=useContext(Context)
    const [name, setName]= useState<string>('')
    const [password, setPassword]= useState<string>('')
    const [redirect, SetRedirect]=useState(false);
    const navigate=useNavigate();
    const location = useLocation()
    
    const isLogin = location.pathname === LOGIN_ROUTE
    useEffect(() => {
      if (redirect) {
       return navigate("/");
      }
      },[redirect]);
  
    
    const  LoginUser= async(event : React.FormEvent)=> {
      event.preventDefault();
      store.login(name,password);
      
      SetRedirect(store.isRedirect);
     
    }

    return(
      <div>
<main className="form-signin w-100 m-auto">
  <form onSubmit={LoginUser}>
    
    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

    
      <input type="text" className="form-control" onChange={e => setName(e.target.value)} 
      value={name}
      
      placeholder="Name User" required/>
   
    
    
      <input type="password" className="form-control" 
      onChange={e => setPassword(e.target.value)}
      value={password}
      placeholder="Password"required/>
      
    

    
    <button  className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
   {store.isLoading && <Loader />}
   {store.isError && <ErrorMessage error={store.isError.message} />}

  </form>
</main>
      </div>  
    )
}
export default observer(LoginForm);


