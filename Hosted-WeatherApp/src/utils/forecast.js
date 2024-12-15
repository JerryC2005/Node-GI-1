const request = require('postman-request')

const forecast = (lat, long, unit, callback) => {
    const url = `https://api.weatherstack.com/current?access_key=fca3cfa7dc00552fbe316283eb3d397e&query=${lat},${long}&units=${unit}`


    request({ url , json:true}, (error, { body }) => {

        let currentTemp = body.current.temperature;
        let feelsLikeTemp = body.current.feelslike;
        const units = unit === 'm' ? 'C' : unit === 's' ? 'K' : 'f';


        if(error) {
            callback('unable to connect to location services' , undefined)
        } else if (body.error) {
            callback('unable to find location, try another search', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + `. It is currently ${currentTemp}°${units} degrees out. It feels like ${feelsLikeTemp}°${units} degrees out`)
            
        }
    })
}

module.exports = forecast;