import * as React from 'react';
import Paper from '@mui/material/Paper';
import useStyles from './styles';

export default function Card(props) {
  const classes = useStyles();
  return (
      <Paper className={classes.root}>
          {props.children}
      </Paper>
  );
}