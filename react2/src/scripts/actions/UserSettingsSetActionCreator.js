"use strict";

import UserSettingsWebApiUtils from "../utils/UserSettingsWebApiUtils";
import UserSettingsStore from "../stores/UserSettingsStore";
    
const userSettingsColorSet = () => {
    let data = UserSettingsStore.getChangedColorSettings()
    data.map(function(value) {
        UserSettingsWebApiUtils.sendColorToServer(value);
    });
};
const userSettingsTableSet = (data) => {
    data.map(function(value) {
        UserSettingsWebApiUtils.sendTableToServer(value);
    });
};

export default {userSettingsColorSet, userSettingsTableSet};