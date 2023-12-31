import fetch from "node-fetch";

const { WEATHER_API_KEY } = process.env;

exports.handler = async (event, context) => {
    const params = JSON.parse(event.body);
    const { lat, lon, units } = params;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=${units}`;
    try {
        const weatherStream = await fetch(url);
        const weatherJson = weatherStream.json();
        return {
            statusCode: 200,
            body: JSON.stringify(weatherJson)
        };
    } catch (err) {
        return { statusCode: 422, body: err.stack };
    }
}