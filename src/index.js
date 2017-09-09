'use strict';
const Alexa = require('alexa-sdk');

const APP_ID = 'amzn1.ask.skill.c9525484-0655-441e-8cfa-13ef7fdae810';

const languageString = {
    'en': {
        'translation': {
            'SKILL_NAME': 'Alexa Print',
            'START_MESSAGE': 'Hello. Tell me what you would like to print.',
            'PRINT_MESSAGE': 'Okay. I will print',
            'TIME_MESSAGE': 'Your print has been sent to your email. It should take ',
            'STOP_MESSAGE': 'Goodbye!',
        },
    },
};

const handlers = {
    'RequestAPrint': function(){
        var thing = this.event.request.intent.slots.THING.value;
        this.emit(':tell', this.t('PRINT_MESSAGE') + thing);
    },
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.resources = languageString;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
