"use strict";

const ErrorMessage = (props) => {
    return <div className="red-text" style={{ fontSize: 90 + "%" }}>{props.children}</div>;
};

export default ErrorMessage;