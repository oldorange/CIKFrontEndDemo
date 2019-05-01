// actions
import {
    incrementCountType,
    decrementCountType,
    requestWeatherForecastsType,
    receiveWeatherForecastsType
} from './types';

export const requestWeatherForecasts = (startDateIndex) => async (dispatch, getState) => {
    if (startDateIndex === getState().weatherForecasts.startDateIndex) {
        // Don't issue a duplicate request (we already have or are loading the requested data)
        return;
    }

    dispatch({ type: requestWeatherForecastsType, startDateIndex });

    const url = `api/SampleData/WeatherForecasts?startDateIndex=${startDateIndex}`;
    const response = await fetch(url);
    const forecasts = await response.json();

    dispatch({ type: receiveWeatherForecastsType, startDateIndex, forecasts });
};

export const increment = () => ({ type: incrementCountType });

export const decrement = () => ({ type: decrementCountType });
