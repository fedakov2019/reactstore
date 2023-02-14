import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../index";
export default function NavBar(props:{name:boolean}) {
  const {store}=useContext(Context)
let menu;
if (!props.name ) { menu= (
  <ul className="navbar-nav me-auto mb-2 mb-md-0">
  <li className="nav-item active">
    <Link to="/admin/login" className="nav-link"  >Login</Link>
  </li>
  
  
</ul>)}
else {
  menu =(

<ul className="navbar-nav me-auto mb-2 mb-md-0">
  <li className="nav-item active">
    <Link to="/admin/login" className="nav-link" onClick={store.logout} >Logut</Link>
  </li>
  
  
</ul>

  )
}

return (

    <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4">
    <div className="container-fluid">
      <Link to="/" className="navbar-brand" >Home</Link>
      
      <div >
       {menu}
        
      </div>
    </div>
  </nav> 
)

}