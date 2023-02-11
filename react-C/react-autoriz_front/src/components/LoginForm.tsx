
import axios from 'axios';
import React, {FC, useEffect, useState} from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context } from '../index';
import { AuthResponse } from '../models/response/AuthResponse';



export default function LoginForm() {
  const {store}=useContext(Context)
    const [name, setName]= useState<string>('')
    const [password, setPassword]= useState<string>('')
    const [redirect, SetRedirect]=useState(false);
    const navigate=useNavigate();
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
   
  </form>
</main>
      </div>  
    )
}
