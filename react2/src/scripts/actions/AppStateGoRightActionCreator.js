"use strict";

import Dispatcher from "../dispatcher/Dispatcher";
import  {ActionTypes} from "../constants/Constants";

const goRight=()=>
{
    Dispatcher.dispatch({
        type:ActionTypes.I_APPSTATE_GO_RIGHT
    });
}

export default {goRight};