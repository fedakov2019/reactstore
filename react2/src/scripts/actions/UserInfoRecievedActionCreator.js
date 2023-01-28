"use strict";

import Dispatcher from "../dispatcher/Dispatcher";
import  {ActionTypes} from "../constants/Constants";


const userInfoRecieved = (data) => {
    Dispatcher.dispatch({
        type: ActionTypes.C_USERINFO_GET,
        data: data
    });
};

export default {userInfoRecieved};