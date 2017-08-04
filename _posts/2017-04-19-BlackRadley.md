---
layout: post
title:  "Using Cognitive Services to make museum exhibits more compelling and track user behavior"
author: "Martin Kearn, Martin Beeby"
author-link: "http://martink.me"
date: 2017-08-04
categories: [Cognitive Services]
color: "blue"
image: "images/BlackRadley/smag-header.png"
excerpt: "Black Radley teamed up with Microsoft to use Cognitive Services to make museum exhibits more compelling by tailoring audio descriptions based on age, gender, and emotional state, and by tracking patrons as they traverse the museum exhibits."
language: [English]
verticals: [Education, Entertainment, Government]
geolocation: [Europe]
---

Microsoft teamed up with Black Radley and the Shrewsbury Museum & Art Gallery to create a solution that would react to museum patrons as they interact with exhibits based upon their approximate age, gender, and emotional state. Additionally, the solution would provide detailed insight on how patrons traverse the museum, which exhibits they linger at, and for how long.

The goal was to address problems that museums face around making exhibits more compelling for patrons and better understand how patrons use the museums.

### Key technologies used

- [Windows 10 IoT Core](https://developer.microsoft.com/en-us/windows/iot) (herein referred to as Windows IoT)
- [Raspberry Pi 3](https://www.raspberrypi.org/products/raspberry-pi-3-model-b/) with a USB webcam and speaker (RP3)
- [Universal Windows Platform](https://docs.microsoft.com/en-us/windows/uwp/get-started/universal-application-platform-guide) (UWP)
- [Microsoft Cognitive Services Face API](https://azure.microsoft.com/en-us/services/cognitive-services/face/) (Face API)
- [ASP.NET Core Web API](https://www.asp.net/) (Web API)
- [Microsoft Azure App Service](https://azure.microsoft.com/en-us/services/app-service/) (App Service)
- [Azure Table storage](https://azure.microsoft.com/en-gb/services/storage/tables/) (Table storage)
- [Microsoft Power BI](https://powerbi.microsoft.com/en-us/) (Power BI)
- [Microsoft Office Excel 2016](https://products.office.com/en-gb/excel) (Excel)

### Core team

- [Martin Kearn](https://twitter.com/MartinKearn) – Senior Technical Evangelist, Microsoft
- [Martin Beeby](https://twitter.com/TheBeebs) – Technical Evangelist, Microsoft
- [Paul Foster](https://twitter.com/PaulFo) – Senior Technical Evangelist, Microsoft
- [Joe Collins](https://twitter.com/JoeJCollins) – Head of Systems and Analysis, Black Radley
- [Richard Wilde](https://twitter.com/Rippo) – Developer, Black Radley 
- [Ryan O'Neil](https://twitter.com/RyanONeill1970) – Developer, Black Radley 

### Source code

The full solution is open-sourced under the [GNU General Public License v3.0](https://choosealicense.com/licenses/gpl-3.0/) license on [GitHub](https://github.com/blackradley/dinmore).

## Customer profile

[Black Radley](http://www.blackradley.com) is a consultancy organization that works with public services to inspire and invigorate systems and people. Black Radley works closely with museums within the United Kingdom on both technical and commercial projects. 

![Black Radley logo]({{ site.baseurl }}/images/BlackRadley/BlackRadley.JPG)

<br/>

For this project, we worked closely with the [Shrewsbury Museum & Art Gallery (SMAG)](http://www.shrewsburymuseum.org.uk), a provincial museum in Shrewsbury, Shropshire, England. SMAG offers you the chance to discover a mix of the old, the new, and the curious all within an extraordinary set of buildings. From a medieval town house to an early Victorian Music Hall, exhibits span more than 750 years of history. 

<img alt="Shrewsbury Museum & Art Gallery" src="{{ site.baseurl }}/images/BlackRadley/SMAG.png" width="500">

<br/>

## Problem statement

Provincial museums like SMAG are under increasing pressure to be more compelling and profitable, and to ultimately drive higher attendance from the general public. 

Black Radley has had a desire to make museum exhibits more intelligent for some time. Joe from Black Radley was inspired to explore Microsoft technology after attending the [Hereford Smart Devs community meetup](https://www.meetup.com/Smart-Devs-User-Group/) in February 2017 where Martin Kearn presented on [Microsoft Cognitive Services](http://www.microsoft.com/cognitive).

> "We had attempted this project using Linux and several open source tools and found that setting up our development environment proved to be a challenge. Working with Microsoft and using Visual Studio, we were able to accelerate through to a working solution within a couple of days." —Joe Collins, CTO, Black Radley

Black Radley saw two primary ways to help museums achieve this goal: make exhibits more compelling, and better understand patrons.

> "Public funding for museums is likely to decline in the foreseeable future. To maintain their services, museums and galleries are trying to attract more visitors and understand the visitors' experience. This solution provides a tool to help museums enhance the visitor experience and to understand how visitors respond to exhibits." —Joe Collins, CTO, Black Radley

### State of the art for exhibits

Most museum exhibits have a small amount of printed information accompanying them for patrons to read. This information has to be written in a plain, generic way that is accessible for all audiences; therefore, it is often very factual and not particularly compelling, especially for younger audiences.

<br/>

<img alt="An exhibit with a printed text description" src="{{ site.baseurl }}/images/BlackRadley/Skeleton.jpg" width="700">

<br/>

Some exhibits may also have passive infrared (PIR) sensor-based, motion-triggered audio descriptions, videos, or other media that give some information about the exhibit as a patron approaches. While these multi-media descriptions do grab attention and give information in a more compelling way than printed text, they still have to be created in a generic way that is suitable for all audiences. Additionally, the PIR sensor systems are relatively "dumb" in that they cannot detect when a person walks off. This causes the descriptions to continue playing until completed, regardless of whether anyone is listening.

<br/>

<img alt="An exhibit with a sensor and audio/video description" src="{{ site.baseurl }}/images/BlackRadley/SensorAudioVideo.jpg" width="700">

<br/>

### Patron data

Most museums capture relatively little information around visitors and their activity, such as:

- Patron age
- Patron gender
- Which exhibits are the most popular and attract the most interaction

Without this sort of data, it is up to the museum curators to estimate, based on their experience, how to best lay out the exhibits, and to make recommendations about which exhibits certain demographics may find more interesting.

> "Museums usually count and segment visitors so they can report to funding bodies and understand their customers. Many museums conduct a rolling program of visitor surveys to understand the visitor experience. The data is used to guide design changes to the museum exhibitions and to support funding applications." —Joe Collins, CTO, Black Radley

## Solution and steps

There were two primary goals to the solution:

1. Improve exhibits by using cognitive intelligence to give a tailored experience based upon demographic information.
2. Track and report on how patrons interact with exhibits and the museum as a whole to allow the museum to report to funding bodies and better understand their customers.

### Prerequisites

1. Install [Visual Studio Code](https://code.visualstudio.com/).
2. [Obtain the key](https://azure.microsoft.com/en-us/try/cognitive-services/?api=face-api) for the Cognitive Services Face API.
3. Obtain an [Azure subscription](https://azure.microsoft.com/en-us/free/) to use Azure App Service and Azure Table storage.
4. Set up [Windows 10 IoT Core](https://developer.microsoft.com/en-us/windows/iot) on your Raspberry Pi 3.
5. Set up an account for [Power BI](https://powerbi.microsoft.com/en-us/).

### Intelligent Exhibit app and device

We wanted to create a device that would enable a visitor to approach an exhibit in the museum and have audio that was tailored for their demographic played back to them. This was in the hope that this customization would provide a more enjoyable, entertaining, and informative experience. We coined the phrase *Intelligent Exhibit* to describe this experience.

The overall idea of the Intelligent Exhibit was that we'd place an IoT device with a webcam and speaker on each exhibit. This device would do several things:

1. Detect the presence of faces gazing at or interacting with the exhibit.
2. Greet the patron/patrons appropriately.
3. Take a photo and obtain the rough age, gender, and emotional state of each face by using Face API.
4. Play a suitable audio description to match the age and gender of the patron, or play a generic audio description for groups. 

   For example, when looking at an exhibit that is a panoramic painting of Shrewsbury, a patron in the 12–17-year-old demographic will hear audio that is pacey and enthusiastic, and the script will include age-appropriate cultural references to an iPhone. You can listen to a sample MP3 here: [Teenage demographic audio](https://thebeebscontent.blob.core.windows.net/audio/12-17.mp3).

   The 55–64-year-old demographic will hear audio that is more formally delivered, and the script will include more specific details. Listen to a sample MP3: [Senior demographic audio](https://thebeebscontent.blob.core.windows.net/audio/55-64.mp3).

5. Detect when patrons depart, and stop the audio description.

The IoT device was a Raspberry Pi 3 running Windows IoT Core, which runs a UWP app that does the initial face detection, takes the photo, and plays the audio descriptions. The Raspberry Pi is equipped with a webcam and a speaker, but no screen or other peripherals.

Following is a photo of the device and hardware (the screen is for debugging only).

<img alt="Intelligent exhibit device and hardware" src="{{ site.baseurl }}/images/BlackRadley/IntelligentExhibitDeviceHardware.jpg" width="800">

<br/>

For the purposes of the initial workshop, we used a mocked up cardboard box to contain the Raspberry Pi and other hardware when it is in situ with the exhibit, but going forward this would have a much better, more discreet finish.

Following is a photo of the cardboard casing.

<img alt="Intelligent exhibit device casing" src="{{ site.baseurl }}/images/BlackRadley/IntelligentExhibitCasing.jpg" width="800">

<br/>

This photo shows the cardboard casing in situ with an exhibit at SMAG.

<img alt="Intelligent exhibit device casing in situ" src="{{ site.baseurl }}/images/BlackRadley/IntelligentExhibitCasingInSitue.jpg" width="800">

<br/>

### Patron data capture and analysis

For museums to gain more insight into how patrons interact with exhibits and traverse the museum, the solution also tracks faces as they are sighted throughout the museum.

When the Intelligent Exhibit device captures the details of a face, we store the unique face ID and add it to a list of faces for that day. We store the face data with the time, exhibit location, and device details so that we are able to determine whether a face has been seen before on that day, and if so, at which exhibit and at which time.

The solution logs each sighting so that the data can be analyzed at a later date. Using this data, we can track key data about each patron, including:

- Approximate age, gender, and emotional state for each patron at each sighting.
- Which exhibits they visited and in which order.
- How long they lingered at each exhibit.

These data points are extremely valuable in terms of helping museums understand patrons so they can offer better services to them.

> "Using a device like this takes visitor data collection to a new level, providing museums with much more detailed information about visitor behavior. This would allow museums to identify hotspots within the museum and to spot trends as they develop." —Joe Collins, CTO, Black Radley

The following section explains in more detail exactly how the data is logged and searched and how the primary key is created.

## Technical delivery

The entire solution is a relatively complex solution involving multiple technologies.

This diagram shows the high-level architecture that is explained in each of the following sub-sections.

![Intelligent Exhibit architecture]({{ site.baseurl }}/images/BlackRadley/black-radley-architecture.jpg)

<br/>

The key steps of the solution were to create a UWP app that would run on an RP3 device running Windows IoT. This device would be integrated into exhibits and set to capture images when a person (face) is detected. The photo would then be sent to a proxy Web API that passes the image through the Face API to gather data on emotion, age, gender, and other data points before logging the data in Table storage for later analysis and passing the data back to the UWP app. The UWP app would then tailor the audio description about the exhibit based on the data gained from the API.

### Windows 10 IoT Core and UWP

> "Windows 10 IoT Core and UWP provided the fastest method of getting a working initial solution. It offered a familiar development experience so that our developers could be productive from day one." —Joe Collins, CTO, Black Radley

The UWP app uses a webcam to capture faces, detect faces, post information to the Face API, and display a different audio file based upon the response from the API.

The main entry point for the application is WebcamFaceDetector.xaml inside of App.xaml.

This page has the following responsibilities:

- Initialize and manage the `FaceTracker` object.
- Start a live webcam capture, and display the video stream.
- Create a timer and capture video frames at specific intervals.
- Execute face tracking on selected video frames to find human faces within the video stream.
- Acquire video frames from the video capture stream and convert them to a format supported by `FaceTracker`.
- Retrieve results from `FaceTracker` and visualize them.
- Call the API to get demographic information from video frames that contain faces.
- Request audio to be played by the `VoicePlayer` based on demographic information.

The `FaceDetector` is initialized in the `OnNavigatedTo` method. The `FaceDetector` class is part of the namespace `Windows.Media.FaceAnalysis` and can be used to detect faces in a SoftwareBitmap (uncompressed bitmap). 

```
if (faceTracker == null)
{
    faceTracker = await FaceTracker.CreateAsync();
    ChangeDetectionState(DetectionStates.Startup);
}
```

We used this class as a fast on-device way of establishing the presence of faces. After faces are detected, the proxy Web API (explained in the following section) is used to get more in-depth information. This ensures that our device responds to faces quickly while also reducing the amount of network chatter that would be required to process every frame using off-device APIs.

Despite initial reservations about performance, we found that we could actively detect faces from a live video stream while keeping the RP3 CPU at well under 50% capacity.

During initialization, we changed the `DetectionState` to `Startup`. Throughout the code, there are references to the `DetectionState`. This is a state machine that is used to determine if the `FaceDetector` should be analyzing frames or not. We required this state machine because we wanted to have a way to stop processing frames while we made API calls; we also used it to determine if a patron moves away from an exhibit and pauses the audio.

Calling `ChangeDetectionState` with `DetectionStates.Startup` initializes the webcam and starts face detection. We also changed `DetectionState` to `WaitingForFaces`. 

The `StartWebcamStreaming` method creates a new `MediaCapture` class and ties the output to `CamPreview`, which is a `CaptureElement` XAML control that is visible on the XAML page. We use this for debugging; however, to preserve system resources, you can switch it off by setting **TurnOnDisplay** to false in the resources file. Lastly, we call `RunTimer`, which starts a timer that we use to process the video frames for face detection.

The timer uses `timerInterval`, which is set by values retrieved from `TimerIntervalMilliSecs` in Resources.resw (250 ms). On each tick of the timer, we call `ProcessCurrentStateAsync`. This method uses `DetectionState` to determine if faces are present and what to do in various circumstances.

Inside `ProcessCurrentStateAsync`, if the `DetectionState` is `DetectionStates.WaitingForFaces`, we process the current video frame using `ProcessCurrentVideoFrameAsync()`. If this API returns a face, we know that a face has been detected, so we change the `DetectionState` to `DetectionStates.FaceDetectedOnDevice`.

Inside `ProcessCurrentStateAsync`, if the state is `FaceDetectedOnDevice`, the following logic runs. We check to see if the API was called in the last 5 seconds; this avoids the device getting stuck in a loop if the user leaves and then re-enters the frame.  

The code waits a few seconds and then plays a hello audio file called `VoicePlayer.PlayIntroduction()`, and then posts the image data to the proxy API by using `PostImageToApiAsync`. During this pause and the duration of the audio file, we would hope that we have received a response from the proxy API with the demographic information; we are then able to determine which audio playlist to play. `DetectionState` is changed to `ApiResponseReceived`.

Inside `ApiResponseReceived`, we run some more logic, and then if we still have a face, we ultimately call the play method of the `VoicePlayer` class. This method takes a `DetectionState` argument that is used to determine the audio to play. We take the age of the oldest face in the image and play the audio file that corresponds to that face.

To play the WAV file, we use the `PlayWav` method, which takes all the WAV files in the playlist group as an argument.

Inside `PlayWav`, we use `MediaPlayer` and `MediaPlaybackList` to play our audio. Rather than an exhibit having a single audio file for each demographic group, we have multiple audio files per group. We add these to a playlist. That way if a user leaves the frame and walks away from the exhibit, we can stop the audio at the end of a sentence rather than randomly during playback. 

To handle the event that the user has left the exhibit, we have a detection case called `WaitingForFacesToDisappear`. When the audio is playing, this is the state that the system should be in. If it detects that faces disappear, it will call `VoicePlayer.Stop()`. This method sets a variable called `StopOnNextTrack`. When the playlist changes the item it is playing, it calls the `CurrentItemChanged` event, which checks the `StopOnNextTrack` event. If it finds it, it will stop the audio.

You can see the [full code for the UWP app on GitHub](https://github.com/blackradley/dinmore/tree/master/Client/Dinmore.Uwp).

There are naturally some concerns over privacy; however, the device makes no record of visitor images. No images are stored, so it is not possible to review the records of who visited the exhibit. It is only possible to determine the estimated age and gender of visitors. 

### Proxy API

Because we potentially needed to use several Cognitive Services APIs, we decided to create a custom proxy API that the Intelligent Exhibit app would interface with via a single call. This allows the logic of the UWP app to be simple and lightweight.

This API was created by using ASP.NET Core 1.1 Web API in C#, and is contained within the [Server solution](https://github.com/blackradley/dinmore/tree/master/Server). 

There is a single controller called `PatronsController` with a single public method called `Post`, which responds to `HttpPost` requests to `<server>/api/patrons`.

The API also accepts a body containing a byte array that represents an image containing faces. For this to work, the client must make the request with the `Content-Type:application/octet-stream` header.

The API uses a repository pattern with [ASP.NET Core Dependency Injection](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/dependency-injection) to interact with the Cognitive Services and Azure APIs. The use of patterns was chosen to separate the application logic from the logic required to interact with the third-party APIs.

The `Post` function broadly follows this logical flow:

1. Cast the request body to a byte array representing the image passed from the client.

2. Get or create a face list for today (see the [Face lists](#face-lists) section).

3. Get the faces in the images by using the Cognitive Services Face API - Detect (see the [Face detect](#face-detect) section).

4. Enumerate the faces.

5. Get the best matching face in today's face list if there is one (see the [Similar face matching](#similar-face-matching) section); otherwise, add this face to the face list as a new face.

6. Create a `Patron` object to pass back to the client containing the face data and other data points required by the client.

7. Store the `Patron` object in Azure Table storage (see the [Azure Table storage](#azure-table-storage) section).

8. Return the `Patron` object to the client.

The interactions with the Face API are very simple, and there are plenty of examples online for how to do this. You can see the [full code for the `FaceApiRepository` on GitHub](https://github.com/blackradley/dinmore/blob/master/Server/dinmore.api/Repositories/FaceApiRepository.cs).

You will also see more detail about the Face API in subsequent sections of this document.

#### ASP.NET Core user secrets and app settings

To avoid putting API keys into the public GitHub repository, we used a tool called [Secret Manager](https://docs.microsoft.com/en-us/aspnet/core/security/app-secrets) to store local copies of API keys that can be exposed via the `IOptions<AppSettings>` interface in the code and **App settings** on Azure App Service.

To use this tool, the [Microsoft.Extensions.Configuration.UserSecrets NuGet package](https://www.nuget.org/packages/Microsoft.Extensions.Configuration.UserSecrets/1.1.1/) is required.

After it's installed, you can store API keys locally on your machine by using this command: 

    `dotnet user-secrets set AppSettings:EmotionApiKey wa068ba186e145bw9a57cue59bd53799`

The name of the app setting as referred to in your code is `EmotionApiKey`, and `wa068ba186e145bw9a57cue59bd53799` is the value (this is a made-up key for the sake of this write-up).

After the keys are stored, they can be accessed in code by using the [ASP.NET Core configuration API](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/configuration) with options and configuration objects. The code looks like this: `_appSettings.EmotionApiKey`.

When the application is published to Azure App Service, the key can be stored in an application setting for App Service, which is accessible via the Azure portal. This [Azure Friday video](https://azure.microsoft.com/en-gb/resources/videos/configuration-and-app-settings-of-azure-web-sites/) has some detail about how to configure this.

One thing that caused problems for us in the solution is that the key name in Azure must also include the `AppSettings` prefix. It should look like this:

![Azure app settings]({{ site.baseurl }}/images/BlackRadley/AzureAppSettings.jpg)

<br/>

#### Face detect

The proxy API initially uses the Face API to detect faces within the image passed to it by the client device. You can read all about this function at [Face API - Detect](https://westus.dev.cognitive.microsoft.com/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395236).

As with the entire solution, a repository pattern has been used to separate concerns between the proxy API and the services it calls. A `FaceApiRepository` class contains a function called `DetectFaces`, which performs the task of sending the image to the Face API and parsing results.

This operation is relatively straightforward and follows the following logical flow:

1. The image is sent to the Cognitive API as a POST request to this endpoint:

    `https://westeurope.api.cognitive.microsoft.com/face/v1.0/detect` 
    
2. The image is sent as a binary file in the body of the request.
3. The following headers are added to the request:

    `Ocp-Apim-Subscription-Key:<The API key for the Face API>`

    `Content-Type:application/octet-stream`

4. The Face API accepts several request parameters that allow additional data to be returned. By default, the proxy API requests the face ID and all attributes.

5. The response is parsed as JSON and returned to the API controller.

You can see the [full code for the `DetectFaces` function on GitHub](https://github.com/blackradley/dinmore/blob/master/Server/dinmore.api/Repositories/FaceApiRepository.cs).

#### Face lists

To meet the objective of recognizing whether a patron has been seen before, the solution makes use of the [Face API - Face List](https://westus.dev.cognitive.microsoft.com/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395250) feature. A face list is a list of up to 1000 faces that have been detected by using the [Face API - Detect](https://westus.dev.cognitive.microsoft.com/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395236) function and permanently stored. 

Face lists are a prerequisite to the [Face API - Find Similar](https://westus.dev.cognitive.microsoft.com/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395237) function.

The limitation of just 1,000 faces per list was considered in detail, and we felt that in the specific context in which the solution is intended, it is unlikely that more than 1,000 patrons would visit in a single day (at least for the museums that this solution is targeted towards). Therefore, a design decision was made to create a new face list for each day using the `ddMMyyyy` naming schema. 

On this basis, the first task that is performed is to get or create the face list for the current day. If the solution was ever to scale to a location that has 1000+ visitors in a day, the face lists could be created on an hourly or half daily basis instead.

As with the entire solution, a repository pattern has been used to separate concerns between the proxy API and the services it calls. A `FaceApiRepository` class contains a function called `GetCurrentFaceListId`, which checks if there is a face list for today, and if not, creates it and then returns the ID. This makes use of the [Face API - Create a Face List](https://westus.dev.cognitive.microsoft.com/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f3039524b) function. The code attempts to create a face list by using the date ID detailed earlier. If one already exists, a 409 status code is returned, which the code ignores.

You can see the [full code for the `GetCurrentFaceListId` function on GitHub](https://github.com/blackradley/dinmore/blob/master/Server/dinmore.api/Repositories/FaceApiRepository.cs).

#### Similar face matching

A core part of the server-side solution is to check whether a face has been seen before. This is critical to the goal of tracking patrons as they traverse the museum.

To do this, the solution performs two operations at the controller level:

1. Finds similar faces.
2. Adds detected faces to today's face list if there are no matches.

After the controller has detected faces, it enumerates each one and calls the `FindSimilarFaces` function of the `FaceApiRepository` class, which returns a list of faces that match the detected face from the current face list. The controller uses the best matching face for the next steps of the solution (Table storage). 

If there are no matches, the controller considers the detected face to be a new face within the context of today's face list and will add the detected face to the face list.

As with the entire solution, a repository pattern has been used to separate concerns between the proxy API and the services it calls. The `FaceApiRepository` class contains two functions related to this feature, `FindSimilarFaces` and `AddFaceToFaceList`. You can see the [full code for both functions on GitHub](https://github.com/blackradley/dinmore/blob/master/Server/dinmore.api/Repositories/FaceApiRepository.cs).

The face repository makes use of the [Face API - Find Similar](https://westus.dev.cognitive.microsoft.com/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395237) function and the [Face API - Add a Face to a Face List](https://westus.dev.cognitive.microsoft.com/docs/services/563879b61984550e40cbbe8d/operations/563879b61984550f30395250) function.

### Azure Table storage

After the controller has done all the work in detecting faces and storing them in the face list, it creates a `Patron` object that gets returned to the client.

The `Patron` object is also stored so that it can be queried later on, thus fulfilling the objective of tracking patrons as they traverse the museum.

Several options existed around the best storage mechanism, including:

- [Azure SQL Database](https://azure.microsoft.com/en-us/services/sql-database/?v=16.50)
- [Azure Table storage](https://azure.microsoft.com/en-us/services/storage/tables/)
- [Azure Blob storage](https://azure.microsoft.com/en-us/services/storage/blobs/) (store the `Patron` object as a JSON document)
- [Azure Cosmos DB](https://azure.microsoft.com/en-us/services/cosmos-db/) (store the `Patron` object as a JSON document)

One of the key criteria for the solution was that museum staff can easily analyze data in Excel 2016 without any specific technical knowledge or custom code. This requirement means that only SQL Database and Table storage were valid options because these can both be easily imported into Excel as a data connection. Table storage was ultimately chosen for the following reasons:

- The schema can be easily changed.
- It's cost-effective compared to Azure SQL Database.
- It offers better performance at scale compared to SQL Database.

To facilitate interaction between the proxy API controller and Table storage, a repository was created called `StoreRepository`. The repository has a single function called `StoreTable`, which casts a `List<Patron>` to a model called `PatronSighting`, which is simply inserted into Table storage. The repository has a dependency on the [Windows Azure Storage NuGet Package](https://www.nuget.org/packages/WindowsAzure.Storage), which makes it very simple to interact with Table storage from C# code.

The key for the stored row is a combination of the persisted face ID, which is the ID for the face from the face list combined with a new GUID, thus making the entry unique. The other attributes that are stored are:

- `Device`: The device where the sighting originated.
- `Exhibit`: The exhibit where the device is housed (an exhibit could have multiple devices).
- `Gender`: The gender of the patron in the sighting according to the Face API - Detect function.
- `Age`: A rounded number (to the nearest year) representing the age of the patron in the sighting according to the Detect function.
- `PrimaryEmotion`: The primary (highest scoring) emotion of the patron in the sighting according to the Detect function.
- `TimeOfSighting`: The date/time that the sighting took place.
- `Smile`: Whether the patron in the sighting is smiling or not according to the Detect function.
- `Glasses`: Whether the patron in the sighting is wearing glasses or not according to the Detect function.
- `FaceMatchConfidence`: A double indicating how confident the Face API is that the sighting matches an existing face according to the Face API - Find Similar function.

The storage can be searched by any attribute that is needed such as Device, Exhibit, or Persisted face ID. This was not implemented as part of the initial solution.

You can see the [full code for the `StoreRepository` on GitHub](https://github.com/blackradley/dinmore/blob/master/Server/dinmore.api/Repositories/StoreRepository.cs).

As well as using Excel to query the data, we found that [Azure Storage Explorer](http://storageexplorer.com/) was a superb tool for exploring the storage repository and seeing data coming in from the API.

#### Excel 2016 for data analysis

The ability to easily analyze the data stored in Table storage was a key requirement. It is very simple to connect Excel to Table storage to sort, filter, and analyze the data in Excel. In Excel 2016, you simply follow these steps:

1. Go to the **Data** tab.
2. Select **New Query** > **From Azure** > **From Microsoft Azure Table Storage**.
3. Enter your **Microsoft Azure Table Storage** account name. 
4. Enter your **Microsoft Azure Table Storage** account key.
5. Select the data source that you want to view.

This screenshot shows some of the test data stored in Table storage being viewed in Excel.

![Azure Table storage data in Excel 2016]({{ site.baseurl }}/images/BlackRadley/Excel.jpg)

<br/>

#### Power BI for data analysis

Given the volume of data being collected, we needed something more visual to explain the potential business impact of the data. We discovered that very quickly and without data conversion from raw table storage, we could use the data stored in Azure Table storage to produce a report using Power BI Desktop.

To create the report, we first imported the data using **Get Data**. After selecting **Azure**, we then selected **Azure Table Storage**. After the data source was configured, it was then just a case of dragging visualizations onto the report canvas to visualize the data. 

![Azure Table storage data in Power BI]({{ site.baseurl }}/images/BlackRadley/powerbi.png)

<br/>

We were then able to share the dashboard by selecting **Publish**. The report example can be found [here](https://msit.powerbi.com/view?r=eyJrIjoiNTkxMzlmMmQtZmQ1Yy00MzBiLTkyM2YtYWE0ZDdmYjIxMGIxIiwidCI6IjcyZjk4OGJmLTg2ZjEtNDFhZi05MWFiLTJkN2NkMDExZGI0NyIsImMiOjV9).

While this example is very basic, it shows how very quickly we can convert data stored in an inexpensive storage solution into an effective report that stakeholders can use to act upon.

## Conclusion

The challenge was to make museum exhibits more compelling for patrons and also to provide museums with more data about how patrons use the museums. The solution achieved these two primary goals of providing a more intelligent museum exhibit and tracking patron data, which allows museums to better understand how patrons interact with and traverse their museum.

The solution involved a wide range of Microsoft technologies but pivoted around three main areas:

* The Universal Windows Platform to capture patrons via an IoT device
* Cognitive Services to provide intelligence about patrons as they interact with exhibits
* Azure App Service for storage, hosting, and analysis

The solution is entirely open source on GitHub at [Intelligent Museum Exhibits (Patron Interactive Engagement)](https://github.com/blackradley/dinmore).

The next steps at a high level are to further develop the solution to make it more robust and flexible, and to take it to other museums with the goal of gaining sponsorship to make it a production system. 

### Next steps for the solution

#### Compare how visitors interact with exhibits with and without narration 
Before audio narration is added to exhibits, it would be wise to determine how visitors interact with exhibits without narration. To this end, the initial solution will be deployed in a museum for a longer period of time to gather information *without* the narration running. The information gathered can be used to provide a summary describing the types of visitors who viewed the painting and their dwell times. This information can then be used to compare the effect of having the narration running. 

#### Create an easy-to-use interface for making modifications to narrations
The device used off-the-shelf components and open source software. However, it does require some technical expertise to configure the device and to update the narration. If the devices are to see wider use, they will need an interface that allows curators and other subject matter experts to update the sound files of the narrative.

#### Adapt the software to allow for different narrations for various devices
For speed and convenience, the initial solution was constructed as a single stand-alone device. However, the low cost of the device would make it possible to have multiple devices, which either interact with or track visitors through a museum or gallery. For this to happen, the software will need to be adjusted to use different narrations for different devices. Currently, the design assumes that there is only one narration.

#### Allow for museum professionals to share performance information easily with other museums and galleries 
Some attempt was made during the project to gather information about how visitors were responding to the painting. To be useful to museum and gallery curators, this information should be presented in a form that suits their needs. The museum and gallery community has a long history of sharing benchmarking and performance information, so such an interface could reasonably include comparison information so that the performance of exhibits can be compared across different museums and galleries. 

> "The solution works, for one exhibit, in one museum. It now needs to be generalised so it can be used with other exhibits and in other museums." —Joe Collins, CTO, Black Radley



