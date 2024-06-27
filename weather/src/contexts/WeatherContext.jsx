import { createContext, useReducer } from "react";
import { WeatherReducer, initialStateWeather } from "../reducer/WeatherReducer";
import { ForecastReducer, initialStateForecast } from "../reducer/ForecastReducer";

const WeatherContext = createContext();
const initialState = {
    weather: initialStateWeather,
    forecast: initialStateForecast
}
const combinedReducer = (state, action) => {
    return{
        weather : WeatherReducer(state.weather, action),
        forecast : ForecastReducer(state.forecast, action)
    }
}
const WeatherProvider = ({children}) => {
    const [state, dispatch] = useReducer(combinedReducer, initialState)
    return(
        <WeatherContext.Provider value={{state, dispatch}}>
            {children}
        </WeatherContext.Provider>
    )
}

export {WeatherContext, WeatherProvider}