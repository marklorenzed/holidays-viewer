import axios from 'axios';
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { ACTIONS } from '../redux';
import { createHolidayID } from '../utils';


function useLoadData() {
  const [stateAPIStatus, setAPIStatus] = useState("idle");
  const dispatch = useDispatch();

  useEffect(() => {
    setAPIStatus("loading");
    axios
      .get("https://www.gov.uk/bank-holidays.json")
      .then((res) => {
        const data = res.data;
        
        dispatch({
          type: ACTIONS.LOAD_HOLIDAYS,
          payload: res.data,
        });

        const eventsByYear = {};
        const eventsById = {};
        let years = [];
        Object.keys(data).forEach(key => {
          const division = data[key];
          const events = division.events;
          events.forEach(event => {
            const year = (new Date(event.date)).getFullYear();
            years.push(year);
            const obj = {...event, division: division.division}

            const id = createHolidayID(obj);
            eventsById[id] = obj;

            if (eventsByYear[year]) eventsByYear[year].push(obj);
            else eventsByYear[year] = [obj];
          });
        });
        years = [...new Set(years)];
        years = years.map(year => ({ value: year, label: year }))

        dispatch({
          type: ACTIONS.SET_YEARS,
          payload: years
        })

        dispatch({
          type: ACTIONS.SET_EVENTS_BY_YEAR,
          payload: eventsByYear,
        });

        dispatch({
          type: ACTIONS.SET_EVENTS_BY_ID,
          payload: eventsById,
        });
        
        setAPIStatus("success");
      })
      .catch((error) => {
        setAPIStatus("error");
      });
  }, [dispatch]);

  return stateAPIStatus;
}

export default useLoadData;
