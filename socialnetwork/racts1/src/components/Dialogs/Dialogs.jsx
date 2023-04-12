import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { Textarea } from '../common/FormControls/FormsControls';
import { sendMessageCreator } from '../../redux/dialogs-reducer';
import { Field, reduxForm } from "redux-form"
import { maxLengthCreator, required } from '../../utils/validators/validators';
const Dialogs = (props) => {
    const state=props.dialogsPage;

    let dialogsElements = state.dialogs.map( d => <DialogItem name={d.name} key={d.id} id={d.id} />  );
    let messagesElements = state.messages.map( m => <Message message={m.message} key={m.id}/> );
    const newMessageBody = state.newMessageBody;

const addNewMessage=(values)=>{
    props.sendMessage(values.newMessageBody); 
}


    return (
        <div className={s.dialogs}>
            <div className={s.dialogsItems}>
                { dialogsElements }
            </div>
            <div className={s.messages}>
               <div>{ messagesElements }</div>
               <div>

               <AddMessageFormRedux onSubmit={addNewMessage}/>
               </div>
            </div>
        </div>
    )
}
const maxLeng=maxLengthCreator(50);
const AddMessageForm =(props)=>{
    return (
        <form onSubmit={props.handleSubmit}>
        <div> <Field validate={[required,maxLeng]} component={Textarea} name="newMessageBody" placeholder="Enter your message"/> </div>
        <div><button>Send</button></div>
</form>
    )
}
const AddMessageFormRedux =reduxForm({
    form:'dialogAddMessageForm'
})(AddMessageForm)
export default Dialogs;