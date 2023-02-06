
import React, {FC, useState} from 'react';
import { useContext } from 'react';
import { Context } from '../index';

const LoginForm: FC =() =>{
  const {store}=useContext(Context)
    const [name, setName]= useState<string>('')
    const [password, setPassword]= useState<string>('')
    return(
      <div>
<main className="form-signin w-100 m-auto">
  <form>
    
    <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

    
      <input type="text" className="form-control" onChange={e => setName(e.target.value)} 
      value={name}
      
      placeholder="Name User" required/>
   
    
    
      <input type="password" className="form-control" 
      onChange={e => setPassword(e.target.value)}
      value={password}
      placeholder="Password"required/>
      
    

    
    <button onClick={()=> store.login(name,password)} className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
   
  </form>
</main>
      </div>  
    )
}
export default LoginForm;