"use strict";

import  TableWebApiUtils from "../utils/TableWebApiUtils";
import TableStore from "../stores/TableStore";

const saveSettings = (tableId) => {
    let columnSettings = TableStore.getSettings(tableId);
    if (columnSettings == null || columnSettings.length == 0) {
        return;
    }
    let id = TableStore.getSettingsId(tableId);
    TableWebApiUtils.saveSettings(tableId, columnSettings, id);
};

export default {saveSettings};