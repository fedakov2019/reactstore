"use strict";

import Tabulator from "../core/Tabulator.react";

import OutputStreamRegistries from "./OutputStreamRegistries.react";
import OutputStreamCommandSurface from "./OutputStreamCommandSurface.react";
import OutputStreamFiles from "./OutputStreamFiles.react";
import OutputStreamLettersView from "./OutputStreamLettersView.react";

const OutputStream = (props) => {
    let tabulatorConfig = {
        'data-id': "tabs",
        hideEmpty: false,
        headersStyle: {
            width: "98%"
        },
        config: [
            {
                id: "regView",
                order: 1,
                isActive: true,
                caption: "Реестры",
                elem: <OutputStreamRegistries initials={props.initials}/>
            },
            {
                id: "lettersView",
                order: 2,
                caption: "Удержание",
                elem: <OutputStreamLettersView/>
            },
            {
                id: "cmd",
                order: 3,
                caption: "Панель команд",
                elem: <OutputStreamCommandSurface/>
            },
            {
                id: "fileView",
                order: 4,
                caption: "Файлы",
                elem: <OutputStreamFiles />
            }
        ]
    };
    return <Tabulator {...tabulatorConfig}/>;
};

export default OutputStream;