'use strict';
let request = require('request');
let apiKey = '4970e4f266675063af77ad454f45ebd6';



// --------------- Events -----------------------


// --------------- Main handler -----------------------

// Route the incoming request based on intent.
// The JSON body of the request is provided in the event slot.
exports.handler = (event, context, callback) => {
    try {

        console.log(`request received for userId=${event.currentIntent.userId}, intentName=${event.currentIntent.name}`);
        const cityName = event.currentIntent.slots.city;
        console.log("city: ", cityName)

        switch (event.currentIntent.name) {
            case 'temperature':
                {
                    let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${apiKey}`;


                    request(url, function (err, response, body) {
                        if (err) {
                            console.log('error:', error);
                        } else {
                            let weather = JSON.parse(body)
                            console.log("weather: ", weather)
                            console.log("weather: ", weather.main)
                            console.log("weather: ", weather.main.temp)
                            let message = `It's ${weather.main.temp}°C and ${weather.main.humidity}% humidity in ${cityName} !`;

                            console.log(message);

                            context.succeed({
                                "dialogAction": {
                                    "type": "Close",
                                    "fulfillmentState": "Fulfilled",
                                    "message": {
                                        "contentType": "PlainText",
                                        "content": message
                                    },
                                    "responseCard": {
                                        "version": 1,
                                        "contentType": "application/vnd.amazonaws.card.generic",
                                        "genericAttachments": [
                                            {
                                                "title": "Weather-Update",
                                                "subTitle": "temperature",
                                                "imageUrl": "https://is1-ssl.mzstatic.com/image/thumb/Purple71/v4/56/6c/10/566c1052-e56e-79b7-107c-4e97fa2f94a6/source/512x512bb.jpg",
                                                "attachmentLinkUrl": "https://is1-ssl.mzstatic.com/image/thumb/Purple71/v4/56/6c/10/566c1052-e56e-79b7-107c-4e97fa2f94a6/source/512x512bb.jpg",
                                                // "buttons": [
                                                //     {
                                                //         "text": "button-text",
                                                //         "value": "Value sent to server on button click"
                                                //     }
                                                // ]
                                            }
                                        ]
                                    }
                                }
                            });


                        }
                    });
                    break
                }

            default:
                {
                    callback(close(sessionAttributes, 'Fulfilled', {
                        'contentType': 'PlainText',
                        'content': `Can't understand`
                    }));
                }

        }
    } catch (err) {
        callback(err);
    }
};
var a = {
    "coord": {
        "lon": 67.03,
        "lat": 24.87
    },
    "weather": [{
        "id": 801,
        "main": "Clouds",
        "description": "few clouds",
        "icon": "02n"
    }],

    "base": "stations",

    "main": {
        "temp": 22,

        "pressure": 1012,
        "humidity": 64,
        "temp_min": 22,
        "temp_max": 22
    },

    "visibility": 6000,
    "wind": {
        "speed": 4.6,
        "deg": 250
    },

    "clouds": { "all": 20 },
    "dt": 1551977700,
    "sys": {
        "type": 1,
        "id": 7576,
        "message": 0.0036,
        "country": "PK",
        "sunrise": 1551923327,
        "sunset": 1551965831
    }, "id": 1174872,
    "name": "Karachi",
    "cod": 200
}