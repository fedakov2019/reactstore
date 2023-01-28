"use strict";

import React from "react";
import ReactDOM from "react-dom";

import TableStore from "../../stores/TableStore";
import TableRowSelectActionCreator from "../../actions/TableRowSelectActionCreator";
import TableRowRightClickActionCreator from "../../actions/TableRowRightClickActionCreator";
import TableRowEditActionCreator from "../../actions/TableRowEditActionCreator";

import Tabulator from "./Tabulator.react";
import TableButton from "./TableButton.react";
import ContextMenu from "./ContextMenu.react";
import UniEditor from "./UniEditor.react";

import {deepCopy} from "../../common/ObjectExtensions";

import {CalculateParentElementOffset} from "../../common/DOMFeatures";

class TableRow extends React.Component{
    constructor (props) {
        super(props);
        this.state={
            selected:false,
            expanded:false,
            editMode:false
        };
    }

    componentDidMount()
    {
        if (this.props.hasChildren==true&&this.props.tabulatorConfig!=null)
        {
            $("#"+this.props["data-table-id"]+"_"+this.props["data-id"]+"_sub").hide();
        }		
    }

    componentWillUnmount()
    {
        if (this.props.selected)
        {
            setTimeout(()=>{TableRowSelectActionCreator.select(this.props["data-table-id"], this.props["data-id"], false)}, 0);
        }
        if (this.props.editMode) {
            setTimeout(() => { TableRowEditActionCreator.edit(this.props["data-table-id"], this.props["data-id"], false) }, 0);
        }
    }

    componentDidUpdate(prevProps, prevState)
    {
        if (this.props.hasChildren)
        {
            if (this.state.expanded)
            {
                ExpandRow("#"+this.props["data-table-id"]+"_"+this.props["data-id"]+"_sub", true);
            }
            else
            {
                ExpandRow("#"+this.props["data-table-id"]+"_"+this.props["data-id"]+"_sub", false);
            }
        }
    }

