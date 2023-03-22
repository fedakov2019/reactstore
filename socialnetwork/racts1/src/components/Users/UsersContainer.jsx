import React from "react";
import Users from "./Users";
import {connect}  from "react-redux";
import { followAC, unfollowAC, setUsersAC,setCurrentPageAC, setUsersTotalCountAC } from "../../redux/users-reducer";
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
const UsersContainer =connect(mapStateToProps, mapDipatchToProps)(Users)
export default UsersContainer;
