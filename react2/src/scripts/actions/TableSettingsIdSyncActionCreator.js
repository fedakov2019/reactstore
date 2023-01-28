"use strict";

import Dispatcher from "../dispatcher/Dispatcher";
import  {ActionTypes} from "../constants/Constants";

const sync = (tableId, settingsId) => {
    Dispatcher.dispatch({
        type: ActionTypes.C_TABLE_SETTINGS_ID_SYNC,
        tableId: tableId,
        settingsId: settingsId
    });
};

export default {sync};