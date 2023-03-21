const FOLLOW='FOLLOW';
const UNFOLLOW='UNFOLLOW';
const SET_USERS='SET_USERS';
const initialState={
    users: [
       
    ],
    
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
        return {...state, users: [...state.users,...action.users]}
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
export default usersReducer;