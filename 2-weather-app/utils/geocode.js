const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiaWFtb2xheWVtaSIsImEiOiJjbDFud2ZwcHAwZXhwM2RtdDdiOXV6eTdiIn0.txY_l9N4Tep1-x1ufnPrXA&limit=1`

    request(url, { json: true }, (error, response) => {
        if (error) {
            callback("An error occurred while getting data from external api.", undefined)
        } else if (response.body.features.length === 0) {
            callback("Unable to find location.", undefined)
        } else {
            callback(undefined, {
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1],
                location: response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
