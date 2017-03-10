---
layout: post
title:  "Building an interactive tutorial player with MakersKit using Azure App Service and Azure Media Services"
author: "David Washington"
author-link: "http://dwcares.com"
#author-image: "{{ site.baseurl }}/images/authors/dwashin.png"
date:   2017-03-09
categories: [Azure App Service]
color: "blue"
#image: "{{ site.baseurl }}/images/imagename.png" #should be ~350px tall
excerpt: MakersKit, a do-it-yourself project kit startup, joined with Microsoft to build a custom tutorial player using Node.js and Socket.io hosted on Azure App Service and Azure Media Services.
language: [English]
verticals: [Communications/Media, Education, "Retail, Consumer Products & Services"]
---

![MakersKit Logo]({{ site.baseurl }}/images/2017-01-19-makerskit/makerskit-logo.png)


[MakersKit](http://makerskit.com) is a startup that sells do-it-yourself project kits online by subscription and in retailers around the world. I worked with the team at MakersKit to build a custom tutorial video player while they participated in the [Techstars Retail Accelerator](http://www.techstars.com/programs/retail-program/) in Minneapolis.

Working together, we designed and built a new way for their users to watch and interact with tutorial content. We used [Node.js](https://nodejs.org), [Express](http://expressjs.com), and [Socket.io](http://socket.io) and hosted the solution on the [Web Apps](https://azure.microsoft.com/en-us/services/app-service/web) feature of Azure App Service, and [Azure Media Services](https://azure.microsoft.com/en-us/services/media-services). The solution we built allows MakersKit to provide better value to their customers through premium instructional content, with tight social integration beyond what they currently hosted on YouTube. 

> "Teaming up with Microsoft has been a game changer. We used Azure to take our idea of creating an interactive video player and ended up with a beautiful solution that engages our users like never before."
>
> - Mike Stone, MakersKit Co-founder

### Development team ###

- Mike Stone ([@makerskit](https://twitter.com/makerskit)) – Co-Founder, MakersKit
- Alex Froelich ([@froeal01](https://twitter.com/froeal01)) – Chief Product Officer, MakersKit
- David Washington ([@dwcares](https://twitter.com/dwcares)) – Technical Evangelist, Microsoft

![MakersKit]({{ site.baseurl }}/images/2017-01-19-makerskit/makerskit-techstars-team.jpg)


## Customer profile ##

Founded in 2014 in Los Angeles and now based in Portland, Oregon, [MakersKit](http://makerskit.com) delivers boxes full of creative projects and ideas inspired by the best of Pinterest and YouTube. A recent graduate of the [Techstars Retail Accelerator](http://www.techstars.com/programs/retail-program/) in Minneapolis, MN, MakersKit has shipped 250,000 kits worldwide and its products are available in thousands of stores, including *Macy's*, *Urban Outfitters*, *West Elm*, and *Williams-Sonoma*. The company has been showcased in *The New York Times* and *RealSimple Magazine*, and featured on *Good Morning America*.

![MakersKit Product Image]({{ site.baseurl }}/images/2017-01-19-makerskit/makerskit-box-contents.png)

    
## Problem statement ##

MakersKit was born from the founders doing in-person DIY tutorials in Los Angeles and teaching people how to make beautiful, creative crafts. As the company evolved to focus more on an online subscription model rather than doing most sales in retail stores, the team wanted to find a way to retain the quality of education and the social interaction of these in-person tutorials for people who purchased online kits through subscription. 

![Whiteboard concept session]({{ site.baseurl }}/images/2017-01-19-makerskit/makerskit-design-sketch.png)

  
### Opportunities ###

I first met Mike Stone during Mentor Days at the Techstars Retail Accelerator in Minneapolis. We discussed many ways to meet their online subscription model goal, but we decided to focus on two main opportunities:

1. **Richer, more interactive, tutorial video playback**  
MakersKit currently hosts all its tutorial content on YouTube. When someone buys a kit, they watch the video to see how to build it. These videos are a key part of the MakersKit value proposition as they are fun to watch and easy to learn from. 

  The YouTube videos are designed to contain both instruction and marketing content. Creating a successful video is difficult because it can end up being either too long to be a marketing video or too short to truly be instructional. The videos lack any tools to help guide the viewer from step to step, to easily repeat steps, and to view the instructions as they watch the video. 

2. **Real-time contextual chat**  
Since MakersKit workshops are known for their great social experience, we wanted to play with the idea of bringing that social conversation to people building kits on their own at home. Would it be possible to recreate the social feel of the DIY workshops that Mike and his co-founder led in Los Angeles in a way that scales to online users?
  
> "Our dream is to have this player + social sharing photos, videos and comments right on the video page."
>
> - Mike Stone, MakersKit Co-founder
    
## Solution ##

We built an interactive tutorial player that included the following pieces:

 1. [Host tutorial video content on Azure Media Services](#hosting-video-on-azure-media-services)
 2. [Build an HTML5 interactive tutorial player that extends the Azure Media Player](#building-the-interactive-tutorial-player)
 3. [Build real-time chat client and server using Node.js, Express, and Socket.io](#adding-real-time-chat-with-socketio)
 4. [Publish the Node.js web app to Azure App Service](#publishing-the-nodejs-app-to-azure-app-service)
  
![Architecture]({{ site.baseurl }}/images/2017-01-19-makerskit/makerskit-arch.png)


## Hosting video on Azure Media Services  

![Azure Media Services Publish]({{ site.baseurl }}/images/2017-01-19-makerskit/makerskit-mediaservices-publish.png)


We decided to host our video content on [Azure Media Services](https://azure.microsoft.com/en-us/services/media-services/) because we wanted more control over how the video was published and served. Azure Media Services handles some of the fundamentals like scaling to match user views dynamically and transcoding to different browsers and devices. It enables future scenarios like live streaming video for live tutorial events and digital rights management (DRM) if MakersKit decides to make its tutorial videos a premium offering for people who purchased kits.   

Getting the video published on Azure Media Services was straightforward. I followed the [Azure Media Services Documentation](https://docs.microsoft.com/en-us/azure/media-services/media-services-portal-vod-get-started) to perform the following steps:

1. [Create an Azure Media Services account](https://docs.microsoft.com/en-us/azure/media-services/media-services-portal-create-account)
2. [Upload video files to Azure Blob storage](https://docs.microsoft.com/en-us/azure/media-services/media-services-portal-vod-get-started)
3. [Encode video assets for streaming](https://docs.microsoft.com/en-us/azure/media-services/media-services-portal-vod-get-started)
4. [Publish an endpoint for streaming and progressive download](https://docs.microsoft.com/en-us/azure/media-services/media-services-portal-vod-get-started)

For this project, that was enough to get MakersKit up and running. However, Azure Media Services offers the flexibility to expand on our implementation by programmatically publishing and encoding videos using a [REST API](https://docs.microsoft.com/en-us/azure/media-services/media-services-rest-get-started), or enable video processing features like auto-captioning or video stabilization using the [Microsoft Cognitive Services](https://docs.microsoft.com/en-us/azure/media-services/media-services-analytics-overview) analytics features that are baked into Azure Media Services. These features could be incorporated in later releases.

![Azure Media Services Architecture]({{ site.baseurl }}/images/2017-01-19-makerskit/makerskit-mediaservices.png)  


## Building the interactive tutorial player ##

We built an interactive player that shows the instructions for the video, detailed descriptions of each step in the video, and links and contextual information relevant to each step of the tutorial video as it is played. This custom player allows the person watching the video to skip between major steps and read detailed information as they watch the video. 

![Tutorial Player]({{ site.baseurl }}/images/2017-01-19-makerskit/makerskit-player.png)


### Azure Media Player (AMP) ##

If we were only playing the video, we could have just added an HTML5 ``<video>`` element with the ``src`` attribute that points to the video hosted on the Azure Media Services URL. But in our case we needed detailed events about playback, timeline marker controls, and support for multiple browsers. Rather than starting from scratch with the HTML5 ``<video>`` element, we used the HTML [Azure Media Player (AMP)](https://azure.microsoft.com/en-us/services/media-services/media-player/) control. Since the video is hosted on Azure Media Services, the AMP control made it super easy to host those videos in a web app. Also, the AMP control is completely extensible and styleable so it was perfect for anyone's custom tutorial player. All that is needed to add the Azure Media Player library is the script and stylesheet reference. We pulled them from the CDN, but we could have included these files directly in the project.

```html
<script src= "azuremediaplayer.min.js"></script>
<link href="azuremediaplayer.min.css" rel="stylesheet">

```

To add the actual player control, we added a video element with the following ``azuremediaplayer`` class to make it initialize correctly. 

```html
<video id="tutorialPlayer" class="azuremediaplayer amp-default-skin">
</video> 
```

To initialize the control, we instantiated an object that points to the element we created.

```javascript
  var myPlayer = amp('tutorialPlayer', {
    techOrder: ["azureHtml5JS", "html5", "flashSS", "silverlightSS"],
    "nativeControlsForTouch": false,
    autoplay: true,
    controls: true,
    "logo": { "enabled": false },
    poster: videoData.posterURL,
    width: videoData.size[0],
    height: videoData.size[1]
  });

  myPlayer.src([{ 
      src: videoData.url, 
      "type": "video/mp4",
      "selected": true
  }]);

```

### Creating a tutorial definition JSON format ###

With our new video player we changed the publishing pipeline for MakersKit. Instead of first publishing a video on YouTube and then publishing the steps as a PDF on the MakersKit website, we integrated these steps. 

Each video must contain the instructions, the time stamps for each of the steps, and any other video metadata that renders during playback. To enable this, we created a JSON format for each video that includes the relevant metadata for each video, including instructions, and an array the time stamps, with relevant data for each time stamp.

We chose JSON because it is both lightweight and flexible enough for MakersKit's needs. It is simple to adapt JSON for a CMS/tooling pipeline with a NoSQL back end as more and more videos are published with the new process. 

```javascript
var video = {
    size: [584, 330],
    posterURL: "poster.png",
    link: {
            label: "Classic Cocktail Kit", 
            url: "https://makerskit.com/products/cocktails"
          },
    url: "<MAKERSKIT_VIDEO_URL>",
    timestamps: [ 
      {time: 0},
      {time: 23}
      // More timestaps here...
    ]
}
```

### Showing time stamp markers ###

Mike wanted the tutorial player to contain time stamp markers on the video timeline so people watching the video would know where to find the key steps in the video. 

![Timestamps]({{ site.baseurl }}/images/2017-01-19-makerskit/makerskit-markers.gif)


Rather than building this part ourselves, we used the Azure Media Player's Timeline Markers Plugin. It lets us access timeline time stamp markers for free. 

After adding the plugin's files to our project, we added the ``timelineMarker`` property that points to all the video timestamps to the plugins property of our AMP initialization. 

```javascript
plugins: {
          timelineMarker: {
              markertime: video.timestamps,
              timeformat: 'seconds'
          }
      }
```

### Responding to changes in playback time stamp ##

![Dynamic tutorial content]({{ site.baseurl }}/images/2017-01-19-makerskit/makerskit-dynamic-content.gif)


We built an instructional content pane that stays in sync with the content that's currently being played. The pane gets its content updated when a custom video playback event that we created gets fired.

```javascript
 var timestampchangedevent = new Event('timestampchanged');

 player.addEventListener('timeupdate', function(e) {            
    
    // Code to detect timestamp has changed

    // Fire the event to anyone listening
    player.el_.dispatchEvent(timestampchangedevent);
});
```

When it fires, we update the contents of the pane with the tutorial content relevant for that time stamp.

```
  this.addEventListener('timestampchanged', function(e) {
    currentTimestampIndex = e.updatedTimestampIndex;
    renderTimestamp(tutorialPane, videoData.timestamps[e.updatedTimestampIndex]);
  });
```

### Creating the web server in Node.js and Express.js

![Embedded Tutorial Player]({{ site.baseurl }}/images/2017-01-19-makerskit/makerskit-player-embed.png)


The custom tutorial player was built in HTML and the client-side was built in JavaScript; we built the server for the player in [Node.js](http://nodejs.org/). We used [Express.js](http://expressjs.com/) to simply serve up the player. Creating a separate server allowed the player to be embedded on the existing MakersKit website as an IFrame in the same model as their previous YouTube player.

```javascript
var express = require('express');
var app = express();
app.use(express.static('public')); 
var http = require('http').Server(app);

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/default.html');
});
```

## Adding real-time chat with Socket.io ##

![Chat]({{ site.baseurl }}/images/2017-01-19-makerskit/makerskit-chat.gif)


The MakersKit team wanted a real-time social experience for people to interact, share, and get help with each other while they watch the tutorial videos. We created a real-time chat client integrated into the tutorial player so people simultaneously watching videos could ask each other questions and share best practices. 

![Socket.io Logo](/images/2017-01-19-makerskit/logo.svg)


We built our server in Node.js, so to build real-time chat we used the Node.js real-time framework, [Socket.io](http://socket.io). Socket.io is great for real-time applications like chat because it's built on top of the WebSocket Protocol supported by most modern browsers. The persistent TCP connection reduces the latency in messages between client and server. Also, Socket.io has a consistent API between client and server since they both are JavaScript. The approach that we used for building chat using Socket.io closely followed the [Building Real-time Chat in Socket.io (MSDN)](https://docs.microsoft.com/en-us/azure/app-service-web/web-sites-nodejs-chat-app-socketio) example.

### Emitting messages from the client 

```javascript
  socket.emit('new message', {
      username: username, 
      message: message, 
      sectionIndex: currentTimestampIndex
  });
```

### Receiving and broadcasting messages on the server 

```javascript
  socket.on('new message', function (msg) {
      socket.broadcast.emit('new message', msg);
  });
```

## Publishing the Node.js app to Azure App Service ##

After our complete Node.js web app was built and tested, we deployed it to Azure App Service. This type of Node.js web app is ideal for deploying to a serverless, or platform as a service (PaaS), offering like Azure App Service. The advantage of using PaaS here instead of a virtual machine was the simplicity of deployment and management. We only had to worry about our code, not a machine operating system, or networking configuration. 

We used GitHub for source control during the initial development, so we wanted to pursue a continuous delivery (CD) solution that worked with GitHub. Actually deploying the custom tutorial player code from GitHub to Web Apps was very straightforward. [Learn how to create a Node.js app, check it into GitHub, and set up continuous deployment to Azure](https://azure.microsoft.com/en-us/resources/videos/create-a-nodejs-site-deploy-from-github/).

![Chat]({{ site.baseurl }}/images/2017-01-19-makerskit/makerskit-azure-github.gif)

 
## Conclusion ##

We went into this collaboration looking at two main opportunities. We successfully implemented and learned from both of them.

1. **Richer, more interactive, tutorial video playback**  
We built a custom tutorial player with a dynamic content pane with tutorial information and instructions that stay in sync with the video as it plays back. The video streams from Azure Media Services so we get more control over video streaming beyond what's available on YouTube. This opens up new scenarios like real-time captions, and potential premium scenarios enabled through DRM.

2. **Real-time contextual chat**  
We built a social experience beyond a basic comment section by enabling real-time chat in the tutorial pane. The real-time chat pane is the foundation for a real-time sharing and collaboration model that will lead to sharing photos and videos of completed projects, and expand to a more social way to complete projects. 

> "We're known for hands-on DIY workshops, and our goal is to scale that experience digitally and make it accessible to anyone. By teaming up with Microsoft, we created an interactive video playback experience that keeps pace with each user, all while offering complimentary tips, resources, buyable supply lists, and PDF downloads."  
> 
> - Mike Stone, MakersKit Co-founder

### Future opportunities ###

The MakersKit team plans to evaluate the custom tutorial player and pilot with other customers in 2017. In addition to learning from the initial MakersKit pilot, there are other opportunities:

* Build a content management server (CMS) portal so non-technical members of the creative staff can publish videos that include detailed metadata without hand-authoring the JSON format. Publishing of videos to Azure Media Service can be enabled via the [Azure Media Services REST API](https://docs.microsoft.com/en-us/azure/media-services/media-services-rest-get-started).
* Build a [live streaming endpoint on Azure Media Services](https://docs.microsoft.com/en-us/azure/media-services/media-services-manage-channels-overview) to enable live, global workshops for people to build their kits together. 
* Implement [digital rights management (DRM)](https://azure.microsoft.com/en-us/services/media-services/content-protection/) in Azure Media Services for premium tutorial content for subscribers.
* Enable video processing of published videos like auto-captioning or video stabilization using [Microsoft Cognitive Services](https://docs.microsoft.com/en-us/azure/media-services/media-services-analytics-overview). 
* Implement more video and photo sharing in chat, and implement persistent storage for the chat threads using [DocumentDB](https://azure.microsoft.com/en-us/services/documentdb/).
* Integrate authentication into chat by enabling shared authentication provider between chat and store. One approach to accomplishing this would be to implement [Azure Active Directory B2C](https://azure.microsoft.com/en-us/services/active-directory-b2c).

## Additional resources ##

### Reference documentation ###

* [Azure App Service Web Apps](https://docs.microsoft.com/en-us/azure/app-service-web/)
* [Azure Node.js Development Center](https://azure.microsoft.com/en-us/develop/nodejs/)
* [Building Real-time Chat in Socket.io (MSDN)](https://docs.microsoft.com/en-us/azure/app-service-web/web-sites-nodejs-chat-app-socketio)
* [Azure Media Services](https://docs.microsoft.com/en-us/azure/media-services)
* [Get started with Node.js web apps on Azure App Service (Tutorial)](https://docs.microsoft.com/en-us/azure/app-service-web/app-service-web-get-started-nodejs)
* [Deploy a Node.js web app from GitHub (Video)](https://azure.microsoft.com/en-us/resources/videos/create-a-nodejs-site-deploy-from-github/).

### Demo site ###

[http://makerskit.azurewebsites.net](http://makerskit.azurewebsites.net)

### Source code ###

[https://github.com/dwcares/InteractiveTutorial](https://github.com/dwcares/InteractiveTutorial)

### Demo video ###

[![MakersKit Demo Video Thumbnail]({{ site.baseurl }}/images/2017-01-19-makerskit/makerskit-video-thumb.png)](https://channel9.msdn.com/Blogs/raw-tech/MakersKit-Interactive-Player)
