"use strict";

import React from "react";
import ReactDOM from "react-dom";

import TableStore from "../../stores/TableStore";

import TableFilterArea from "./TableFilterArea.react";

import {CalculateParentElementOffset} from "../../common/DOMFeatures";

class TableFilterButton extends React.Component{
	render()
	{
		return <div onMouseDown={this._onMouseDown.bind(this)}><i className="mdi-content-filter-list"></i></div>;
	}
	_onMouseDown(event)
	{
		event.stopPropagation();
		let dataType=TableStore.getHeaderType(this.props["data-table-id"], this.props["data-field-name"]);
		let elem=event.currentTarget;
		/*let offsetLeft=0;
		let offsetTop=0;
		while (elem!=null)
		{
			offsetTop+=elem.offsetTop;
			offsetLeft+=elem.offsetLeft;
			elem=elem.offsetParent;
		}*/
		let offset=CalculateParentElementOffset(event);
	    ReactDOM.unmountComponentAtNode(document.getElementById(this.props["data-table-id"] + "Svc"));
		ReactDOM.render(
			<TableFilterArea data-type={dataType}  data-table-id={this.props["data-table-id"]} data-field-name={this.props["data-field-name"]} data-field-caption={this.props["data-field-caption"]}
				startX={(event.clientX-300>20?event.clientX-300:20)} startY={event.clientY+event.currentTarget.offsetHeight+5} width={300} filterType={this.props.filterType}>
			</TableFilterArea>, 
			document.getElementById(this.props["data-table-id"]+"Svc"));
	}
};

export default TableFilterButton;