import React from "react";
import Users from "./Users";
import {connect}  from "react-redux";
import { followAC, unfollowAC, setUsersAC } from "../../redux/users-reducer";
const mapStateToProps= (state) => {
    return {
        
        users:state.usersPage.users
    }
}
const mapDipatchToProps = (dispatch) =>{
    return {
        follow: (userId) => {
            dispatch(followAC(userId));
        },
        unfollow: (userId) => {
            dispatch(unfollowAC(userId));
        },
        setUsers: (users) => {
            dispatch(setUsersAC(users))
        }

    }
}
const UsersContainer =connect(mapStateToProps, mapDipatchToProps)(Users)
export default UsersContainer;
