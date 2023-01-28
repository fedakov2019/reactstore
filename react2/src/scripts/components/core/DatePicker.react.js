"use strict";

import React from "react";

import DatePickerStore from "../../stores/DatePickerStore";
import DatePickerChangeActionCreator from "../../actions/DatePickerChangeActionCreator";
import DatePickerDestroyActionCreator from "../../actions/DatePickerDestroyActionCreator";

import DateTime from "react-datetime";
import moment from "moment";
import "moment/locale/ru";

let DatePicker = React.createClass({
    componentWillMount: function () {
        DatePickerStore.addChangeListener(this.props.id, this._storeChangeListener);
        let val = null;
        if (this.props.allowEmpty && (this.props.defaultValue == null || this.props.defaultValue == "")) {
            val = null;
        } else {
            val= this.props.defaultValue._isAMomentObject ? this.props.defaultValue : moment(this.props.defaultValue);
        }
        DatePickerChangeActionCreator.change(this.props.id, val);
    },
    /*componentWillReceiveProps:function(nextProps)
	{
	    let val = this.props.defaultValue._isAMomentObject ? this.props.defaultValue : moment(this.props.defaultValue);
	    DatePickerChangeActionCreator.change(this.props.id, val);
	},*/
    componentWillUnmount: function () {
        DatePickerStore.removeChangeListener(this.props.id, this._storeChangeListener);
        DatePickerDestroyActionCreator.destroy(this.props.id);
    },
    render: function () {
        return <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
            <div style={{ marginRight: 10 + "px" }}>{this.props.caption}</div>
            <DateTime id={this.props.id + "#DateTime1"}
                key={this.props.id + "#DateTime1"}
                defaultValue={this.props.defaultValue}
                value={this.state.value}
                dateFormat="DD.MM.YYYY" timeFormat={false} locale="ru"
                onBlur={this._onBlur} onChange={this._onChange} open={false} closeOnSelect={true}></DateTime>
        </div>;
    },
    _onChange(event) {
    /*if (this.props.allowEmpty && (event == '' || event == null)) {
        DatePickerChangeActionCreator.change(this.props.id, null);
    } else*/ {
            if (event._isAMomentObject) {
                DatePickerChangeActionCreator.change(this.props.id, event);
                if (this.props.onChange != null) {
                    this.props.onChange(this.props, this.state, DatePickerStore.getValue(this.props.id));
                }
            }
        }

    },
    _onBlur: function (event) {
        if (this.props.allowEmpty && (event == "" || event == null)) {
            event = null;
        }
        else {
            if (!event._isAMomentObject) {
                event = moment(event, "DD.MM.YYYY");
                if (!event.isValid()) {
                    event = DatePickerStore.getRawValue(this.props.id);
                }
            }
        }
        DatePickerChangeActionCreator.change(this.props.id, event /*.format('YYYY-MM-DD')*/);
        if (this.props.onChange != null) {
            this.props.onChange(this.props, this.state, DatePickerStore.getValue(this.props.id));
        }
        /*else {
           this.setState({
               value:moment(DatePickerStore.getRawValue(this.props.id))
           });
       }*/
    },
    _storeChangeListener: function () {
        let val = DatePickerStore.getRawValue(this.props.id);
        let processedVal = null;
        if (this.props.allowEmpty && (val == "" || val == null)) {
            processedVal = null; //String.fromCharCode(0);
        } else {

            processedVal = moment(val);
        }

        this.setState({
            value: processedVal
        });

        /*
         if (this.props.onChange != null) {
            this.props.onChange(this.props, this.state, DatePickerStore.getValue(this.props.id));
        }
        */
    },
    _checkErr: function () {
        let res = (this.props.allowEmpty == false && (this.state.value == null || this.state.value == ""))
            || (this.props.minValue != null && this.state.value < this.props.minValue)
            || (this.props.maxValue != null && this.state.value < this.props.maxValue);
        return res ? {
            border: "red 2px solid"
        } : {};
    }
});

export default DatePicker;