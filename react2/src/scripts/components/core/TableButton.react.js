"use strict";

const TableButton = (props) => {
    return <div onClick={(event) => {
        if (props.onClick == null) {
            return;
        }
        props.onClick(props.keyFieldValue, props);}     
        } style={{ paddings: "2px 1px", width: "30px" }}>
					<i className={"material-icons tooltipped " + props.className} data-position="bottom" data-delay="50" data-tooltip={props.hint}>{props.iconName}</i>
				</div>;
};

export default TableButton;