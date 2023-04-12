import React from "react";
import {connect}  from "react-redux";
import { useEffect } from 'react';
import { Follow, Unfollow, setUsers,setCurrentPage, setTotalUsersCount,toggleIsFetching,
    toggleFollovingProgress,GetUsersThunk } from "../../redux/users-reducer";


import Users from "./Users";
import Loader from "./Loader";
import { userAPI } from "../../api/api";
import { compose } from "redux";
import { GetUsers, getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUserCount } from "../../redux/users-selectors";

const UsersAPIComponent = (props) => {
    
useEffect(()=>{
    props.GetUsersThunk(props.currentPage,props.pageSize);
   },[]) 


function onPageChangrd(pageNumber) {
    props.GetUsersThunk(pageNumber,props.pageSize);
    props.setCurrentPage(pageNumber);
   
    }
return <>
{props.isFetching ? <Loader/>: null}
<Users totalUserCount={props.totalUserCount}
pageSize={props.pageSize}
currentPage={props.currentPage}
onPageChangrd={onPageChangrd}
users={props.users}
Follow={props.Follow}
Unfollow={props.Unfollow}
toggleFollovingProgress={props.toggleFollovingProgress}

followingInProgress={props.followingInProgress}
/> </>
}
const mapStateToProps= (state) => {
    return {
        
        users:GetUsers(state),
        pageSize:getPageSize(state),
        
        currentPage: getCurrentPage(state),
        totalUserCount: getTotalUserCount(state),
        isFetching: getIsFetching(state),
        
        followingInProgress: getFollowingInProgress(state)

    }
}

export default compose( connect(mapStateToProps, {
    Follow,
    
    Unfollow,

    setUsers,
    
    setCurrentPage,
    
    setTotalUsersCount,
    
    toggleIsFetching,
    toggleFollovingProgress,
    GetUsersThunk
    
    }
    ))(UsersAPIComponent)

