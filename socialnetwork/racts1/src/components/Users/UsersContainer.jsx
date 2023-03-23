import React from "react";
import {connect}  from "react-redux";
import { useEffect } from 'react';
import { followAC, unfollowAC, setUsersAC,setCurrentPageAC, setUsersTotalCountAC,toggleIsFetchingAC } from "../../redux/users-reducer";

import axios from "axios";
import Users from "./Users";
import Loader from "./Loader";

const UsersAPIComponent = (props) => {
    
useEffect(()=>{
    props.toggleIsFetching(true);
axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${props.currentPage}&count=${props.pageSize}`).then(response =>{
    props.setUsers(response.data.items);  
    props.setTotalUsersCount(response.data.totalCount);
    props.toggleIsFetching(false);
})

    




},[]) 


function onPageChangrd(pageNumber) {
    props.setCurrentPage(pageNumber);
    props.toggleIsFetching(true);
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${props.pageSize}`).then(response =>{
    props.setUsers(response.data.items);  
    props.setTotalUsersCount(response.data.totalCount);
    props.toggleIsFetching(false);
    })}
return <>
{props.isFetching ? <Loader/>: null}
<Users totalUserCount={props.totalUserCount}
pageSize={props.pageSize}
currentPage={props.currentPage}
onPageChangrd={onPageChangrd}
users={props.users}
follow={props.follow}
unfollow={props.unfollow}
/> </>
}
const mapStateToProps= (state) => {
    return {
        
        users:state.usersPage.users,
        pageSize:state.usersPage.pageSize,
        
        currentPage: state.usersPage.currentPage,
        totalUserCount: state.usersPage.totalUserCount,
        isFetching: state.usersPage.isFetching

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
        },
        toggleIsFetching: (isFetching)=>{
            dispatch(toggleIsFetchingAC(isFetching));
        }

    }
}
const UsersContainer =connect(mapStateToProps, mapDipatchToProps)(UsersAPIComponent)
export default UsersContainer;
