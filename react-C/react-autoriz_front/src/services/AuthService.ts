import $apil from "../http/index";
import {AxiosResponse} from 'axios';
import { AuthResponse } from "../models/response/AuthResponse";

export default class AuthService {
    static async login(name:string, password:string): Promise<AxiosResponse<AuthResponse>> {
        return $apil.post<AuthResponse>('/login', {name, password})
        
    }
    static async logout(): Promise<void>{
        return $apil.post('/logout')
        
    }
}
