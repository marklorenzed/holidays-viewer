import * as React from "react";
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

export default function Main() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const stateAPIStatus = useLoadData();
  const years = useSelector((state) => state.years);
  const year = useSelector((state) => state.year);
  const eventsByYear = useSelector((state) => state.eventsByYear);

  const handleChange = (event) =>
    dispatch({ type: ACTIONS.SELECT_YEAR, payload: event.target.value });

  return (
    <Box sx={{ flexGrow: 1 }} className={classes.root}>
      {stateAPIStatus === "loading" && <LoadingSpinner size={60} mask />}
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
            }}
          >
            <Card>
              <Select
                title={"Year"}
                options={years}
                onChange={handleChange}
                value={year}
              />
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
                headers={["title", "date", "notes"]}
              />
          </Grid>
        </Grid>
      ) : (
        <ErrorPage />
      )}
    </Box>
  );
}
