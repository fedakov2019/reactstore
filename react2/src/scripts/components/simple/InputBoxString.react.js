"use strict";

import React from "react";

class InputBoxString extends React.Component{
    constructor (props) {
        super(props);
		this.state= {
			text:this.props.text
		};
    }
    componentWillMount() {
        if (this.props != null && this.props.text != null && this.props.text > "") {
            this.setState(
            {
                classInit:"active"
            });
        }
    }
    render()
	{
		return 	<div id={this.props.id} className="modal" style={this.props.style}>
					<div className="modal-content">
						<div className="input-field">
							<input id={this.props.id+"##text"} type="text" className="validate" onChange={this._onTextChange.bind(this)} defaultValue={this.props.text} value={this.state.text}></input>
							<label htmlFor={this.props.id+"##text"} className={this.state.classInit}>{this.props.textCaption}</label>
						</div>
					</div>
					<div className="modal-footer">
						<a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat">Отмена</a>
						<a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat" onClick={this._onOkClick.bind(this)}>OK</a>
					</div>
				</div>
	}

	_onOkClick(event)
	{
		this.props.onOkClick(this.state.text, this.props);
	}

	_onTextChange(event)
	{
		this.setState({
			text:event.currentTarget.value
		});
	}
};

export default InputBoxString;