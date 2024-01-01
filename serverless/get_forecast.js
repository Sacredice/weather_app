const fetch = require("node-fetch");

const { WEATHER_API_KEY } = process.env;

exports.handler = async (event, context) => {
    const params = JSON.parse(event.body);
    const { lat, lon, units } = params;
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=${units}`;
    try {
        const dataStream = await fetch(url);
        const dataJson = await dataStream.json();
        return {
            statusCode: 200,
            body: JSON.stringify(dataJson)
        };
    } catch (err) {
        return { statusCode: 422, body: err.stack };
    }

}