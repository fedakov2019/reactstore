"use strict";

import React from "react";

import Table from "../core/Table.react";
import TableFilterActionCreator from "../../actions/TableFilterActionCreator";
import TableUnselectAllActionCreator from "../../actions/TableUnselectAllActionCreator";
import TableStore from "../../stores/TableStore";

import DatePicker from "../core/DatePicker.react";
import DatePickerStore from "../../stores/DatePickerStore";

import {translit} from "../../common/Translit";

class MedOrgSelector extends React.Component {
    constructor (props) {
        super(props);
    }

    render() {
        return <div id={this.props.id} className="modal" style={this.props.style}>
                    <div className="modal-content">
                        <div className="row" style={{margin:"10px"}}>
                            <div style={{display:"flex", justifyContent:"flex-start", alignItems:"center"}}>
                                <DatePicker id="start" defaultValue={this.props.dateBegin} caption="С" allowEmpty={false}></DatePicker>
                                <DatePicker id="end" defaultValue={this.props.dateEnd} caption="По" allowEmpty={false}></DatePicker>
                            </div>
                        </div>
                        <div className="row" style={{margin:"20px 0 10px 0"}}>
                            <div className="input-field col s12">
                                <input id="filter" type="text" onChange={(event)=>{this._onChangeFilter(event);}}></input>
                                <label htmlFor="filter">Фильтр МО</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12">
                                <Table  data-table-id="moMedOrgsShort" 
                                        data-table-controller="moStream/MedOrgsShortList" 
                                        canParallize={true} 
                                        style={{maxHeight:"60vh", width:"100%"}}
                                        itemsPerPage="10"
                                        lockData="true">
                                </Table>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <a href="#!" className=" modal-action modal-close waves-effect waves-green btn-flat">Отмена</a>
						<a href="#!" className=" modal-action modal-close waves-effect waves-green btn-flat" 
						onClick={() => {
						    let codes = TableStore.getSelectedRows("moMedOrgsShort");
						    codes = codes == null ? [] : codes;
						    this.props.onOk({
						    dateBegin:DatePickerStore.getRawValue("start"),
						    dateEnd:DatePickerStore.getRawValue("end"), 
						    codeMo:codes,
						    nameMo:codes.map(val => {return TableStore.getFieldValue("moMedOrgsShort", val, "Name")}).join(", ")
						});
						}}>
                            OK
                        </a>
                    </div>
                </div>;
    }

                            _onChangeFilter(event) {
                                TableUnselectAllActionCreator.unselectAll("moMedOrgsShort");
                                let filter1 = event.currentTarget.value;
                                let filter2 = translit(filter1);
                                TableFilterActionCreator.filter("moMedOrgsShort", "NameEx", { regExp: new RegExp(`${filter1}|${filter2}`, "i") });
                        }
}

export default MedOrgSelector;