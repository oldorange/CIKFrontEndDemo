import { combineReducers } from 'redux';
import { ConnectedRouter  } from 'connected-react-router';
import counterReducer from './counterReducer';
import weatherForcastsReducer from './weatherForcastsReducer';

export default combineReducers({
    counter: counterReducer,
    weatherForecasts: weatherForcastsReducer
});