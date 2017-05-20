const moment = require('moment');

var message = (from, text) => {
    return {
        from,
        text,
        createdTime: moment().valueOf()
    }
}

var geolocationMessage = (userName, lat, lon) => {
    return {
        userName,
        url: `https://www.google.com/maps?q=${lat},${lon}`,
        createdTime: moment().valueOf()
    }
}

module.exports = {message, geolocationMessage}