import React, {FC} from 'react';
import LoginForm from './components/LoginForm';

import './App.css';

const  App: FC =()=> {
  return (
    <div>
    <div className="container">
      <div className="item "> 
      
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">Home</a>
    
    <div >
      <ul className="navbar-nav me-auto mb-2 mb-md-0">
        <li className="nav-item active">
          <a className="nav-link"  href="#">Login</a>
        </li>
        
        
      </ul>
      
    </div>
  </div>
</nav>
    
      
       </div>
      <div className="item"> 2</div>
      
      <div className="item"> 
      
      < LoginForm />


      
      
      
      
      </div>
      <div className="item"></div>
      
    </div>
   
    </div>
  );
}

export default App;
