import React from 'react';

import Dialogs from "./Dialogs";

import { sendMessageCreator, updateNewMessageBodyCreator } from '../../redux/dialogs-reducer';

import { connect } from 'react-redux';

const mapStateToProps= (state) => {
    return {
        dialogsPage: state.dialogsPage
    }
}
const mapDipatchToProps = (dispatch) =>{
    return {
        updateNewMessageBody: (body) => {
            dispatch(updateNewMessageBodyCreator(body));
        },
        sendMessage: () => {
            dispatch(sendMessageCreator());
        }

    }
}


const DialogsContainer=connect(mapStateToProps, mapDipatchToProps)(Dialogs)


export default DialogsContainer;