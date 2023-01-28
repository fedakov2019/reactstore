"use strict";

import React from "react";

import Table from "../core/Table.react";

import MoCaseBtnApiUtils from "../../utils/isolated/MoCaseBtnApiUtils";

import TableGetItemByIdStartActionCreator from "../../actions/TableGetItemByIdStartActionCreator";
import TableGetItemByIdEndActionCreator from "../../actions/TableGetItemByIdEndActionCreator";

class MoRefuseRemover extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            searchText: "",
            lockData: true,
            filter: null
        }
    }

    render() {
        let buttonsConfig=[{
            id:0,
            hint:"Удалить отказ",
            iconName:"delete",
            className:"md-normal",
            onClick:RemoveRefuse,
            parentTableId:this.props.params.parentTableId,
            parentTableController:this.props.params.parentTableController,
            idRegistry:this.props.params.idRegistry
        }];
        return  <div id={this.props.id} className="modal" style={this.props.style}>
                    <div className="modal-content">
                    	<div className="row">
                    		<div className="input-field col s10">
                    			<input placeholder="ТЕКСТ КОММЕНТАРИЯ К ОТКАЗУ" type="text" id="searchText" value={this.state.searchText} 
	                                onChange={(event) => {this.setState({searchText:event.currentTarget.value,lockData:true});}}></input>
                    		</div>
                    		<div className="col s2">
                    			<a className="waves-effect waves-light btn" onClick={(event)=> {
                                    this.setState({
                    			    filter:{
                    			        comment:this.state.searchText,
                    			        id:this.props.params.idRegistry
                    			    },
                    			    lockData:false
                    			});
                            }}>Искать</a>
                    		</div>
                    	</div>
                    </div>
                    <div className="modal-content">
                    	<div>
							<Table  data-table-id="moSankQuickList" 
									data-table-controller="moStream/MoRegistrySankQuickList" 
									style={{'maxHeight':"60%", width:"100%"}} 
									itemsPerPage="20"
									canParallize={true}
									conditionObj={this.state.filter}
									buttonsConfig={buttonsConfig}
                                    lockData={this.state.lockData}
                                    skipAutoLoad={true}>
							</Table>
						</div>          	
                    </div>
                </div > ;
    }
};

function RemoveRefuse(idRefuse, props)
{
    MoCaseBtnApiUtils
        .removeRefuse(idRefuse)
        .then(data=>{
            if (data.error!=null)
            {
                Materialize.toast(data.error);
            }
            else
            {
                TableGetItemByIdEndActionCreator.getItemByIdEnd("moSankQuickList", idRefuse, null);
                TableGetItemByIdStartActionCreator.getItemByIdStart(props.parentTableId, props.parentTableController, props.idRegistry);
            }
        })
        .catch(err=>{
            Materialize.toast(err);
        });
}

export default MoRefuseRemover;