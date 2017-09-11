---
layout: post
title: "Using bots to promote user engagement with TuringBot"
author: "Adina Shanholtz" 
author-link: "https://twitter.com/FeyTechnologist"
#author-image: "{{ site.baseurl }}/images/authors/photo.jpg"
date: 2017-06-08
categories: [Bot Framework]
color: "blue"
image: "images/MidbossBot/MidbossBot-tile-image-440px.png"
excerpt: MidBoss is a San Francisco-based indie game company. Microsoft built a bot using the Microsoft Bot Framework and LUIS to help increase excitement and exposure for their latest game, 2064 - Read Only Memories. 
language: [English]
verticals: [Retail & Consumer Goods]
geolocation: [North America]
sticky: true
---

MidBoss is a San Francisco-based indie game company that faced the challenge of how to increase exposure and discoverability of their video games in an already over-saturated market. To garner excitement for their recently re-released game, *2064: Read Only Memories*, we brought the main character [Turing](http://readonlymemories.wikia.com/wiki/Turing) to life by using the Microsoft Bot Framework. While the TuringBot by no means passed the [sapience test](https://en.wikipedia.org/wiki/Turing_test), it did implement basic UUID-based authentication, was able to have meaningful conversations through complex dialogs, and incorporated natural language processing through LUIS. We created a great promotional tool that not only functioned for the current game edition, but is updatable for future products.
 
### Key technologies used

- [Microsoft Bot Framework (Node.js)](https://dev.botframework.com/)
- [LUIS](https://www.luis.ai/)
- [Web Apps - Azure App Service](https://azure.microsoft.com/en-us/services/app-service/web/?b=17.09)
- [Azure Table storage](https://azure.microsoft.com/en-us/services/storage/tables/)

### Core team

- [Adina Shanholtz](https://twitter.com/FeyTechnologist) – Technical Evangelist, Microsoft
- [Tobiah Zarlez](https://twitter.com/TobiahZarlez) – Technical Evangelist, Microsoft
- [Sarah Sexton](https://twitter.com/Saelia) – Technical Evangelist, Microsoft
- [Matt Conn](https://twitter.com/mattconn) – CEO, MidBoss
- [Philip Jones](https://twitter.com/ProBearCub) – Writer, MidBoss
- [Sergio Kossio](https://twitter.com/Kossio) – Tech Director, MidBoss


## Customer profile

[MidBoss](http://readonlymemori.es/) is a games and media production studio headquartered in San Francisco, California. Their projects include the acclaimed documentary *[Gaming in Color](http://gamingincolor.vhx.tv/)*, international queer gaming convention [GaymerX](http://gaymerx.com/), and the cyberpunk point-and-click adventure *[2064: Read Only Memories](http://readonlymemori.es/)*.

*2064: Read Only Memories* is a retro futuristic take on the point-and-click adventure genre that stars "Turing," a character named after Alan Turing. The game features a rich mature narrative and unique gameplay challenges hidden within the beautiful interactive pixel scenes. Released for PlayStation 4 on January 17, 2017, MidBoss still has a long way to go in reaching their potential audience. With this project, we hope MidBoss's existing and future audience will experience the TuringBot and be able to interact with this character from the game. Following is a screenshot from *2064*.

![2064 screenshot]({{ site.baseurl }}/images/MidbossBot/2064_turingHospital.gif)

<br/>

MidBoss and Microsoft have been long-standing partners, most recently partnering to put on the first [GaymerX East](http://gaymerx.com/home-2/) event in the Microsoft offices in New York City.

## Problem statement
	
As a small game studio, MidBoss faces many of the challenges that plague indie developers, especially when it comes to exposure. Because MidBoss just had a recent release, their future events, documentaries, and projects will depend on their games' successes.
 
This recent release presented an opportunity for collaboration between Microsoft and MidBoss to increase *2064: Read Only Memories* excitement and exposure. Because the main plot of the game revolves around a sentient robot with advanced AI named Turing, creating a chatbot using the Microsoft Bot Framework fits thematically into the story of the game, and also functions as a great promotional tool for the current edition of the game and future products.

>"The TuringBot that we made in Microsoft Bot Framework allows for fans of our game, as well as new players of *2064: Read Only Memories*, to engage with our main character (who happens to be a robot!) and deeper invest themselves in our game lore and world." 
> — *Matt Conn, CEO, MidBoss*


## Solution and steps ##

Microsoft and the MidBoss team used the Microsoft Bot Framework to create TuringBot, a bot based around the main character Turing from the game *2064: Read Only Memories*. 

TuringBot uses [LUIS](https://www.microsoft.com/cognitive-services/en-us/luis-api/documentation/home) to let users chat with the in-game character and talk about life in Neo-San-Francisco. TuringBot is hosted in JavaScript on the main [Read Only Memories website](http://readonlymemori.es/), and is also available in Slack and Telegram. Using simple token authentication, TuringBot remembers the same user across all clients. 

 ![General Architecture Diagram]({{ site.baseurl }}/images/MidbossBot/TuringArchitecture.jpg)

<br/>

Prerequisites for this project: 
- Install [Visual Studio](https://www.visualstudio.com/) or [Visual Studio Code](https://code.visualstudio.com/) (because this project was written in Node.JS, we used Visual Studio Code).
- Install the [Bot Framework SDK](https://docs.microsoft.com/en-us/bot-framework/resources-tools-downloads).
- Obtain [Cognitive Services keys](https://www.microsoft.com/cognitive-services/en-us/sign-up).
- Sign up for an [Azure subscription](https://azure.microsoft.com/en-us/free/).

Steps to create TuringBot:

1. [Customize the experience](#customize-the-experience).
2. [Connect to Azure Table storage](#connect-to-azure-table-storage).
3. [Build and train LUIS](#build-and-train-luis).
4. [Make complicated dialog trees meaningful](#make-complicated-dialog-trees-meaningful).
5. [Integrate with Slack, Web Chat, and Telegram](#integrate-with-slack-web-chat-and-telegram).
6. [Document LUIS maintenance and the code base](#document-luis-maintenance-and-the-code-base).

### Customize the experience

In the game, the character Turing is unable to answer questions from the user until they go through a "New User Setup." This is where Turing (and the game) learns the player's name, pronouns, and diet preferences.

We wanted to replicate this conversation flow, which served thematic purposes, as well as find out some basic information about the user before they asked any real questions.

We decided upon the following dialog flow.

![Intro Dialog Flow]({{ site.baseurl }}/images/MidbossBot/introdialog.jpg)

<br/>

When the user sends a message, it's caught by the catch-all `'/'` dialog route.

``` js
bot.dialog('/', [
    function (session) {
        getProfile(session, function (session,profile) { session.beginDialog('/ensureProfile', profile); })
    },
    function (session, results) {
        session.replaceDialog('/luis');
    }
]);
```

<br/>
 
We call the `getProfile` function, which attempts to load the user's profile from Azure Table storage. It then runs a simple function that calls the `/ensureProfile` dialog.

If the user's profile data is missing or incomplete, it will trigger Turing to begin the new user orientation with the appropriate messaging. Otherwise, it will trigger `next()` and replace the dialog with `luis`.

If the orientation is triggered, Turing will ask the user to confirm and/or fill in any missing profile data one question at a time. After the user confirms, it will then save the information to Azure Table storage.

### Connect to Azure Table storage

We initially wrote the `ensureProfile`/intro dialog without saving any of the information, only caching it by using the built-in `session.userData` after getting it to initially work.

However, we wanted to save this information outside of the conversation to a separate database for:

* Portability, to transfer the identity of one user across multiple chat platforms.
* Control, to be able to easily access the data to monitor users.
* Future expansion, to be able to store larger amounts of data in the future.

We created two tables, channelDB and userDB: 

- The channelDB table uses the chat platform `message.source` as the partition key, and the `user.id` as the row key. If the user doesn't exist, channelDB generates a universally unique identifier (`uuid`) and stores it under that partition/row key. 
- That `uuid` is used as the key for the userDB database (which stores the profile information). With channelDB, multiple pairs of platform `user.ids` link to the same userDB data for quick and efficient information reference, minimized user numbers, and less required saved data.

During the hackfest, we coded these "databases" as local JavaScript dictionaries for rapid prototyping. Data was wiped every time the server was updated, so we could focus on getting the dialogues to correctly and asynchronously retrieve and reference the data. Each function that dealt with the database used a function pointer as a parameter, and returned with the appropriate variables after the database call.

Example:

``` js
updateProfile(session.message.user.id, session.message.source, session.dialogData.profile, function (uuid) {
    session.userData.profileID = uuid;
    session.send(emote.heart + "Your profile is all set up. Ask me anything you want!\n\nYour userID is " + session.userData.profileID + ", if you forget it ask me 'userid'\n\nIf you want to start over, say 'forget me'.)")
    session.endDialog();
});
```

<br/>

After this was working, we went through the database functions and replaced references to the local dictionary with the corresponding `tableSvc.insertOrReplaceEntity` and `tableSvc.retrieveEntity` functions.

### Build and train LUIS

MidBoss and Microsoft created TuringBot so users could converse with the character Turing from MidBoss's game *2064: Read Only Memories*. 

We designed a list of expected questions people would want to ask Turing with their answers and responses. We didn't use [QnA Maker](qnamaker.ai) because we wanted to create custom responses to reside outside the scope of the knowledge base. Because we designed our own code, we could create complicated conversations. 

Working with the MidBoss team, we hand-coded and trained LUIS to answer certain user questions. We followed these steps: 

1. The MidBoss team filled out a spreadsheet with the type of query generated from the user input, and the response line delivered by TuringBot. 

	![Q/A Spreadsheet]({{ site.baseurl }}/images/MidbossBot/spreadsheet.png)

	<br/>

2. For each query and response, we created an intent in LUIS, adding as many utterances as we could think of that the user might input. 

	![LUIS Intents]({{ site.baseurl }}/images/MidbossBot/intent.png)
	
	
	<br/>

	![Utterances]({{ site.baseurl }}/images/MidbossBot/utterances.png)


	<br/>

	Typically when designing chatbots it's better to minimize possible utterances by creating buttons or guiding dialog, as to not paralyze the user with open-ended decisions. However, this scenario is unique because we were designing this experience entirely around chatting with the bot personality. 

3. After we created the intents, we updated the spreadsheet with the new utterance and added the proper response into the bot code.

	```js
	intents.matches('food?', builder.DialogAction.send(emote.turing + "Well, I can't eat food, but if I could, I'd love to try puff pastries! TOMCAT told me about a phở place that serves cream puffs with meals, but the idea of a cream puff alone excites me!"));
	```

<br/>

### Make complicated dialog trees meaningful

Users' conversations with TuringBot could have complicated dialogues. Conversations could branch in multiple directions. Responses to one Turing conversation could influence a future Turing conversation. How could MidBoss ensure these types of conversations sounded natural? 

The "Bob Ross" dialog is an example of where the user response influenced the Turing conversation. The MidBoss team polled fans to find out what kinds of questions they would ask Turing. "Do you like Bob Ross?" was a popular response. We implemented a conversation path where based on whether the user was also a fan, TuringBot would be willing to answer further questions about their favorite Bob Ross paintings. 

 ![Bob Ross Dialog Tree]({{ site.baseurl }}/images/MidbossBot/bobrossdialog.jpg)

<br/>

We ran into a number of design issues because we couldn't match a LUIS intent if the bot was still responding to a previous intent. We decided to check if the user asked about TuringBot's favorite Bob Ross painting after asking about Bob Ross as we would in a [dialog tree](https://en.wikipedia.org/wiki/Dialog_tree). That didn't solve the problem because a bot had to finish its intent response before it matched to another and (since bots are stateless), it's difficult to have dialogues influence each other, especially without nesting intents. We finely solved this problem by prompting the user if they're a Bob Ross fan, and storing the response in `session.userData`. 

```js
//"Bob Ross" dialog branch
intents.matches('bobross', [
    function (session) {
        builder.Prompts.confirm(session, emote.heart + "I love Bob Ross! Are you a fan too?");
    },

    function (session, results) {
        if (results.response) {

            session.send(emote.heart + "Delightful! I've personally committed every episode of his show, The Joy of Painting, to my personal memory!");

        }
        else {
            session.send(emote.scared + "You should consider taking the time to watch a few episodes! The way he masterfully creates entire landscapes out of nothing with just a few precise strokes is breathtaking!");
        }
        session.userData.bobross = results.response;
        session.endDialog();
    }
]);

intents.matches('bobrosspainting', [
    function (session) {
        if (session.userData.bobross) {
            builder.Prompts.confirm(session, emote.heart + "Warm Winter Day! Season 8, Episode 3. It's serene and peaceful, " +
                "and the pink hues of the sky remind me of... someone in particular. Someone I've never met! Does that make sense?");
        }
        else {
            session.endConversation(emote.angry + "Sorry, I only talk about my love of Bob Ross paintings with fellow Bob Ross lovers.");
        }
    },

    function (session, results) {
        if (results.response) {
            session.send(emote.heart + "Thank you for understanding. I think the real power of art is the way it makes us feel!");
        }
        else {
            session.send(emote.concern + "I suppose it doesn't... I think I understand why Bob Ross paints like that, though. " +
                "Just try imagining the most beautiful, peaceful paradise on Earth you can imagine. He painted so many different scenarios, I'd say there's something for everyone to be found in his work.")
        }
    }
]);
```

<br/>

Complicated dialog about general (or obscure) topics provides limited functionality as it takes time to design meaningful conversations. With this in mind, future functionality for TuringBot will center on specific topics, such as personal discussions of gender and sexuality. This type of meaningful conversation will aim to provide resources and stories to users who might be struggling with issues they're only able to discuss online. 


### Integrate with Slack, Web Chat, and Telegram

Together, the Microsoft Bot Framework workflow and the conversation service workflow configure communication channels. Each configured communication channel is unique. 

Bot Framework dashboards provides easy, illustrated instructions on how to configure each channel. Following are the details needed for the Bot Framework authentication process.

#### Slack 
1. In the Microsoft Bot Framework dashboard for a specific bot, click the **Add to Slack** button.
2. Follow the instructions listed.
	- Client ID
	- Client Secret
	- Verification Token

![SlackSteps]({{ site.baseurl }}/images/MidbossBot/SlackSteps.gif)

<br/>

*TuringBot working successfully on the Slack platform*

![SlackWorking]({{ site.baseurl }}/images/MidbossBot/SlackWorking.PNG)

<br/>

#### Web Chat
1. In your Bot Framework dashboard, click **Get Bot Embed Codes**. 
2. Open the Web Chat configuration page.

	![Web Chat 1]({{ site.baseurl }}/images/MidbossBot/WebChat1.PNG)

	<br/>

3. Follow the instructions listed.

	![Web Chat 2]({{ site.baseurl }}/images/MidbossBot/WebChat2.PNG)

	<br/>

4. Embed the iFrame source code listed here into your website's HTML.

	*TuringBot working successfully on the Web Chat platform*

	![Web Chat 3]({{ site.baseurl }}/images/MidbossBot/WebChatWorking.png)

	<br/>

Sergio Kossio (Tech Director at MidBoss) used specially hand-crafted JavaScript to make a collapsible bottom-anchored chat window on the *Read Only Memories* website. 

**HTML** 

We made three div containers: 

- Title bar
- iFrame with the TuringBot chat 
- A div that contains the title bar and iFrame 

 The iFrame styling was also slightly modified: 

- Height changed to a fixed 500 pixels (px) 
- Width changed to 100% the size of the container 
- 40 px subtracted from the top margin to hide the original TuringBot title bar inside the parent container

Finally, the HTML code was added to the website footer. 

```html
<div class=parent_div>
<div class=titlebar_div>
<img src=http://readonlymemori.es/favicon.gif> Turing Bot</div>
<div class=chat_div><iframe src="https://webchat.botframework.com/embed/Turing?s=Ch4MHSllALQ.cwA.aYI.YM1Y6PBheq6WDnUKJlYhKogn5bKMPPx5e1WjIEkr6Ak" 
style="height: 500px; width: 100%; margin-top: -40px;"></iframe>
</div>
</div>
```

<br/>

**JavaScript** 

We used jQuery functions for JavaScript. The first function toggles the sliding animation whenever the user clicks the title bar. The second function just hides the chat by default until the user clicks it, making it slide into view.

```js
<script type="text/javascript">
jQuery(".parent_div 
.titlebar_div").click(function(){$(".parent_div 
.chat_div").slideToggle();});
jQuery(".parent_div .chat_div").hide();
</script>
```

<br/>

**CSS**

The CSS contain the bot's styles: 

- `parent_div` handles positioning and styling outside of the iFrame.
- `titlebar_div` has a `cursor: pointer;` attribute, so the user knows the box in the corner is clickable.
- `chat_div` needed a `background-color` attribute because the iFrame has no background, and it made it hard to read. 

We also took into account the height of the iFrame and the margin top subtraction that we did in the HTML section.

```css
.parent_div{
background-color:#14256c;
color:#fff;
font-size:16px;
padding: 8px 4px 4px 4px;
position: fixed;
bottom: 0;
right:30px;
width:300px;
}

.titlebar_div{
 cursor: pointer;
 padding-bottom: 4px;
 }
 
 .chat_div{
 background-color:#fff;
 height:460px;
 overflow:hidden;
 }
```

<br/>

#### Telegram 
1. In the Microsoft Bot Framework dashboard, click the link that says **Add** next to the chat channel you would like to configure.
2. Follow the instructions listed.

	![TelegramSteps]({{ site.baseurl }}/images/MidbossBot/TelegramSteps.gif)
	
	<br/>

3. Enter your Telegram bot's access token in the Microsoft Bot Framework and submit to authorize.

	![TelegramSteps]({{ site.baseurl }}/images/MidbossBot/Telegram1.PNG)

	<br/>

	*TuringBot working successfully on the Telegram platform `telegram.me/TuringRomBot`*

	![TelegramSteps]({{ site.baseurl }}/images/MidbossBot/TelegramWorking.PNG)
	
	<br/>

#### Identity transfer
With their unique user ID, our Identify transfer feature allows one person to use multiple chat clients and be remembered across all platforms. 

Here are some examples of a generated user ID being transferred from Telegram to Slack to Web Chat: 

- *Telegram User ID*

	![Telegram User ID]({{ site.baseurl }}/images/MidbossBot/TelegramUserID.PNG)

	<br/>

- *Slack User ID*

	![Slack User ID]({{ site.baseurl }}/images/MidbossBot/SlackUserID.PNG)

	<br/>

- *Web Chat User ID*

	![Web Chat User ID 1]({{ site.baseurl }}/images/MidbossBot/WebUserID1.PNG)

	<br/>

	![Web Chat User ID 2]({{ site.baseurl }}/images/MidbossBot/WebUserID2.PNG)

	<br/>

### Document LUIS maintenance and the code base

Microsoft worked with Sergio Kossio, Matt Conn, and the rest of the MidBoss team to document LUIS maintenance and the code base so they could reference them after our contributions ended. Microsoft used the preferred MidBoss documentation format, and the MidBoss team set up a Google Drive document folder to store screenshots and text descriptions similar to the ones in this write-up. 

## Conclusion ##
TuringBot provides an amazing opportunity to generate excitement and exposure for *2064: Read Only Memories*, all while utilizing an incredible new technology. By integrating LUIS, creating meaningful conversations, and remembering user information, we created a great promotional tool that not only functions for the current game edition, but also can be updated for future products that also feature their star character.

It took the entire team to design TuringBot: 

- It took the developers' full-time effort to build the Azure Table storage, create custom dialogues, build and train LUIS, integrate with various clients including the MidBoss website, and create documentation. 

- The MidBoss writers worked with us to train LUIS, write dialog for Turing, and co-create the complicated dialog. Without the MidBoss writers, we would have split our focus because we would have written for TuringBot while we were coding. 

Working in tandem we were able to intertwine dialog and code. The result? A more naturally responsive bot.

### Learnings
- You can't nest LUIS calls. It would have made sense to check for the "bobrosspainting" intent inside the "bobross" intent response.  
- Although we were working with a group that had created a game heavily focused around dialog trees, the stateless design of the Bot Framework paired with the open-endedness of user input created unique and difficult design challenges. 
- By default, Node.JS on Azure looks for the `app.js` file name, not `index.js`. A minor point, but the sample code generated by the Bot Services Preview used `index.js`, and when recycling that code we initially couldn't figure out why the bot was not deploying correctly.

### Future issues

#### Security
Right now, any user can simply make [random guesses at the UUID](https://littlemaninmyhead.wordpress.com/2015/11/22/cautionary-note-uuids-should-generally-not-be-used-for-authentication-tokens/) to potentially reveal information about that user. This is an acceptable risk for MidBoss right now because they are only collecting name, location, pronouns, and diet choice. In the future (especially after Turing is programmed to have deeper conversations and memory), they will want to implement some sort of [OAuth system](https://docs.botframework.com/en-us/restapi/authentication/) to "prove" the user's identity.

## Additional resources

- [TuringBot GitHub repository](https://github.com/WeAreMidBoss/TuringBot)
