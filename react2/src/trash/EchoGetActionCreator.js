"use strict";


import Dispatcher from "../dispatcher/Dispatcher";
import  {ActionTypes} from "../constants/Constants";

const echoGet = (maxValue) => {
    Dispatcher.dispatch({
        type: ActionTypes.C_ECHO_GET,
        maxValue: maxValue
    });
};

export default {echoGet};