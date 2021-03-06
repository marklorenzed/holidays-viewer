import { createStore } from "redux";

export const ACTIONS = {
    LOAD_HOLIDAYS: 'LOAD_HOLIDAYS',
    SELECT_HOLIDAYS: 'SELECT_HOLIDAYS',
    SET_YEARS: 'SET_YEARS',
    SELECT_YEAR: 'SELECT_YEAR',
    SET_EVENTS_BY_YEAR: 'SET_EVENTS_BY_YEAR',
    SET_EVENTS_BY_ID: 'SET_EVENTS_BY_ID'
};

const initialState = {
  holidays: {},
  selectedHolidays: [],
  loading: false,
  years: [],
  eventsByYear: null,
  selectedYear: null
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case ACTIONS.LOAD_HOLIDAYS: {
          const newHolidays = action.payload;
          return {
            ...state,
            holidays: newHolidays,
          };
        }
        case ACTIONS.SELECT_HOLIDAY: {
            const selectedHoliday = action.payload;
            return {
              ...state,
              selectedHoliday,
            };
          }
        case ACTIONS.SET_YEARS: {
            const years = action.payload;
            return {
              ...state,
              years,
            };
          }
        case ACTIONS.SELECT_YEAR: {
            return {
              ...state,
              selectedHolidays: [],
              year: action.payload,
            };
          }
        case ACTIONS.SET_EVENTS_BY_YEAR: {
            return {
              ...state,
              eventsByYear: action.payload,
            };
          }
        case ACTIONS.SELECT_HOLIDAYS: {
            return {
              ...state,
              selectedHolidays: action.payload,
            };
          }
        case ACTIONS.SET_EVENTS_BY_ID: {
            return {
              ...state,
              eventsById: action.payload,
            };
          }
        default:
        return state
    }
}

const enableReduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__?.();

export function createReduxStore() {
  const store = createStore(rootReducer, enableReduxDevTools);
  return store;
}
