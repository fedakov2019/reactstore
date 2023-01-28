"use strict";

import UserInfoWebApiUtils from "../utils/UserInfoWebApiUtils";

const userInfoGet = () => {
    UserInfoWebApiUtils.sendRequest();
};

export default {userInfoGet};