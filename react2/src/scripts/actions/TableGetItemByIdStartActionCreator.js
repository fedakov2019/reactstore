"use strict";

import TableWebApiUtils from "../utils/TableWebApiUtils";

const getItemByIdStart = (tableId, controllerName, itemId) => {
    TableWebApiUtils.getItemById(tableId, controllerName, itemId);
};

export default {getItemByIdStart};