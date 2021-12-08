const request = require("request");

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=d2b2ce09f6c6193c06765ec737b36169&query=${lat},${long}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the location services!", undefined);
    } else if (body.error) {
      callback(
        "Unable to find coordinates! try with another search",
        undefined
      );
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions}. The current temperature is ${body.current.temperature} degrees. It feels like ${body.current.feelslike} degrees out.`
      );
    }
  });
};

module.exports = forecast;
