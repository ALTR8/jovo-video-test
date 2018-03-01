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

// =================================================================================
// App Logic
// =================================================================================
app.setHandler({
    'LAUNCH': function() {
        console.log(video);
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
        let listTemplate1 = this.alexaSkill().templateBuilder('ListTemplate1');
        listTemplate1
            .setTitle('Videos Eventually')
            .setToken('token')
            .addItem(
                video[0].token,
                {
                    description: 'Video1',
                    url: 'https://s3.amazonaws.com/vm.com-2017/wp-content/uploads/2018/02/01224621/IMG_2304-768x576.jpg',
                },
                'text',
                'and more text',
                'grrrrrr text'
            ).addItem(
            video[1].token,
            null,
            'primary text',
            'secondary text',
            'tertiary text'
        ).addItem(
            video[2].token,
            {
                description: 'Description',
                url: 'https://s3.amazonaws.com/vm.com-2017/wp-content/uploads/2017/10/02161008/Daily-Digital-Deep-Dive-Logo_Main-Logo-Black-1-120x43.png',
            },
            'primary text',
            'secondary text',
            'tertiary text'
        ).addItem(
            video[3].token,
            {
                description: 'Description',
                url: 'https://via.placeholder.com/1200x1000/ffffff/ff0000',
            },
            'primary text',
            'secondary text',
            'tertiary text'
        );
        this.alexaSkill().showDisplayTemplate(listTemplate1);
        this.ask('look! It is a list! Which would you like to choose?')
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
