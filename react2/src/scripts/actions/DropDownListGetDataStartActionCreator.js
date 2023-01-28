"use strict";

import DropDownListWebApiUtils from "../utils/DropDownListWebApiUtils";

const getDataStart = (ddlistId, controllerName) => {
    DropDownListWebApiUtils.getData(ddlistId, controllerName);
};

export default {getDataStart};