import React, { useEffect, useState } from 'react';
import { useCallCurrentWeather } from '../hooks/useCallCurrentWeather';
import './weather.css'
export const CurrenWeather = () => {
    const [city, setCity] = useState("HaNoi");
    const { state, fetchWeather, fetchForecast } = useCallCurrentWeather();
    useEffect(() => {
            fetchWeather(city);
            fetchForecast(city);
    }, [city]);
    return (
        <div className='weather_app'>
            <div className="header">
                <h2 className='text-center text-capitalize text_header'>The weather app</h2>
            </div>
            <form onSubmit={(e) => e.preventDefault()} >
                <div className='d-flex justify-content-center align-items-center'>
                    <div className="col-6">
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Enter city"    
                            className='form-control mb-3'
                        />
                    </div>
                    <button type="button" className='button_get btn btn-outline-dark btn-sm mb-3' onClick={() => {
                        fetchWeather(city);
                        fetchForecast(city);
                    }}>Get Weather</button>
                </div>
            </form>
            {state.weather.loading && <p>Loading...</p>}
            <div className="container mt-3 d-flex justify-content-between">
                <div className="col-5">
                    {state.weather.weather && (
                        <>
                        <div className="curren-weather">
                            <h6 className='text-center text-uppercase'>curren weather</h6>
                            <div className="d-flex justify-content-between align-items-center text-center">
                                <div className="name-city">
                                    <p className='text fw-semibold text-capitalize '>{state.weather.weather.name}, {state.weather.weather.sys.country}</p>
                                </div>
                                <div className="temp">
                                    <p className='text fw-semibold'>{state.weather.weather.main.temp}°C</p>
                                    <p>{state.weather.weather.weather[0].description}</p>
                                </div>
                                <div className="icon">
                                    <img src={`https://openweathermap.org/img/wn/${state.weather.weather.weather[0].icon}@2x.png`}/>
                                </div>
                            </div>
                        </div>
                        <div className="air mt-4">
                            <h6 className='text-center text-uppercase mb-3'>ari conditions</h6>
                            <div className="d-flex justify-content-between align-items-center text-center">
                                <div className="temp">
                                    <p className='text text-capitalize fw-semibold'><i class="bi bi-thermometer"></i>Read Feel</p>
                                    <p>{state.weather.weather.main.temp}°C</p>
                                </div>
                                <div className="wind">
                                    <p className='text fw-semibold'><i class="bi bi-wind"></i> Wind</p>
                                    <p>{state.weather.weather.wind.speed} m/s</p>
                                </div>
                                <div className="clouds">
                                    <p className='text fw-semibold'><i class="bi bi-clouds"></i> Cloud</p>
                                    <p>{state.weather.weather.clouds.all} %</p>
                                </div>
                                <div className="humidity">
                                    <p className='text fw-semibold'><i class="bi bi-moisture"></i> Humidity</p>
                                    <p>{state.weather.weather.main.humidity} %</p>
                                </div>
                            </div>
                        </div>
                        </>
                    )}
                    <div className="forecast">
                    {state.forecast.forecast && (
                        <div>
                            <h6 className='text-center text-uppercase mt-3 mb-3'>TODAY'S FORECAST</h6>
                            <div className='today'>
                                {state.forecast.forecast.list.slice(0, 6).map((forecast, index) => (
                                        <div className="d-flex flex-column text-center"  key={index}>
                                            <p>{forecast.dt_txt.split(/[ ]/)[1]}</p>
                                            <img src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`}/>
                                            <p>{forecast.main.temp}°C</p>
                                        </div>
                                ))}
                            </div>
                        </div>
                    )} 
                    </div>
                </div>
                <div className="col-5">
                {state.forecast.forecast && (
                    <div >
                    <h6 className="text-center text-uppercase mt-1 mb-3">Weekly Forecast</h6>
                    <div className="weekly">
                        {[0, 6, 14, 22, 30, 39].map(index => state.forecast.forecast.list[index]).map((forecast, index) => (
                        <div className="forecast-card mb-3" key={index}>
                            <div className="d-flex justify-content-between align-items-center" style={{height: '13vh'}}>
                            <div className="d-flex flex-column text-center">
                                <span className="date">{forecast.dt_txt.split(/[ ]/)[0]}</span>
                                <div className="d-flex justify-content-center align-items-center">
                                <img style={{ width: '60px' }} src={`https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`} alt="weather-icon"/>
                                <span className="weather-description">{forecast.weather[0].description}</span>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="temp text-center me-3">
                                <p className=" d-flex text-capitalize fw-semibold"><i className="bi bi-thermometer"></i>{' '}Read Feel</p>
                                <p>{forecast.main.temp}°C</p>
                                </div>
                                <div className="wind text-center me-3">
                                <p className="d-flex fw-semibold"><i className="bi bi-wind"></i>{' '} Wind</p>
                                <p>{forecast.wind.speed} m/s</p>
                                </div>
                                <div className="clouds text-center me-3">
                                <p className="d-flex fw-semibold"><i className="bi bi-clouds"></i>{' '} Cloud</p>
                                <p>{forecast.clouds.all} %</p>
                                </div>
                                <div className="humidity text-center">
                                <p className="d-flex fw-semibold"><i className="bi bi-moisture"></i>{' '} Humidity</p>
                                <p>{forecast.main.humidity} %</p>
                                </div>
                            </div>
                            </div>
                        </div>
                        ))}
                    </div>
                    </div>
                )}
                </div>
            </div>
        </div>
    );
};
