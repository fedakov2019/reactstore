"use strict";

import keyMirror from "keymirror";

export const ActionTypes = keyMirror({

    /***********************************************/
    /*interface actions (no server exchange) - I   */
    /***********************************************/

    //AppStateStore
    I_APPSTATE_SETUP: null,
    I_APPSTATE_GO_LEFT: null,
    I_APPSTATE_GO_RIGHT: null,
    I_APPSTATE_ADD: null,
    I_APPSTATE_SAVE_LOCAL: null,
    I_APPSTATE_SET_STATE: null,

    //StatusBarStore
    //indicator of long-running processes
    I_STATUSBAR_INCR_LONGRUNNER: null,
    I_STATUSBAR_DECR_LONGRUNNER: null,

    /***********************************************/
    /*common actions - C_                          */
    /***********************************************/
    C_ECHO_SEND: null,
    C_ECHO_GET: null,

    //Get user-dependent main menu items
    C_MAINMENU_GET: null,

    C_INFORMER_SET: null,


    //Get User information
    C_USERINFO_GET: null,

    //Get and Set User settings
    C_USER_SETTINGS_COLOR_GET: null,
    C_USER_SETTINGS_COLOR_SET: null,
    C_USER_SETTINGS_TABLE_GET: null,
    C_USER_SETTINGS_TABLE_SET: null,

    //Table events
    C_TABLE_CREATE: null,
    C_TABLE_DESTROY: null,

    C_TABLE_GET_DATA: null,
    C_TABLE_GET_ITEM_BY_ID: null,
    C_TABLE_COLUMN_RESIZE: null,
    C_TABLE_COLUMN_MOVE: null,
    C_TABLE_SORT: null,
    C_TABLE_PAGE_SWITCH: null,
    C_TABLE_PAGE_RESIZE: null,
    C_TABLE_FILTER: null,
    C_TABLE_SELECT_ROW: null,
    C_TABLE_UNSELECT_ALL: null,
    C_TABLE_SETTINGS_ID_SYNC: null,
    C_TABLE_COLUMN_VISIBLE: null,
    C_TABLE_RIGHT_CLICK_ROW: null,
    C_TABLE_EDIT_ROW_INLINE: null,

    //DropDownList events
    C_DROPDOWNLIST_GET_DATA: null,
    C_DROPDOWNLIST_SELECT_ITEM: null,
    C_DROPDOWNLIST_DESTROY: null,

    //DatePicker events
    C_DATE_PICKER_CHANGE: null,
    C_DATE_PICKER_DESTROY: null,

    //Tabulator events
    C_TABULATOR_PAGE_SWITCH: null,
    C_TABULATOR_PAGE_SET_CAPTION_POSTFIX: null,
    C_TABULATOR_DESTROY: null,

    //UniEditor events
    C_UNI_EDITOR_CHANGE: null,
    C_UNI_EDITOR_DESTROY: null,

    //Collection events
    I_COLLECTION_ADD_ITEM: null,
    I_COLLECTION_REMOVE_ITEM: null,

    /***********************************************/
    /*MO stream - MO_                              */
    /***********************************************/

    /***********************************************/
    /*output stream from us to other regions - OUT_*/
    /***********************************************/

    /***********************************************/
    /*input stream from other regions - IN_        */
    /***********************************************/
    IN_INPUT_STREAM_FILTER: null,
    IN_REJECT_SELECTOR_SET_IDS: null,

    /***********************************************/
    /*ERZ actions - ERZ_                           */
    /***********************************************/
    ERZ_ERZ_REPLIES_SHOW: null,
    /***********************************************/
    /*RRZ actions - RRZ_                           */
    /***********************************************/
    RRZ_SET_SEARCH_PARAMS: null,

    /***********************************************/
    /*Exptertises                                  */
    /***********************************************/
    C_EXPERTISE_UPDATE: null,
});

export const ContentMountPoint = "content";