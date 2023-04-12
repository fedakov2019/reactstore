import { createSelector } from "reselect";

export const GetUsersSel=(state)=>{
    return state.usersPage.users;
}
export const GetUsers=createSelector(GetUsersSel,(users)=>{
    users.filter(u=>true);
})
export const getPageSize=(state)=>{
    return state.usersPage.pageSize;
}

export const getCurrentPage=(state)=>{
    return state.usersPage.currentPage
}
export const getTotalUserCount=(state)=>{
return state.usersPage.totalUserCount;
}
export const getIsFetching=(state)=>{
   return state.usersPage.isFetching;  
}
export const getFollowingInProgress=(state)=>{
    return state.usersPage.followingInProgress;
}


