"use strict";

import { EventEmitter } from "events";

import Dispatcher from "../dispatcher/Dispatcher";

import { ActionTypes } from "../constants/Constants";

const CHANGE_EVENT = "change_";

let Data = new Map();

let ExpertiseStore = Object.assign({}, EventEmitter.prototype, {
    emitChange: function (itemId) {
        this.emit(CHANGE_EVENT + itemId);
    },
    addChangeListener: function (itemId, callback) {
        this.on(CHANGE_EVENT + itemId, callback);
    },
    removeChangeListener: function (itemId, callback) {
        this.removeListener(CHANGE_EVENT + itemId, callback);
    },
    getData: function (itemId) {
        let data = Data.get(itemId);
        if (data == undefined || data == null) {
            return null;
        }
        data = Object.assign({}, data);
        return data;
    }
});

function UpdateData(itemId, newElem) {
    let data = Object.assign({}, newElem);
    Data.set(itemId, data);
}


ExpertiseStore.dispatchToken = Dispatcher.register(action => {
    switch (action.type) {
        case ActionTypes.I_EXPERTISE_UPDATE:
            UpdateData(action.id, action.data);
            ExpertiseStore.emitChange(action.id);
        break;
    default:
        break;
    }
});

export default ExpertiseStore;