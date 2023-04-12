import React from 'react';

import { useEffect } from 'react';
import { GetUserProfile,GetStatus,UpdateStatus } from '../../../redux/profile-reducer';
import {useParams} from 'react-router';
import Profile from "./Profile";
import {connect}  from "react-redux";
import { compose } from 'redux';
import { withAuthRedirect } from '../../Hoc/AuthRedirect';



const ProfileContainer = (props) => {
    let params=useParams();
    let userId=params.userId;
    if (!userId) 
    {
        userId = props.authUserid;
    } 
    useEffect(()=>{
        
        
       
        props.GetUserProfile(userId);
        props.GetStatus(userId);
    
    },[userId]) ;  
    
    return (
        <div>
            <Profile {...props} profile={props.profile} status={props.status} UpdateStatus={props.UpdateStatus}/>
            
        </div>
    )
}
const mapStateToProps =(state) => ({
profile : state.profilePage.profile,
status: state.profilePage.status,
authUserid:state.auth.userId,
isAuth:state.auth.isAuth
});


export default compose(connect(mapStateToProps,{GetUserProfile, GetStatus,UpdateStatus}),withAuthRedirect)(ProfileContainer);