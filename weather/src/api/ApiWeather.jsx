const baseUrlWeather = "https://api.openweathermap.org/data/2.5";
const ApiKey = 'YOUR_API_KEY';

export const ApiWeather = {
    getCurrentWeatherByCity: async (city) => {
        try {
            const response = await fetch(`${baseUrlWeather}/weather?q=${city}&appid=${ApiKey}&units=metric`);
            if (!response.ok) {
                throw new Error('Error while fetching current weather');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Error while fetching current weather');
        }
    },

    getForecastWeatherByCity: async (city) => {
        try {
            const response = await fetch(`${baseUrlWeather}/forecast?q=${city}&appid=${ApiKey}&units=metric`);
            if (!response.ok) {
                throw new Error('Error while fetching forecast');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Error while fetching forecast');
        }
    }
};
