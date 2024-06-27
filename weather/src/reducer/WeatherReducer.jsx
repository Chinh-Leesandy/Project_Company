export const initialStateWeather = {
    weather : null,
    loading : false,
    error: null
}

export const WeatherReducer = (state, action) => {
    switch (action.type) {
        case 'CALL_WEATHER_RESQUEST':
            return {...state, loading: true};    
        case 'CALL_WEATHER_SUCCESS':
            return {...state, loading: false, weather: action.payload};
        case 'CALL_WEATHER_FAILURE':
            return { ...state, loading: false, error: action.payload };
        default:
            return state
    }
}

