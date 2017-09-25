import {applyMiddleware, combineReducers, createStore} from 'redux';
import initialStateData from '../data/initial-state.json';
import {patients, user} from '../action/reducer';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { routerReducer } from 'react-router-redux'

const logger = createLogger();

const storeFactory = (initialState = initialStateData) =>
    applyMiddleware(thunkMiddleware, logger)(createStore)(combineReducers(
        {patients, user, routing: routerReducer}), initialState);


export default storeFactory;
