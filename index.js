'use strict';
let request = require('request');
let apiKey = '4970e4f266675063af77ad454f45ebd6';


// Close dialog with the customer, reporting fulfillmentState of Failed or Fulfilled ("Thanks for using our services.")
function close(sessionAttributes, fulfillmentState, message) {
    return {
        sessionAttributes,
        dialogAction: {
            type: 'Close',
            fulfillmentState,
            message,
        },
    };
}

// --------------- Events -----------------------

function dispatch(intentRequest, callback) {
    console.log(`request received for userId=${intentRequest.userId}, intentName=${intentRequest.currentIntent.name}`);
    const sessionAttributes = intentRequest.sessionAttributes;
    const slots = intentRequest.currentIntent.slots;
    const cityName = slots.city;


    switch (intentRequest.currentIntent.name) {
        case 'temperature':
            {
                let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${apiKey}`;


                request(url, function (err, response, body) {
                    if (err) {
                        console.log('error:', error);
                    } else {
                        let weather = JSON.parse(body)
                        let message = `It's ${weather.main.temp}°C and ${weather.main.humidity}% humidity in ${cityName} !`;
                        console.log(message);

                        callback(close(sessionAttributes, 'Fulfilled', {
                            'contentType': 'PlainText',
                            'content': `${message}`
                        }));


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
}
// --------------- Main handler -----------------------

// Route the incoming request based on intent.
// The JSON body of the request is provided in the event slot.
exports.handler = (event, context, callback) => {
    try {
        dispatch(event,
            (response) => {
                callback(null, response);
            });
    } catch (err) {
        callback(err);
    }
};