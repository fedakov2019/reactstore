import React from 'react';
import LoginForm from './components/LoginForm';

import './App.css';
import NavBar from './components/NavBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {Home} from './components/Home';

export  function  App() 
{
  return (
    <div>
    <div className="container">
       
      
   
      <BrowserRouter>
     
      <div className="item ">
      <NavBar/>
    
      
    </div>
   <div className="item"> 2</div>
   
   <div className="item"> 
   <Routes>
      <Route  path="/" element={<Home/>}/>
      <Route path="/admin/login" element={<LoginForm/>} />
      </Routes>
      </div>
      
      
      </BrowserRouter>
      


      
      
      
      
      
      <div className="item"></div>
      
    </div>
   
    </div>
  );
}

export default App;
