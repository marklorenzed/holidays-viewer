import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Select from "../../components/Select";

import Card from "../../components/Card";
import useStyles from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { ACTIONS } from "../../redux";
import useLoadData from "../../hooks/useLoadData";
import LoadingSpinner from "../../components/LoadingSpinner";
import ErrorPage from "../ErrorPage";
import DataTable from "../../components/DataTable";
import { Button, Typography } from "@mui/material";
import AlertDialog from "../../components/AlertDialog";
import { formatDate } from "../../utils";
import axios from "axios";

export default function Main() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const stateAPIStatus = useLoadData();

  // states
  const years = useSelector((state) => state.years);
  const year = useSelector((state) => state.year);
  const eventsByYear = useSelector((state) => state.eventsByYear);
  const eventsById = useSelector((state) => state.eventsById);
  const selectedHolidays = useSelector((state) => state.selectedHolidays);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = () => setOpen(false);

  const handleChange = (event) =>
    dispatch({ type: ACTIONS.SELECT_YEAR, payload: event.target.value });

  const handleSubmit = () => {
    // post method
    setLoading(true)
    axios.post("/localhost:3000").then(res => {
      setLoading(false);
      setOpen(false);
    }).catch(err => {
      setLoading(false);
      setOpen(false);
    })
  }

  const createMessage = () => {
    const events = selectedHolidays.map(event => eventsById[event])
    return (
      events.map((holiday, index) => (
        <span key={index} style={{ display: "flex", justifyContent: "space-between" }}>
          <span>
           {holiday.title}
          </span>
          <span>
            {formatDate(holiday.date)}
          </span>
        </span>
      )) 
    )
  }


  return (
    <Box sx={{ flexGrow: 1 }} className={classes.root}>
      {(stateAPIStatus === "loading") && <LoadingSpinner size={60} mask />}
      {stateAPIStatus === "success" ? (
        <Grid
          container
          direction="column"
          alignItems="center"
          style={{ padding: "20px" }}
        >
          <Grid
            item
            container
            style={{
              maxWidth: "1000px",
              color: "white"
            }}
            justifyContent="center"
          >
            <Typography variant="h1" component="div" gutterBottom>
              Holidays Selector
            </Typography>
          </Grid>
          <Grid
            item
            container
            style={{
              maxWidth: "1000px",
            }}
          >
            <Card>
              <Grid container justifyContent="center" alignItems="center">
                <Grid item xs={10}>
                <Select
                  title={"Year"}
                  options={years}
                  onChange={handleChange}
                  value={year}
                />
                </Grid>
                <Grid item container xs={2} justifyContent="center">
                  <Button variant="contained" onClick={() => setOpen(true)} disabled={!selectedHolidays.length}>Select Holidays</Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid
            item
            container
            style={{
              maxWidth: "1000px",
            }}
          >
              <DataTable 
                rows={eventsByYear[year] ? eventsByYear[year] : []}
                headers={["title", "date", "notes", "division"]}
              />
          </Grid>
        </Grid>
      ) : (
        <ErrorPage message={"Error loading Data"}/>
      )}

      <AlertDialog 
        open={open}
        handleClose={handleClose}
        handleConfirm={handleSubmit}
        loading={loading}
        message={createMessage()}
      />
    </Box>
  );
}
