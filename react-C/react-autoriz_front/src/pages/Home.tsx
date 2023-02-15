import { override } from "mobx";
import { observer } from "mobx-react-lite";
import React, { useContext,useEffect, useState } from "react";
import {useNavigate } from 'react-router-dom';
import {Context} from '../index';
import { IUser } from "../models/IUser";
import UserService from "../services/UserService";
export   function Home() {
   const {store}=useContext(Context);
   const [user,setUsers]=useState<IUser>();
   const navigate=useNavigate();
    
    useEffect(() => {
      if (!store.isRedirect) {
       return navigate("/admin/login");
      } 
      },[store.isRedirect]);
      async function getUsers() {
         try {
             const response = await UserService.fetchUsers();
             setUsers(response.data);
         } catch (e) {
             console.log(e);
         }
           }
return (
   <div>
   <div className="text-center">Home</div> 
   
   <button onClick={getUsers}>Получить пользователей</button>
   
        
   <div>{user?.name} </div> 
       
   </div>
)
}
export default observer(Home)