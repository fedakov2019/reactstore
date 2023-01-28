"use strict";

import TableWebApiUtils from "../utils/TableWebApiUtils";

const getDataStart = (tableId, controllerName, canParallize, conditionObj) => {
    if (canParallize == true) {
        if (conditionObj == null) {
            TableWebApiUtils.getData(tableId, controllerName);
        } else {
            TableWebApiUtils.getDataConditional(tableId, controllerName, conditionObj);
        }
    } else {
        if (conditionObj == null) {
            TableWebApiUtils.getDataUntilEmpty(tableId, controllerName);
        } else {
            TableWebApiUtils.getDataUntilEmptyConditional(tableId, controllerName, conditionObj);
        }
    }
};

export default {getDataStart};