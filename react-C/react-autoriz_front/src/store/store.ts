import {IUser} from "../models/IUser";
import {makeAutoObservable} from "mobx";
import AuthService from "../services/AuthService";
import axios, { AxiosError } from 'axios';
import {AuthResponse} from "../models/response/AuthResponse";
import {API_URL} from "../http";

export default class Store {
    user = {} as IUser;
    isAuth = false;
    isRedirect =false;
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    

    setUser(user: IUser) {
        this.user = user;
    }

   

    async login(email: string, password: string) {
        try {
            const response = await AuthService.login(email, password);
            console.log(response)
            localStorage.setItem('accessToken', response.data.token_mod.accessToken);
            localStorage.setItem('refreshToken', response.data.token_mod.refreshToken);
        this.isRedirect=true;
            this.setUser(response.data.createdCUs);
        } catch (e) {
            const error =e as AxiosError
            console.log(error.message);
            this.isRedirect=false;
        }
    }


    async logout() {
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('token');
            
            this.setUser({} as IUser);
        } catch (e:unknown) {
            const error =e as AxiosError
            console.log(error);
        }
    }

    
}
