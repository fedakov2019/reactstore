"use strict";

import MainMenuWebApiUtils from "../utils/MainMenuWebApiUtils";

const mainMenuGet = () => {
    MainMenuWebApiUtils.sendRequest();
};

export default {mainMenuGet};