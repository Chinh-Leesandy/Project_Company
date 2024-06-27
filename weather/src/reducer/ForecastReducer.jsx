export const initialStateForecast = {
    forecast : null,
    loading : false,
    error: null
}

export const ForecastReducer = (state, action) => {
    switch (action.type) {
        case 'CALL_FORECAST_RESQUEST':
            return{...state, loading: true};    
        case 'CALL_FORECAST_SUCCESS':
            return{...state, loading: false, forecast: action.payload};
        case 'CALL_FORECAST_FAILURE':
            return { ...state, loading: false, error: action.payload };
        default:
            return state
    }
}