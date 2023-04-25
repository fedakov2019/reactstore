
import {userAPI} from '../api/api';
import { UserType } from '../types/types';
import { updateObjectInArray } from '../utils/objectHelper';
const FOLLOW='FOLLOW';
const UNFOLLOW='UNFOLLOW';
const SET_USERS='SET_USERS';
const SET_TOTAL_USERS_COUNT='SET_TOTAL_USERS_COUNT';
const SET_CURRENT_PAGE='SET_CURRENT_PAGE';
const TOGGLE_IS_FETCHING='TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS='TOGGLE_IS_FOLLOWING_PROGRESS';

const initialState={
    users: [] as Array<UserType>,
    pageSize:100,
    totalUserCount:0,
    currentPage:1,
    isFetching:false,
    followingInProgress:[] as Array<number>
    
}
type InitialStateType=typeof initialState;
const usersReducer = (state=initialState, action:any):InitialStateType=>{
  
switch (action.type)
{
case FOLLOW: 
   
   
  return {...state,
    users: updateObjectInArray(state.users,action.userId,'id',{followed:true})  
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
    users: updateObjectInArray(state.users,action.userId,'id',{followed:false})  
}
case TOGGLE_IS_FOLLOWING_PROGRESS:
    
    
    return {...state, followingInProgress: action.isFetching?
        [...state.followingInProgress,action.userId]
        :state.followingInProgress.filter(id=>id!=action.userId)}


default:
    return state;
}}
type FollowType={
    type:typeof FOLLOW,
    userId:number
}
export const  followSucces=(userId:number):FollowType => {
    return {
        type:FOLLOW,userId
    }
};
type unFollowType={
    type:typeof UNFOLLOW,
    userId:number
}
export const unfollowSucces=(userId:number):unFollowType =>{
    return {
        type: UNFOLLOW, userId
    }}
type setUserType={type:typeof SET_USERS,
    users:UserType
}
export const setUsers =(users:UserType):setUserType => ({type:SET_USERS, users}) 
type setCyrrentType={
    type:typeof SET_CURRENT_PAGE,
    currentPage:number
}
export const setCurrentPage =(currentPage:number):setCyrrentType => ({type:SET_CURRENT_PAGE, currentPage})
type setTotalType={
    type:typeof SET_TOTAL_USERS_COUNT,
    count:number
}
export const setTotalUsersCount =(totalUserCount:number):setTotalType => ({type:SET_TOTAL_USERS_COUNT, count:totalUserCount})
type TogleIsFetType={
    type:typeof TOGGLE_IS_FETCHING,
    isFetching:boolean
}

export const toggleIsFetching=(isFetching:boolean):TogleIsFetType =>({type: TOGGLE_IS_FETCHING,isFetching})
type toggleFollovingProgressType={
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching:boolean,
    userId:number
}
export const toggleFollovingProgress=(isFetching:boolean,userId:number):toggleFollovingProgressType=>({type:TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching, userId})
export const GetUsersThunk=(currentPage:number,pageSize:number)=>{
    return (dispatch:any) =>{

    dispatch(toggleIsFetching(true));
    userAPI.getUsers(currentPage,pageSize).then(data =>{
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));  
        dispatch(setCurrentPage(currentPage))
        dispatch(setTotalUsersCount(data.totalCount));

    }
        )
}}
const follofUnfollowFlow =async(dispatch:any,Id:number,apiMethod:any,actionCreator:any)=>{
    dispatch(toggleFollovingProgress(true,Id));
        const data= await apiMethod(Id);
        
           
   if (data.resultCode===0) {dispatch(actionCreator(Id))}
   dispatch(toggleFollovingProgress(false,Id));
}

export const Follow=(Id:number) => {
    return async (dispatch:any)=>{
        const apiMethod=userAPI.getFollow.bind(Id);
        const actionCreator = followSucces;
        follofUnfollowFlow(dispatch,Id,apiMethod,actionCreator);
   
    }
}
export const Unfollow=(Id:number) => {
    return async (dispatch:any) =>{
        const apiMethod=userAPI.getUnfollow.bind(Id);
        const actionCreator = unfollowSucces;
        follofUnfollowFlow(dispatch,Id,apiMethod,actionCreator);
        
        


    }
}

export default usersReducer;