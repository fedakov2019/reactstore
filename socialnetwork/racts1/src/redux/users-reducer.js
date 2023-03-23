const FOLLOW='FOLLOW';
const UNFOLLOW='UNFOLLOW';
const SET_USERS='SET_USERS';
const SET_TOTAL_USERS_COUNT='SET_TOTAL_USERS_COUNT';
const SET_CURRENT_PAGE='SET_CURRENT_PAGE';
const TOGGLE_IS_FETCHING='TOGGLE_IS_FETCHING';
const initialState={
    users: [],
    pageSize:100,
    totalUserCount:0,
    currentPage:1,
    isFetching:false
    
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

default:
    return state;
}}

export const  followAC=(userId) => {
    return {
        type:FOLLOW,userId
    }
};
export const unfollowAC=(userId) =>{
    return {
        type:UNFOLLOW, userId
    }}

export const setUsersAC =(users) => ({type:SET_USERS, users}) 
export const setCurrentPageAC =(currentPage) => ({type:SET_CURRENT_PAGE, currentPage}) 
export const setUsersTotalCountAC =(totalUserCount) => ({type:SET_TOTAL_USERS_COUNT, count:totalUserCount})  
export const toggleIsFetchingAC=(isFetching) =>({type: TOGGLE_IS_FETCHING,isFetching})
export default usersReducer;