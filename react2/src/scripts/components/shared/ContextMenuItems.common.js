"use strict";

import ReactDOM from "react-dom";

import TableSettingsSaveActionCreator from "../../actions/TableSettingsSaveActionCreator";
import Movable from "../core/Movable.react";
import TableColumnEditor from "../core/TableColumnEditor.react";
		

export default {
	saveTableSettings:function(event, props)
	{
		TableSettingsSaveActionCreator.saveSettings(props.ownerId);
	},
	showColumnEditor:function(event, props)
	{
		ReactDOM.render(	<Movable startX={event.clientX} startY={event.clientY}>
							<TableColumnEditor data-table-id={props.ownerId}></TableColumnEditor>
						</Movable>, document.getElementById(props.mountPoint));
	}
};