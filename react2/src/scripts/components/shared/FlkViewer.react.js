"use strict";

import React from "react";

import Table from "../core/Table.react";

class FlkViewer extends React.Component{
	componentDidMount()
	{
		$("#"+this.props.id).openModal();
	}
	render()
	{
		return <div id={this.props.id} className="modal">
			   		<div className="modal-content">
			   			<Table {...this.props.tableConfig} conditionObj={{id:this.props.flkLogId}} style={{'maxHeight':"70vh", width:"100%"}} ></Table>
			   		</div>
					<div className="modal-footer">			      
						<a href="#!" className=" modal-action modal-close waves-effect waves-green btn-flat">ОK</a>
					</div>
				</div>
	}
};

export default FlkViewer;