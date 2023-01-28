"use strict";

import TableStore from "../../stores/TableStore";

import TableFilterActionCreator from "../../actions/TableFilterActionCreator";

const TableFilterViewer = (props) => 
	{
		let txt=TableStore.getFiltersFormatted(props["data-table-id"]);
		if (txt)
		{
			return 	<div>
						<i className="mdi-action-highlight-remove mouseover-text-highlite" onClick={() => {TableFilterActionCreator.removeAllFilters(props["data-table-id"]);}}></i>
						{txt}
					</div>;
		}
		else
		{
			return <div></div>;
		}
	};

export default TableFilterViewer;