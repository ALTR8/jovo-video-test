'use strict';

// =================================================================================
// App Configuration
// =================================================================================

const {App} = require('jovo-framework');

const config = {
    logging: true,
};

const app = new App(config);
const video = require('../data/videos.js');

app.enableRequestLogging();

// =================================================================================
// App Logic
// ================================================================================

app.setHandler({
    'LAUNCH': function() {
        !this.user().data.name ? this.toIntent('NewUser') : this.toIntent('MyNameIsIntent');
        // console.log(listBuilder());
    },

    'NewUser': function() {
        this.ask('Hello New User! What\'s your name?', 'Please tell me your name.');
    },

    'MyNameIsIntent': function(name) {
        this.user().data.name ? this.user().data.name : this.user().data.name = name.value
        this.ask('Hey ' + this.user().data.name + ', Would you like to see a video?');
    },

    "AMAZON.YesIntent": function() {
        this.toIntent('showList')
    },

    'showList': function() {
        let listTemplate1 = this.alexaSkill().templateBuilder('ListTemplate1');
        listTemplate1
            .setTitle('Gary Videos')
            .setToken('token')
            .addItem(
                video[0].token,
                {
                    description: video[0].description,
                    url: video[0].url,
                },
                video[0].primaryText,
                video[0].secondaryText,
                video[0].tertiaryText
            ).addItem(
                video[1].token,
                {
                    description: video[1].description,
                    url: video[1].url,
                },
                video[1].primaryText,
                video[1].secondaryText,
                video[1].tertiaryText
        ).addItem(
            video[2].token,
            {
                description: video[2].description,
                url: video[2].url,
            },
            video[2].primaryText,
            video[2].secondaryText,
            video[2].tertiaryText
        ).addItem(
            video[3].token,
            {
                description: video[3].description,
                url: video[3].url,
            },
            video[3].primaryText,
            video[3].secondaryText,
            video[3].tertiaryText
        );
        this.alexaSkill().showDisplayTemplate(listTemplate1);
        this.ask('look! It is a list full of things! Which would you like to choose?')
    },

    'ShowVideoIntent': function(token) {
        console.log(token.value);
        let videoIndex = (token.value) -1
        console.log(videoIndex);
        this.alexaSkill().showVideo(video[videoIndex].videoLink);
    },

    'ON_ELEMENT_SELECTED': {
        'video1': function() {
            this.alexaSkill().showVideo(video[0].videoLink);
        },
        'video2': function() {
            this.alexaSkill().showVideo(video[1].videoLink);
        },
        'video3': function() {
            this.alexaSkill().showVideo(video[2].videoLink);
        },
        'video4': function() {
            this.alexaSkill().showVideo(video[3].videoLink);
        }
    },

    "AMAZON.NoIntent": function() {
        this.toIntent('End')
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
