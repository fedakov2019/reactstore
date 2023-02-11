import React from "react";
import { Link } from "react-router-dom";
export default function NavBar() {
return (

    <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <div className="container-fluid">
      <Link to="/" className="navbar-brand" >Home</Link>
      
      <div >
        <ul className="navbar-nav me-auto mb-2 mb-md-0">
          <li className="nav-item active">
            <Link to="/admin/login" className="nav-link"  >Login</Link>
          </li>
          
          
        </ul>
        
      </div>
    </div>
  </nav> 
)

}