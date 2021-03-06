import {applyMiddleware, combineReducers, createStore} from 'redux';
import initialStateData from '../data/initial-state.json';
import {patients, user} from '../action/reducer';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {routerReducer} from 'react-router-redux'
import {reducer as notificationsReducer} from 'reapop';
import { reducer as formReducer } from 'redux-form'
import constants from "../action/constant";

const logger = createLogger(APP_CONFIG.LOG_APP_EVENTS_ONLY ? {
    predicate: (getState, action) => constants.hasOwnProperty(action.type)
  } : {});

const storeFactory = (initialState = initialStateData) =>
  applyMiddleware(thunkMiddleware, logger)(createStore)(combineReducers(
    {
      user, patients,
      routing: routerReducer,
      form: formReducer,
      notifications: notificationsReducer()
    }), initialState);


export default storeFactory;
