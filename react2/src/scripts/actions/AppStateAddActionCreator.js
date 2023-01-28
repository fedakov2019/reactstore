"use strict";

import Dispatcher from "../dispatcher/Dispatcher";
import  {ActionTypes} from "../constants/Constants";

const add=(commandName, activeItemName, initials)=>{
    Dispatcher.dispatch({
        type:ActionTypes.I_APPSTATE_ADD,
        commandName:commandName,
        activeItemName:activeItemName,
        initials:initials
    });
}

export default {add};