"use strict";

import Dispatcher from "../dispatcher/Dispatcher";
import  {ActionTypes} from "../constants/Constants";

const mainMenuInfoRecieved = (data) => {
    Dispatcher.dispatch({
        type: ActionTypes.C_MAINMENU_GET,
        data: data
    });
};

export default {mainMenuInfoRecieved};