    render()
    {
        if (this.props.editModeEnabled === true && this.props.editMode === true) {
            let cells=[];
            let bw=0;
            if (this.props.editButtonsConfig!=null&&this.props.buttonsColumnWidth>0)
            {
                let buttons=null;
                let buttonsConfig=this.props.editButtonsConfig;
                buttons=buttonsConfig.filter(val=>{
                    if (val.isVisible==null)
                    {
                        return true;
                    }
                    if (typeof val.isVisible=="boolean")
                    {
                        return val.isVisible;
                    }
                    if (typeof val.isVisible=="function")
                    {
                        return val.isVisible(this.props["data-id"], val);
                    }
                    return true;
                }).map(value=>{
                    return <TableButton key={value.id} keyFieldValue={this.props["data-id"]} ownerId={this.props["data-table-id"]} controllerName={this.props.controllerName}  {...value}></TableButton>;
                });
                bw=this.props.buttonsColumnWidth; // one icon=30px default+padding 1px
                cells.push(
                    <div key="__btns__" className="table-row-cell" style={{display:"flex", width:bw, 'maxWidth':bw, 'minWidth':bw}}>
                        {buttons}
                    </div>
				);
            }
            if (this.props["data-row-data"]&&this.props["data-header-data"])
            {
                this.props["data-row-data"].forEach((value, index)=>{
                    let w=this.props["data-header-data"][index].width;
                    if (this.props["data-header-data"][index].isEditable === true) {
                        cells.push(<div key={index} className="table-row-cell" style={
                            { width: w, 'maxWidth': w, 'minWidth': w }}>
                                <UniEditor id={`${this.props["data-table-id"]}-${this.props["data-header-data"][index].fieldName}-${this.props["data-id"]}`} type={this.props["data-header-data"][index].type} style={{ width: "100%" }} defaultValue={value}></UniEditor>
                                </div>);
                    } else {
                        cells.push(<div key={index} className="table-row-cell" style={
                            { width: w, 'maxWidth': w, 'minWidth': w }}>{value}</div>);
                    }
                });
            };
            let fullWidth=bw;
            this.props["data-header-data"].forEach(value=>{
                fullWidth=fullWidth+value.width;
            });
            return 	<li className={this.props.selected?"selected":""} style={{maxWidth:fullWidth+"px"}}>
			            <div  onClick={this._onRowClick.bind(this)}  onContextMenu={this._onContextMenu.bind(this)} onDoubleClick={this._onDoubleClick.bind(this)} style={this.props.rowStyle}>
						    {cells}
					     </div>		
                    </li>;
        } else {
            let cells = [];
            let bw = 0;
            if (this.props.buttonsConfig != null&&this.props.buttonsColumnWidth>0) {
                let buttons = null;
                let buttonsConfig = this.props.buttonsConfig;
                buttons = buttonsConfig.filter(val => {
                    if (val.isVisible == null) {
                        return true;
                    }
                    if (typeof val.isVisible == "boolean") {
                        return val.isVisible;
                    }
                    if (typeof val.isVisible == "function") {
                        return val.isVisible(this.props["data-id"], val);
                    }
                    return true;
                })
                .map(value => {
                    return <TableButton key={value.id} keyFieldValue={this.props["data-id"]} ownerId={this.props["data-table-id"]} controllerName={this.props.controllerName} {...value}></TableButton>;
                });
                bw = this.props.buttonsColumnWidth; // one icon=30px default+padding 1px
                cells.push(
                    <div key="__btns__" className="table-row-cell" style={{ display: "flex", width: bw, 'maxWidth': bw, 'minWidth': bw }}>
                        {buttons}
                    </div>
	            );
            }
            if (this.props.commandCells != null && Array.isArray(this.props.commandCells)) {
                this.props.commandCells.forEach(val => {
                    switch (val.commandType) {
                        case "link":
                        default:
                            val._className = "has-action";
                    }
                });
            }
            if (this.props["data-row-data"] && this.props["data-header-data"]) {
                this.props["data-row-data"].forEach((value, index) => {
                    let w = this.props["data-header-data"][index].width;
                    let val = value;
                    if (this.props["data-header-data"][index].type == "boolean") {
                        if (val == true) {
                            val = <i className="mdi-action-done"></i>;
                        } else {
                            if (val === false) {
                                val = <i className="mdi-image-crop-free"></i>;
                            } else {
                                val = null;
                            }
                        }
                    }
                    let commandCell = null;
                    if (this.props.commandCells != null && Array.isArray(this.props.commandCells)) {
                        commandCell = this.props.commandCells
                            .find(value => { return value.fieldName == this.props["data-header-data"][index].fieldName });
                    }
                    if (commandCell != null) {
                        cells.push(<div key={index} className={"table-row-cell "} style={{ width: w, 'maxWidth': w, 'minWidth': w }}>
                            <span className={commandCell._className} onClick={() => {commandCell.onClick(this.props["data-id"]);}}>{val}</span></div>);
                    } else {
                        cells.push(<div key={index} className="table-row-cell" style={{ width: w, 'maxWidth': w, 'minWidth': w }}>{val}</div>);
                    }
                });
            };
            let fullWidth = bw;
            this.props["data-header-data"].forEach(value => {
                fullWidth = fullWidth + value.width;
            });
            let subRow = null;
            if (this.props.hasChildren == true && this.props.tabulatorConfig != null) {
                subRow = <div id={this.props["data-table-id"] + "_" + this.props["data-id"] + "_sub"}></div>
            }
            return  <li className={this.props.selected ? "selected" : ""} style={{ maxWidth: fullWidth + "px" }}>
				        <div onClick={this._onRowClick.bind(this)} onContextMenu={this._onContextMenu.bind(this)} onDoubleClick={this._onDoubleClick.bind(this)} style={this.props.rowStyle}>
						    {cells}
					    </div>			
                        {subRow}
                    </li>;
        }
    }

_onRowClick(event)
{
    if (event.altKey)
    {
        if (this.props.hasChildren==true&&this.props.tabulatorConfig!=null)
        {
            let id=this.props["data-table-id"]+"_"+this.props["data-id"]+"_sub";
            let elem=document.getElementById(id);
            if (this.state.expanded)
            {
                ExpandRow("#"+this.props["data-table-id"]+"_"+this.props["data-id"]+"_sub", false);
                ReactDOM.unmountComponentAtNode(elem);
            }
            else
            {
                let configs={};					
                configs=deepCopy(configs, this.props.tabulatorConfig.config);
                for (let config of configs)
                {
                    let mods=config.tabulatorConfigMods;
                    if (mods!=null&&Object.keys(mods).length>0)
                    {
                        //create conditionObj according to tabulatorConfigMods
                        let conditionObj=config.config.conditionObj;
                        if (conditionObj==null)
                        {
                            conditionObj={};
                            config.config.conditionObj=conditionObj;
                        }
                        for (let item of Object.keys(mods)) 
                        {
                            Object.defineProperty(conditionObj, item, {
                                __proto__:null,
                                value:TableStore.getFieldValue(this.props["data-table-id"], this.props["data-id"], mods[item]),
                                enumerable:true
                            });
                        }
                    }
                }
                ReactDOM.render(<Tabulator data-id={this.props.tabulatorConfig["data-id"]+"__"+this.props["data-id"]+"_"}
                hideEmpty={this.props.tabulatorConfig.hideEmpty}
                config={configs}
                style={{'fontSize':90+"%"}}
            headersStyle={this.props.tabulatorConfig.headersStyle}></Tabulator>, 
            elem);
        }
        this.setState({
            expanded:!this.state.expanded
        });			
    }			
    return;
}
if (event.ctrlKey)
{
    let selected=!this.props.selected;
    /*this.setState({
        selected:selected
    });*/
    TableRowSelectActionCreator.select(this.props["data-table-id"], this.props["data-id"], selected);
}
}

_onContextMenu(event)
{
    TableRowRightClickActionCreator.rightClick(this.props["data-table-id"], this.props["data-id"]);
	
    if (event.ctrlKey||this.props.contextMenuConfig==null)
    {
        return;
    }
    if (this.props.contextMenuConfig!=null)
    {
        ReactDOM.unmountComponentAtNode(document.getElementById(this.props.contextMenuConfig.mountPoint));
        let offset=CalculateParentElementOffset(event);
        let elem=React.createElement(ContextMenu, 
            {
                ownerId:this.props["data-table-id"],
                tableControllerName:this.props.controllerName,
                mountPoint:this.props.contextMenuConfig.mountPoint,
                startX:event.pageX-offset.X,
                startY:event.pageY-offset.Y,
                itemsConfig:this.props.contextMenuConfig.items
            });
        ReactDOM.render(elem, document.getElementById(this.props.contextMenuConfig.mountPoint));
    }
    event.preventDefault();
    event.stopPropagation();
}

_onDoubleClick(event)
{
    if (this.props.editModeEnabled === true) {
        TableRowEditActionCreator.edit(this.props["data-table-id"], this.props["data-id"], this.props.editMode===true?false:true);
    } 
    if (this.props.onDoubleClick != null) {
        this.props.onDoubleClick(this.props["data-id"], this.props["data-table-id"]);
    }
}
};

function ExpandRow(selector, expanded)
{
    let item=$(selector);
    if (expanded)
    {
        item.stop(true,false).slideDown({ duration: 350, easing: "easeOutQuart", queue: false, complete: function() {$(this).css("height", "")}});
    }
    else
    {
        item.stop(true,false).slideUp({ duration: 350, easing: "easeOutQuart", queue: false, complete: function() {$(this).css("height", "")}});
    }
}

export default TableRow;