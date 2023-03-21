const UPDATE_NEW_MESSAGE_BODY='UPDATE-NEW-MESSAGE-BODY';
const SEND_MESSAGE='SEND-MESSAGE';
const initialState={ dialogs: [
  {id: 1, name: 'Dimych'},
  {id: 2, name: 'Andrew'},
  {id: 3, name: 'Sveta'},
  {id: 4, name: 'Sasha'},
  {id: 5, name: 'Viktor'},
  {id: 6, name: 'Valera'}
],
messages: [
  {id: 1, message: 'Hi'},
  {id: 2, message: 'How is your it-kamasutra?'},
  {id: 3, message: 'Yo'},
  {id: 4, message: 'Yo'},
  {id: 5, message: 'Yo'}
],
newMessageBody:"12"}
const dialogReducer = (state=initialState, action)=>{
  
    switch (action.type)
    {
    case UPDATE_NEW_MESSAGE_BODY:    
    return {...state,
       newMessageBody:action.newBody} 
      

    
        
    
    case SEND_MESSAGE: 
       const body= state.newMessageBody;
       
       return {...state,
        newMessageBody:'',
        messages:[...state.messages,{id:6,message:body} ]};
       
        
      
    default: return state}
}
export default dialogReducer;

export const sendMessageCreator=() =>({type:SEND_MESSAGE})

export const updateNewMessageBodyCreator =(text) =>({
type:UPDATE_NEW_MESSAGE_BODY,newBody:text
})
