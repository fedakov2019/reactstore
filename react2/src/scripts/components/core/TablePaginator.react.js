"use strict";

import React from "react";

import TableStore from "../../stores/TableStore";
import TablePageResizeActionCreator from "../../actions/TablePageResizeActionCreator";
import TablePageSwitchActionCreator from "../../actions/TablePageSwitchActionCreator";

class TablePaginator extends React.Component{
	render()
	{
		let pageCount=TableStore.getPageCount(this.props["data-table-id"]);
		let currentPageNum=TableStore.getCurrentPageNum(this.props["data-table-id"]);
		let itemsCount=TableStore.getRowCount(this.props["data-table-id"]);
		let items=[];

		let infoZone = null;
		if (this.props.infoZone != null) {
		    if (typeof this.props.infoZone == "function") {
		        infoZone = this.props.infoZone(this.props["data-table-id"]);
		    } else {
		        infoZone=this.props.infoZone;
		    }
		}

	    let paginator = null;

	    if (pageCount <= 1 && this.props.hidePaginatorIfSinglePage == true) {
	    } 
	    else {
	        if (pageCount > 10) {
	            if (currentPageNum > 0) {
	                items.push(<li className="waves-effect" data-id="first" key="first" onClick={this._itemClick
	                    .bind(this)}><i className="mdi-av-skip-previous"></i></li>);
	                items.push(<li className="waves-effect" data-id="previous" key="previous" onClick={this._itemClick
	                    .bind(this)}><i className="mdi-navigation-chevron-left"></i></li>);
	            }
	            if (currentPageNum > 1) {
	                items
	                    .push(<li style={{ 'fontSize': "110%" }} key="dotL"><i className="mdi-navigation-more-horiz" style=
	                    {{ 'fontSize': "110%" }}></i></li>);
	            }
	            for (let i = (currentPageNum - 1) >= 0 ? (currentPageNum - 1) : 0;
	                i <= ((currentPageNum + 1) < pageCount ? (currentPageNum + 1) : pageCount - 1);
	                i++) {
	                if (i != currentPageNum) {
	                    items
	                        .push(<li style={{ 'fontSize': "110%" }} className="waves-effect" data-id={i} key={i} onClick={
	                            this._itemClick.bind(this)}>{i + 1}</li>);
	                } else {
	                    items.push(<li style={{ 'fontSize': "110%" }} className="active" data-id={i} key={i} onClick={this
	                        ._itemClick.bind(this)}>{i + 1}</li>);
	                }
	            }
	            if (currentPageNum < pageCount - 2) {
	                items
	                    .push(<li style={{ 'fontSize': "110%" }} key="dotR"><i className="mdi-navigation-more-horiz" style=
	                    {{ 'fontSize': "110%" }}></i></li>);
	            }
	            if (currentPageNum < pageCount - 1) {
	                items.push(<li className="waves-effect" data-id="next" key="next" onClick={this._itemClick
	                    .bind(this)}><i className="mdi-navigation-chevron-right"></i></li>);
	                items.push(<li className="waves-effect" data-id="last" key="last" onClick={this._itemClick
	                    .bind(this)}><i className="mdi-av-skip-next"></i></li>);
	            }

	        } else {
	            for (let i = 0; i < pageCount; i++) {
	                if (i != currentPageNum) {
	                    items
	                        .push(<li className="waves-effect" style={{ 'fontSize': "110%" }} data-id={i} key={i} onClick={
	                            this._itemClick.bind(this)}>{i + 1}</li>);
	                } else {
	                    items.push(<li className="active" style={{ 'fontSize': "110%" }} data-id={i} key={i} onClick={this
	                        ._itemClick.bind(this)}>{i + 1}</li>);
	                }
	            }
	        }
	        let itemsPerPage = TableStore.getItemsPerPage(this.props["data-table-id"]);
	        let cpn = currentPageNum + 1;
	        if (pageCount > 0) {
	                            paginator = <div  style={{flex: "0 0 auto", display: "inline-flex", flexDirection: "row", alignItems: "baseline" }}>
                                <div style={{ flex: "0 0 auto" }}>
							        <ul className="pagination" style={{ margin: "5px" }}>
                                        {items}
                                    </ul>
                                </div>
                                <div style={{ flex: "0 0 50px" }}></div>
                                    <div style={{ flex: "0 0 auto", display: "flex", 'flexDirection': "row" }}>
							            <span style={{ verticalAlign: "bottom", margin: "0 4px 0 4px" }}>Стр.</span>
							            <input type="number" value={cpn} min="1" max={pageCount} onChange={this._pageSwitcherEdited
	                                        .bind(this)} style={{ width: "inherit" }}></input>
                                        <span style={{ verticalAlign: "bottom", margin: "0 4px 0 4px" }}>из {pageCount},</span>
                                        <input type="number" value={itemsPerPage} min="1" max="1000" step="10" onChange={this._pageResizerEdited
                                            .bind(this)} style={{ width: "inherit" }}></input>
                                        <span style={{ verticalAlign: "bottom", margin: "0 4px 0 4px" }}> эл/стр., всего {itemsCount}</span>
                                    </div>
                            </div>;
	            
	        } else {
	            return null;
	        }
        }
	    if (paginator == null && infoZone == null) {
	        return null;
	    } else {
	        return  <div style={{ display: "inline-flex", flexDirection: "row", alignItems: "baseline" }}>
                        {paginator}		
	                    {infoZone != null ? <div style={{ flex: "0 0 100px" }}></div> : null}
						<div style={{ flex: "1 1 auto" }}>{infoZone}</div>
					</div>;
	    }
	}

	_itemClick(event)
	{
		event.preventDefault();
		event.stopPropagation();
		TablePageSwitchActionCreator.pageSwitch(this.props["data-table-id"], event.currentTarget.dataset.id);
		if (this.props.onPageSwitch!=null)
		{
			this.props.onPageSwitch();
		}
	}

	_pageSwitcherEdited(event)
	{
		TablePageSwitchActionCreator.pageSwitch(this.props["data-table-id"], event.currentTarget.value-1);
	}

	_pageResizerEdited(event)
	{
		let val=Number(event.currentTarget.value);
		if (val<=0)
		{
			val=1;
		}
		TablePageResizeActionCreator.pageResize(this.props["data-table-id"], val);
	}
};

export default TablePaginator;