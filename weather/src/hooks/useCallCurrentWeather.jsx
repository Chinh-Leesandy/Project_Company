import  { useContext } from 'react'
import { WeatherContext } from '../contexts/WeatherContext';
import { ApiWeather } from '../api/ApiWeather';

export const useCallCurrentWeather = () => {
    const { state, dispatch } = useContext(WeatherContext);

    const fetchWeather = async (city) => {
        dispatch({ type: 'CALL_WEATHER_REQUEST' });

        try {
            const data = await ApiWeather.getCurrentWeatherByCity(city);
            dispatch({ type: 'CALL_WEATHER_SUCCESS', payload: data });
        } catch (error) {
            dispatch({ type: 'CALL_WEATHER_FAILURE', payload: error.message });
        }
    };

    const fetchForecast = async (city) => {
        dispatch({ type: 'CALL_FORECAST_REQUEST' });

        try {
            const data = await ApiWeather.getForecastWeatherByCity(city);
            dispatch({ type: 'CALL_FORECAST_SUCCESS', payload: data });
        } catch (error) {
            dispatch({ type: 'CALL_FORECAST_FAILURE', payload: error.message });
        }
    };

    return {
        state,
        fetchWeather,
        fetchForecast
    };
}
