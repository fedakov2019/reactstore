"use strict";

import Dispatcher from "../dispatcher/Dispatcher";
import  {ActionTypes} from "../constants/Constants";

const goLeft=()=>
{
    Dispatcher.dispatch({
        type:ActionTypes.I_APPSTATE_GO_LEFT
    });
}

export default {goLeft};