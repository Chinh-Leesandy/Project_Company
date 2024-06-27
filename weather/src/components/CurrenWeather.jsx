import React, { useEffect, useState } from 'react';
import { useCallCurrentWeather } from '../hooks/useCallCurrentWeather';

export const CurrenWeather = () => {
    const [city, setCity] = useState("HaNoi");
    const { state, fetchWeather, fetchForecast } = useCallCurrentWeather();

    useEffect(() => {
            fetchWeather(city);
            fetchForecast(city);
    }, [city]);
    return (
        <div>
            <form onSubmit={(e) => e.preventDefault()}>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city"
                />
                <button type="button" onClick={() => {
                    fetchWeather(city);
                    fetchForecast(city);
                }}>Get Weather</button>
            </form>

            {state.weather.loading && <p>Loading...</p>}
            {state.weather.weather && (
                <div>
                    <h2>{state.weather.weather.name}</h2>
                    <p>{state.weather.weather.weather[0].description}</p>
                    <p>{state.weather.weather.main.temp}°C</p>
                </div>
            )}
            {state.forecast.forecast && (
                <div>
                    <h2>Forecast</h2>
                    {state.forecast.forecast.list.map((forecast, index) => (
                        <div key={index}>
                            <p>{forecast.dt_txt}: {forecast.main.temp}°C</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
