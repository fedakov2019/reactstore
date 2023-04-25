

import { GetAuthUserData } from './auth-reducer';
const SET_INITIALIZED='SET_INITIALIZED';
export type InitialStateType={
    initialized:boolean;
}

const initialState:InitialStateType={
    initialized:false
    
}
const appReducer = (state=initialState, action:any):InitialStateType=>{
  
switch (action.type)
{
case SET_INITIALIZED: 
   
   
  return {...state,
     initialized:true 
}
    


default:
    return state;
}}
type InitializedSuccessType={
    type: typeof SET_INITIALIZED
}
export const  initializedSuccess=():InitializedSuccessType => (
    {
        type:SET_INITIALIZED
    })

export const initialize=()=>(dispatch:any)=>{
    const promise=dispatch(GetAuthUserData());
    Promise.all([promise]).then(()=>{dispatch(initializedSuccess())})
}


            
export default appReducer;