"use strict";

import React from "react";
import ReactDOM from "react-dom";

import PlanAddPanel from "./PlanAddPanel.react";

import Table from "../core/Table.react";
import TableStore from "../../stores/TableStore";
import TableGetItemByIdStartActionCreator from "../../actions/TableGetItemByIdStartActionCreator";
import TableRowEditActionCreator from "../../actions/TableRowEditActionCreator";

import {addInMedOrgPlan, removeInMedOrgPlan, updateInMedOrgPlan} from "../../utils/isolated/MiscMedOrgPlanUtils";


class InFederalPlanInput extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            year:(new Date()).getFullYear()
        };
    }

    render() {
        let buttonsConfig =[
			{
			    id:0,
			    hint:"Удалить",
			    iconName:"clear",
			    className:"md-normal",
			    onClick:function(id) {
			        RemovePlan(id);
			    }
			}
        ];
        let editButtonsConfig =[
			{
			    id:0,
			    hint:"Сохранить",
			    iconName:"done",
			    className:"md-normal",
			    onClick:function(id) {
			        UpdatePlan(id);
			    }
			}
        ];
        return <div id={this.props.id} className="modal" style={this.props.style}>
					<div className="modal-content" style={{width:"100%", height:"90%"}}>
                        <div className="row">
                            <div className="input-field col s2">
							    <input id={this.props.id+"##text"} type="number" className="validate" min="2016" max="2100" value={this.state.year} onChange={(event) => { this.setState({year:event.currentTarget.value}); }}></input>
							    <label className="active" htmlFor={this.props.id+"##text"}>Отчётный год</label>
						    </div>
                        </div>
                        <hr/>
                        <PlanAddPanel id="PlanAddPanel" year={this.state.year} onOkClick={AddPlan}></PlanAddPanel>
						<Table 
        data-table-id="inPlanInput" 
	    data-table-controller="misc/InMedOrgPlanView" 
	    itemsPerPage="50"
	    conditionObj={this.state.year}
        buttonsConfig={buttonsConfig}
        editButtonsConfig={editButtonsConfig}
        editModeEnabled={true}
	    canParallize={true}
	    hasPaginatorOnTop={true}>
            </Table>
					</div>
					<div className="modal-footer" style={{width:"100%", height:"10%"}}>
						<a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat" onClick={() => {ReactDOM.unmountComponentAtNode(document.getElementById(this.props.mountPoint));}}>Закрыть</a>
					</div>
				</div>;
}
};

const AddPlan=function(props, state) {
    addInMedOrgPlan(state.idMedOrg,
            props.year,
            state.uslOk,
            state.volumeAll,
            state.volumeFed,
            state.moneyAll,
            state.moneyFed)
        .then(data => {
            if (data.error != null) {
                Materialize.toast(data.error);
            } else {
                TableGetItemByIdStartActionCreator.getItemByIdStart("inPlanInput", "misc/InMedOrgPlanView", data.id);
            }
        }, err => {
            Materialize.toast(err);
        });
}

const UpdatePlan=function(id) {
    var data = TableStore.getEditedRowValues("inPlanInput", id);
    if (data == null) {
        Materialize.toast(`Данные не обнаружены, id '${id}'`);
        return;
    }
    updateInMedOrgPlan(id, data.volumeAll, data.volumeFed, data.moneyAll, data.moneyFed)
        .then(data => {
            if (data!=null&&data.error != null) {
                Materialize.toast(data.error);
            } else {
                TableRowEditActionCreator.edit("inPlanInput", id, false);
                TableGetItemByIdStartActionCreator.getItemByIdStart("inPlanInput", "misc/InMedOrgPlanView", id);
            }
            },
            err => {
                Materialize.toast(err);
            });
}

const RemovePlan= function(id) {
    removeInMedOrgPlan(id)
        .then(data => {
            if (data!=null&&data.error != null) {
            Materialize.toast(data.error);
        } else {
            TableGetItemByIdStartActionCreator.getItemByIdStart("inPlanInput", "misc/InMedOrgPlanView", id);
        }},
            err => {Materialize.toast(err);});
}

export default InFederalPlanInput;