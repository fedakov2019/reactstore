
import axios from 'axios';
import {AuthResponse} from "../models/response/AuthResponse";

import {IUser} from "../models/IUser";
import { config } from 'process';

export const API_URL = `https://localhost:8000/admin`

const $apil = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$apil.interceptors.request.use((config) => {
    config.headers.Authorization = `${localStorage.getItem('accessToken')}`
    config.headers['Content-Type'] = 'application/json'
    return config;
})
$apil.interceptors.response.use((config)=>{
    return config;

}, async(error)=>{
    const originalRecuest=error.config;
if (error.response.status==401 && error.config && !error.config._isRetry){
    originalRecuest._isRetry=true;
    try{
    const response= await axios.get<AuthResponse>(`${API_URL}/refrech`,{withCredentials:true});
    localStorage.setItem('accessToken', response.data.token_mod.accessToken);
    return $apil.request(originalRecuest);}
    catch(e){
        console.log('Не авторизован');
    }
}
throw error;
})


export default $apil;