'use strict';

// =================================================================================
// App Configuration
// =================================================================================

const {App} = require('jovo-framework');

const config = {
    logging: true,
};

const app = new App(config);


// =================================================================================
// App Logic
// =================================================================================
app.setHandler({
    'LAUNCH': function() {
        !this.user().data.name ? this.toIntent('NewUser') : this.toIntent('MyNameIsIntent');
    },

    'NewUser': function() {
        this.ask('Hello New User! What\'s your name?', 'Please tell me your name.');
    },

    'MyNameIsIntent': function(name) {
        this.user().data.name ? this.user().data.name : this.user().data.name = name.value
        this.ask('Hey ' + this.user().data.name + ', Would you like to see a video?');
    },

    "AMAZON.YesIntent": function() {
        this.toIntent('ShowVideoIntent')
    },

    "AMAZON.NoIntent": function() {
        this.toIntent('End')
    },

    'ShowVideoIntent': function() {
        this.alexaSkill().showVideo('https://s3.amazonaws.com/alexa-flash-gary/videos/It\'s%20all%20persepective_export2.mp4', 'Title', 'subtitle');
    },

    'Unhandled': function() {
        this.tell('Sorry, Can\'t help with that. Goodbye');
    },

    'END': function() {
        let reason = this.getEndReason();
        console.log(reason);

        this.tell('Goodbye!');
    },
});


module.exports.app = app;
