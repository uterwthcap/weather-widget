

export async function getCoordinates(cityName) {
    const cityResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json&utm_source=chatgpt.com`);
    const cityData = await cityResponse.json();
    if (!cityData.results || cityData.results.length === 0) {
        return;
    }
    const latitude = cityData.results[0].latitude;
    const longitude = cityData.results[0].longitude;
    const foundCityName = `${cityData.results[0].name}`;
    const cityDatas = {
        name: foundCityName,
        latitude: latitude,
        longitude: longitude
    };
    
    return  cityDatas; 
}
    

export async function getWeather(latitude, longitude) {
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min&current=temperature_2m,relative_humidity_2m,cloud_cover,weather_code,wind_speed_10m,is_day&hourly=temperature_2m,is_day,weather_code&forecast_days=1&timezone=auto`);
    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();
    return data;
}