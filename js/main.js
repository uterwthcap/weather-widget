import { getCoordinates, getWeather } from './api.js';
import { updateWeather, updateClock } from './ui.js';

const searchsForm = document.querySelectorAll('.search');

let weatherInterval;
let clockInterval;

async function refreshWeather(latitude, longitude, cityName) {
    try {
        const data = await getWeather(latitude, longitude);
        updateWeather(data, cityName);
        return data.timezone;
    } catch (error) {
        console.error('Failed to update weather', error);
    }
}

async function startWeatherUpdates(latitude, longitude, cityName) {
    clearInterval(weatherInterval);

    const timezone = await refreshWeather(latitude, longitude, cityName);

    if (!timezone) {
        return;
    }

    startClock(timezone);

    weatherInterval = setInterval(() => {
        refreshWeather(latitude, longitude, cityName);
    }, 15 * 60 * 1000);
}

function startClock(timezone) {
    clearInterval(clockInterval);

    updateClock(timezone);

    clockInterval = setInterval(() => {
        updateClock(timezone);
    }, 60000)

};

async function chooseCity(event) {
    event.preventDefault();

    const input = event.currentTarget.querySelector('.form-search');
    const userValueSearch = input.value.trim();

    if (userValueSearch === '') {
        return;
    }

    try {
        const coordinates = await getCoordinates(userValueSearch);

        if (!coordinates) {
            alert('City not found');
            return;
        }

        startWeatherUpdates(
            coordinates.latitude,
            coordinates.longitude,
            coordinates.name
        );

    } catch (error) {
        alert('Something went wrong');
        console.error(error);
    }
}

searchsForm.forEach((form) => {
    form.addEventListener('submit', chooseCity);
});

startWeatherUpdates(51.51, -0.13, 'London');