import {userAPI} from '../api/api';
const FOLLOW='FOLLOW';
const UNFOLLOW='UNFOLLOW';
const SET_USERS='SET_USERS';
const SET_TOTAL_USERS_COUNT='SET_TOTAL_USERS_COUNT';
const SET_CURRENT_PAGE='SET_CURRENT_PAGE';
const TOGGLE_IS_FETCHING='TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS='TOGGLE_IS_FOLLOWING_PROGRESS';

const initialState={
    users: [],
    pageSize:100,
    totalUserCount:0,
    currentPage:1,
    isFetching:false,
    followingInProgress:[]
    
}
const usersReducer = (state=initialState, action)=>{
  
switch (action.type)
{
case FOLLOW: 
   
   
  return {...state,
     users: state.users.map(u =>{
        if (u.id===action.userId) {
            return {...u, followed:true}
        }
        return u;
     })    
}
    
case SET_USERS:
    {
        return {...state, users: action.users}
    }
    case SET_CURRENT_PAGE:
    {
        return {...state, currentPage: action.currentPage}
    }
    case TOGGLE_IS_FETCHING:
        {
            return {...state,isFetching:action.isFetching}
        }
    case SET_TOTAL_USERS_COUNT:
    {
        return {...state, totalUserCount: action.count}
    }

 
case UNFOLLOW: 
return {...state,
    users: state.users.map(u =>{
       if (u.id===action.userId) {
           return {...u, followed:false}
       }
       return u;
    })    
}
case TOGGLE_IS_FOLLOWING_PROGRESS:
    
    
    return {...state, followingInProgress: action.isFetching?
        [...state.followingInProgress,action.userId]
        :state.followingInProgress.filter(id=>id!=action.userId)}


default:
    return state;
}}

export const  followSucces=(userId) => {
    return {
        type:FOLLOW,userId
    }
};
export const unfollowSucces=(userId) =>{
    return {
        type:UNFOLLOW, userId
    }}

export const setUsers =(users) => ({type:SET_USERS, users}) 
export const setCurrentPage =(currentPage) => ({type:SET_CURRENT_PAGE, currentPage}) 
export const setTotalUsersCount =(totalUserCount) => ({type:SET_TOTAL_USERS_COUNT, count:totalUserCount})  
export const toggleIsFetching=(isFetching) =>({type: TOGGLE_IS_FETCHING,isFetching})
export const toggleFollovingProgress=(isFetching,userId)=>({type:TOGGLE_IS_FOLLOWING_PROGRESS,isFetching, userId})
export const GetUsersThunk=(currentPage,pageSize)=>{
    return (dispatch) =>{

    dispatch(toggleIsFetching(true));
    userAPI.getUsers(currentPage,pageSize).then(data =>{
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));  
        dispatch(setCurrentPage(currentPage))
        dispatch(setTotalUsersCount(data.totalCount));

    }
        )
}}

export const Follow=(Id) => {
    return (dispatch)=>{
        dispatch(toggleFollovingProgress(true,Id));
        userAPI.getFollow(Id).then(data=>{
        
           
   if (data.resultCode===0) {dispatch(followSucces(Id))}
   dispatch(toggleFollovingProgress(false,Id));
   })
    }
}
export const Unfollow=(Id) => {
    return (dispatch) =>{
        dispatch(toggleFollovingProgress(true,Id));
        userAPI.getUnfollow(Id).then(data=>{
            if (data.resultCode===0){dispatch(unfollowSucces(Id))}
            dispatch(toggleFollovingProgress(false,Id));
        })


    }
}

export default usersReducer;