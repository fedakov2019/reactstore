import $apil from "../http/index";
import {AxiosResponse} from 'axios';
import { AuthResponse } from "../models/response/AuthResponse";
import { IUser } from "../models/IUser";

export default class UserService {
    static async fetchUsers(): Promise<AxiosResponse<IUser>>{
        return $apil.get<IUser>('/users')
        
    }
   
}