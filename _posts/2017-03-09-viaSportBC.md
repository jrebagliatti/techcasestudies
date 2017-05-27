---
layout: post
title: "Bots for good: Building a conversational UI for inclusive sport"
author: "Sage Franch"
author-link: "#"
#author-image: "{{ site.baseurl }}/images/authors/photo.jpg"
date: 2017-05-04
categories: [Bot Framework]
color: "blue"
#image: "{{ site.baseurl }}/images/imagename.png" #should be ~350px tall
excerpt: In February 2017, viaSport British Columbia partnered with Microsoft to build a proof-of-concept conversational interface and analytics dashboard for their newest inclusive sport initiative.
language: [English]
verticals: [Nonprofit]
geolocation: [North America]
#permalink: /<page-title>.html
---

In the relatively new space of the Bot Framework, many organizations have begun to incorporate chat bots as tools to drive sales and manage customer relations. In February 2017, viaSport British Columbia, a Vancouver-based not-for-profit with a mission to promote inclusive sport, partnered with Microsoft to build a proof-of-concept conversational interface and analytics dashboard for their newest inclusive sport initiative, the viaSport Inclusion ChatBot.

### Technologies used

- [Microsoft Bot Framework](https://dev.botframework.com/)

- [Microsoft Cognitive Services APIs](https://www.microsoft.com/cognitive-services)

    - [Language Understanding Intelligent Service (LUIS)](https://www.luis.ai/)

    - [Bing Spell Check API](https://www.microsoft.com/cognitive-services/en-us/bing-spell-check-api)

    - [Bing Web Search API](https://www.microsoft.com/cognitive-services/en-us/bing-web-search-api) 

- [Microsoft Power BI Embedded](https://azure.microsoft.com/en-us/services/power-bi-embedded/)

- [Microsoft Azure SQL Database](https://azure.microsoft.com/en-us/services/sql-database/)

- [Universal Windows Platform (UWP)](https://docs.microsoft.com/en-us/windows/uwp/get-started/universal-application-platform-guide)

### Core team

The team was comprised of developers from the Microsoft community and advised by representatives from viaSport:

- Mark Schramm – MVP, Microsoft

- Sage Franch – Technical Evangelist, Microsoft

- Sergii Baidachnyi – Principal Technical Evangelist, Microsoft

- Nastassia Rashid – Technical Evangelist, Microsoft

- Yash Manivannan – Technical Evangelist Co-op, Microsoft

- Elisabeth Walker-Young – Manager Inclusion & Sport for Life, Sport Development, viaSport

## Customer profile

[ViaSport British Columbia](http://www.viasport.ca/) was created in 2011 as a legacy of the 2010 Olympic and Paralympic Winter Games. As an independent not-for-profit organization, viaSport is tasked by the provincial government to be the lead agency responsible for promoting and developing amateur sport in British Columbia. ViaSport's purpose is to champion positive changes so that more British Columbians thrive via sport and physical activity by uniting leaders across the sector to:

- Think provincially to increase participation and performance.

- Foster excellence in order for all athletes to develop and improve their performance.

- Activate locally to enrich and energize communities.

- Leverage investment to maximize funding and revenue.

The opportunity to work with viaSport came through MVP Mark Schramm of FusionWare, who had an existing relationship with viaSport. 

## Problem statement

Currently, finding and navigating resources for sport and disability is a challenge for everyone, not just the athletes. The inclusive sport community includes active participants, parents, guardians, caregivers, sport administrators, sport club owners, provincial sport organizations, physiotherapists, recreational therapists, coaches, and officials. This resource challenge results in duplication in resource development, participants falling through the cracks, and a lost opportunity to empower British Columbians with disabilities the option to be healthy and active and pursue high performance sports.

The three main questions viaSport aims to address for its audience are:

- How to coach specific sports for people with specific disabilities

- Where people with specific disabilities can participate in specific sports

- What resources exist related to learning specific sports, geared towards people with specific disabilities

Because of the complex and customized nature of these questions, viaSport needs a rich and targeted solution that will allow them to serve their audience.

### Customer testimonial

“To see this chat bot come to fruition and evolve over the last few days was awe-inspiring. [The development team’s] attention to detail, high standards, and quality control were noted. I feel quite fortunate to have connected to Microsoft through [this project]. The viaSport Inclusion ChatBot is going to be innovative for our sector. There is a strong possibility of positively impacting the lives of a lot of people with and without disabilities in becoming more active and more inclusive through physical activity and sport. You will have played a big role in that.” —Elisabeth Walker-Young, Manager Inclusion & Sport for Life, viaSport British Columbia

## Solution and steps

The objective of the project was to build an intelligent chat bot to simplify the search for resources, allowing coaches, sport leaders, and participants in all sports to provide appropriate programming and services to athletes with a disability. By simplifying the navigation of resources and identifying gaps, viaSport will see more inclusive programs come to fruition, and more coaches become trained in working with those with a disability. This bot will be the catalyst for more people with a disability participating locally, regionally, provincially, and nationally, and at all levels whether it be in a playground, a school yard, a local sports team, or increased participation on one of the Canadian teams. 

To address viaSport's goals, the following technical goals were pitched:

1.  Implement Language Understanding Intelligent Service (LUIS) for context-based conversation to collect missing information in the original query.

    -   Streamline bot communication and information gathering by using LUIS.

2.  Implement rules and learning to identify unaccepted, offensive, or outdated terms used by user, and always respond with correct terminology. Example: guest says “hearing impaired”; reply with correct terminology “hard of hearing.”

    -   Varying response to relieve repetitiveness.

    -   Stretch: implement [Cognitive Services Emotion API](https://www.microsoft.com/cognitive-services/en-us/emotion-api) to gauge user response.

3.  Implement Power BI for analytics.

    -   Generate reports on intent completion with success/failure percentages.

    -   App insights to provide statistics on usage.

<br/>

In addition to the above core goals, additional stretch goals were also set:

1.  Add value to Bot conversations. 

    -   Accomplished:

        -   Implement a default handler for new intents.

        -   Improve content of cards to add more value. 

        -   Collect user feedback. 

        -   Implement depluralization to simplify database. 

        -   Use Bing Spell Check API. 

    -   Future:

        -   Use resource ranking to deliver best resources first.

        -   Use Text Analytics API to gauge user response with sentiment analysis; add "do you find these resources helpful?" 


2.  Implement voice capabilities (partly accomplished).

    -   Use [Bing Speech API](https://www.microsoft.com/cognitive-services/en-us/speech-api). 

    -   Create UWP bot client.


3.  Improve the administrator app. 

    -   Accomplished:

        -   Secure database – Make sure that the current database (and any necessary enhancements) are secure. 

    -   Future:

        -   Add ability to retrain LUIS model outside of the portal. 

        -   Possible migration to Xamarin or the Mobile Apps feature of Azure App Service. 

### Architecture overview

Prior to the workshop, Mark Schramm had been working with viaSport to set up the backbone for this project. Because viaSport has no in-house technical team, everything was built from the ground up.

The core functionality of the project is the bot, built in C# by using the **Bot Framework** and deployed to a web app (by using the Web Apps feature of Azure App Service). This is the staging site for the bot during its private preview phase, after which it will be accessed as a web chat directly through the viaSport website, embedded as a web control by using Direct Line.

Three **Cognitive Services** APIs were used to enhance bot functionality: LUIS, Bing Web Search, and Bing Spell Check.

The bot is built on top of **Azure SQL Database**, populated with resources curated by viaSport. 

Two **Universal Windows Platform (UWP) apps** were also built to support this project, one as an administrator and one as a speech interface. The *custom speech interface app* was built as a test for potential future expansion of this bot for users who require voice interaction instead of written text. The *administrative app* was built outside the scope of the five days assigned to this project, and as such will be mentioned in this report, but the implementation will not be discussed here. This app enables the non-technical viaSport team to modify the database without needing to hire a developer or access the tables directly. This is instrumental to the success of this project because viaSport is continually generating new resources to support its user base.

To better inform viaSport’s resource curation, **Power BI Embedded** was used to generate reports and a dashboard to access rich insights into the bot’s performance.

The following diagram illustrates the project architecture.

![viaSport project architecture diagram]({{ site.baseurl }}/images/viaSportBC/viaSport_architecture_diagram_main.PNG) 

<br/>

## Technical delivery

For tools and technologies used, see the [Technologies used](#technologies-used) section earlier in this study.

The implementation of these technologies is detailed in the following sections.

### Bot Framework SDK

The core bot functionality was built by leveraging the [Bot Framework SDK](https://docs.botframework.com/en-us/downloads/) in C#. The bot leverages the Knowledge Base design pattern, where in this case the knowledge base is the database curated by viaSport. The speech component of the bot (detailed in a later section of this report) leverages the Backchannel pattern through the Direct Line connection. 

The [Direct Line API](https://docs.botframework.com/en-us/restapi/directline/) is a simple REST API for connecting directly to a single bot. In this case, the bot is embedded as a web control on a web app for private preview, and in the future directly on the viaSport site. This API authenticates the connection and enables communication between the user and the bot through HTTP POST and GET. 

The dialog is handled through LUIS intents, and its implementation is described in detail in the following sections.

Developing this bot was an opportunity for the development team to explore bot design practices and discover some key learnings about user experience in conversational interfaces. Following are some key insights gleaned from this experience.

**Learning: Simple interactions are complex**

A key advantage of bots is simplifying the user experience and providing the user with a one-stop-shop for the task or tasks they want to accomplish. The development team quickly discovered that building a bot that appears simple to the user is a complex process. To be able to hold an effective and natural conversation, the bot’s dialog must be rich enough to recognize state, keep track of the user’s intention, recognize the many ways a user might phrase a query with the same intention, and proactively handle user error. Failing to do so will create a bot with a very dry user experience, eliminating the benefit of creating a bot.

Some of the ways the viaSport Inclusion ChatBot does this is by:

-  Proactively checking the spelling of user input to avoid human error slowing down the bot with extra database calls.

-  Implementing intelligence through Cognitive Services APIs (detailed in the Cognitive Services section) to recognize entities from user queries and understand the user’s intent.

-  Manually feeding spell-checked queries back into LUIS and looping back to the root of the dialog, in order to avoid genuine queries with misspelled words being deemed unrecognizable; this not only creates a better user experience, but also impacts the analytics by ensuring that the correct intent is captured.

In some cases, UI elements such as buttons and cards may be used to simplify user interaction. In the viaSport bot, cards are used whenever displaying resources to the user to deliver richer information, including resource title, a brief description, and an image, as well as a button linking out to the resource's location on the web. In the case where multiple resources are delivered, the cards are presented in a carousel to keep the conversation vertically short and easier for the user to navigate. A conscious decision was made to not use buttons for Yes/No decision points in order to keep the conversation flowing as though the user was talking to another person. Rather than pressing a Yes or No button to confirm or deny, the user can respond in whatever natural language they prefer.

The following diagram shows the results for coaching wheelchair basketball in a carousel.

![viaSport bot showing results for coaching wheelchair basketball in a carousel]({{ site.baseurl }}/images/viaSportBC/viasport-cards-ui.PNG)

<br/>

**Learning: Features vs. functionality** 

During the development process, a new stretch goal of adding an in-bot location control was entertained, but ultimately scrapped in favor of functionality over features. In the planning stages of this bot, Allan Bonifacio from the AI Research group cautioned that the
development team should always favor functionality over adding features. A bot with a great user experience should seem simple and intuitive to the user, and sometimes superfluous features can get in the way and overcomplicate the bot experience unnecessarily.

In the project’s current state, most of the resources in the database do not have location information. Some exploration of the bot location control integration with the [Bing Maps API](https://www.bingmapsportal.com/) was done during the project but eventually scrapped because it was a better use of time to strengthen the core bot experience than to add this complex feature that would have only impacted a small portion of the results provided to users.

**Learning: Asynchronous programming and bot dialog prompts**

When developing the dialog for the bot, the development team noticed that the way prompts are structured, they must not be followed by any other code before the end of their method, otherwise the threading will fall out of sync. This came to light when working with the Confirm prompts asking the user to confirm a spell-corrected phrase:

```
    PromptDialog.Confirm(
    
    context,
    
    AfterSpellCheckAsync,
    
    (\$"Did you mean {suggestions}?"),
    
    "Didn't get that!",
    
    promptStyle: PromptStyle.None);
```

This piece of code was initially placed in the middle of a method that would also parse through the spell-corrected results, but because the method that follows the prompt cannot be awaited, the routine would finish before the user confirmed and the entire dialog would be misaligned. So these two functions were separated into separate methods, and the threading problem was solved.

### Cognitive Services

To build a better bot, three Cognitive Services APIs were implemented:
- [**Language Understanding Intelligent Service (LUIS)**](#luis) was used to guide the dialog by detecting user intents.
- [**Bing Web Search**](#bing-web-search-api) was used to provide web results in the event that none of the results in the database matched the user’s query.
- [**Bing Spell Check**](#bing-spell-check-api) was used to reduce margin for human error by correcting the spelling of user input before querying the database or storing entities.

The following diagram displays the flow for a scenario in which all three APIs are called. 

![Cognitive Services implementation in viaSport Inclusion Bot]({{ site.baseurl }}/images/viaSportBC/viaSport_cognitive_services_flow_diagram.PNG)

<br/>

In this scenario, the user input is first sent to LUIS, the original query is sent to Bing Spell Check before entities are
stored, the database is queried for results relevant to the user’s query, and when no results are found in the database, the Bing Web Search API is called with a query string based on the entities found in the user’s spell-checked query. Those results are then delivered to the user. The sections that follow detail the implementation of the three APIs.

#### LUIS

The core bot dialog is handled through six LUIS intents: `None`, `Hello`, `Help`, `HowToCoach`, `FindProgram`, and `FindResource`. These intents map to three key entities: `Sport`, `Disability`, and `Subject` (who the athlete is, that is, children or adults). Following is a breakdown of what each of these intents does and how it is handled in the bot code.

##### None 

The `None` intent handles the case in which no other intent has been recognized by LUIS.

```
    \[LuisIntent("")\]
    
    public async Task None(IDialogContext context, LuisResult result)
    
    {
    
	    this.query = result.Query;
	    
	    await context.LoadAsync(new CancellationToken());
	    
	    PostTelemetryCustomEvent("none", 0, false);
	    
	    string message = \$"Sorry I did not understand you: ";
	    
	    if (result.Query.ToLower() == "version")
	    
	    {
	    
		    message = "viaSport Disability Resource Bot, version: "
		    
		    +
		    System.Reflection.Assembly.GetExecutingAssembly().GetName().Version.ToString();
		    
		    await context.PostAsync(BotDbStrings.MakeItAcceptable(message));
		    
		    context.Wait(MessageReceived);
	    
	    }
	    
	    else if (result != null && result.Query != null)
	    
	    {
	    
	   		await ConfirmNoneIntent(context, result);
	    
	    }
    
    }
```

<br/>

Within the `None` intent, `ConfirmNoneIntent` is called. The purpose of this routine is to double check that the user’s input did not match any of the five core intents; it first checks the spelling of the input, and then uses a Confirm prompt to send the spell-corrected input back to the user and ask if that is what they had intended to input. If the user confirms that the new query is correct, the bot then feeds that back into LUIS to determine if it matches any of the intents.

In the following example, the user asks, “How do I cooach hockey?” This should match the `HowToCoach` intent, but because “coach” is spelled incorrectly, LUIS recognizes it instead as a `None` intent. The bot then checks the spelling, asks the user if they meant to say, “How do I coach hockey?” and, when the user confirms, feeds this new query into LUIS, which recognizes it correctly as a `HowToCoach` intent.

![Bot snapshot of ConfirmNoneIntent]({{ site.baseurl }}/images/viaSportBC/bot-snapshot-confirmnoneintent.PNG)

<br/>

Following is the code for the routine that handles this case.

```
    private async Task ConfirmNoneIntent(IDialogContext context, LuisResult
    result)
    
    {
    
	    var checkedPhrase = await SpellCheck(result.Query);
	    
	    var suggestions = string.Empty;
	    
	    this.newMessage = this.query;
	    
	    foreach (var phrase in checkedPhrase)
	    
	    {
	    
		    var oldWord = phrase.token.Replace("Wrong Word : ", string.Empty);
		    
		    this.newMessage = this.newMessage.Replace(oldWord, phrase.suggestion);
	    
	    }
	    
	    if (this.newMessage == this.query)
	    
	    {
	    
		    BotDbAnalytics.UpdateAnalyticDatabase();
		    
		    BotDB botDB = new BotDB();
		    
		    var message = string.Format(botDB.GetString(null, "none"),
		    result.Query);
		    
		    await context.PostAsync(BotDbStrings.MakeItAcceptable(message));
		    
		    context.Wait(this.MessageReceived);
	    
	    }
	    
	    else
	    
	    {
	    
		    PromptDialog.Confirm(
		    
		    context,
		    
		    this.OnSpellCheckIntent,
		    
		    \$"Did you mean '{this.newMessage}'?",
		    
		    "Didn't get that!",
		    
		    promptStyle: PromptStyle.None);
	    
	    }
    
    }
```

<br/>

##### Hello

The `Hello` intent is triggered when the user greets the bot. The bot is trained to understand generic and colloquial phrases such as “hello,” “hi,” and “what’s up.” It responds to the user with a greeting from the database such as the one shown in the following example.

![Bot snapshot HelloIntent]({{ site.baseurl }}/images/viaSportBC/bot-snapshot-hellointent.PNG)

<br/>

Following is the code that handles the `Hello` intent.

```
    \[LuisIntent("viasport.intent.hello")\]
    
    public async Task Hello(IDialogContext context, LuisResult result)
    
    {
    
	    PostTelemetryCustomEvent("hello", 0, false);
	    
	    BotDB botDB = new BotDB();
	    
	    var message = botDB.GetString(null, "viasport.intent.hello.greeting");
	    
	    BotDbAnalytics.UpdateAnalyticDatabase(result.Intents\[0\].Intent,
	    (double)result.Intents\[0\].Score);
	    
	    await context.PostAsync(BotDbStrings.MakeItAcceptable(message));
	    
	    context.Wait(MessageReceived);
    
    }
```

<br/>

##### Help

The `Help` intent is triggered when the user asks for help or clarification. The bot responds by offering suggestions on what the user
can ask for, and then returns to the root of the dialog where it awaits the next input, which will then be fed through LUIS.

![Bot snapshot Help intent]({{ site.baseurl }}/images/viaSportBC/bot-snapshot-helpintent.PNG)

<br/>

Following is the code that handles the `Help` intent.

```
    \[LuisIntent("viasport.intent.help")\]
    
    public async Task Help(IDialogContext context, LuisResult result)
    
    {
    
	    PostTelemetryCustomEvent("hello", 0, false);
	    
	    BotDB botDB = new BotDB();
	    
	    var message = string.Format(botDB.GetString(null,
	    "viasport.intent.help.greeting"), "\\n", "\\n", "\\n");
	    
	    BotDbAnalytics.UpdateAnalyticDatabase(result.Intents\[0\].Intent,
	    (double)result.Intents\[0\].Score);
	    
	    await context.PostAsync(BotDbStrings.MakeItAcceptable(message));
	    
	    context.Wait(MessageReceived);
    
    }
```

<br/>

##### HowToCoach, FindProgram, and FindResource

The `HowToCoach`, `FindProgram`, and `FindResource` intents are almost identical, so this section addresses all three: 
- `HowToCoach` is triggered when the user inputs a query that indicates they are searching for resources to help them coach or teach a sport to a person or persons with disabilities. 
- `FindProgram` is triggered when the user asks the bot to find a program where they can learn or play a sport. 
- `FindResource` is triggered when the user’s query indicates that they are looking for a specific resource that will help them with a specific disability or sport. 

The following three figures show some sample utterances that trigger each intent, captured from the LUIS portal.

Sample utterances for `HowToCoach`.

![Sample utterances for HowToCoach]({{ site.baseurl }}/images/viaSportBC/LUIS_howtocoach_utterances.PNG)

<br/>

Sample utterances for `FindProgram`.

![Sample utterances for FindProgram]({{ site.baseurl }}/images/viaSportBC/LUIS_findprogram_utterances.PNG)

<br/>

Sample utterances for `FindResource`.

![Sample utterances for FindResource]({{ site.baseurl }}/images/viaSportBC/LUIS_findresource_utterances.PNG)

<br/>

In the bot code, each of these three intents has a handler and accompanying routines that are identical in purpose and structure, except for the database components they use and which entities and responses they employ. This section will explore how the flow is handled through the code for the `HowToCoach` intent. The same flow applies through the corresponding tasks for `FindResource` and `FindProgram`.

When LUIS recognizes the user’s input as matching one of the trained utterances, the `HowToCoach` task is triggered. This task first checks if the LUIS confidence score for the intent is at least the acceptable score as set by the team (currently set to .25). If it isn’t, the intent is not a close enough match, so the bot passes it into the `None` handler instead. If it is above the threshold, the user’s query is passed into `LoadAllEntitiesAsync`.

```
    \[LuisIntent("viasport.intent.howtocoach")\]
    
    public async Task HowToCoach(IDialogContext context, LuisResult result)
    
    {
    
	    if (result.Intents\[0\].Score &lt; AcceptableScore)
	    
	    {
	    
	    	await this.None(context, result);
	    
	    }
	    
	    else
	    
	    {
	    
		    await LoadAllEntitiesAsync(context, result);
		    
		    query = result.Query;
		    
		    intent = result.Intents\[0\].Intent;
		    
		    intentScore = (double)result.Intents\[0\].Score;
		    
		    PostTelemetryCustomEvent("howtocoach", 0, false);
		    
		    respondToLuis = true;
		    
		    if (respondToLuis)
		    
		    {
		    
		    	await CheckResultsAsync(context);
		    
		    }
	    
	    }
    
    }
```

<br/>


`LoadAllEntitiesAsync` parses the query and loads any recognized entities by calling `GetEntityAsync`.


```
    private async Task LoadAllEntitiesAsync(IDialogContext context,
    LuisResult result)
    
    {
    
	    \_entities = new Dictionary&lt;string, EntityRecommendation&gt;
	    
	    {
	    
	    {"SportName", await GetEntityAsync(context, result, "SportName")},
	    
	    {"DisabilityType", await GetEntityAsync(context, result,
	    "DisabilityType")},
	    
	    {"Subject", await GetEntityAsync(context, result, "Subject")},
	    
	    {"buildin.geography.city", await GetEntityAsync(context, result,
	    "builtin.geography.city")}
	    
	    };
    
    }
```

<br/>

`LoadAllEntitiesAsync` calls `GetEntityAsync`, which checks the spelling of the entity and returns the spell-corrected
term. This eliminates the chance of any misspelled information being carried through the dialog, and lowers the human error in the bot conversation. Checking the spelling prevents the bot from ever querying the database for a misspelled entity.

```
    private async Task&lt;EntityRecommendation&gt;
    GetEntityAsync(IDialogContext context, LuisResult result, string name)
```

<br/>

After all the entities are loaded, `PostTelemetryCustomEvent` is called, and then the query is passed into `CheckResultsAsync`. `CheckResultsAsync` takes one of two paths, depending on whether `\_doWebSearch` has been set to true (this only happens when no resources have been found in the database). If `\_doWebSearch` is true, the bot will perform a web search by using the Bing Web Search API and print the top results to the user (see the next subsection for the implementation details for this step). Otherwise, a database check is performed to see if there are any results that match the stored entities. If there are none, `\_doWebSearch` is set to true and `CheckResultsAsync` is called recursively, this time performing a web search. If there is between 1 and the `\_maxReferences` value of results (currently set to 4), the bot sends the results to the user in the form of cards by using `SendResultsToPersonAsync`.

If there are more than `\_maxReferences` results, and one or more of the entities is missing, the bot will enter `OnCollectMoreInfo`, which prompts the user to enter the missing information. Entities are always requested in priority order: `sport` first, then  `disability`, and finally `subject` (that is, child, adult, or senior). If one of these entities is already present, the bot will not prompt the user for that entity.

If there are more than `\_maxReferences` results, and all entities are filled in or have been skipped, the bot will share the top `\_maxReferences` with the user, again using `SendResultsToPersonAsync` to post the results in card form. Now if the user enters “more,” the bot will continue to call `SendResultsToPersonAsync` until all the results have been delivered to the user. The flow is illustrated in the following diagram.

![viaSport HowToCoach intent dialog flow]({{ site.baseurl }}/images/viaSportBC/viaSport_howtocoach_intent_dialog_flow.PNG)
						                  
<br/>

#### Bing Web Search API

The Bing Web Search API is used in the bot to search the web for results related to the user’s query if no relevant results were found in the viaSport database. This feature was not in the original goals, but after discussion with viaSport, the team determined that the ultimate purpose of the bot is to be as helpful as possible to the user, so rather than having them leave the viaSport site if they don’t find the information they are looking for, the bot can continue to assist them in their web search.

The Bing Web Search API is implemented in the code in the `OnWebSearch` task. This task builds a query from the entities that have been collected from the user, and structures it as follows.

```
    query = \$"{intent} {sport} {subject} {disability}";
```

<br/>

For example, if the user’s query was, `How do I coach volleyball to a student with spinal cord bifuda?`, the query sent to Bing Web Search will be `coaching volleyball student spinal cord bifuda`. If the user’s query was, `I want to find a program where my daughter can ski. She is in a wheelchair.`, the query sent to Bing Web Search will be `programs for ski daughter wheelchair`. The intents are converted to natural phrases by using a simple check, as shown in the following code.

```
    var intent = "coaching";
    
    if (intent.Contains("resource"))
    
    {
    
    	intent = "information on";
    
    }
    
    else if (intent.Contains("program"))
    
    {
    
    	intent = "programs for";
    
    }
```

<br/>

After the query string is built, it is posted to the API and the results are deserialized and sent to the user as cards by using `PostResultsToUserAsync`. The full `OnWebSearch` task is shown in the following code.

```
    private async Task OnWebSearch(IDialogContext context)
    
    {
    
	    var client = new HttpClient();
	    
	    var queryString = HttpUtility.ParseQueryString(string.Empty);
	    
	    client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", "&lt;BING
	    WEB SEARCH API KEY HERE&gt;");
	    
	    var intent = "coaching";
	    
	    if (intent.Contains("resource"))
	    
	    {
	    
	    	intent = "information on";
	    
	    }
	    
	    else if (intent.Contains("program"))
	    
	    {
	    
	    	intent = "programs for";
	    
	    }
	    
	    var sport = \_entities\["SportName"\].Entity ?? "sports";
	    
	    var subject = \_entities\["Subject"\].Entity ?? "people";
	    
	    var disability = \_entities\["DisabilityType"\].Entity ?? "with
	    disabilites";
	    
	    query = \$"{intent} {sport} {subject} {disability}";
	    
	    queryString\["q"\] = query;
	    
	    queryString\["count"\] = \_maxReferences.ToString();
	    
	    queryString\["offset"\] = "0";
	    
	    queryString\["mkt"\] = \_language;
	    
	    queryString\["safesearch"\] = "strict";
	    
	    var uri = "https://api.cognitive.microsoft.com/bing/v5.0/search?" +
	    queryString;
	    
	    var response = await client.GetAsync(uri);
	    
	    if (response.IsSuccessStatusCode)
	    
	    {
	    
		    var jsonString = response.Content.ReadAsStringAsync();
		    
		    var searchResults =
		    JsonConvert.DeserializeObject&lt;SearchResponse&gt;(jsonString.Result);
		    
		    var references = new List&lt;Reference&gt;();
		    
		    foreach (var i in searchResults.WebPages?.Value)
		    
		    {
		    
			    var reference = new Reference()
			    
			    {
			    
				    Title = i.Name,
				    
				    Subtitle = i.DisplayUrl,
				    
				    CardText = i.Snippet,
				    
				    ReferenceUri = i.Url,
				    
				    };
			    
			    references.Add(reference);
		    
		    }
		    
		    await SendResultsToPersonAsync(context, references);
		    
		    }
	    
	    else
	    
	    {
	    
		    await context.PostAsync("Sorry looks like we are having some issues with
		    our websearch!");
		    
		    await OnContactViaSport(context);
	    
	    }
    
    }
```

<br/>

The following diagram illustrates a web search example.

![Bot snapshot web search]({{ site.baseurl }}/images/viaSportBC/bot-snapshot-websearch.PNG)

<br/>

After the web search (or if the web search fails), the bot invites the user to contact viaSport to provide feedback on the experience. 

![Bot snapshot Contact]({{ site.baseurl }}/images/viaSportBC/bot-snapshot-contact.PNG)

<br/>

#### Bing Spell Check API

The Bing Spell Check API is used in the viaSport bot to check the spelling of components input by the user. The `SpellCheck` routine (header) checks spelling by building a string to send to the Spell Check API and returning the index of any misspelled word in the string, the misspelled word, and the suggested correction.

```
    private async
    Task&lt;IEnumerable&lt;Models.SpellCheckCall.SpellCheck&gt;&gt;
    SpellCheck(string received)
```

<br/>

When dealing with a specific entity, `CorrectEntitySpelling` is called to pull out the appropriate corrected term from the object returned by `SpellCheck`. This parses through the structured return from `SpellCheck` and replaces the misspelled words in the original string with the corrected terms.

```
    private string CorrectEntitySpelling(string originalEntityInput,
    IEnumerable&lt;Models.SpellCheckCall.SpellCheck&gt; checkedPhrase)
    
    {
    
	    ObservableCollection&lt;Models.SpellCheckCall.SpellCol&gt; SearchResults
	    = new ObservableCollection&lt;Models.SpellCheckCall.SpellCol&gt;();
	    
	    var suggestions = string.Empty;
	    
	    for (int i = 0; i &lt; checkedPhrase.Count(); i++)
	    
	    {
	    
		    Models.SpellCheckCall.SpellCheck suggestedCorrection =
		    checkedPhrase.ElementAt(i);
		    
		    suggestions += suggestedCorrection.suggestion;
		    
		    SearchResults.Add(new Models.SpellCheckCall.SpellCol
		    
		    	{
		    
			    spellcol = suggestedCorrection
			    
			    });
	    
	    }
	    
	    if (suggestions == string.Empty)
	    
	    {
	    
	    	return originalEntityInput;
	    
	    }
	    
	    else
	    
	    {
	    
		    foreach (var phrase in checkedPhrase)
		    
		    {
		    
			    var oldWord = phrase.token.Replace("Wrong Word : ", string.Empty);
			    
			    originalEntityInput = originalEntityInput.Replace(oldWord,
			    phrase.suggestion);
		    
		    }
		    
		    return originalEntityInput;
	    
	    }
    
    }
```

<br/>

These routines are called proactively anytime a new element input by the user is going to be used, searched for, or stored in the database. Checking the spelling of user input makes the bot more efficient and promotes better user experiences. Checking spelling before accessing the database prevents wasted calls to the database and prevents misspelled entities from being carried through the dialog. 

If the bot enters the `None` intent, instead of telling the user it doesn’t understand what they meant, the bot will provide a suggestion and prompt the user to confirm or deny.

![Bot snapshot SpellCheck]({{ site.baseurl }}/images/viaSportBC/bot-snapshot-spellcheck.PNG)

<br/>

### Azure SQL Database

ViaSport does not have an in-house SQL developer, so Azure SQL Database was chosen instead of SQL Server because it presented an easy but robust database management system that would make the database easier to maintain in the long term. Azure SQL Database also supports live (direct source) and imported (data pre-uploaded to Power BI) reports.

The features that informed this decision include:

-   Working with SQLCMD or the SQL Server Management Studio

-   No physical administration required

-   High availability architecture

-   Scalable service plans and seamless integration with Microsoft technologies

The administrative UWP app provides CRUD (Create, Read, Update, Delete) access to the database, allowing the viaSport team to modify its contents as they see fit.

The team improved the database by reducing redundancy and implementing outdated term correction; both are described in the following sections. 

#### Singularize entities to reduce database redundancy

To improve the database, the team removed redundancy by converting all entities to their singular version before querying or storing them in the database. For example, “basketballs” becomes “basketball,” and “children” becomes “child.” This reduces the number of entries required in the database by half.

Initially, it was thought that an API would be the best way to singularize the entities, but it is possible to use the `PluralizationService` class in the `System.Data.Entity.Design` namespace to perform this action. The custom `Singularize` method is shown in the following code sample.

```
    public string Singularize(string text)
    
    {
    
	    var CI = new CultureInfo("en-US");
	    
	    var depluralizer = PluralizationService.CreateService(CI);
	    
	    var returnText = text;
	    
	    //var singularText = Singularize(text);
	    
	    if (depluralizer.IsPlural(text))
	    
	    {
	    
		    //convert message to singular form
		    
		    returnText = depluralizer.Singularize(text);
	    
	    }
	    
	    //a few hardcoded examples we will likely encounter, the Pluralizer
	    doesn't recognize these as plurals
	    
	    if (text == "people")
	    
	    {
	    
	    	text = "person";
	    
	    }
	    
	    else
	    
	    {
	    
	    	//do nothing because text is already the desired result
	    
	    }
	    
	    return returnText.ToLower();
    
    }
```

<br/>

#### Implement outdated term correction

When building bots, especially for inclusivity, it is important to put into place a certain level of content filtering and language filtering to ensure that the bot does not say anything to harm users. Specific to the target audience of the viaSport Inclusion Bot, users may use outdated or offensive terms to describe disabilities. Instead of using these offensive user-submitted terms, this bot recognizes outdated terms and replaces them with preferred terms for future communication with the user. 

A database table was created for these term pairs, and a `MakeItAcceptable` method was created to handle word replacements within the bot dialog.

The viaSport team created a table that had two columns, “Outdated Terms” and “Preferred Terms.” The first column contained the words that are often considered offensive, and the second column contained their replacements with person-first terms. For example, “disabled athletes,” is outdated and should be replaced with its preferred person-first equivalent, “athletes with disabilities.”

A new class called `MakeItAcceptable` was created to handle the word replacements within the bot. A call is made to this class every time there is user input; if the user inputs the outdated term, it will automatically search the database for the preferred term. The syntax used to perform this function is as follows.

	await context.PostAsync(BotDbStrings.MakeItAcceptable());

<br/>

### Speech recognition experiments

Accessible design is highly relevant to this project because the target audience for the viaSport Inclusion Bot includes people with disabilities. When the team tested the bot, they discovered that the Windows 10 screen reader did not pick up the text in the web chat window. Tested in multiple browsers (Edge, Internet Explorer, and Google Chrome), this lack of functionality is a serious accessibility issue. The team has provided this feedback to the Bot Framework team.

For the scope of this project, the bot was published as a web chat only, but for the purpose of experimenting with speech, the team created a UWP client that, if extended to full functionality in the future, can be installed directly from the viaSport website to support users who require voice interaction.

There wasn’t enough time left in the project to build a fully functional client, but there were significant learnings that we recognized when developing the Windows 10 prototype.

#### Learnings

- To make speech work with LUIS, [Direct Line 3.0](https://docs.botframework.com/en-us/restapi/directline/) must be activated through the LUIS portal. Adding the Direct Line package by using NuGet brings to light some conflicts; the latest version (3.0) requires the newer version of .NET Core for UWP, but this version does not work with Visual Studio 2015, which is the version of Visual Studio that was used to develop this bot. The following figure shows the configuration that worked in Visual Studio 2015.

![viaSport NuGet configuration]({{ site.baseurl }}/images/viaSportBC/viaSport_nuget_configuration_2.png)

<br/>

- It is possible to implement Speech-to-Text using the UWP API, but doing so with the Windows 10 Anniversary edition or later requires that the user accept a special policy. The policy cannot be accepted from the application, and the setting is hidden deeply in the Windows Settings, a potential problem in usability if the purpose of this application is accessibility.

![viaSport user permission speech]({{ site.baseurl }}/images/viaSportBC/viaSport_user_permission_speech.png)

<br/>

- When implementing a custom bot interface in a UWP app, it is not possible to use ListView and other collection-enabled user controls due to different kinds of information from the bot (such as text or cards). Therefore, it is better to use a StackPanel with ScrollViewer and build custom user controls per message type.

- There is very little documentation currently available that demonstrates how to implement a custom bot interface. Following are the steps as identified by the development team.

	- To initialize a conversation you can use the following block.

	```
		async Task InitializeBotConversation()

		{

			client = new DirectLineClient("key");

			conversation = await client.Conversations.StartConversationAsync();

			await StartListening();

			await ReadBotMessagesAsync(client, conversation.ConversationId);

		}
	```
	
	<br/>

	- The following event handler reads all the messages from the bot and displays them one by one. Ensure that the collection with messages contains all messages (users and bots), including old messages.


	```
	    async Task ReadBotMessagesAsync(DirectLineClient client, string
	    conversationId)

	    {

		    string watermark = null;

		    while (true)

		    {

			    var messages = await
			    client.Conversations.GetActivitiesAsync(conversationId);

			    watermark = messages?.Watermark;

			    var messagesFromBotText = from x in messages.Activities

			    select x;

			    foreach (var message in messagesFromBotText)

			    {

				    await
				    Windows.ApplicationModel.Core.CoreApplication.MainView.CoreWindow.Dispatcher.RunAsync(CoreDispatcherPriority.Normal,

				    () =&gt;

				    {

					    var res = (from a in MessageIDs where a == message.Id select a).Count();

					    if (res==0)

					    {

						    MessageIDs.Add(message.Id);

						    if (message.From.Name.Contains("viaSport"))

						    {

							    if ((message.Text != null) && (message.Text.Length &gt; 0))

							    {

							    chatWindow.Children.Add(new BotMessageText() { Text = message.Text });

							    TalkSomething(message.Text);

							    }

							    else if (message.Attachments.Count&gt;0)

							    {

							    }

							    }

							    else

							    {

							    chatWindow.Children.Add(new UserMessageText() { Text = \$"Sergii:
							    {message.Text}" });

						    }

					    }

				    });

			    }

		    await Task.Delay(TimeSpan.FromSeconds(2)).ConfigureAwait(false);

		    }

	    }
	```
	
	<br/>

	- Finally, the following code shows how to send messages to a user.


	```
	    async Task sendMessageToBot(string text)

	    {

		if (conversation!=null)

		    {

			    IMessageActivity message = Activity.CreateMessageActivity();

			    message.From = new ChannelAccount() { Id = "sbaydach@microsoft.com",
			    Name = "Sergii" }; ;

			    message.Text = text;

			    message.Locale = "en-Us";

			    await
			    client.Conversations.PostActivityAsync(conversation.ConversationId,
			    (Activity)message);

		    }

	    }
	```

<br/>

### Power BI Embedded

As a not-for-profit organization, viaSport works with many external partners and sponsors, many of whom will be asked to provide resources that viaSport can include in the knowledge base for this bot. When pitching the viaSport Inclusion Bot to these partners and sponsors, having the ability to share insights into bot performance will be critical to partner adoption of this project.

To support this, one goal of the project was to build reports that demonstrate the bot’s success in the community, through performance and interaction statistics. It is also important for the viaSport team to have rich information about what users are searching for, which queries are successfully answered (where the resources are found in the database), and, perhaps most importantly, which queries are not successfully answered, so viaSport can invest in those areas and work with partners to fill in gaps and provide resources for all potential users.

The following actions were taken to implement this with Power BI Embedded:

-   Provision a Power BI Embedded workspace collection in Azure

-   Create a client application to upload/update all reports in the collection

-   Create data storage to store all information related to the reports

-   Integrate telemetry functionality to the bot

-   Design and publish live and imported reports

-   Display reports on the web

The following subsections detail these actions.

#### Provision a Power BI Embedded workspace collection in Azure 

Power BI Embedded has few management features in the Azure portal; in fact, the only relevant action to take was to create a workspace collection. At this step, a workspace collection name, subscription name, resource group, and location were provided.

![viaSport Power BI Embedded provisioning]({{ site.baseurl }}/images/viaSportBC/viasport_powerbi_embedded_provisioning_1.png)

<br/>

The next step was to get access keys and review existing workspaces.

![viaSport Power BI Embedded provisioning 2]({{ site.baseurl }}/images/viaSportBC/viasport_powerbi_embedded_provisioning_2.png)

<br/>

**Learning:** Because Power BI Embedded works better with workspaces than collections, two different workspaces were used to host the reports. The first one (internalReports) contains live reports that can be analyzed and controlled by the viaSport team. The second collection (externalReports) contains static imported reports that can be shared publicly on the viaSport website.

#### Create a client application to upload/update all reports in the collection

In addition to the reports, a client application was also created to ensure that viaSport would be able to update all reports without the support of the development team. The application uses several parameters from the App.config file that allow the application to be tuned:

-   **AzureWorkspaceCollectionKey:** Contains the workspace collection key.

-   **sqlLogin:** A sign-in to the Azure SQL Database where data can be retrieved for the reports.

-   **sqlPassword:** A password to the Azure SQL Database where data can be retrieved for the reports.

-   **AzureWorkspaceCollectionName:** Contains the workspace collection name.

-   **PowerBIApiUri:** A [standard URI](https://api.powerbi.com) that can be potentially changed by Microsoft.

-   **internalCollectionName:** A name for the internal collection.

-   **externalCollectionName:** A name for the external collection.

Before implementing any Power BI Embedded-related code, it is important to add several NuGet packages (Microsoft.PowerBI.Core and Microsoft.PowerBI.API).

![viaSport NuGet configuration]({{ site.baseurl }}/images/viaSportBC/viaSport_nuget_configuration.png)

<br/>

**Learning:** If your code does not compile due to a problem with Newtonsoft.Json, the library needs to be updated to the latest
version.

Using the references listed earlier, it is possible to implement some methods to work with the workspace collection and workspaces inside. Following are some of these methods.

```    
    static async Task&lt;PowerBIClient&gt; CreateClient()
    
    {
    
	    // Create a token credentials with "AppKey" type
	    
	    var credentials = new TokenCredentials(accessKey, "AppKey");
	    
	    // Instantiate your Power BI client passing in the required credentials
	    
	    var client = new PowerBIClient(credentials);
	    
	    // Override the api endpoint base URL. Default value is
	    https://api.powerbi.com
	    
	    client.BaseUri = new Uri(apiEndpointUri);
	    
	    return client;
    
    }
```

<br/>

This method may be used to create a client reference to the Power BI Embedded service.

The next few methods make it possible to create a new workspace if needed and get a list of all available workspaces inside the collection.

``` 
    static async Task&lt;Workspace&gt; CreateWorkspace(string
    workspaceCollectionName, string workspaceName)
    
    {
    
	    using (var client = await CreateClient())
	    
	    {
	    
		    return await
		    client.Workspaces.PostWorkspaceAsync(workspaceCollectionName, new
		    CreateWorkspaceRequest(workspaceName));
	    
	    }
    
    }
    
    static async Task&lt;IEnumerable&lt;Workspace&gt;&gt;
    GetWorkspaces(string workspaceCollectionName)
    
    {
    
	    using (var client = await CreateClient())
	    
	    {
	    
		    var response = await
		    client.Workspaces.GetWorkspacesByCollectionNameAsync(workspaceCollectionName);
		    
		    return response.Value;
	    
	    }
    
    }
```

<br/>

These methods are used to check if internal and external workspaces exist. If they do not, they should be created by using the following code.

``` 
    var workspaces = await GetWorkspaces(workspaceCollectionName);
    
    var internalWorkspace = (from a in workspaces where
    a.DisplayName.Equals(workspaceNameInternal) select a).FirstOrDefault();
    
    if (internalWorkspace==null)
    
    {
    
	    internalWorkspace = await CreateWorkspace(workspaceCollectionName,
	    workspaceNameInternal);
	    
	    Console.WriteLine("Workspace for internal reports is created");
    
    }
    
    else
    
    {
    
    	Console.WriteLine("Workspace for internal reports is found");
    
    }
```

<br/>

To upload new reports to the collection, the existing one must first be deleted.

**Learning:** It was not clear how to delete existing reports, but the team learned that if you delete a dataset that is associated with a report, the report will be deleted as well. In general, reports cannot exist without a dataset.

To delete existing datasets in a workspace, it is possible to use the following method.

```    
    static async Task DeleteAllDatasets(string workspaceCollectionName,
    string workspaceId)
    
    {
    
	    using (var client = await CreateClient())
	    
	    {
	    
		    ODataResponseListDataset response = await
		    client.Datasets.GetDatasetsAsync(workspaceCollectionName, workspaceId);
		    
		    if (response.Value.Any())
		    
		    {
		    
			    foreach (Dataset d in response.Value)
			    
			    {
			    
			    await client.Datasets.DeleteDatasetByIdAsync(workspaceCollectionName,
			    workspaceId,d.Id);
			    
			    Console.WriteLine("{0}: {1}", d.Name, d.Id);
			    
			    }
		    
		    }
		    
		    else
		    
		    {
		    
		    	Console.WriteLine("No Datasets found in this workspace");
		    
		    }
	    
	    }
    
    }
```

<br/>

The Power BI Embedded API makes it possible to work with datasets by ID. The next step is to upload reports and update connection strings.

```
    foreach (var file in files)
    
    {
    
	    Console.WriteLine(\$"Importing {file}");
	    
	    string dataSetTempName = String.Format(\$"dataSetName
	    {Guid.NewGuid().ToString()}");
	    
	    var import = await ImportPbix(workspaceCollectionName,
	    internalWorkspace.WorkspaceId, dataSetTempName, file);
	    
	    Console.WriteLine(\$"Updating connection string for {file}");
	    
	    var dataSetID = (from a in import.Datasets where
	    a.Name.Equals(dataSetTempName) select a.Id).FirstOrDefault();
	    
	    await UpdateConnection(workspaceCollectionName,
	    internalWorkspace.WorkspaceId, dataSetID, sqlUserName, sqlPassword);
    
    }
```

<br/>

In the previous code, it is clear that the `ImportPbix` method accepts a dataset name, but not ID. The ID itself should be generated by Azure after a new report is added. This is why it is important to use a return value to update existing connection strings.

**Learning:** The report can contain imported data and information about the connection string, but the user name and password should be eliminated to guarantee security. This is why it is important to provide a user name and a password to the data source after a new report is uploaded.

**Learning:** The dataset name can be any string, so if the goal is to create a “universal” web application that will show all available reports, it is better to use a custom name from a configuration file that generates report names automatically. To accomplish this, a configuration file was added that is passed to the application as a command-line parameter. To simplify the format for the partner, this was formatted as a list of strings, `ReportDescription.txt`.

``` 
    external
    
    C:\\Users\\sbaydach\\Source\\Repos\\Power BI
    Analytics\\ProvisionPowerBIWorkspaces\\ProvisionPowerBIWorkspaces\\Reports\\External\\basicReport.pbix
    
    viaSport Basic Report
    
    internal
    
    C:\\Users\\sbaydach\\Source\\Repos\\Power BI
    Analytics\\ProvisionPowerBIWorkspaces\\ProvisionPowerBIWorkspaces\\Reports\\Internal\\basicReportsLive.pbix


    viaSport Basic LIVE Report
```

<br/>

The first string is a type of report (external or internal). The second string is a path to an existing report. Finally, the last string is a report (dataset) name.

Following are two methods that upload a new report and update a connection string:

``` 
    static async Task&lt;Import&gt; ImportPbix(string
    workspaceCollectionName, string workspaceId, string datasetName, string
    filePath)
    
    {
    
    	using (var fileStream = File.OpenRead(filePath.Trim('"')))
    
	    {
	    
		    using (var client = await CreateClient())
		    
		    {
		    
			    // Set request timeout to support uploading large PBIX files
			    
			    client.HttpClient.Timeout = TimeSpan.FromMinutes(60);
			    
			    client.HttpClient.DefaultRequestHeaders.Add("ActivityId",
			    Guid.NewGuid().ToString());
			    
			    // Import PBIX file from the file stream
			    
			    var import = await
			    client.Imports.PostImportWithFileAsync(workspaceCollectionName,
			    workspaceId, fileStream, datasetName);
			    
			    // Example of polling the import to check when the import has succeeded.
			    
			    while (import.ImportState != "Succeeded" && import.ImportState !=
			    "Failed")
			    
			    {
			    
				    import = await
				    client.Imports.GetImportByIdAsync(workspaceCollectionName, workspaceId,
				    import.Id);
				    
				    Console.WriteLine("Checking import state... {0}", import.ImportState);
				    
				    Thread.Sleep(1000);
			    
			    }
		    
		    	return import;
		    
		    }
	    
	    }
    
    }
```

<br/>

``` 
    static async Task UpdateConnection(string workspaceCollectionName,
    string workspaceId, string datasetId, string login, string password)
    
    {
    
	    using (var client = await CreateClient())
	    
	    {
	    
		    var datasources = await
		    client.Datasets.GetGatewayDatasourcesAsync(workspaceCollectionName,
		    workspaceId, datasetId);
		    
		    // Reset your connection credentials
		    
		    var delta = new GatewayDatasource
		    
		    {
		    
			    CredentialType = "Basic",
			    
			    BasicCredentials = new BasicCredentials
			    
			    {
			    
			    Username = login,
			    
			    Password = password
			    
			    }
		    
		    };
		    
		    if (datasources.Value.Count != 1)
		    
		    {
		    
		    	Console.Write("Expected one datasource, updating the first");
		    
		    }
		    
		    // Update the datasource with the specified credentials
		    
		    await client.Gateways.PatchDatasourceAsync(workspaceCollectionName,
		    workspaceId, datasources.Value\[0\].GatewayId,
		    datasources.Value\[0\].Id, delta);
	    
	    }
    
    }
```

<br/>

The final application can be executed from the command prompt window with just one parameter: a configuration file with information about the reports.

#### Create data storage to store all information related to the reports

As mentioned in the Azure SQL Database section of this report, the decision to use SQL Database was also informed by its support for live (direct source) and imported (data pre-uploaded to Power BI) reports.

The following diagram shows the tables used in the analytics reports.

![viaSport database table reports]({{ site.baseurl }}/images/viaSportBC/viaSport_database_table_reports.jpg.png)

<br/>

Following is a description of the tables:

-   **Session:** A table that contains information about each new session including channel, conversation id, and start date and time. This table exposes information about the number of users using the bot and some additional information about them (such as channel type).

-   **Query:** This table stores all queries from users. Due to privacy concerns, the text of the messages is not stored, but information about query time is stored in order to create some related objects such as `Entity`, `ReferenceProvided`, and `Intent`. This information will allow the viaSport team to understand how many intents and entities were recognized (an indicator of the quality of the LUIS model) and the number of provided references (to determine whether the user was helped).

-   **Entity:** Entities that are provided by LUIS.

-   **Intent:** Intents that are provided by LUIS.

-   **Reference:** This table contains references and is not related to reporting directly, but is used to populate the ReferenceProvided table.

-   **ReferenceProvided:** Contains links to references that were provided in a session.

**Learning:** All tables contain an identity key **ID**. It was not wise to use this name because Power BI Desktop uses keys to predict all possible relations in the database. As a result, the team spent considerable time deleting incorrectly-formed relations based on ID fields (just for imported reports).

**Learning:** One potential approach is to store `EntityName` and `IntentName` fields as unique values; however, implementing LUIS training functionality in the code would simplify these tables. Instead, in the viaSport bot, `EntityName` and `IntentName` are just basic strings and grouping is required to select the number of unique intents/entities.

#### Integrate telemetry functionality to the bot

Implementing telemetry is not a challenging task. Because C# and Entity Framework were used, it was as simple as updating the entity framework model and implementing a method that saves telemetry data to the database based on parameters.

```
    public static void UpdateAnalyticDatabase(
    
    string intentName=null,
    
    double intentScore=0,
    
    Dictionary&lt;string, EntityRecommendation&gt; entities=null,
    
    List&lt;Reference&gt; referenceIds=null)
    
    {
    
	    if (intentName == null)
	    
	    {
	    
	    	AddEmptyQuery();
	    
	    }
	    
	    else if (entities == null)
	    
	    {
	    
	    	AddIntentQuery(intentName,(float)intentScore);
	    
	    }
	    
	    else if (referenceIds == null)
	    
	    {
	    
	    	AddIntentEntitiesQuery(intentName, (float)intentScore,entities);
	    
	    }
    
	    else
	    
	    {
	    
		    AddIntentEntitiesReferencesQuery(intentName, (float)intentScore,
		    entities, referenceIds);
	    
	    }
    
    }
```

<br/>

Four different method calls inside update the database based on the type of query (availability of the parameters).

Following is the code of the most complex method from the list.

``` 
    private static void AddIntentEntitiesReferencesQuery(string intentName,
    float intentScore, Dictionary&lt;string, EntityRecommendation&gt;
    entities,
    
    List&lt;Reference&gt; referenceIds)
    
    {
    
	    Query q = new Query
	    
	    {
	    
		    SessionId = currentSessionId,
		    
		    UtcDateTime = DateTime.UtcNow,
		    
		    Entities = new EntitySet&lt;Entity&gt;(),
		    
		    ReferenceProvideds = new EntitySet&lt;ReferenceProvided&gt;(),
		    
		    Intents = new EntitySet&lt;Intent&gt;()
		    
		    { new Intent() { IntentName = intentName, IntentScore = intentScore} }
	    
	    	};
	    
	    foreach (var e in entities)
	    
	    {
	    
		    if (e.Value.Score!=null)
		    
			    q.Entities.Add(new Entity() { EntityValue = e.Value.Entity, EntityType =
			    e.Value.Type, EntityScore = (float)e.Value.Score });
	    
	    }
	    
	    foreach (var rid in referenceIds)
	    
	    {
	    
		    q.ReferenceProvideds.Add(new ReferenceProvided() {ReferenceId =
		    rid.Id});
	    
	    }
	    
	    context.Queries.InsertOnSubmit(q);
	    
	    context.SubmitChanges();
    
    }
```

<br/>

The most important challenge is just finding the right place to call this method from the bot.

#### Design and publish live and imported reports

Power BI Desktop is a free tool that makes it possible to design DirectQuery (live) and imported reports.

![viaSport Power BI Desktop]({{ site.baseurl }}/images/viaSportBC/viasport_powerbi_desktop.png)

<br/>

Download and install the [Power BI Desktop tool](https://powerbi.microsoft.com/en-us/desktop/).

**Learning:** There is no way to switch between Import and DirectQuery (or vice versa) during the design process. If it becomes necessary to switch part way through development, a new report must be designed from scratch.

**Learning:** Power BI Embedded doesn’t allow direct updates of the data from code/Azure in Import mode. It means that to update an imported report in Azure, it is necessary to use Power BI Desktop to update all the data and republish the report by using the console application, which is more challenging. Note that this is not the case for the O365 version of Power BI.

After Power BI Desktop is connected to the database and all needed tables are selected, it is possible to start building reports by using existing visuals.

For the project, five different reports were built. Following are three of them:

- **General report** that contains information about visitors and the most popular references.

<br/>

![General report]({{ site.baseurl }}/images/viaSportBC/viaSport_report_general.png)

<br/>

- **By Query report** that shows different kinds of queries (by subject, by sport name, by disability type).

<br/>

![By Query report]({{ site.baseurl }}/images/viaSportBC/viaSport_report_byquery.png)

<br/>

- **Performance report** that shows the most popular intents and number of successful and unsuccessful queries. Note that the following report is connected to the development database, which was used for testing, so the data displayed reflects a greater number of unsuccessful queries than successful ones. This data will be eliminated from the reports when the bot goes live, so data presented to viaSport will reflect real user queries.

<br/>

![Performance report]({{ site.baseurl }}/images/viaSportBC/viaSport_report_performance.png)

<br/>

The reports were designed for both DirectQuery (live) and Import mode. Once in production, viaSport will be able to select which reports to publish externally.

**Learning:** As described in the previous section, it is important to check relations in Import mode because some of them could be predicted incorrectly. This can be done by using the **Relationships** tab.

![Relationships tab]({{ site.baseurl }}/images/viaSportBC/viasport_powerbi_relationships_tab.png)

<br/>

**Learning:** It is possible to create new columns based on expressions for both types of reports, but expressions will be different. DirectQuery mode has some limitations that are related to measurement fields, and the `DateTime` field requires an additional expression to be used. For example:

```
    UtcDate =
    DATE(YEAR(Query\[UtcDateTime\]),MONTH(Query\[UtcDateTime\]),DAY(Query\[UtcDateTime\]))
```

<br/>

In Import mode, a general `DateTime` can be used and it will be possible to select needed components. As a result, DirectQuery reports have a different interface regarding filters by `DateTime`.

#### Display reports on the web

The Power BI Embedded SDK supports several APIs including ASP.NET MVC, JavaScript, and ASP.NET Web Forms. To publish existing reports for this project, the team decided to use this existing open source
[ASP.NET MVC template](https://github.com/Azure-Samples/power-bi-embedded-integrate-report-into-web-app/tree/master/EmbedSample).

Authentication was added and the template was adapted to work with two workspaces at the same time.

![Live reports dashboard]({{ site.baseurl }}/images/viaSportBC/viaSport_live_reports_dashboard.png)

<br/>

After the bot is in production, reports will be embedded into the production portal.


## Conclusion

In the weeks following the viaSport Inclusion ChatBot development project, viaSport will deploy the bot to a private preview with selected partners to test the bot, retrieve early analytics, and, most importantly, determine areas of weakness that must be strengthened before the bot is released to the public. Mark Schramm of Fusionware will continue to lead ongoing development of this bot, and members of the development team have volunteered to support the bot in the future.

As the project sees success and becomes well-used, there may be opportunity to explore expansion of the bot to different channels and communication methods. Building out the speech app would make the bot more accessible to users who require voice-based interactions and the use of screen readers, which is key to inclusion and accessibility. Publishing the bot to further channels (such as Skype, Messenger, and Kik) would allow users to interact with the bot in their own preferred chat platform. It would also open the doors to implementing proactive notifications, whereby the bot could remember when a user’s query did not match any resources in the database and, when a new resource is added, could send a notification to all the users who had previously requested such a resource, notifying them that a new  resource has been added that might be relevant to them.

ViaSport’s inclusion policy is an umbrella policy for many groups often  neglected by the traditional sport system. Though this project was initially developed for athletes with disabilities, there is an opportunity to scale this tool for other underserved communities including girls and women, those who identify as LGBTQI2S, the aboriginal community, and seniors. There is an opportunity to work with national partners in increasing the scope to the national level and crossing sectors with the education, health, and medical sectors.

The viaSport Inclusion Bot has the potential to positively impact the atmosphere for inclusive sport in British Columbia by providing viaSport with a channel to deliver their carefully curated resources to their users in a unique and targeted manner. By proactively prompting the user for information and guiding the conversation, the bot aids users in finding resources that are relevant to their precise needs. Cognitive Services APIs add intelligence to the bot, making the user experience more streamlined and proactive. Analytics dashboards equip viaSport with reports that will enable them to improve their resources based on user interactions, as well as leverage specific insights in conversations with partners and sponsors to prove their impact on the community.

In the quest to promote inclusivity, a key step is making existing resources available to those who need them most. This bot and the accompanying administrative app provide a fully manageable and intelligent solution for viaSport to access their audience in a new and impactful way, to play a role in changing the conversation by subtly phasing out the use of outdated terminology, and to act as the leader for inclusive sport in British Columbia and Canada.

## Additional resources
- [LUIS documentation](https://docs.microsoft.com/en-us/azure/cognitive-services/LUIS/Home)
- [Bing Web Search documentation](https://docs.microsoft.com/en-us/azure/cognitive-services/bing-web-search/overview)
- [Bing Spell Check documentation](https://docs.microsoft.com/en-us/azure/cognitive-services/Bing-Spell-Check/Home)
