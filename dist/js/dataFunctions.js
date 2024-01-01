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
    // const lat = locationObj.getLat();
    // const lon = locationObj.getLon();
    // const units = locationObj.getUnit();
    // const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=${units}`;
    // try {
    //     const weatherStream = await fetch(url);
    //     const weatherJson = await weatherStream.json();
    //     return weatherJson;
    // } catch (err) {
    //     console.error(err);
    // }

    const urlDataObj = {
        lat: locationObj.getLat(),
        lon: locationObj.getLon(),
        units: locationObj.getUnit()
    };
    try {
        const weatherStream = await fetch("./.netlify/functions/get_weather", {
            method: "POST",
            body: JSON.stringify(urlDataObj)
        });
        const weatherJson = weatherStream.json();
        return weatherJson;
    } catch (err) {
        console.error(err);
    }
}

export const getForecastFromCoords = async (locationObj) => {
    // const lat = locationObj.getLat();
    // const lon = locationObj.getLon();
    // const units = locationObj.getUnit();
    // const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=${units}`;
    // try {
    //     const forecastStream = await fetch(url);
    //     const forecastJson = await forecastStream.json();
    //     return forecastJson;
    // } catch (err) {
    //     console.error(err);
    // }

    const urlDataObj = {
        lat: locationObj.getLat(),
        lon: locationObj.getLon(),
        units: locationObj.getUnit()
    }

    try {
        const dataStream = await fetch("./.netlify/functions/get_forecast", {
            method: "POST",
            body: JSON.stringify(urlDataObj)
        });
        const dataJson = dataStream.json();
        return dataJson;
    } catch (err) {
        console.error(err);
    }
    console.log(dataJson);
}

export const getCoordsFromApi = async (entryText, units) => {
    // const regex = /^\d+$/g;
    // const flag = regex.test(entryText) ? "zip" : "q";
    // const url = `https://api.openweathermap.org/data/2.5/weather?${flag}=${entryText}&untis=${units}&appid=${WEATHER_API_KEY}`;
    // const encodedUrl = encodeURI(url);
    // console.log("encodedURL");
    // console.log(url);
    // try {
    //     const dataStream = await fetch(encodedUrl);
    //     const jsonData = await dataStream.json();

    //     return jsonData;
    // } catch (err) {
    //     console.error(err.stack);
    // }

    const urlDataObj = {
        text: entryText,
        units: units
    }
    try {
        const dataStream = await fetch("./.netlify/functions/get_coords", {
            method: "POST",
            body: JSON.stringify(urlDataObj)
        });
        const dataJson = dataStream.json();
        return dataJson;
    } catch (err) {
        console.error(err);
    }
}

export const cleanText = (text) => {
    const regex = / {2}/g;
    const entryText = text.replaceAll(regex, " ").trim();
    return entryText;
};