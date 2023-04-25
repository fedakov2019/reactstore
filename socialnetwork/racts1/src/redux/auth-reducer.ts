

import { stopSubmit } from 'redux-form';
import {userAPI,authAPI, securityAPI} from '../api/api'
const SET_USER_DATA='auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS='auth/GET_CAPTCHA_URL_SUCCESS';
export type InitialStateType={
    userId: number|null,
    email:string|null,
    login:string|null,
    
    isAuth:boolean,
    captchaUrl:string|null   
}
const initialState:InitialStateType={
    userId: null,
    email:null,
    login:null,
    
    isAuth:false,
    captchaUrl:null
    
}
const authReducer = (state=initialState, action:any):InitialStateType=>{
  
switch (action.type)
{
case SET_USER_DATA: 
case GET_CAPTCHA_URL_SUCCESS:  
   
  return {...state,
     ...action.payload 
}
    


default:
    return state;
}}
type setpayloadType={
    userId:number|null,
    email:string|null,
    login:string|null,
    isAuth:boolean
}
type SetAuthType={
    type: typeof SET_USER_DATA,
    payload:setpayloadType
}

export const  setAuthUserData=(userId:number|null,email:string|null,login:string|null,isAuth:boolean) :SetAuthType=> (
    {
        type:SET_USER_DATA, payload:{userId,email,login,isAuth}
    })
type GetCaptchaUrlType={
    type:typeof GET_CAPTCHA_URL_SUCCESS,
    payload:{captchaUrl:string}
}  
export const getCaptchaUrlSuccess=(captchaUrl:string):GetCaptchaUrlType=>({
    type:GET_CAPTCHA_URL_SUCCESS,payload:{captchaUrl}
});    

export const GetAuthUserData=()=>async (dispatch:any)=>{
   const data=await userAPI.getAuth();
        if (data.resultCode===0) {
            let {id, login,email}=data.data;
        dispatch(setAuthUserData(id, login,email,true)); 
        } 
     
}
export const Login=(email:string,password:string,rememberMe:boolean,captcha:string)=> async (dispatch:any)=>{
    
    
   const data= await authAPI.login(email,password,rememberMe,captcha);
        if (data.resultCode===0) {
            
        dispatch(GetAuthUserData()); 
        } else { if (data.resultCode===10) {
         dispatch(getCaptchaUrl());
        }
        
            const message =data.messages.length>0? data.messages[0]:"имя или пароль не верны";
            dispatch(stopSubmit("login",{_error:message}))
        }

}
export const getCaptchaUrl=()=>async(dispatch:any)=>{
    const data= await securityAPI.getCaptchaUrl();
    const captchaUrl= data.url;
    dispatch(getCaptchaUrlSuccess(captchaUrl));
}
export const Logout=()=> async (dispatch:any)=>{
    const data = await authAPI.logout();
        if (data.resultCode===0) {
            
        dispatch(setAuthUserData(null,null,null,false)); 
        } 
     
}
export default authReducer;