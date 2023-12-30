export const setLocationObject = (locationObj, coordObj) => {
    const { lat, lon, name, unit } = coordObj;
    locationObj.setLat(lat);
    locationObj.setLon(lon);
    locationObj.setName(name);
    if (unit) {
        locationObj.setUnit(unit);
    }
};

export const getHomeLocation = () => {
    return localStorage.getItem("defaultWeatherLocation");
};

export const getWeatherFromCoords = async (locationObj) => {
    const lat = locationObj.getLat();
    const lon = locationObj.getLon();
    const units = locationObj.getUnit();
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=${units}`;
    try {
        const weatherStream = await fetch(url);
        const weatherJson = weatherStream.json();
        return weatherJson;
    } catch (err) {
        console.error(err);
    }
};

export const getForecastFromCoords = async (locationObj) => {
    const lat = locationObj.getLat();
    const lon = locationObj.getLon();
    const units = locationObj.getUnit();
    const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=${units}`;
    try {
        const forecastStream = await fetch(url);
        const forecastJson = forecastStream.json();
        return forecastJson;
    } catch (err) {
        console.error(err);
    }
}

export const getCoordsFromApi = async (entryText, units) => {
    const regex = /^\d+$/g;
    const flag = regex.test(entryText) ? "zip" : "q";
    const url = `https://api.openweathermap.org/data/2.5/weather?${flag}=${entryText}&untis=${units}&appid=${WEATHER_API_KEY}`;
    const encodedUrl = encodeURI(url);
    // console.log("encodedURL");
    // console.log(url);
    try {
        const dataStream = await fetch(encodedUrl);
        const jsonData = dataStream.json();

        return jsonData;
    } catch (err) {
        console.error(err.stack);
    }
}

export const cleanText = (text) => {
    const regex = / {2}/g;
    const entryText = text.replaceAll(regex, " ").trim();
    return entryText;
};