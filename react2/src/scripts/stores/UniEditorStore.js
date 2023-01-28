"use strict";

import {EventEmitter} from "events";

import Dispatcher from "../dispatcher/Dispatcher";

import {ActionTypes} from "../constants/Constants";

const UNI_EDITOR_CHANGE_EVENT = "uni_editor_change_";

let Data = new Map();

const UniEditorStore = Object.assign({}, EventEmitter.prototype,
{
    emitValueChange:function(edtrId)
    {
        this.emit(UNI_EDITOR_CHANGE_EVENT+edtrId);
    },
    addChangeListener:function(edtrId, callback)
    {
        this.on(UNI_EDITOR_CHANGE_EVENT+edtrId, callback);
    },
    removeChangeListener:function(edtrId, callback)
    {
        this.removeListener(UNI_EDITOR_CHANGE_EVENT+edtrId, callback);
    },

    getValue(edtrId) {
        let val = Data.get(edtrId);
        return val;
    }
});


function SetValue(edtrId, value) {
    Data.set(edtrId, value);

}

function RemoveValue(edtrId) {
    Data.delete(edtrId);
}

UniEditorStore.dispatchToken = Dispatcher.register(function(action) {
    switch (action.type) {
        case ActionTypes.C_UNI_EDITOR_CHANGE:
            SetValue(action.edtrId, action.value);
            UniEditorStore.emitValueChange(action.edtrId);
            break;
        case ActionTypes.C_UNI_EDITOR_DESTROY:
            RemoveValue(action.edtrId);
            break;
        default:
            break;
    }
});

export default UniEditorStore;