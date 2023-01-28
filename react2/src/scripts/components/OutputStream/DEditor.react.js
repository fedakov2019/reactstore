"use strict";

import React from "react";
import ReactDOM from "react-dom";

import DText from "./DEditorInputs/DText.react";
import DMultiLine from "./DEditorInputs/DMultiLine.react";

import DPerson from "./DEditorInputs/DPerson.react";
import DPersonPred from "./DEditorInputs/DPersonPred.react";
import DPersonDoc from "./DEditorInputs/DPersonDoc.react";
import DCaseL0Main from "./DEditorInputs/DCaseL0Main.react";
import DCaseL0Sub from "./DEditorInputs/DCaseL0Sub.react";
import DCaseL1Main from "./DEditorInputs/DCaseL1Main.react";
import DCaseL1Hmp from "./DEditorInputs/DCaseL1Hmp.react";
import DCaseL1Sub from "./DEditorInputs/DCaseL1Sub.react";

class DEditor extends React.Component {
    constructor(props) {
        super(props);

        this.editors = [
            {
                caption: "ФИО ДР пациента",
                fieldName: "DPerson",
                inGroup: "person"
            },
            {
                caption: "ФИО ДР представителя пациента",
                fieldName: "DPersonPred",
                inGroup: "person"
            },
            {
                caption: "Полис, СНИЛС, документы",
                fieldName: "DPersonDoc",
                inGroup: "person"
            },
            {
                caption: "Законченный случай (осн.)",
                fieldName: "DCaseL0Main",
                inGroup: "l0"
            },
            {
                caption: "Законченный случай (проч.)",
                fieldName: "DCaseL0Sub",
                inGroup: "l0"
            },
            {
                caption: "Вложенный случай (осн.)",
                fieldName: "DCaseL1Main",
                inGroup: "l1"
            },
            {
                caption: "Вложенный случай (ВМП)",
                fieldName: "DCaseL1Hmp",
                inGroup: "l1"
            },
            {
                caption: "Вложенный случай (проч.)",
                fieldName: "DCaseL1Sub",
                inGroup: "l1"
            },
            {
                caption: "Текст письма (не выгружается на территоррию)",
                fieldName: "letter",
                inGroup: "l1"
            },

        ];
        this.edits = new Map();
        this.state = {};
        this.state.activeEditor = this.editors[0];

        this.inputElem = null;

        this.addEdit = this.addEdit.bind(this);
    }

    componentDidMount() {
        $("#edtrBtn").dropdown({ inDuration: 300, outDuration: 225, constrain_width: false, hover: false, gutter: 0, belowOrigin: true });
    }

    componentWillUnmount() { }

