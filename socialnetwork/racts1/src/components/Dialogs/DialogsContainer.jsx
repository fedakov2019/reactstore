import React from 'react';

import Dialogs from "./Dialogs";

import { sendMessageCreator } from '../../redux/dialogs-reducer';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirect } from '../Hoc/AuthRedirect';

const mapStateToProps= (state) => {
    return {
        dialogsPage: state.dialogsPage,
        
    }
}
const mapDipatchToProps = (dispatch) =>{
    return {
        
        sendMessage: (newMessageBody) => {
            dispatch(sendMessageCreator(newMessageBody));
        }

    }
}





export default compose(connect(mapStateToProps, mapDipatchToProps),withAuthRedirect)(Dialogs);