import { weatherDescription, weatherIcons, dayNightCodes } from './weatherCodes.js';

const city = document.querySelector('.city')
const currentTemp = document.querySelector('.current-temp');
const currentHumidity = document.querySelector('.today-humadity');
const currentCloudy = document.querySelector('.today-cloudy');
const maxTemp = document.querySelector('.today-temp-max');
const minTemp = document.querySelector('.today-temp-min');
const currentWind = document.querySelector('.today-wind');
const weatherStatus = document.querySelector('.weather-status');
const mainWeatherIcon = document.querySelector('.img-main-data');
const date = document.querySelector('.date');

const hourContainer = document.querySelector('.weather-hours');
const hourTemplate = document.querySelector('#hour-template');

export function updateWeather(data, cityName) {
    const isDay = data.current.is_day;
    const isDayHour = data.hourly.is_day;
    const weatherCode = data.current.weather_code;
    const weatherCodeHour = data.hourly.weather_code;

    currentTemp.textContent = `${Math.round(data.current.temperature_2m)}°`; 
    currentHumidity.textContent = `${data.current.relative_humidity_2m}%`;
    currentCloudy.textContent = `${data.current.cloud_cover}%`;
    maxTemp.textContent = `${Math.round(data.daily.temperature_2m_max[0])}°`;
    minTemp.textContent = `${Math.round(data.daily.temperature_2m_min[0])}°`;
    currentWind.textContent = `${Math.round(data.current.wind_speed_10m)} km/h`;
    weatherStatus.textContent = weatherDescription[weatherCode] ?? 'Unknown weather';
    city.textContent = cityName;

    if (isDay === 0 && dayNightCodes.includes(weatherCode)) {
        mainWeatherIcon.src = `https://cdn.meteocons.com/3.0.0-next.10/svg/line/${weatherIcons[weatherCode]}-night.svg`;
    } else if (isDay === 1 && dayNightCodes.includes(weatherCode)) {
        mainWeatherIcon.src = `https://cdn.meteocons.com/3.0.0-next.10/svg/line/${weatherIcons[weatherCode]}-day.svg`;
    } else {
        mainWeatherIcon.src = `https://cdn.meteocons.com/3.0.0-next.10/svg/line/${weatherIcons[weatherCode]}.svg`;
    }

    hourContainer.replaceChildren();

    for (let i = 0; i < data.hourly.time.length; i++) {
        const clone = hourTemplate.content.cloneNode(true);

        const hourTemp = clone.querySelector('.hour-temp');
        const hourImg = clone.querySelector('.hour-pic');
        const hourWeatherStatus = clone.querySelector('.weather-status-hour');
        const time = clone.querySelector('.time')

        hourTemp.textContent = `${Math.round(data.hourly.temperature_2m[i])}°`;

        const code = weatherCodeHour[i];

            if (isDayHour[i] === 0 && dayNightCodes.includes(code)) {
                hourImg.src = `https://cdn.meteocons.com/3.0.0-next.10/svg/line/${weatherIcons[code]}-night.svg`;
            } else if (isDayHour[i] === 1 && dayNightCodes.includes(code)) {
                hourImg.src = `https://cdn.meteocons.com/3.0.0-next.10/svg/line/${weatherIcons[code]}-day.svg`;
            } else {
                hourImg.src = `https://cdn.meteocons.com/3.0.0-next.10/svg/line/${weatherIcons[code]}.svg`;
            }

        hourWeatherStatus.textContent = weatherDescription[weatherCodeHour[i]] ?? 'Unknown weather';
    
        time.textContent = data.hourly.time[i].slice(11);

        hourContainer.append(clone);
    }
    
    
        hourTemps.forEach((hourTemp, i) => {
            
        });

        hourImgs.forEach((hourImg, i) => {
            
        });

        hourWeatherStatuses.forEach((hourWeatherStatus, i) => {
            });

        hourTime.forEach((time, i) => {
            
        });
}
    
export function updateClock(timezone) {
     const now = new Date();

    const time = now.toLocaleTimeString('en-GB', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit'
    });

    const formattedDate = now.toLocaleDateString('en-GB', {
        timeZone: timezone,
        weekday: 'long',
        day: 'numeric',
        month: 'short',
        year: '2-digit'
    });

    date.textContent = `${time} - ${formattedDate}`;
}