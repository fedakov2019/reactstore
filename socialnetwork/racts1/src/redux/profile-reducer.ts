
import { stopSubmit } from 'redux-form';
import { profileAPI } from '../api/api';
import { PostType,ContactsType,PhotosType,ProfileType } from '../types/types';
const ADD_POST='ADD-POST';

const SET_USER_PROFILE='SET_USER_PROFILE';
const SET_STATUS='SET_STATUS';
const SAVE_PHOTE_SUCCESS='SAVE_PHOTE_SUCCESS';


const initialState={
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 11},
        {id: 3, message: 'Blabla', likesCount: 11},
        {id: 4, message: 'Dada', likesCount: 11}
    ] as Array<PostType>,
    
    profile: null as ProfileType|null,
    status:"",
    newPostText:""
}
export type InitialStateType=typeof initialState; 
const profileReducer = (state=initialState, action:any):InitialStateType=>{
  
switch (action.type)
{
case ADD_POST: 
   
   
  return {...state,
    posts : [...state.posts, { id: 5, message: action.newPostText, likesCount: 0}],
    newPostText : ''}
    


 
//55
case SET_STATUS:
    return {...state, status:action.status}        
case SET_USER_PROFILE:
    return {...state, profile:action.profile}
case SAVE_PHOTE_SUCCESS:
    return {...state, profile:{...state.profile,photos:action.photos} as ProfileType}    

default:
    return state;
}}
type addPostActionCreatorType={
    type: typeof ADD_POST,
    newPostText:string
}
export const  addPostActionCreator=(newPostText:string):addPostActionCreatorType => {
    return {
        type:ADD_POST,newPostText
    }
};
type setUserPofileType={
    type: typeof SET_USER_PROFILE,
    profile:ProfileType
}
  export const setUserProfile=(profile:ProfileType):setUserPofileType =>({type:SET_USER_PROFILE,profile})
  type savePhotoType={
    type: typeof SAVE_PHOTE_SUCCESS,
    photos:PhotosType
}
  export const savePhotoSuccess=(photos:PhotosType):savePhotoType => ({type:SAVE_PHOTE_SUCCESS,photos})
  type SetStatusType={
    type: typeof SET_STATUS,
    status:string
}
  export const SetStatus=(status:string):SetStatusType=>({type:SET_STATUS,status})
  
  
  export const GetStatus=(userId:number)=>(dispatch:any)=>{
    profileAPI.getStatus(userId).then(data=>{
        dispatch(SetStatus(data))
    })
  } 
  export const UpdateStatus=(status:string)=>(dispatch:any)=>{
    profileAPI.updateStatus(status).then(data=>{
        if (data.resultCode===0){
        dispatch(SetStatus(status))}
    })
  }
  export const savePhoto=(file:any)=>async(dispatch:any)=>{
    const data= await profileAPI.savePhote(file);
        if (data.resultCode===0){
        dispatch(savePhotoSuccess(data.data.photos))}
    
  }
  export const saveData=(profile:ProfileType)=>async(dispatch:any,getState:any)=>{
    const UserId=getState().auth.userId;
    const data= await profileAPI.saveData(profile);
        if (data.resultCode===0){
        dispatch(GetUserProfile(UserId))}
        else {dispatch(stopSubmit("edit-profile",{_error:data.messages[0]}));
        return Promise.reject(data.messages[0])
        }
    
  }
  export const GetUserProfile=(userId:number)=>(dispatch:any)=>{
    profileAPI.getProfile(userId).then(data=>{
        dispatch(setUserProfile(data));  
  })
  
}
  
export default profileReducer;