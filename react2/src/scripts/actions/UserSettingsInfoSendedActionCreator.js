"use strict";

import Dispatcher from "../dispatcher/Dispatcher";
import  {ActionTypes} from "../constants/Constants";

const userSettingsColorSended = () => {
    Dispatcher.dispatch({
        type: ActionTypes.C_USER_SETTINGS_COLOR_SET
    });
};
const userSettingsTableSended = () => {
    Dispatcher.dispatch({
        type: ActionTypes.C_USER_SETTINGS_TABLE_SET
    });
};

export default {userSettingsColorSended, userSettingsTableSended};