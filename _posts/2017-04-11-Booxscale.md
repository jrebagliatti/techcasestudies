---
layout: post
title:  "Booxscale and Microsoft build a bot for their customer Taxicode"
author: "Amy Nicholson"
author-link: "https://twitter.com/AmyKateNicho"
date: 2017-06-14
categories: [Bot Framework]
color: "blue"
image: "images/Booxscale/booxscale-logo-white.png"
excerpt: This article discusses the Booxscale Taxicode Bot that allows customers to order taxis quickly and easily from within the messaging channels they are already using.
language: [English]
verticals: [Retail & Consumer Goods, Hospitality & Travel]
geolocation: [Europe]
---

Booxscale is "The Marketplace of Marketplaces" creating a transaction platform for on-demand businesses to surface their websites, apps, and technologies for their users.  

Booxscale's main aim during this development workshop was to work with their customer Taxicode to build out a solution that searches for and books a taxi via a bot interface. The key focus was to create a solution that was easy to use and provided a great user experience, allowing users to quickly complete this task while keeping them informed of booking progress and confirmation during all stages of the booking process.

Booxscale worked with Microsoft in a four-day development workshop to utilize the Microsoft Bot Framework (Node.js) to create a taxi-ordering bot that was accessible via the conversational channels in both Skype and Facebook Messenger. The bot can either guide (decision-tree) the user through the process of ordering a taxi (destination, pickup time, and price) or allow the customer to use natural language to query the bot with phrases such as *"Can I have a taxi from London Euston Station to the Microsoft office, London Paddington at 2:00 PM tomorrow?"* To evaluate this text, the Booxscale team implemented a LUIS model by using Microsoft Cognitive Services.

### Technologies used

