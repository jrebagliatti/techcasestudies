---
layout: post
title:  "Bot gives Weill Cornell clinicians fast access to medical data"
author: "Heather Shapiro, Gavin Bauman, and Andrew Reitano"
author-link: "#"
#author-image: "{{ site.baseurl }}/images/authors/photo.jpg"
date: 2017-06-15
categories: [Bot Framework]
color: "blue"
image: "images/WeillCornell/weill_show_examples_tile.png"
excerpt: A team from Weill Cornell Medicine and Microsoft built a chatbot to support the medical school's knowledge base, making searches for specific gene and cancer variations more efficient and reliable. 
language: English
verticals: [Health]
geolocation: [North America]
sticky: true
---


<img alt="IPM Logo" src="{{ site.baseurl }}/images/WeillCornell/logo.jpg" width="500">

<br/>

Microsoft joined the [Englander Institute of Precision Medicine](http://ipm.weill.cornell.edu/) (IPM) at Weill Cornell Medicine for a weeklong hackfest to develop a chatbot that supports both text and voice interactions with the [Precision Medicine Knowledgebase](https://pmkb.weill.cornell.edu) (PMKB) for clinical cancer variants and interpretations.

The knowledge base currently supports 163 genes and 518 variants with 404 clinical interpretations. Pathologists and researchers are tasked with accessing this information by clicking through the given portal; however, in an attempt to make the knowledge base more mobile, we created a bot using the Microsoft Bot Framework that connects to several channels including Microsoft Teams, Skype, Slack, and WebChat. As a result, clinicians can access this data in many different ways and make life-changing clinical decisions at a faster rate. Through the use of natural language processing (NLP) within LUIS, we were able access this data and display it for the user more quickly.

The medical school launched the PMKB Bot into production in April 2017.

>"The Microsoft team had the opportunity to attend some of our meetings, demo the bot to our pathologists at Weill Cornell Medicine and New York Presbyterian. Overall feedback was very positive, resulting in launching this publicly on our next release cycle in the coming weeks." 
>
>— Alexandros Sigaras, Research Associate in Computational Biomedicine, Weill Cornell Medicine

## Key technologies

- [Microsoft Bot Framework](https://dev.botframework.com/)
- [Web Apps feature of Azure App Service](https://azure.microsoft.com/en-us/services/app-service/web/?b=17.09)
- [Language Understanding Intelligent Service (LUIS)](https://www.luis.ai/)
- [Bing Speech API](https://www.microsoft.com/cognitive-services/en-us/speech-api)
- [Docker Linux Containers on Azure](https://docs.microsoft.com/en-us/azure/virtual-machines/linux/dockerextension)

## Customer profile ##

[Weill Cornell Medicine](http://weill.cornell.edu/) is the biomedical research unit and medical school of Cornell University, a private Ivy League university in New York. The PMKB project is run by the Englander Institute of Precision Medicine and is an actively growing open-access resource providing information about clinical cancer variants and interpretations in a structured way, enabling users to submit and edit existing entries for continued growth of the knowledge base. All changes are reviewed and vetted by cancer pathologists.

PMKB is a fully Dockerized solution running on Ruby on Rails. MySQL is the database of choice. Searches are based on Solr, an open source enterprise search engine platform built on Apache Lucene. All PMKB services currently run on-premises at Weill Cornell Medicine.

## Problem statement ##

PMKB is an open-access resource. It breaks silos so researchers and clinicians can access better clinical cancer variant and interpretation tools. Weill Cornell Medicine supports any open-source sharing approach that provides additional value to people including those outside of Weill Cornell Medicine. 

Weill Cornell Medicine thought its current environment was not accessible enough. It wanted something that would encourage researchers and clinicians inside and outside of Weill Cornell Medicine to use PMKB. The solution needed to be easy for everyone to access and use. 

## Solution overview ##

Microsoft and the Weill Cornell Medical School team used the Microsoft Bot Framework to create the PMKB bot to empower knowledge discovery on cancer for users of Weill Cornell Medicine’s Precision Medicine Knowledgebase.

The PMKB bot uses [LUIS](https://www.microsoft.com/cognitive-services/en-us/luis-api/documentation/home) to chat with users and help them find relevant clinical interpretations for specific cancer findings. 

The basic architecture for the bot can be seen below.

*Architecture diagram*

![PMKB Architecture Diagram]({{ site.baseurl }}/images/WeillCornell/PMKB_Architecture.jpg)


## Technical delivery

Weill Cornell Medicine provided the following use case scenarios for us to address.

**Basic use case scenarios examples**
- “Tell me more about EGFR.”

  A user should be able to converse with the chatbot and query PMKB on simple results about a gene, returning clinical variants and interpretations.
- “Give me interpretations on prostate cancer.”
  
  A user should be able to converse with the chatbot and query PMKB on simple results about a tumor type, returning all matching interpretations.
- “Tell me about KRAS G12D.”
  
  A user should be able to converse with the chatbot and query PMKB on simple results about variants, returning all matching interpretations.

**Complex use case scenarios examples**

- “Are there any clinical trials about this?”
  
  A user should be able to converse with the chatbot and query PMKB on more complex followup results about clinical trials related to the previous query.
- “Tell me more about KRAS mutations in bladder cancer.”
  
  A user should be able to converse with the chatbot and query PMKB on more complex questions combining genes with tumor types.

### Prerequisites

The prerequisites for this project: 
 
- Install [Visual Studio](https://www.visualstudio.com/) or [Visual Studio Code](https://code.visualstudio.com/). Because this project was written in Node.js, we used Visual Studio Code.
- Install [Bot Framework SDK](https://docs.botframework.com/en-us/downloads/).
- Obtain [Cognitive Services keys](https://www.microsoft.com/cognitive-services/en-us/sign-up).
- Sign up for an [Azure subscription](https://azure.microsoft.com/en-us/free/).

These are the steps we took to build the easy-to-access solution: 

1. [Customizing the experience and use cases](#customizing-the-experience-and-use-cases)
2. [Creating dialog trees](#creating-dialog-trees)
3. [Connecting to the PMKB API](#connecting-to-the-pmkb-api)
4. [Building and training Luis](#building-and-training-luis)
5. [Adding speech-to-text capability](#adding-speech-to-text-capability)
6. [Integration with Skype, WebChat, Slack, and Microsoft Teams](#integration-with-skype-webchat-slack-and-microsoft-teams)
7. [Creating a Dockerized solution](#creating-a-dockerized-solution)

### Customizing the experience and use cases ###

The purpose of the PMKB bot is to assist pathologists, clinicians, and computational biologists looking for cancer interpretations. As these are usually time-sensitive searches, the users must be able to quickly retrieve these results.

We created the web app using the Node.js SDK. The bot is registered on Skype, Microsoft Teams, Slack, and basic WebChat.

We used the [UniversalBot](https://docs.botframework.com/en-us/node/builder/chat-reference/classes/_botbuilder_d_.universalbot.html) class to form the bot "brains." This class manages all of the user-bot conversations. We implemented the [ChatConnector](https://docs.botframework.com/en-us/node/builder/chat-reference/classes/_botbuilder_d_.chatconnector) class so the UniversalBot could speak with either the Bot Framework emulator or any of the bot connector-supported channels.

```
// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});
  
// Create chat bot
var connector = new builder.ChatConnector({
    // appId: process.env.MICROSOFT_APP_ID,
    appId: null,
    appPassword: null
    // appPassword: process.env.MICROSOFT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());
```

<br/>

The appId and appPassword were retrieved from the [developer portal](http://www.botframework.com/); when we tested locally, we used null values.

When a user is added to the bot conversation, the bot will automatically say hello and explain what it can do. It also adds a disclaimer: the user must assume full responsibility for all risks associated with the PMKB Bot. Healthcare providers and patients must integrate all clinical and laboratory findings as well as information from a variety of sources before deciding on appropriate clinical care options.

```
bot.on('conversationUpdate', (message) => {
    if (message.membersAdded) {
        message.membersAdded.forEach((identity) => {
            if (identity.id === message.address.bot.id) {
                var hello = new builder.Message()
                    .address(message.address)
                    .text(prompts.greetMsg);
                bot.send(hello);
                bot.beginDialog(message.address, '*:/');
            
    }
})}});

bot.dialog('/', [
    (session)=>
    {
        session.send(prompts.helpMsg),
        session.send(prompts.disclaimerMsg)
        session.beginDialog('help');
}]).triggerAction({matches: /(^hello)|(^hi)/i});
```

### Creating dialog trees ###

The bot dialog flow was created so dialogs could be reused and called upon from the user or LUIS intent matches.

Before training LUIS, we wanted to make sure the bot's basic functionality worked so that we could determine which intents were necessary.

The bot uses a sequence of [waterfall dialog](https://docs.botframework.com/en-us/node/builder/chat/dialogs/#waterfall) steps to collect user input. In the Bot Builder Node version, the waterfalls drive this back-and-forth flow. This process guides the conversation and the user's response is passed to the input of the next waterfall step.

The user is able to access any of the dialogs throughout the conversation. We added [triggerActions](https://docs.botframework.com/en-us/node/builder/chat-reference/classes/_botbuilder_d_.dialog.html#triggeraction) that will wait for a specific LUIS intent or phrase to interrupt the conversation and start the called dialog.

The user has the choice of either typing or speaking to the bot and the use cases can be seen below.

![PMKB Use Cases]({{ site.baseurl }}/images/WeillCornell/pmkb_use_cases.jpg)


### Connecting to the PMKB API ###

Given the knowledge base extent, we planned to connect their MySQL database to Azure Search and use that to query the results. We used the [SQL Server Migration Assistant](https://docs.microsoft.com/en-us/sql/ssma/sql-server-migration-assistant) to migrate the PMKB database from MySQL to SQL and pushed it to an Azure SQL database. After creating the Azure Search template, we found the PMKB API could handle more robust use cases; relational information from multiple tables could be queried together.

Initially only shared internally, the Weill Cornell Medicine team worked on the PMKB API to make it available at their next production cycle.

### Building and training LUIS 

A good natural language model includes intents of what the user might say in order to trigger a response. While the bot does give the users the option to click a button, they should also be able to type into the chatbot and expect the same result. 

LUIS allows developers to store a set of example utterances that are associated with an intent. Working with the Weill Cornell Medical School team, we hand-coded and trained LUIS to answer certain questions. 

Doctors and researchers can ask for thousands of different gene mutation variation combinations and use cases. Unfortunately, there is no consistent label structure, so we could not use a basic regex. 

To be able to train LUIS to recognize gene, mutation, tissue, and tumor sites, we followed the steps below:

1. In order to maximize efficiency and not throw out any work later, a best practice is to create the dialog flow that the bot will follow before creating LUIS intents. We had triggers against specific words and phrases, which we could then replace with LUIS intents after all functionality was completed.

    For instance, when a user joins the conversation, the user is greeted by the bot with the help menu and a disclaimer as seen in the code below.

    ```
    bot.on('conversationUpdate', function (message) {
    if (message.membersAdded) {
        message.membersAdded.forEach(function (identity) {
        if (identity.id === message.address.bot.id) {
            const greeting = new builder.Message()
            .address(message.address)
            .text(prompts.greetMsg);
            bot.send(greeting);
            bot.beginDialog(message.address, '*:disclaimerStart');
        }
        });
    }
    });
    ```

    The user is also able to greet the bot even after this, so we wanted the bot to respond appropriately and start a new dialog. Initially, we had the dialog triggered by the words "hello", "hi", and "help". Once the LUIS model was created, we could replace this with the "Greetings" intent.

    ```
    // Hello message
    bot.dialog('hello', [ 
        function (session) {
            session.send(prompts.greetMsg);
            session.beginDialog('disclaimerStart');
        }
    ]).triggerAction({matches:/(^hello)|(^hi)|(^help)/i});
    ```

2. We created intents in the LUIS portal with a few utterances for each. 

3. We then exported the JSON file from the portal so that we could add on our list of utterances and reupload them back to a new app in the portal. 

4. We wrote a script to take all genes and mutations, put them into separate utterances, and imported the JSON file we just created with utterances to the LUIS site. We started by creating a list with 500 utterances and then expanded to more than 5,000 utterances with different possible statements that the user might say. The different genes, tumor sites, cancers, and so on were labeled as entities to be uploaded.

5. We imported the JSON file with the complete list of utterances, intents, and entities to a new LUIS app.

    ![Training LUIS]({{ site.baseurl }}/images/WeillCornell/LUIS.PNG)


    By adding natural language understanding, the user could ask the following questions and still get all interpretations for that query:
    
    - “Tell me more about EGFR.”
    - “Give me interpretations on Prostate Cancer.”
    - “Tell me about KRAS G12D.”
    - “Tell me more about KRAS mutations in bladder cancer.”

6. We then replaced the expressions in the trigger actions in each dialog with the names of the LUIS intents.

    ```
    bot.dialog('find gene',
      function (session, luisResults) {
        session.sendTyping();
        makeQuery(luisResults, function (err, query) {
          if (err)
            return session.endDialog(err.message);
          pmkbClient.searchInterpretations(query.value, function (err, interpretations) {
            if (err)
              return session.send(err.message);
            console.log(query)
            makeInterpretationCards(interpretations, session, query, function (err, cards) {
              let reply = new builder.Message(session)
                .text('Found ' + interpretations.length + ' interpretations for ' + query.value)
                .attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments(cards);
              session.endDialog(reply);
            });
          });
        });
      }).triggerAction({matches: "findGene"});  
    ```

<br/>

By labeling  entities, we were able to make more complex PMKB API search queries.

<img alt="LUIS Use Cases" src="{{ site.baseurl }}/images/WeillCornell/LUIS_use_case.PNG" width="600">


### Adding speech-to-text capability ###

At the time of the hack, bot speech integration was available only for the Skype Channel. There are many times when pathologists and researchers would prefer to ask their questions verbally instead of typing them. In order to make the bot more accessible, we created a speech-to-text solution; once the user chose the recording option, we passed the .wav file to Bing Speech API, and returned the generated text to the user to confirm this is what was said.

In this workaround, when the user clicks the 'Record' button, the bot triggers a command-line function asking SOX to record.

```
bot.dialog('doRecording', [
  function(session){
    session.send("Recording");
    const exec = require('child_process').exec;
    const child = exec('sox -t waveaudio default new.wav trim 0 4',
          (error, stdout, stderr) => {
              console.log(`stdout: ${stdout}`);
              console.log(`stderr: ${stderr}`);
              if (error !== null) {
                  console.log(`exec error: ${error}`);
              }
              session.beginDialog("thinking");
    });
   
  }
]);
```

<br/>

After a user recording, recorded for four seconds, the sound file is passed to the Bing Speech to Text API for transcription. The API response is returned to the user, asking for confirmation of what was said.

Below is an example conversation using the recording option.

![Speech Recording Example]({{ site.baseurl }}/images/WeillCornell/record_example.png)

<br/>

This solution only works locally due to client-side restrictions, but by adding functionality to their current PMKB website, clients can have site microphone access and record the user.

### Integration with Skype, WebChat, Slack, and Microsoft Teams ###

We used GitHub Continuous Integration to publish the messaging API to an Azure web app. Using the Microsoft Bot Framework dashboard, we configured the bot with multiple channels, including WebChat, Skype, Slack, and Microsoft Teams. 

The PMKB Bot has already been [published](http://bots.botframework.com/bot?id=pmkb), thus enabling all doctors and researchers to access its resources.

Below is an example of the Show Example Dialog calling the Find Gene Dialog.

![Demo gif]({{ site.baseurl }}/images/WeillCornell/demo.gif)


### Creating a Dockerized solution ###

Docker provides a containerized architecture that simplifies deployment of software solutions to any platform. By leveraging Docker, we were able to test and run the PMKB bot on both Azure and Weill Cornell Medicine on-premises resources.

To reduce deployment time, we created a Dockerfile and connected the Git repository to Docker, resulting in Docker automated builds with every Git commit.

The Dockerfile can be seen below:

```
FROM node:7.7.4
MAINTAINER Alexandros Sigaras <als2076@med.cornell.edu>
#===============================#
# Docker Image Configuration    #
#===============================#
LABEL Description="PMKB Bot" \
		Vendor="Englander Institute for Precision Medicine"
WORKDIR /usr/src/app
#===================================#
# Install PMKB Bot Dependencies     #
#===================================#
COPY package.json /usr/src/app/
RUN npm install
# Bundle app source
COPY . /usr/src/app
#===================================#
# Startup			   #
#===================================#
EXPOSE 3978
CMD [ “npm”, “start” ]
```

<br/>

To launch the PMKB bot as a Docker container, you simply type:

```
docker run -d --name pmkb-bot \
--restart=always
-p ${PORT}:3978 \
--env-file ${PATH_TO_ENV_FILE}
elementolab/pmkb-hackfest
```

<br/>

Where:

- ${PORT}: External docker port.
- ${PATH_TO_ENV_FILE}: Path to env file.

![Docker Solution]({{ site.baseurl }}/images/WeillCornell/docker.png)


## Conclusion 

By the end of the hack, we were able to create a bot using the Microsoft Bot Builder Node SDK that would make it easier for cancer researchers and clinicians to search for different cancer variants from the Precision Medicine Knowledgebase. The users can interact with the bot on several different mediums so that they don't have to navigate through the website and can get the results much more quickly. With this bot, they can search for a specific gene and cancer variation and get all of the relative interpretations that are available.

- The PMKB bot was published to the bot directory in April 2017.
- The Weill Cornell Medical School is excited to leverage the bot to help cancer researchers and clinicians become more efficient while keeping the same reliability. 

![Published Bot]({{ site.baseurl }}/images/WeillCornell/published_bot.png)


### Opportunities going forward ###

PMKB is an open-access resource based on the principle of breaking the silos to empower researchers and clinicians with access to better tools. As such, Weill Cornell Medicine is supportive of any open-source sharing approaches for this effort that will provide additional value to people not limited to Microsoft and Weill Cornell Medicine.

There are plans to connect the bot to clinical research trial APIs. There are several open source APIs from the National Institutes of Health (NIH) that could be leveraged to give the pathologists and researchers the most recent trials for specific ailments and genes.

We plan to add final touches to the GitHub project to help the community build their own bot.

## Team

- [Alexandros Sigaras](https://twitter.com/AlexSigaras) – Research Associate in Computational Biomedicine, Weill Cornell Medicine
- [Michael Mienko](https://twitter.com/MMienko) – Programmer, Weill Cornell Medicine
- Linda Huang - Bioinformatics Analyst, Weill Cornell Medicine
- [Heather Shapiro](https://twitter.com/microheather) – Technical Evangelist, Microsoft
- [Gavin Bauman](https://twitter.com/gavination2) – Technical Evangelist, Microsoft
- [Andrew Reitano](https://twitter.com/batslyadams) – Technical Evangelist, Microsoft

![Group Photo]({{ site.baseurl }}/images/WeillCornell/team_photo.jpg)

