import React from "react";
import Typography from '@material-ui/core/Typography'
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((thema) => ({
    root: {
        fontFamily: "Lobster",
        margen: thema.spacing(3, 0, 2),
        textAlign: "center",
        fontSize: "40px",
        color: "deeppink",
        textShadow: "1px 1px darkmagenta"
    }
}))
export const Headers = () => {
    const styles = useStyles();
    return <Typography className={styles.root} component="h1" variant="h5"> СУПЕР ФОРМА React FORM </Typography>
}