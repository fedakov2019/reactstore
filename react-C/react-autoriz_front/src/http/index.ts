import axios from 'axios';
import {AuthResponse} from "../models/response/AuthResponse";

import {IUser} from "../models/IUser";

export const API_URL = `https://localhost:8000/admin`
const $api = axios.create({
    
    baseURL: API_URL
})
const $apil = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$apil.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})


export default $api;