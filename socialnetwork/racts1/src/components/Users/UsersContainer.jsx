import React from "react";
import {connect}  from "react-redux";
import { useEffect } from 'react';
import { followAC, unfollowAC, setUsersAC,setCurrentPageAC, setUsersTotalCountAC } from "../../redux/users-reducer";

import axios from "axios";
import Users from "./Users";

const UsersAPIComponent = (props) => {
useEffect(()=>{

axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${props.currentPage}&count=${props.pageSize}`).then(response =>{
    props.setUsers(response.data.items);  
    props.setTotalUsersCount(response.data.totalCount);
})
    




},[]) 

function onPageChangrd(pageNumber) {
    props.setCurrentPage(pageNumber);
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${props.pageSize}`).then(response =>{
    props.setUsers(response.data.items);  
    props.setTotalUsersCount(response.data.totalCount);
    })}
return <Users totalUserCount={props.totalUserCount}
pageSize={props.pageSize}
currentPage={props.currentPage}
onPageChangrd={onPageChangrd}
users={props.users}
follow={props.follow}
unfollow={props.unfollow}
/>
}
const mapStateToProps= (state) => {
    return {
        
        users:state.usersPage.users,
        pageSize:state.usersPage.pageSize,
        
        currentPage: state.usersPage.currentPage,
        totalUserCount: state.usersPage.totalUserCount

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
        },
        setCurrentPage: (pageNumder) => {
            dispatch(setCurrentPageAC(pageNumder))
        },
        setTotalUsersCount: (totalCount) => {
            dispatch(setUsersTotalCountAC(totalCount))
        }

    }
}
const UsersContainer =connect(mapStateToProps, mapDipatchToProps)(UsersAPIComponent)
export default UsersContainer;
