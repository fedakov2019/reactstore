import React from "react";
import {connect}  from "react-redux";

import { Logout } from "../../redux/auth-reducer";


import Header from "./Header";


const HeaderContainer = (props) => {
    



return <Header {...props}/>

}
const mapStateToProps=(state) =>({
    isAuth:state.auth.isAuth,
    login:state.auth.login
})

export default connect(mapStateToProps, {Logout})(HeaderContainer);
