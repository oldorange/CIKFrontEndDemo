import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import counterReducer from './counterReducer';
import weatherForcastsReducer from './weatherForcastsReducer';

export default combineReducers({
    routing: routerReducer,
    counter: counterReducer,
    weatherForecasts: weatherForcastsReducer
});