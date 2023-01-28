import React from "react";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
const useStyles =makeStyles((thema) => ({
    root:{
        margin: thema.spacing(3,0,2),
    }
}));
export const PrimaryButton =({children,props}) => {
    const style=useStyles();
    return (
        <Button
        className={style.root}
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        {...props}
        > {children}</Button>
    )
}