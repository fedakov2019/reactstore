"use strict";

const ButtonOk = (props) => {
    return <a {...props} className="waves-effect waves-light btn"><i className="mdi-action-done left"></i>{props.children ? props.children : "OK"}</a>;
};

export default ButtonOk;