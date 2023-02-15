import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../index";
export  function NavBar() {
  const {store}=useContext(Context)
  const logout=async()=>{
await store.logout()
  }
let menu;
if (!store.isRedirect) { menu= (
  <ul className="navbar-nav me-auto mb-2 mb-md-0">
  <li className="nav-item active">
    <Link to="/admin/login" className="nav-link"  >Login</Link>
  </li>
  
  
</ul>)}
else {
  menu =(

<ul className="navbar-nav me-auto mb-2 mb-md-0">
  <li className="nav-item active">
    <Link to="/admin/login" className="nav-link" onClick={logout} >Logut</Link>
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
export  default observer(NavBar)