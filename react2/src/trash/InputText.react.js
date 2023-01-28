"use strict";

import React from "react";

import ErrorMessage from "./ErrorMessage.react";

import EchoSendActionCreator from "../../actions/EchoSendActionCreator";

class InputText extends React.Component{
    constructor (props) {
        super(props);
    	this.state={
    		value:"", 
    		hasErrors:false
    		};
    }

    handleChange(event){
    	if (this.props["data-errtemplate"]!=undefined)
    	{
    		let regex=new RegExp(this.props["data-errtemplate"], this.props["data-errflags"]);
    		this.setState({
    			value:event.target.value,
    			hasErrors:!regex.test(event.target.value)
    		});
    	}
    	else
    	{
    		this.setState({value:event.target.value});
    	}
    }

    onKeyDown(event)
    {
        if (event.keyCode==13)
        {
            event.preventDefault();
            let txt=this.state.value;
            console.log("onKeyDown start txt: "+txt);
            EchoSendActionCreator.echoSend(txt);
            console.log("onKeyDown fin");
        }
    }

    render()
    {
    	let value=this.state.value;
    	let res;
    	let err=null;
    	if (this.state.hasErrors)
    	{
    		err=<ErrorMessage>{this.props["data-errmsg"]}</ErrorMessage>;
    	}
    	let lbl=null;
    	if (this.props["data-label"]!=undefined)
    	{
    		lbl=<div>{this.props["data-label"]}</div>;
    	}
    	res=<div>{lbl}<input type="text" value={value} onChange={this.handleChange.bind(this)} onKeyDown={this.onKeyDown.bind(this)} placeholder={this.props["data-placeholder"]}/>{err}</div>;
    	return res;
    }
};

export default InputText;