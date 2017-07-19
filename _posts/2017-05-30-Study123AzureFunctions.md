---
layout: post
title: "Study123 expands learning from school to anywhere with Azure Functions, Media Services"
author: "Ching Chen"
author-link: "#"
#author-image: "{{ site.baseurl }}/images/authors/photo.jpg"
date: 2017-07-19
categories: [Azure Functions]
color: "blue"
image: "images/Study123/study123-tile.jpg" #must be 440px wide
excerpt: A Microsoft hackfest helps a Taiwan e-learning leader build a media content management process as they expand their self-learning services.
language: English
verticals: [Education]
geolocation: [Asia]
---

Traditional "cram schools" (private learning centers) are facing digital transformation challenges. These schools are no longer just an extension of the learning experience from school to home. With cloud technology, self-learning or after-school learning can be highly personalized and efficient. 

Empowered by [Azure Media Services](https://azure.microsoft.com/en-us/services/media-services/) and [Xamarin](https://www.xamarin.com/), students can view secure, on-demand learning videos on multiple platforms to enable studies from anywhere. With [Azure Functions](https://azure.microsoft.com/en-us/services/functions/) and Media Services, well-protected content can be proactively pushed to parents and students. Students can access new material and expand the learning experience from TV to multiple screens, including mobile, from home to everywhere.

E-learning leader Study123 worked with Microsoft Taiwan to leverage [Azure App Service](https://azure.microsoft.com/en-us/services/app-service/), Xamarin, and Azure Functions to implement the Media Services content management features and add offline sync/push notification to their existing mobile app for students. 

This report focuses mainly on integration with Azure Functions for video content management in the video process.

The core team:

- Tony Li – CTO, Study123
- Nad Wu – App Engineer, Study123
- Ching Chen – Technical Evangelist, Microsoft Taiwan

<br/>

<img alt="whiteboard" src="{{ site.baseurl }}/images/Study123/IMAG1326.jpg" width="900">

<img alt="group photo" src="{{ site.baseurl }}/images/Study123/IMAG1329.jpg" width="900">

<img alt="group photo" src="{{ site.baseurl }}/images/Study123/IMAG1358.jpg" width="700">

 
## Customer profile ##

[Study123](https://www.study123.com.tw/) was founded in Taiwan in 2012. Its CEO, CTO, and main investors have been in the education field for more than 20 years. Study123 has been the leading e-learning content and platform provider for junior/senior high school students in Taiwan since its beginning, totally changing traditional learning methods. Study123 provides a distinguished over-the-top (OTT) self-learning service at home (via TV or desktop). It expanded its service to mobile devices and web by integrating Azure Media Services for content protection, dynamic encoding, and dynamic packaging. 
 
## Problem statement ##

The following are the main goals of the learning service:

1. Well-protected media content (videos).
2. Integrated authentication of existing membership. 
3. Monthly upload of new media content.
4. Media content management.
5. Upload of updated media content and update of new locator to the content management database.

Azure Media Services supports dynamic encoding, dynamic encryption, and dynamic packaging that could provide the solution for goals 1 to 3. However, Media Services has no content management service. This means the partner must develop their own program for video content management. 

The most important part of content management is video process management and then updating/deleting of content in the video content database. Azure Functions is a perfect solution for integrating with an Azure Media Services job notification endpoint. 

The focus of this hackfest was on integrating Azure Media Services and Azure Functions to build a media content management process.
 
## Solution, steps, and delivery ##

The solutions address each requirement listed in the problem statement.

These are the different components involved in the development:

1. Use Azure Functions as a webhook for Azure Media Services notification endpoint.
2. Use Azure Functions to check the video process status.
3. Use Azure Functions for content management (including deletion of updated video assets and logging of the latest video stream locator).

<br/>

<img alt="Architecture Diagram" src="{{ site.baseurl }}/images/Study123/architecture.png" width="900">

<br/>

### Use Azure Functions as a webhook for Azure Media Services notification endpoint ###

The Azure Media Services API provides the capability for content management. By adding an Azure Media Services notification endpoint, the webhook will be triggered when job or task status changes (can be final states only or all states changed).

Our work at the hackfest was to register a webhook for job final state.

The following code shows how to register a webhook endpoint in Azure Media Services notification endpoint and register only when there is no existing endpoint.
 
 ```csharp
   var existingEndpoint = _context.NotificationEndPoints.Where(e => e.Name == webHookFunction).FirstOrDefault();
            INotificationEndPoint endpoint = null;

            if (existingEndpoint == null)
            {
                //Add a new notification Endpoint when there is no existing endpoint for webhook
                endpoint = _context.NotificationEndPoints.Create(webHookFunction,
                     NotificationEndPointType.WebHook, _webHookEndpoint); 
            }

  ```

<br/>

Add the webhook notification while submitting the job. The webhook will be triggered when the encoding job is in final states.
 
 ```csharp
 
            // Make sure an existing or new created Media service notification endpoint exist   
            if (endpoint != null)
            {
                //Add Media service encoding processor job notification for final State Only
                job.JobNotificationSubscriptions.AddNew(NotificationJobState.FinalStatesOnly, endpoint);
            
            }
  ```

<br/>

### Use Azure Functions to check the video process status ###

In the hackfest, we used the latest Visual Studio 2017 tools for Azure Functions for a better debugging experience. (Azure Functions was updated to the new template for a better debugging experience after the Build 2017 event.)

The following code shows checking of the Media Services security header and job status for the next step (adding security policy, publishing the content) and a call for another Azure Function for content management.

**Debugging Azure Functions locally in Visual Studio 2017:**

<img alt="VS2017AzureFunction" src="{{ site.baseurl }}/images/Study123/VS2017AzureFunction.png" width="900">

<br/>

 ```csharp
//HttpTrigger Function
 public static async Task<HttpResponseMessage> Run([HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)]HttpRequestMessage req, TraceWriter log)
        {
            //Get the request content
            //Check the header signature
            if (SecurityHelper.VerifyHeaders(req, msg, log))
            {
                //Check if job NewState is Finished
                string newJobStateStr = (string)msg.Properties.Where(j => j.Key == "NewState").FirstOrDefault().Value;
                    if (newJobStateStr == "Finished")
                    {
                       //Publish the video
                       urlForClientStreaming = MediaServiceHelper.PublishAndBuildStreamingURLs(_context, msg.Properties[jobID]);
                       //Write the latest Stream Locator to the db
                       //Call another Azure Functions to check if there is an existing video assets to clean up
                    }

                    return req.CreateResponse(HttpStatusCode.OK, string.Empty);
                }
                else
                {
                    log.Info($"VerifyHeaders failed.");
                    return req.CreateResponse(HttpStatusCode.BadRequest, "VerifyHeaders failed.");
                }
            }

            return req.CreateResponse(HttpStatusCode.BadRequest, "Generic Error.");
        }
```

<br/>

<img alt="JobMonitor" src="{{ site.baseurl }}/images/Study123/JobMonitor.png" width="700">

<br/>

<br/>

<img alt="JobMonitorLog.png" src="{{ site.baseurl }}/images/Study123/JobMonitorLog.png" width="900">

<br/>

### Use Azure Functions to delete duplicated updated media content ###

Once the uploaded video has been encoded, dynamic encryption and publication take place. This triggers the function to check whether this is an update of the original video. If yes, the video locator needs to be updated and the original video asset needs to be removed.

<br/>

  ```csharp
 public static async Task<HttpResponseMessage> Run([HttpTrigger(AuthorizationLevel.Function, "get", "post")]HttpRequestMessage req, TraceWriter log)
        {            
            try
            {
                // Create and cache the Media Services credentials              
                // Used the cached credentials to create CloudMediaContext.
                // Check the security header
                // Get Content Body for the file name. The file name is unique. Any duplicated name means there is an update of the video so that we need to delete the old asset after the new video is encoded and published successfully.
               
                //Query Asset by filename. Return all assets but exclude the latest published asset
                List<IAsset> resultAssets = Task.Run(async() => await DeleteDuplicateVideo.Helper.MediaServiceHelper.GetAssetbyInfo(_context, videoinfo, log)).Result;

                //Remove all duplicated assets expect for the last modified one
                //Future improve to read the keep asset list from the asset manage db
                await DeleteDuplicateVideo.Helper.MediaServiceHelper.DeleteAssetAsync(_context, resultAssets, log);
                responsestr = string.Format("Find {0} Assets to be deleted!", resultAssets.Count);
            }
            catch (Exception ex)
            {
                log.Error("ERROR: failed.");
                log.Info($"StackTrace : {ex.StackTrace}");
                throw ex;
            }
            responsestr = responsestr + string.Format("filename {0} process succeed!", filename);

            return req.CreateResponse(HttpStatusCode.OK, responsestr);
        }     

  ```

<br/>

<img alt="DeleteDuplicatedVideo" src="{{ site.baseurl }}/images/Study123/DeleteDuplicatedVideo.png" width="700">

<br/>

<br/>

<img alt="DeleteDuplicatedVideoLog.png" src="{{ site.baseurl }}/images/Study123/DeleteDuplicatedVideoLog.png" width="900">

## Conclusion ##

It is easy to integrate Azure Functions with Azure Media Services. Azure Functions provides a good integration with Azure Media Services for webhook triggers.

Visual Studio 2017 provides an easy debugging environment for Azure Functions, offering greater efficiency to developers.  

So far Study123 has more than 5,000 videos on Media Services. Students can use the videos to study and take practice exams.

### Going forward

Personalization is the next step. This is just the start of the digital transformation. Currently, machine learning is under development for better recommendations and a better user experience. We are looking forward to seeing how technology can change the self-learning experience.  

## Additional resources ##

Here is reference documentation about offline syncing and push notifications:

- [Azure Functions triggers and bindings concepts](https://docs.microsoft.com/en-us/azure/azure-functions/functions-triggers-bindings)
- [Develop Azure Functions with Media Services](https://docs.microsoft.com/en-us/azure/media-services/media-services-dotnet-how-to-use-azure-functions)
- [Media Services: Integrating Azure Media Services with Azure Functions and Logic Apps](https://azure.microsoft.com/en-us/resources/samples/media-services-dotnet-functions-integration/)
- [Use Azure WebHooks to monitor Media Services job notifications with .NET](https://docs.microsoft.com/en-us/azure/media-services/media-services-dotnet-check-job-progress-with-webhooks)
- [Use Azure Queue storage to monitor Media Services job notifications with .NET](https://docs.microsoft.com/en-us/azure/media-services/media-services-dotnet-check-job-progress-with-queues)
- [Monitor Job Progress using .NET](https://docs.microsoft.com/en-us/azure/media-services/media-services-check-job-progress)
- [Visual Studio 2017 Tools for Azure Functions](https://blogs.msdn.microsoft.com/webdev/2017/05/10/azure-function-tools-for-visual-studio-2017/)

Reference sample code:

[Sample Azure Functions for use with Azure Media Services](https://github.com/Azure-Samples/media-services-dotnet-functions-integration)

