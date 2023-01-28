"use strict";

import Dispatcher from "../dispatcher/Dispatcher";
import  {ActionTypes} from "../constants/Constants";

const userSettingsColorRecieved = (data) => {
    Dispatcher.dispatch({
        type: ActionTypes.C_USER_SETTINGS_COLOR_GET,
        data: data
    });
};
const userSettingsTableReceived = (data) => {
    Dispatcher.dispatch({
        type: ActionTypes.C_USER_SETTINGS_TABLE_GET,
        data: data
    });
};

export default {userSettingsColorRecieved, userSettingsTableReceived};