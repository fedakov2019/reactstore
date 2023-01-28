"use strict";

import Dispatcher from "../dispatcher/Dispatcher";
import { ActionTypes } from "../constants/Constants";

const update = (id, data) => {
    Dispatcher.dispatch({
        type: ActionTypes.I_EXPERTISE_UPDATE,
        id,
        data
    });
}

export default { update };