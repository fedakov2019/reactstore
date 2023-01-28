"use strict";

import React from "react";

import IdentificationRrzParams from "./IdentificationRrzParams.react";
import IdentificationRrzStore from "../../stores/IdentificationRrzStore";

import Table from "../core/Table.react";

let IdentificationRrz=React.createClass({
	getInitialState:function()
	{
		return {
			firstName:null,
			middleName:null,
			lastName:null,
			birthday:null,
			polisSerie:null,
			polisNumber:null,
			emptyMiddleName:false,
			datesTreatment:null,
			conditionalObject:{}
		};
	},
	componentWillMount:function()
	{
		let tmp=Object.assign({}, this.state);
		if (this.props.firstName!=null)
		{
			tmp.firstName=this.props.firstName;
		}
		if (this.props.lastName!=null)
		{
			tmp.lastName=this.props.lastName;
		}
		if (this.props.middleName!=null)
		{
			tmp.middleName=this.props.middleName;
			tmp.emptyMiddleName=false;
		}
		else
		{
			tmp.middleName="";
			tmp.emptyMiddleName=true;
		}
		if (this.props.birthday!=null)
		{
			tmp.birthday=this.props.birthday;
		}
		if (this.props.polisSerie!=null)
		{
			tmp.polisSerie=this.props.polisSerie;
		}
		if (this.props.polisNumber!=null)
		{
			tmp.polisNumber=this.props.polisNumber;
		}
		if (this.props.datesTreatment==null||this.props.datesTreatment=="")
		{
			tmp.datesTreatment="нет данных";
		}
		else
		{
			tmp.datesTreatment=this.props.datesTreatment;
		}
		this.setState(tmp);
	},
	componentDidMount:function()
	{
		IdentificationRrzStore.addSearchParamsChangedListener(this._setNewParams);
		Materialize.updateTextFields();
	},
	componentWillUnmount:function()
	{
		IdentificationRrzStore.removeSearchParamsChangedListener(this._setNewParams);
	},
	render:function()
	{
		return 	<div>
					<IdentificationRrzParams id="rrzIdentParams" 
						firstName={this.state.firstName}
						middleName={this.state.middleName} 
						lastName={this.state.lastName} 
						birthday={this.state.birthday} 
						polisSerie={this.state.polisSerie} 
						polisNumber={this.state.polisNumber} 
						emptyMiddleName={this.state.emptyMiddleName}
						datesTreatment={this.state.datesTreatment}>
						</IdentificationRrzParams>
					<Table 
						data-table-id="rrzIdentification" 
						data-table-controller="rrz/Rrz"
						itemsPerPage="20"
						canParallize={false}
						conditionObj={this.state.conditionalObject}
						style={{'maxHeight':40+"vh", width:100+"%"}}
						onRowDoubleClick={this.props.onResultRowDoubleClick}>
					</Table>
				</div>;
	},
	_setNewParams:function(event)
	{
		this.setState({
			conditionalObject:IdentificationRrzStore.getParams()
		});
	}
});

export default IdentificationRrz;