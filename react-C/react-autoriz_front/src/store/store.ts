import { useState } from 'react';

import { IUser } from "../models/IUser";
import { makeAutoObservable } from "mobx";
import AuthService from "../services/AuthService";
import { AxiosError } from 'axios';


export default class Store {
user={} as IUser;
constructor(){
    makeAutoObservable(this);
} 
setUser(user:IUser){
this.user=user;
}


async login(name:string, password:string){
    try {
        const response = await AuthService.login(name,password);
        localStorage.setItem('token', response.data.accessToken);
        this.setUser(response.data.user);

    } catch (e:unknown) { 
       const error=e as AxiosError;

        
        console.log(error.message);

    }
}
async logout(){
    try {
        const response = await AuthService.logout();
        localStorage.removeItem('token');
        this.setUser({} as IUser);

    }
    catch (e:unknown) { 
        const error=e as AxiosError;
 
         
         console.log(error.message);
 
     }
}

}