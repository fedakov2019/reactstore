"use strict";

import Dispatcher from "../dispatcher/Dispatcher";
import { ActionTypes } from "../constants/Constants";

const removeItem = (id, key) => {
    Dispatcher.dispatch({
        type: ActionTypes.I_COLLECTION_REMOVE_ITEM,
        id,
        data:key
    });
}

export default { removeItem };