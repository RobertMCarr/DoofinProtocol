"use strict";

var Alexa = require("alexa-sdk");
var SKILL_NAME = "Doofin Protocol";
var APP_ID = "";

var RESPONSES = [
    "Robert the Doofin Lord, Authorised",
    "Stephanie Doofin Prime, Authorised",
    "Authorisation not recognised"
];

exports.handler = function(event, context, callback) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();    
}

var handlers = {
    'LaunchRequest': function () {
        this.emit('AuthoriseUser');
    },
    'AuthoriseUser': function() {
        var intent = this.event.request.intent;
        var authorisationCodeValue = intent && intent.slots && intent.slots.AuthorisationCode && intent.slots.AuthorisationCode.value;

        if(authorisationCodeValue != null) {
            if(authorisationCodeValue.toLowerCase() == "robert alpha 5"){
                var responseMessage = RESPONSES[0];
            } else if (authorisationCodeValue.toLowerCase() == "stephanie beta 4") {
                var responseMessage = RESPONSES[1];
            } else {
                var responseMessage = RESPONSES[2];
            }

            var speechOut = responseMessage;            
            this.emit(":tellWithCard", responseMessage, SKILL_NAME, responseMessage);
        }

        this.emit("AMAZON.HelpIntent");
    },
    'AMAZON.HelpIntent': function() {
        var speechOut = "Please provide authorisation code.";
        var reprompt = "One attempt remaining."
        
        this.emit(":ask", speechOut, reprompt);
    },
    'AMAZON.StopIntent': function() {
        this.emit(":tell", "Protocol deactivated");
    },
    'AMAZON.CancelIntent': function() {
        this.emit(":tell", "Protocol deactivated");
    },
}