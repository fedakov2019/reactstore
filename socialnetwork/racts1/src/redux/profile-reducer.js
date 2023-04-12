import { profileAPI } from '../api/api';
const ADD_POST='ADD-POST';

const SET_USER_PROFILE='SET_USER_PROFILE';
const SET_STATUS='SET_STATUS';

const initialState={
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 11},
        {id: 3, message: 'Blabla', likesCount: 11},
        {id: 4, message: 'Dada', likesCount: 11}
    ],
    
    profile: null,
    status:""
}
const profileReducer = (state=initialState, action)=>{
  
switch (action.type)
{
case ADD_POST: 
   
   
  return {...state,
    posts : [...state.posts, { id: 5, message: action.newPostText, likesCount: 0}],
    newPostText : ''}
    


 

case SET_STATUS:
    return {...state, status:action.status}        
case SET_USER_PROFILE:
    return {...state, profile:action.profile}

default:
    return state;
}}

export const  addPostActionCreator=(newPostText) => {
    return {
        type:ADD_POST,newPostText
    }
};

  export const setUserProfile=(profile) =>({type:SET_USER_PROFILE,profile})
  export const SetStatus=(status)=>({type:SET_STATUS,status})
  export const GetStatus=(userId)=>(dispatch)=>{
    profileAPI.getStatus(userId).then(data=>{
        dispatch(SetStatus(data))
    })
  } 
  export const UpdateStatus=(status)=>(dispatch)=>{
    profileAPI.updateStatus(status).then(data=>{
        if (data.resultCode===0){
        dispatch(SetStatus(status))}
    })
  }
  export const GetUserProfile=(userId)=>(dispatch)=>{
    profileAPI.getProfile(userId).then(data=>{
        dispatch(setUserProfile(data));  
  })
  
}
  
export default profileReducer;