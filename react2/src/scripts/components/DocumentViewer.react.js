"use strict";

import React from "react";
import ReactDOM from "react-dom";

import {REPORTING_PATH} from "../Globals";

class DocumentViewer extends React.Component
{
	render()
	{
		let paramString=this.props.reportPath;
		for (let param in this.props.params)
        {
            if (Array.isArray(this.props.params[param])) {
                for (let item of this.props.params[param]) {
                    paramString = paramString + "&" + param + "=" + item;
                }
            } else {
                paramString = paramString + "&" + param + "=" + this.props.params[param];
            }
        }
		return 	<div id={this.props.id} className="modal" style={this.props.style}>
					<div className="modal-content" style={{width:"100%", height:"90%"}}>
						<iframe src={REPORTING_PATH+paramString} style={{width:"100%", height:"100%"}}></iframe>
					</div>
					<div className="modal-footer" style={{width:"100%", height:"10%"}}>
						<a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat" onClick={() => {ReactDOM.unmountComponentAtNode(document.getElementById(this.props.mountPoint));}}>Закрыть</a>
					</div>
				</div>;
	}
}

export default DocumentViewer;