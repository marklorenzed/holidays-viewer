import React from 'react'
import { CircularProgress } from '@mui/material'
import useStyles from './styles';

export default function LoadingSpinner({ size, mask=true }) {
    const classes = useStyles();

    return (
        <div style={{ height: "100vh", width: "100vw" }} className={mask ? classes.mask : ""}>
            <CircularProgress className={classes.spinner} size={60}/>
        </div>
    )
}
