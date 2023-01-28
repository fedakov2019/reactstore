import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((thema) => ({
    root: {
        width: "100%",
        marginTop: thema.spacing(1)
    }
}))

export const Form = ({ children, ...props }) => {
    const style = useStyles();
    return <form className={style.root} 
    noValidate {...props}>{children}</form>
}