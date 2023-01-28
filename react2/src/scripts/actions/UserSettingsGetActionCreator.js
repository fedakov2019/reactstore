"use strict";

import UserSettingsWebApiUtils from "../utils/UserSettingsWebApiUtils";

const userSettingsColorGet = () => {
    UserSettingsWebApiUtils.getColorFromServer();
};

const userSettingsTableGet = () => {
    UserSettingsWebApiUtils.getTableFromServer();
};

export default {userSettingsColorGet, userSettingsTableGet};