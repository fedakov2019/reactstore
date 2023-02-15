import Admin from "./pages/Admin";
import {ADMIN_ROUTE, LOGIN_ROUTE, CreateUser_ROUTE, Home_ROUTE} from "./utils/const";

import Home from "./pages/Home";
import LoginForm from "./pages/LoginForm";




export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin 
    }
]

export const publicRoutes = [

    {
        path: LOGIN_ROUTE,
        Component: LoginForm 
    },
    {
        path: Home_ROUTE,
        Component: Home
    }
    

]