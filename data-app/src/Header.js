import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { AcUnitRounded, PinDropSharp } from "@material-ui/icons";
import React from "react";
import { makeStyles } from "@material-ui/styles";


const useStyles = makeStyles(() => ({
    typographyStyles: {
        flex: 1
    }
}));

const Header = (props) => {
    const classes = useStyles();
    return <AppBar position="static">
        <Toolbar>
            <Typography className={classes.typographyStyles} >PouchDB / CouchDB</Typography>
            <Typography>{props.user}&nbsp;</Typography>
            <AcUnitRounded/>
        </Toolbar>
    </AppBar>
}

export default Header;