* [Microsoft Bot Framework (Node.js)](https://dev.botframework.com/)
* [Microsoft Cognitive Services Language Understanding Intelligent Service (LUIS)](https://www.luis.ai/)
* [Google Maps API](https://developers.google.com/maps/)
* [Taxicode API](https://api.taxicode.com/)

#### Channels

* [Facebook Messenger](https://docs.botframework.com/en-us/channel-inspector/channels/Facebook?f=Location&e=example1)
* [Skype](https://dev.skype.com/bots)

### Core team

* [Amy Nicholson](https://twitter.com/AmyKateNicho) – Technical Evangelist, Microsoft
* [Lilian Kasem](https://twitter.com/liliankasem) – Technical Evangelist, Microsoft
* Nejc Penko – CTO, Booxscale
* Jure Zvelc – Senior Developer, Booxscale
* Primoz Skerget – Senior UX/Product, Booxscale
* Max Moore – CEO & Co-Founder, Booxscale
* Stylianos Panagakos – Developer, Taxicode

  <img alt="Team photo" src="{{ site.baseurl }}/images/Booxscale/teamphoto.jpg" width="400">

<br/>

## Customer profile

### Booxscale
 
![Booxscale logo]({{ site.baseurl }}/images/Booxscale/booxscale-logo-white.png)

<br/>

[Booxscale](https://www.booxscale.com/)'s mission is to create the next generation transaction platform of aggregated on-demand businesses to surface within publisher websites, directories, apps, and technologies. One example is via surfacing instant book buttons at the right time and placing them within consumers' mobile, web, and app journeys. Booxscale sees *bots* as a powerful new offering within the marketplace for their customers (businesses) to offer to consumers. 

At the development workshop, Booxscale worked with their customer Taxicode.

### Taxicode

<img alt="Taxicode logo" src="{{ site.baseurl }}/images/Booxscale/taxicode-logo.png" width="300">

<br/>

[Taxicode](https://www.taxicode.com/) enables users to book journeys in the UK with approved fixed prices, reliable taxis, minibuses, and coach companies. They offer dedicated account managers and telephone support for their customers, maintaining a 96% customer satisfaction rating from the partners they work with. Their services are available nationwide in the UK (10,000+ minicabs, minibuses, and executive, chauffeur, and coach companies).

 
## Problem statement

Booxscale worked with Taxicode to create a chat bot for release within Booxscale's Marketplace. Booxscale wants to show that it's possible to create compelling experiences for users in the technology channels they are already using (such as Skype and Facebook Messenger) by using the Microsoft Bot Framework. 

Currently, to book a taxi a user needs to visit the Taxicode website, download an app, and then begin the booking process (via drop-down boxes and text). 

The aim of the bot solution is to shorten the length of time it takes a user to complete a taxi booking, allowing them to use the bot in a frictionless way by booking a taxi in the same relaxed, seamless manner that they may use when chatting with a friend. 

The main areas of focus in this solution are ease of use, time to complete transaction, constant feedback on progress, and clarification through the process so the user does not feel lost at any point in the transaction.

This problem statement covers the following three areas that Booxscale tries to address in all its Marketplace offerings (also highlighted in the following diagram):

- Maps and location: geographical/local integrations
- Programmatic booking buttons: performance-based lead generation and conversions
- Chat, bot, and AI integrations: conversation as a platform (CaaP)

 ![Booxscale Marketplace Integrations]({{ site.baseurl }}/images/Booxscale/marketplaceintegrations.PNG)
 
 <br/>
 
## Solution and steps

To solve the problem statement, the team set out first to understand the best design and flow of a bot, to make sure they were staying true to the ease and simplicity of the use goal. Some of the questions that were discussed during this initial stage were:

* What is the minimal user input we need to show results? 
* How can we guide the user through the process with an easy to understand flow and questions? 
* How can we make sure that we understand as much as possible even when: 
    * The format of the user input is different than expected? 
        * "London" 
        * "Can I book a taxi to London?" 
        * "I need a taxi in London"
    * The input is not what is currently expected? 
        * __Bot:__ "Where should we pick you up?" 
        * __User:__ "Can you pick me up tomorrow at 9:00 AM?" 
        * __Bot:__ "Sure! Where from?" 
* How can we make sure that we give users the option to change any of the "parameters" at any time and have the support to detect that on the bot side? 
* How can we understand the various types of user input at any time, and avoid building a "command bot"? 
    * Fictitious scenario we wanted to avoid: 
        * __Bot:__ "Please enter the destination" 
        * __User:__ "Microsoft HQ" 
        * __Bot:__ "Sorry, I don’t understand that, give me the exact coordinates, separated by a comma?" 
        * __User:__ "51.46,-0.92" 
        * __Bot:__ "Sorry, the coordinates must have at least three decimals"

<img alt="Learnings" src="{{ site.baseurl }}/images/Booxscale/learnings.jpg" width="400">

<br/>

Following is a list of our key solution deliverables:

* The minimal information needed from the customer to book/search for appropriate services are destination, pickup location, and pickup time.
* The bot will be built using the Microsoft Bot Framework.
* The main conversational channels will be Skype and Facebook Messenger.
* The bot must be able to understand a user's intent from all sorts of unexpected input, so LUIS will be used for building a model around destinations, pickups, and time of day.
* The user must be able to edit the parameters entered, which can be completed through confirmation cards with buttons to accept or change the value shown.
* While the bot is calling out to the Taxicode API to get results, the user must be kept updated on what is happening.

### Architecture diagram

The following architecture diagram shows the technologies used within the architecture as well as the logical flow of the system.

 ![Main Architecture Diagram]({{ site.baseurl }}/images/Booxscale/booxscale_tech_arch.PNG)

<br/>

To further explain this architecture diagram, it is split out into three sections: **Intelligence layer**, **Bot Framework**, and **Channel layer**. The following descriptions illustrate the high level technology used in each layer. The technical details of the implementation are described in the **Technical delivery** section later in this document.

#### Intelligence layer

The intelligence layer allows the bot to call out into all the sources of data (Taxicode API), location information (Google Maps API), and natural language processing understanding (LUIS) that it needs to perform the user's request to book a taxi. The intelligence layer could be expanded or reused. For the Taxicode Bot, other intelligence services, sources of information, or analytics could very easily be implemented into the bot via APIs. For Booxscale's wider work on bots, this architecture could be repeated across customers and pull in the necessary intelligence sources needed to complete a specific task; for example, for a customer support bot they might want to add sentiment analysis instead of mapping functionality.

#### Bot Framework (Node.js)

The team used the Bot Framework Node.js SDK to build out their project. They were able to quickly get started building up functionality via libraries and separate dialog functionality for optimal reuse of code.

 ![Code Structure Diagram]({{ site.baseurl }}/images/Booxscale/codestructure.PNG)
 
 <br/>

#### Channel layer

The channels implemented included Skype and Facebook Messenger; however, this layer of the architecture is expendable and can be evaluated after the bot is in production use within a channel to obtain user-related data on bot and platform utilization. A great resource used to test functionality on each platform was the [Microsoft Bot Framework Channel Inspector](https://docs.botframework.com/en-us/channel-inspector/channels/Facebook?f=Location&e=example1).

### System flow and business logic

The following diagram shows the logical flows through the system when a customer interacts with the Taxicode Bot.

#### Orange route

1. A user opens a conversation with the bot.
2. The bot provides a welcome message and next steps to take, along with example input to try.
3. The user is asked by the bot for the destination they would like to go to.
4. The user responds and the bot confirms it has understood the destination correctly (providing a Google Maps visual).
    * __IF__ the bot is correct __THEN__ the user confirms the input and moves to the next step.
    * __IF__ the bot is incorrect __THEN__ the user opts to change the destination and searches again.
5. Next, the user is asked for their pickup location and the same flow as earlier is repeated.
6. After the user is happy with the destination and pickup, they are asked for 'when' they would like to be picked up and again offered an example input format.
7. The bot then returns cards with images and details, including price and a simple button to **Book Now**.
8. After the button is clicked, the user is transferred to the website to complete the transaction.

#### Green route

1. A user opens a conversation with the bot.
2. The bot provides a welcome message and next steps to take, along with example input to try.
3. The user is asked by the bot for the destination they would like to go to.
4. The user responds with a full query *"I want to go to London Paddington from London Kings Cross Station tomorrow at 8:00 AM"*.
5. The bot then evaluates the query by using LUIS and asks for confirmation from the user that the destination, pickup, and time have been interpreted correctly.
6. After the user confirms or edits any of the parameters, the bot goes off to search for applicable cars to book and provides a message to let the user know the bot is searching now.
7. The bot then returns cards with images and details including price and a simple button to **Book Now**.
8. After the button is clicked, the user is transferred to the website to complete the transaction.

 ![Logic Architecture Diagram]({{ site.baseurl }}/images/Booxscale/conversationflow.PNG)

<br/>

## Technical delivery

The key components in the Taxicode Bot delivery were features that would allow the user ease of use, language understanding, a bot personality, and constant updates on what was happening and how to get help. In the next section we will talk through the implementation of these features that helped the Booxscale team achieve the problem statement goals. The team built the bot by using the Bot Framework Node.js SDK along with calling other APIs such as Google Maps, Taxicode, and LUIS.

### Prerequisites for solution 

* Install [Visual Studio Code](https://code.visualstudio.com/) and [Bot Framework Node.js SDK](https://github.com/Microsoft/BotBuilder/tree/master/Node).
* Obtain Cognitive Services keys for [LUIS](https://www.luis.ai/home/index).
* Obtain [Google Maps API keys](https://developers.google.com/maps/get-started/).


### Welcoming the user and introducing the bot personality (Bot Framework)

The team felt it was important to keep the brand of Taxicode in the bot and have it be a quick, easy offering to use as well as a nice experience for the customer. The Booxscale team used the [Language understanding Node documentation](https://docs.microsoft.com/en-us/bot-framework/cognitive-services-bot-intelligence-overview#language-understanding) as well as viewing the [LUIS.ai MVP Session](https://channel9.msdn.com/Events/UKDX/March-Uk-Hack-Fest/Luis-AI) from the hackfest. 

The first implementation point was to add a welcome message after the bot is initiated. At this stage the code also sets up the `privateConversationData` variables so that a small amount of user data throughout the session can be stored for when the Taxicode API is called.

```javascript
    bot.dialog('/', [
        (session) => {
            session.privateConversationData.outputData = {};
            session.privateConversationData.inputData = {};
            session.privateConversationData.dialogs = {};

            session.send('Hi! I\'m TaxiCodeBot! (y)');
            session.beginDialog('destination');
        },
    ]);

```

<br/>

When you first work with any bot, you need to have an idea of where it wants you to start the conversation. Therefore, the Booxscale team added in functionality to help start the conversation and prompt the user with possible inputs they could use (note that the user is not bound to this specific input).

```javascript
    let steps = require('../lib/steps');

    module.exports.register = (bot) => {
        bot.dialog('destination', [
            ...steps.startLuis('destination', 'pickup', ['Where would you like to go?', 'Try typing in something like \'Abbey Road in London\'. If you would like to have the exact location try typing in the whole address.']),
            ...steps.location(),
            ...steps.end()
        ]).triggerAction({matches: 'Change destination'});
    };

```

<br/>

These two small integrations enable new customers to easily use the Taxicode Bot without having to learn how.

 ![Welcome and input prompts]({{ site.baseurl }}/images/Booxscale/introduction.PNG)

<br/>

### Using Hero Cards and other features to reduce typing (Bot Framework)

[Hero cards and buttons](https://docs.microsoft.com/en-us/bot-framework/dotnet/bot-builder-dotnet-add-media-attachments) are a great way to reduce the amount of typing needed in bots to accomplish a simple task. In addition, they provide rich information and tailored next steps for users so they know what the next step is in the process to achieve their goal (such as booking a taxi).

```javascript
            msg.addAttachment(
                new builder.HeroCard(session)
                    .text(args.question)
                    .buttons(buttons)
            );
            session.send(msg);

```

<br/>

 ![Buttons and Cards]({{ site.baseurl }}/images/Booxscale/buttons_cards.PNG)

<br/>

The team found this session about [Cards and Attachments in Bots](https://channel9.msdn.com/Events/UKDX/March-Uk-Hack-Fest/Cards-and-Attachments) very helpful.

### Giving the user flexibility (Bot Framework)
If the user would like to change the variables (for example, an address may have been interpreted in a different way), always provide the option to quickly confirm or change the stored parameter to send to the Taxicode API. 

```javascript
bot.recognizer({
    recognize: function (context, done) {
        let intent = {score: 0.0};
        if (context.message.text) {
            switch (context.message.text.toLowerCase()) {

                case 'hi':
                    if (context.privateConversationData.inputData) {
                        intent = {score: 1.0, intent: 'Show menu'};
                    }
                    break;

                case 'change destination':
                    context.privateConversationData.isChange = true;
                    context.privateConversationData.previousDialog = context.privateConversationData.currentDialog;
                    delete context.privateConversationData.inputData.destination;
                    delete context.privateConversationData.outputData.destination;
                    intent = {score: 1.0, intent: 'Change destination'};
                    break;

                case 'change pickup':
                    context.privateConversationData.isChange = true;
                    context.privateConversationData.previousDialog = context.privateConversationData.currentDialog;
                    delete context.privateConversationData.inputData.pickup;
                    delete context.privateConversationData.outputData.pickup;
                    intent = {score: 1.0, intent: 'Change pickup'};
                    break;

                case 'change time':
                    context.privateConversationData.isChange = true;
                    context.privateConversationData.previousDialog = context.privateConversationData.currentDialog;
                    delete context.privateConversationData.inputData.time;
                    delete context.privateConversationData.outputData.time;
                    intent = {score: 1.0, intent: 'Change time'};
                    break;
            }
        }
        done(null, intent);
    }
});
```

<br/>

This code then calls into the `destination.js` file to continue that dialog thread with the user and produce the location cards.

```javascript
.triggerAction({matches: 'Change destination'});
```

<br/>

 ![Change Parameter]({{ site.baseurl }}/images/Booxscale/changevariable.PNG)

<br/>

### Keeping the user in the loop (Bot Framework)
Because the final call off to the Taxicode API can be retrieving and searching for a lot of data, the key thing here was to make sure the user knows that the bot has understood the request and is working on it. The team implemented the `sendTyping` feature and a friendly message to let the user know it will only be a couple of seconds of extra waiting (for more information, see the [`sendTyping` method](https://docs.botframework.com/en-us/node/builder/chat-reference/classes/_botbuilder_d_.session#sendtyping)).

![Processing Information]({{ site.baseurl }}/images/Booxscale/processinginfo.PNG)

<br/>

```javascript
 (session, _, next) => {
            let msg = new builder.Message(session).attachmentLayout(builder.AttachmentLayout.carousel);

            session.send('Looking for your taxi. Lean back and give me a second.');
            session.sendTyping();
            let typing = setInterval(() => {
                session.sendTyping();
            }, 3000);
```

<br/>

### Allowing Random Access Navigation (RAN) and NLP interpretation (intelligence layer)

The team wanted the bot to be easy and natural to use, so another key element was to allow for the user to simply type `I want to go to London Paddington from London Kings Cross Station tomorrow at 8:00 AM` and the bot would skip all the form flow questions and jump straight to interpretation and confirmation by using LUIS. 

LUIS lets you create language models for your application to better understand intents or entities. LUIS uses pre-built models from Bing to be able to recognize entities such as places and times, which were very useful in this scenario. After your model is trained, it is deployed as an HTTP endpoint and returns easy-to-use JSON to break down and feed into your applications.

The model in the following diagrams was built in the web UI by using intents and entities.

![LUIS Intents]({{ site.baseurl }}/images/Booxscale/luis_intents.png)

<br/>

![LUIS Entities]({{ site.baseurl }}/images/Booxscale/luis_entities.png)

<br/>

The following code shows how to query LUIS and interpret the JSON that is returned.

```javascript
    // Query luis
    return new Promise((resolve) => {
        request({
            uri: `https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/<appid>?subscription-key=<appkey>&verbose=true&timezoneOffset=0.0&q=${question}`,
            method: 'GET',
            transform: (body) => {
                return JSON.parse(body);
            }
        }).then((data) => {
            let queue = [];
            let destination, pickup;
            let candidate;
            let tc;
            let isFallback = false;
            let minScore = 0.6;

            // Lower required score if both entities are found
            if (builder.EntityRecognizer.findEntity(data.entities, 'pickup') && builder.EntityRecognizer.findEntity(data.entities, 'destination')) {
                minScore = 0.4;
            }

```

<br/>

After a response is retrieved, you can pick apart the JSON to find the intents and entities and check if they are in the correctly parsed format.

```javascript
            // Find pickup candidate
            candidate = builder.EntityRecognizer.findEntity(data.entities, 'pickup');
            if (candidate && candidate.score > minScore && candidate.entity.indexOf(tc) === -1) {
                pickup = candidate.entity;
            }

            // RAN
            if (pickup && entity !== 'pickup') {
                session.privateConversationData.inputData.pickup = pickup;
                queue.push('pickup');
            }

            // Fallback to original question
            if (!pickup && entity === 'pickup') {
                pickup = question;
                isFallback = true;
            }

            // Parse pickup
            if (pickup) {
                pickup = pickup.replace(/from|to/g, '');
                session.privateConversationData.inputData.pickup = pickup;
            }
```

<br/>

These two code sections result in the following output. Given the full plain text string, the text is passed to the LUIS model to understand the intents and entities contained. If the score back from the LUIS model is higher than 0.6 (60% confidence), the bot will return the entity (for the following example the destination is inferred), and then ask for confirmation that the inference is correct.

![Full Text Search]({{ site.baseurl }}/images/Booxscale/fulltextsearch.PNG)

<br/>

## Conclusion

It was a great four days spent with the Booxscale and Taxicode teams, where they worked hard to create a production-ready Taxicode Bot that allows the user to quickly and easily order a taxi from messaging channels such as Skype and Facebook Messenger.

### Accomplishments

* Booxscale worked with the Taxicode API to create a chat bot to release within Booxscale's Marketplace. 
* Booxscale wanted to demonstrate the art of the possible with the Microsoft Bot Framework, to create compelling experiences for users within the conversational channels with which they are familiar (Skype, Facebook Messenger).
* They have improved a user's taxi booking experience by requesting manageable snippets of data, using buttons and inferences for bot-user confirmation, and utilizing messages and input prompts to produce a frictionless bot interface.
* The Booxscale team left with a newly acquired knowledge and understanding about bots and conversational design so that they can implement this skill for their other customers.

<img alt="Booxscale sketch notes" src="{{ site.baseurl }}/images/Booxscale/booxscale_sketchnotes.PNG" width="400">

<br/>

### Moving forward

* The team arrived at the development workshop with little experience using the Microsoft Bot Framework and the supporting cloud functionality, but left having received expert advice and guidance from the Microsoft team.
* The Booxscale team will now apply this knowledge to their other customer scenarios, providing integration with messaging platforms and speeding up the process of booking, ordering, and scheduling activities.
* The Taxicode Bot is ready to move to production in the coming months following user testing and further possible enhancements such as adding more search parameters, including allowing the user to select a certain gender driver and specify disabled access requirements.


## Additional resources

- [Random Access Navigation (RAN)](http://www.intwixt.com/blog/2017/2/22/guidelines-for-designing-intelligent-bots)
- [Framework/Dialog design for bots](https://chatbotsmagazine.com/design-framework-for-chatbots-aa27060c4ea3)
- [Flow and Free Text requests in a bot](https://medium.com/assist/theres-a-dozen-ways-to-order-a-coffee-why-do-dumb-bots-only-allow-one-27230542636d)
- [Bot Framework Channel Inspector](https://docs.botframework.com/en-us/channel-inspector/channels/Facebook?f=Location&e=example1)



