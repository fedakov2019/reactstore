"use strict";

import { EventEmitter } from "events";

import Dispatcher from "../dispatcher/Dispatcher";

import { ActionTypes } from "../constants/Constants";

const CHANGE_EVENT = "change_";

let Data = new Map();

let CollectionStore = Object.assign({}, EventEmitter.prototype, {
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

function AddItem(itemId, newElem) {
    let data = Data.get(itemId);
    if (data == null || data == undefined) {
        data = {};
    }
    data = Object.assign(data, newElem);
    Data.set(itemId, data);
}

function RemoveItem(itemId, removeId) {
    let data = Data.get(itemId);
    if (data == null || data == undefined) {
        return;
    }
    delete data[removeId];
    Data.set(itemId, data);
}


CollectionStore.dispatchToken = Dispatcher.register(action => {
    switch (action.type) {
        case ActionTypes.I_COLLECTION_ADD_ITEM:
            AddItem(action.id, action.data);
            CollectionStore.emitChange(action.id);
        break;
        case ActionTypes.I_COLLECTION_REMOVE_ITEM:
            RemoveItem(action.id, action.data);
            CollectionStore.emitChange(action.id);
        break;
    default:
        break;
    }
});

export default CollectionStore;