    render() {
        let edtr = null;
        let defaultValue = null;
        switch (this.state.activeEditor.fieldName) {
            case "DPerson":
                defaultValue = {
                    fam: this.edits.has("fam") ? this.edits.get("fam").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["fam"],
                    im: this.edits.has("im") ? this.edits.get("im").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["im"],
                    ot: this.edits.has("ot") ? this.edits.get("ot").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["ot"],
                    dr: this.edits.has("dr") ? this.edits.get("dr").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["dr"],
                    w: this.edits.has("w") ? this.edits.get("w").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["w"],
                    novor: this.edits.has("novor") ? this.edits.get("novor").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["novor"],
                    vNovD: this.edits.has("vNovD") ? this.edits.get("vNovD").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["vNovD"],
                    comentP: this.edits.has("comentP") ? this.edits.get("comentP").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["comentP"]
                };
                edtr = <DPerson defaultValue={defaultValue} onEdit={this.addEdit} selector={this.state.activeEditor.fieldName}></DPerson>;
                break;
            case "DPersonPred":
                defaultValue = {
                    famP: this.edits.has("famP") ? this.edits.get("famP").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["famP"],
                    imP: this.edits.has("imP") ? this.edits.get("imP").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["imP"],
                    otP: this.edits.has("otP") ? this.edits.get("otP").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["otP"],
                    drP: this.edits.has("drP") ? this.edits.get("drP").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["drP"],
                    wP: this.edits.has("wP") ? this.edits.get("wP").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["wP"]
                };
                edtr = <DPersonPred defaultValue={defaultValue} onEdit={this.addEdit} selector={this.state.activeEditor.fieldName}></DPersonPred>;
                break;
            case "DPersonDoc":
                defaultValue = {
                    enp: this.edits.has("enp") ? this.edits.get("enp").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["enp"],
                    vPolis: this.edits.has("vPolis") ? this.edits.get("vPolis").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["vPolis"],
                    sPolis: this.edits.has("sPolis") ? this.edits.get("sPolis").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["sPolis"],
                    nPolis: this.edits.has("nPolis") ? this.edits.get("nPolis").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["nPolis"],
                    stOkato: this.edits.has("stOkato") ? this.edits.get("stOkato").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["stOkato"],
                    docType: this.edits.has("docType") ? this.edits.get("docType").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["docType"],
                    docSer: this.edits.has("docSer") ? this.edits.get("docSer").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["docSer"],
                    docNum: this.edits.has("docNum") ? this.edits.get("docNum").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["docNum"],
                    snils: this.edits.has("snils") ? this.edits.get("snils").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["snils"]
                };
                edtr = <DPersonDoc defaultValue={defaultValue} onEdit={this.addEdit} selector={this.state.activeEditor.fieldName}></DPersonDoc>;
                break;
            case "DCaseL0Main":
                defaultValue = {
                    vidPom: this.edits.has("vidPom") ? this.edits.get("vidPom").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["vidPom"],
                    forPom: this.edits.has("forPom") ? this.edits.get("forPom").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["forPom"],
                    nprMo: this.edits.has("enprMonp") ? this.edits.get("nprMo").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["nprMo"],
                    nprDate: this.edits.has("nprDate") ? this.edits.get("nprDate").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["nprDate"],
                    rslt: this.edits.has("rslt") ? this.edits.get("rslt").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["rslt"],
                    ishod: this.edits.has("ishod") ? this.edits.get("ishod").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["ishod"],
                    idsp: this.edits.has("enidspp") ? this.edits.get("idsp").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["idsp"]
                };
                edtr = <DCaseL0Main defaultValue={defaultValue} onEdit={this.addEdit} selector={this.state.activeEditor.fieldName}></DCaseL0Main>;
                break;
            case "DCaseL0Sub":
                defaultValue = {
                    pDisp2: this.edits.has("pDisp2") ? this.edits.get("pDisp2").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["pDisp2"],
                    dateZ1: this.edits.has("dateZ1") ? this.edits.get("dateZ1").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["dateZ1"],
                    dateZ2: this.edits.has("dateZ2") ? this.edits.get("dateZ2").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["dateZ2"],
                    kdZ: this.edits.has("kdZ") ? this.edits.get("kdZ").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["kdZ"],
                    vNovM: this.edits.has("vNovM") ? this.edits.get("vNovM").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["vNovM"],
                    osSluch: this.edits.has("osSluch") ? this.edits.get("osSluch").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["osSluch"],
                    vbP: this.edits.has("vbP") ? this.edits.get("vbP").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["vbP"],
                };
                edtr = <DCaseL0Sub defaultValue={defaultValue} onEdit={this.addEdit} selector={this.state.activeEditor.fieldName}></DCaseL0Sub>;
                break;
            case "DCaseL1Main":
                defaultValue = {
                    profil: this.edits.has("profil") ? this.edits.get("profil").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["profil"],
                    profilK: this.edits.has("profilK") ? this.edits.get("profilK").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["profilK"],
                    det: this.edits.has("det") ? this.edits.get("det").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["det"],
                    pCel: this.edits.has("pCel") ? this.edits.get("pCel").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["pCel"],
                    nHistory: this.edits.has("nHistory") ? this.edits.get("nHistory").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["nHistory"],
                    ds0: this.edits.has("ds0") ? this.edits.get("ds0").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["ds0"],
                    ds1: this.edits.has("ds1") ? this.edits.get("ds1").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["ds1"],
                    ds2: this.edits.has("ds2") ? this.edits.get("ds2").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["ds2"],
                    ds3: this.edits.has("ds3") ? this.edits.get("ds3").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["ds3"],
                    prvs: this.edits.has("prvs") ? this.edits.get("prvs").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["prvs"],
                    comentSl: this.edits.has("comentSl") ? this.edits.get("comentSl").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["comentSl"],
                };
                edtr = <DCaseL1Main defaultValue={defaultValue} onEdit={this.addEdit} selector={this.state.activeEditor.fieldName}></DCaseL1Main>;
                break;
            case "DCaseL1Hmp":
                defaultValue = {
                    vidHmp: this.edits.has("vidHmp") ? this.edits.get("vidHmp").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["vidHmp"],
                    methodHmp: this.edits.has("methodHmp") ? this.edits.get("methodHmp").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["methodHmp"],
                    talD: this.edits.has("talD") ? this.edits.get("talD").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["talD"],
                };
                edtr = <DCaseL1Hmp defaultValue={defaultValue} onEdit={this.addEdit} selector={this.state.activeEditor.fieldName}></DCaseL1Hmp>;
                break;
            case "DCaseL1Sub":
                defaultValue = {
                    disp: this.edits.has("disp") ? this.edits.get("disp").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["disp"],
                    date1: this.edits.has("date1") ? this.edits.get("date1").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["date1"],
                    date2: this.edits.has("date2") ? this.edits.get("date2").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["date2"],
                    kd: this.edits.has("kd") ? this.edits.get("kd").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["kd"],
                    cZab: this.edits.has("cZab") ? this.edits.get("cZab").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["cZab"],
                    dn: this.edits.has("dn") ? this.edits.get("dn").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["dn"],
                    reab: this.edits.has("reab") ? this.edits.get("reab").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["reab"],
                    edCol: this.edits.has("edCol") ? this.edits.get("edCol").newValues[0] : this.props.initialData[this.state.activeEditor.inGroup]["edCol"],
                };
                edtr = <DCaseL1Sub defaultValue={defaultValue} onEdit={this.addEdit} selector={this.state.activeEditor.fieldName}></DCaseL1Sub>;
                break;
            case "comentSl":
            case "letter":
                edtr = <DMultiLine
                    defaultValue={this.edits.has(this.state.activeEditor.fieldName)
                        ? this.edits.get(this.state.activeEditor.fieldName).newValues[0]
                        : this.props.initialData[this.state.activeEditor.inGroup][this.state.activeEditor.fieldName]}
                    onEdit={this.addEdit} selector={this.state.activeEditor.fieldName}
                ></DMultiLine>;
                break;
            default:
                break;
        }
        return <div id={this.props.id} className="modal" style={this.props.style}>
            <div className="modal-content">
                <div id="chooseEdtr">
                    <a id="edtrBtn" className="dropdown-button btn truncate" style={{ width: "95%" }} href="#" data-activates="edtrUl">
                        {this.state.activeEditor.caption}
                    </a>
                    <ul id="edtrUl" className="dropdown-content" style={{ width: "70%" }}>
                        {
                            this.editors.map(function (value) {
                                const val = value;
                                return <li key={value.fieldName} data-key={val.fieldName} onClick={(event) => {
                                    this.switchEdtr(event, val);
                                }}><a href="#">{value.caption}</a></li>;
                            }.bind(this))
                        }
                    </ul>
                </div>
                <div id="editorMountPoint">{edtr}</div>
            </div>
            <div className="modal-footer">
                <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Отмена</a>
                <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat" onClick={() => {
                    //this.addEdit();
                    //ReactDOM.unmountComponentAtNode(document.getElementById("editorMountPoint"));
                    //ReactDOM.render(<div />, document.getElementById("editorMountPoint"));
                    this.props.onClick([...this.edits.values()], this.props);
                }}>Сохранить</a>
            </div>
        </div>;
    }

    switchEdtr(event, value) {
        event.preventDefault();
        event.stopPropagation();
        //this.addEdit(this.props.idCase, value);
        this.setState({ activeEditor: this.editors.find(rec => { return rec.fieldName === value.fieldName; }) });
    }

    addEdit(props, state) {
        let activeEdtr = this.editors.find(rec => { return rec.fieldName === props.selector; });

        switch (props.selector) {
            case "DPerson":
            case "DPersonPred":
            case "DPersonDoc":
            case "DCaseL0Main":
            case "DCaseL0Sub":
            case "DCaseL1Main":
            case "DCaseL1Hmp":
            case "DCaseL1Sub":
                Object.keys(state.value).forEach(key => {
                    this.edits.set(key,
                        {
                            id: this.props.idCase,
                            fieldCaption: activeEdtr.caption,
                            fieldName: key,
                            newValues: [state.value[key]],
                            oldValues: this.props.initialData[activeEdtr.inGroup][key]
                        });
                });
                break;
            case "letter":
                this.edits.set(activeEdtr.fieldName,
                    {
                        id: this.props.idCase,
                        fieldCaption: activeEdtr.caption,
                        fieldName: activeEdtr.fieldName,
                        newValues: [state.value],
                        oldValues: this.props.initialData[activeEdtr.inGroup][activeEdtr.fieldName]
                    });
                break;
            default:
                break;
        }
    }
}

export default DEditor;