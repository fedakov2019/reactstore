import $apil from "../http/index";
import {AxiosResponse} from 'axios';
import { AuthResponse } from "../models/response/AuthResponse";

export default class AuthService {
    static async login(username:string, password:string): Promise<AxiosResponse<AuthResponse>>{
        return $apil.post<AuthResponse>('/login',{username,password})
        
    }
    static async logout(): Promise<void>{
        return $apil.post('/admin/logout')
        
    }
}
