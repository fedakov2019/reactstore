"use strict";

import ReactDOM from "react-dom";

import CommandButton from "./CommandButton.react";
import InputBoxDate from "../simple/InputBoxDate.react";
import DocumentViewer from "../DocumentViewer.react";

import OutRegistryApiUtils from "../../utils/isolated/OutRegistryApiUtils";

const OutputStreamCommandSurface = (props) => {
    return <div className="column">
        <div className="row">
            <CommandButton key="generateR" onClick={GenerateR}>Сформировать<br />реестры на территорию</CommandButton>
            <CommandButton key="generateR123" onClick={() => { alert(1); }}>123 13 213 123 123 123 123 123 123</CommandButton>
            <CommandButton key="qwe" onClick={() => { alert(1); }}>123 13 213 123 123 123 123 123 123</CommandButton>
            <CommandButton key="dfg" onClick={() => { alert(1); }}>123 13 213 123 123 123 123 123 123</CommandButton>
            <CommandButton key="sdf" onClick={() => { alert(1); }}>123 13 213 123 123 123 123 123 123</CommandButton>
            <CommandButton key="xcv" onClick={() => { alert(1); }}>123 13 213 123 123 123 123 123 123</CommandButton>
            <CommandButton key="d1fg" onClick={() => { alert(1); }}>123 13 213 123 123 123 123 123 123</CommandButton>
            <CommandButton key="df2g" onClick={() => { alert(1); }}>123 13 213 123 123 123 123 123 123</CommandButton>
            <CommandButton key="df3g" onClick={() => { alert(1); }}>123 13 213 123 123 123 123 123 123</CommandButton>
            <CommandButton key="df4g1" onClick={() => { alert(1); }}>123 13 213 123 123 123 123 123 123</CommandButton>
            <CommandButton key="dfg1" onClick={() => { alert(1); }}>123 13 213 123 123 123 123 123 123</CommandButton>
            <CommandButton key="sdf1" onClick={() => { alert(1); }}>123 13 213 123 123 123 123 123 123</CommandButton>
            <CommandButton key="xcv1" onClick={() => { alert(1); }}>123 13 213 123 123 123 123 123 123</CommandButton>
            <CommandButton key="d1fg1" onClick={() => { alert(1); }}>123 13 213 123 123 123 123 123 123</CommandButton>
            <CommandButton key="df2g1" onClick={() => { alert(1); }}>123 13 213 123 123 123 123 123 123</CommandButton>
            <CommandButton key="df3g1" onClick={() => { alert(1); }}>123 13 213 123 123 123 123 123 123</CommandButton>
            <CommandButton key="df4g11" onClick={() => { alert(1); }}>123 13 213 123 123 123 123 123 123</CommandButton>
        </div>
        <div className="row" id="mountPoint"></div>
    </div>;
};

const GenerateR = () => {
    let mountPoint = document.getElementById("mountPoint");
    ReactDOM.unmountComponentAtNode(mountPoint);
    ReactDOM.render(<InputBoxDate id="dateRPicker" dateCaption="Дата исходящих реестров" defaultDate={new Date()} onOkClick={GenerateROk} style={{ maxWidth: "30vw", overflowY:"visible"}}></InputBoxDate>, mountPoint);
    $("#dateRPicker").openModal();
};

const GenerateROk = (date) => {
    if (date == null) {
        Materialize.toast("Не указана дата формируемых реестров");
    }
    OutRegistryApiUtils.generateR(date).then(
        data => {
            if (data == null) {
                Materialize.toast("Нет данных для формирования реестров");
                return;
            }
            if (!Array.isArray(data)) {
                Materialize.toast(JSON.stringify(data));
            }
            let errors = data.filter(elem => { return elem!=null&&elem.error > ""; });
            if (errors.length > 0) {
                Materialize.toast(errors.map(err => err.error).join(", "));
            }
            let idsRaw = data.filter(elem => { return elem != null && (elem.error == null || elem.error == "") }).map(elem => elem.ids);
            let ids = Array.prototype.concat(...idsRaw);
            if (ids.length > 0) {
                let mountPoint = document.getElementById("mountPoint");
                ReactDOM.unmountComponentAtNode(mountPoint);
                ReactDOM.render(
                    <DocumentViewer id="documentMounted" style={{ width: "75vw", maxHeight: "96vh", height: "96vh", top: "2vh" }}
                        reportPath="%2fOutStream%2fStat%2fAnalysisByRegion&rs:Command=Render"
                        params={{ DateBegin: date, DateEnd: date}}
                        mountPoint="mountPoint"></DocumentViewer>,
                    mountPoint);
                $("#documentMounted").openModal();
            }

        },
        err => {
            Materialize.toast(`Ошибка при формировании реестров (${err})`);
        });
};

export default OutputStreamCommandSurface;