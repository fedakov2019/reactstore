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
    isError = {} as AxiosError;
    

    constructor() {
        makeAutoObservable(this);
    }
    setError(bool:AxiosError){
        this.isError=bool;
    }

    setRedirect(bool:boolean) {
        this.isRedirect=bool;
    }
    setLoading(bool:boolean){
        this.isLoading=bool;
    }

    setUser(user: IUser) {
        this.user = user;
    }

   

    async login(email: string, password: string) {
        this.setLoading(true);

        try {
            const response = await AuthService.login(email, password);
            console.log(response)
            localStorage.setItem('accessToken', response.data.token_mod.accessToken);
            
        this.setRedirect(true);
            this.setUser(response.data.createdCUs);
        } catch (e) {
            const error =e as AxiosError
            console.log(error.message);
            this.setError(error);
            this.setRedirect(false);
        }
        finally {
            this.setLoading(false);
        }
    }
   async checkAuth() {
    this.setLoading(true);
    try{
        const response= await axios.get<AuthResponse>(`${API_URL}/refrech`,{withCredentials:true});
        localStorage.setItem('accessToken', response.data.token_mod.accessToken);
        this.setRedirect(true);
        this.setUser(response.data.createdCUs);
    }
        catch(e){
            const error =e as AxiosError
            console.log(error.message);
            this.setError(error);
            this.setRedirect(false);
        }
        finally {
            this.setLoading(false);
        }
   }

    async logout() {
        try {
            const response = await AuthService.logout();
            localStorage.removeItem('accessToken');
            this.setRedirect(false);
            this.setUser({} as IUser);
        } catch (e:unknown) {
            const error =e as AxiosError
            console.log(error);
            this.setError(error);
        }
    }

    
}
