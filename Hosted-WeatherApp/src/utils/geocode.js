const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/search/geocode/v6/forward?q=' + encodeURIComponent(address) + '&access_token=pk.eyJ1IjoiamNhc3RybzE5IiwiYSI6ImNtNGg0bmM1djAzYjUybHB5ZHJiY244OTIifQ.XlB8OGn4Ll4UuW4NYcIFnA&limit=1'

    request({ url, json: true }, (error, {body}) => {

        if(error) {
            callback('unable to connect to location services', undefined)
        } else if (body.features.length === 0){
            callback('unable to find location. try another search', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].properties.coordinates.latitude,
                longitude: body.features[0].properties.coordinates.longitude,
                location: body.features[0].properties.name_preferred
            });
        }
    })
}



module.exports = geocode;