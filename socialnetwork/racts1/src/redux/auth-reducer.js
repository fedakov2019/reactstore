import { stopSubmit } from 'redux-form';
import {userAPI,authAPI} from '../api/api'
const SET_USER_DATA='SET_USER_DATA';

const initialState={
    userId: null,
    email:null,
    login:null,
    
    isAuth:false
    
}
const authReducer = (state=initialState, action)=>{
  
switch (action.type)
{
case SET_USER_DATA: 
   
   
  return {...state,
     ...action.payload  
}
    


default:
    return state;
}}

export const  setAuthUserData=(userId,email,login,isAuth) => (
    {
        type:SET_USER_DATA, payload:{userId,email,login,isAuth}
    })

export const GetAuthUserData=()=>(dispatch)=>{
   return userAPI.getAuth().then(data =>{
        if (data.resultCode===0) {
            let {id, login,email}=data.data;
        dispatch(setAuthUserData(id, login,email,true)); 
        } 
    }) 
}
export const Login=(email,password,rememberMe)=>(dispatch)=>{
    
    
    authAPI.login(email,password,rememberMe).then(data =>{
        if (data.resultCode===0) {
            
        dispatch(GetAuthUserData()); 
        } else{
            const message =data.messages.length>0? data.messages[0]:"имя или пароль не верны";
            dispatch(stopSubmit("login",{_error:message}))
        }
    }) 
}
export const Logout=()=>(dispatch)=>{
    authAPI.logout().then(data =>{
        if (data.resultCode===0) {
            
        dispatch(setAuthUserData(null,null,null,false)); 
        } 
    }) 
}
export default authReducer;