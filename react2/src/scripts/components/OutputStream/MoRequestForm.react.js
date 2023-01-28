"use strict";

import React from "react";

import DatePicker from "../core/DatePicker.react";
import DatePickerStore from "../../stores/DatePickerStore";

import ButtonOk from "../simple/ButtonOk.react";

class MoRequestForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "" 
        };
    }

    render() {
        return  <div id={this.props.id} className="modal" style={this.props.style}>
                    <div className="modal-content" style={{ width: "100%", height: "90%" }}>
                        <div className="row">
                            <div className="input-field col s12">
                                <textarea id={this.props.id + "##text"} type="text" className="validate materialize-textarea" value={this.state.text} onChange={(event) => { this.setState({ text: event.currentTarget.value }); }}></textarea>
                                <label htmlFor={this.props.id + "##text"}>Текст запроса</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s3">
                                <DatePicker id={this.props.id + "##date"} defaultValue={new Date()}></DatePicker>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s3">
                                <ButtonOk onClick={() => {
                                    if (this.props.onOkClick != null) {
                                        this.props.onOkClick(
                                            this.props.ids,
                                            this.state.text,
                                            DatePickerStore.getValue(this.props.id + "##date"),
                                            this.props.tableId,
                                            this.props.tableController);
                                    }
                                }}>Создать</ButtonOk>
                            </div>
                        </div>
                    </div>
                </div>;
    }
}

export default MoRequestForm;