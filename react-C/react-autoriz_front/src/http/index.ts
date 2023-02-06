import axios from 'axios';

export const API_URL ='https//localhost:8000/admin'
const $apil =axios.create({
    withCredentials:true,
    baseURL:API_URL
})
$apil.interceptors.request.use((config) =>
{
    config.headers.Authorization= `Bearer ${localStorage.getItem('token')}`
return config;
})
export default $apil
