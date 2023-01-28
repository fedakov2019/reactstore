"use strict";

import Dispatcher from "../dispatcher/Dispatcher";
import { ActionTypes } from "../constants/Constants";

const addItem = (id, data) => {
    Dispatcher.dispatch({
        type: ActionTypes.I_COLLECTION_ADD_ITEM,
        id,
        data
    });
}

export default { addItem };