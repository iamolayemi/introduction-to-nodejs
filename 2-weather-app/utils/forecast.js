const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=e0e61eec07c1a2d1d28805bcfd18b6af&query=${latitude},${longitude}&units=f`

    request(url, { json: true }, (error, response) => {
        if (error) {
            callback("An error occurred while getting data from external api.", undefined)
        } else if (response.body.error) {
            callback("Unable to find location.", undefined)
        } else {
            callback(undefined, `${response.body.current.weather_descriptions[0]}. It is ${response.body.current.temperature} degrees out there. It feels like ${response.body.current.feelslike} degrees out there.`)
        }
    })
}

module.exports = forecast
