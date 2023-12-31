const fetch = require("node-fetch");

const { WEATHER_API_KEY } = prcess.env;

exports.handler = async (event, context) => {
    const params = JSON.parse(event.body);
    const { text, units } = params;
    const regex = /^\d+$/g;
    const flag = regex.test(text) ? "zip" : "q";
    const url = `https://api.openweathermap.org/data/2.5/weather?${flag}=${text}&untis=${units}&appid=${WEATHER_API_KEY}`;
    const encodedUrl = encodeURI(url);
    try {
        const dataStream = await fetch(encodedUrl);
        const dataJson = dataStream.json();
        return {
            statusCode: 200,
            body: JSON.stringify(dataJson)
        };
    } catch (err) {
        return {
            statusCode: 422,
            body: err.stack
        }
    }
}