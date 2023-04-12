
import { GetAuthUserData } from './auth-reducer';
const SET_INITIALIZED='SET_INITIALIZED';

const initialState={
    initialized:false
    
}
const appReducer = (state=initialState, action)=>{
  
switch (action.type)
{
case SET_INITIALIZED: 
   
   
  return {...state,
     initialized:true 
}
    


default:
    return state;
}}

export const  initializedSuccess=() => (
    {
        type:SET_INITIALIZED
    })

export const initialize=()=>(dispatch)=>{
    const promise=dispatch(GetAuthUserData());
    Promise.all([promise]).then(()=>{dispatch(initializedSuccess())})
}


            
export default appReducer;