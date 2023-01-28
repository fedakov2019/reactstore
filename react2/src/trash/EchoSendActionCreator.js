"use strict";

import Dispatcher from "../dispatcher/Dispatcher";
import  {ActionTypes} from "../constants/Constants";

const echoSend = (text) => {
    console.log("echoSend start");
    Dispatcher.dispatch({
        type: ActionTypes.C_ECHO_SEND,
        text: text
    });
};

export default {echoSend};