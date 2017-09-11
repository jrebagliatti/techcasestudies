---
layout: post
title:  "How Equadex used Cognitive Services to help people with language disorders"
author: "Sébastien Pertus"
author-link: "http://www.twitter.com/sebastienpertus"
#author-image: "{{ site.baseurl }}/authors/photo.jpg"
date:   2017-08-04
categories: [Cognitive Services]
color: "blue"
image: "images/2017-03-16-equadexcognitives/helpicto-header.png"
excerpt: Microsoft France and Equadex partnered to help people with language disorders related to autism, dysphasia, or Alzheimer's disease by using Cognitive Services to automate image recognition in their Helpicto application.
language: [English]
verticals: [Media & Cable]
geolocation: [Europe]
---

Equadex is a digital services company that has spread its business around several axes: software engineering, telecommunications, and computer systems. It is currently developing a Xamarin application called *Helpicto* that provides a solution to help children with autism to communicate more easily with their environment, based on pictograms and associated keywords.  

Equadex partnered with Microsoft to create a strong and innovative project that consists of uploading relevant pictograms in the Helpicto backend and implementing a straightforward image recognition process.  

The project was developed by using Xamarin, ASP.NET, Microsoft Azure App Service, Azure SQL Database, and Microsoft Cognitive Services. In this case study, we focused on a specific sub-project related to the Helpicto backend, involving Azure Functions, Azure App Service, and Cognitive Services: how to inject pictures in the Helpicto backend from the Xamarin side as well as from the backend, and using the most efficient way to do it.
 
For the hackfest, the entire team developing Helpicto was involved.  

### Key technologies used

- [Azure App Service](https://azure.microsoft.com/en-us/services/app-service/)
- [Azure Functions](https://azure.microsoft.com/en-us/services/functions/)
- [Azure SQL Database](https://azure.microsoft.com/en-us/services/sql-database/?v=16.50)
- [Cognitive Services Computer Vision API](https://azure.microsoft.com/en-us/services/cognitive-services/computer-vision/)
- [Cognitive Services Translator Text API](https://azure.microsoft.com/en-us/services/cognitive-services/translator-text-api/)
- [Xamarin](https://www.xamarin.com/)

### Core team

- [Anthony Allebee](https://twitter.com/) – CTO, Equadex
- [Yohan Guerin](https://www.linkedin.com/in/yohanguerin) – Xamarin Specialist Developer, Equadex  
- [Thomas Belloc](https://www.linkedin.com/in/thomasbelloc) – Embedded Developer, Equadex 
- [Mathieu Busolin](https://www.linkedin.com/in/mathieu-busolin-22796863) – Swiss Army Knife Developer, Equadex 
- [Kevin Petit](https://github.com/kvpt) – Fullstack Developer, Equadex 
- [Sébastien Pertus](https://twitter.com/sebastienpertus) – Technical Evangelist, Microsoft France

## Customer profile

[Equadex](http://www.equadex.net/) is a French IT engineering company, focusing specifically on software engineering, telecommunications, and computer systems. Over the last few years, the company has grown quickly; when it was created in 2007, the company had only 3 employees compared to 43 today. The head office is located in Toulouse, and a new agency recently opened in Pamiers (Ariège).  

With its Helpicto application, Equadex is initiating a diversification. The company wants to position itself as an ISV in the global health sector. Helpicto is dedicated to people who suffer from language disorders related to autism, dysphasia, or Alzheimer's disease. The project is the result of a partnership between Equadex and Carine Montoulan, a psychologist and the director of the [InPACTS](http://inpacts.fr/) association as well as the [John Bost Foundation](http://www.johnbost.org/), created in 1848, which welcomes more than 1,500 children, adolescents, and adults suffering from mental disorders or physical disabilities.

After several months of intense work, the first version of the Helpicto application was developed, and based on this model, Microsoft came in as a real boost in the development phase by implementing a strong and fast solution regarding the image recognition process.

## Problem statement

Since its inception, Equadex has been using Microsoft technologies, and the team involved in the Helpicto project has strong skills in .NET and Azure. 

Helpicto provides an innovative solution to help children with autism communicate with their environment. To stay focused, a child with autism usually uses specific pictograms in a sequence to recognize a situation, a question, or another interaction. Helpicto uses [speech to text](https://azure.microsoft.com/en-us/services/cognitive-services/speech/) to generate a sentence. It then uses [language understanding](https://www.luis.ai/) to categorize keywords.  

The final objective is to build a sequence that represents a specific situation. In this sample, the speech command is "Do you want to eat an apple?" Helpicto will then generate three images: the child himself, the  action of eating, and a picture of an apple.  

![Helpicto]({{ site.baseurl }}/images/2017-03-16-equadexcognitives/helpictosummary.png) 

<br/>

The user experience is both intuitive and simple:
- The user, a parent for example, uses the Helpicto application and sends a voice command for analysis.
- Helpicto gets the voice command, and uses the Speech to Text API to convert it into a sentence.
- Helpicto sends this sentence to LUIS, and then LUIS sends the intents back to Helpicto.
- Helpicto gets the corresponding images for each keyword and shows the results to the child as an image sequence.

Several technologies are incorporated into this application, such as the Speech to Text API, LUIS, the Computer Vision API, the Translator Text API, Azure App Service, Azure Functions, Azure Blob storage, and Azure SQL Database, but this article is focused on a key part of the application backend process: how to upload one or more pictograms to Azure, and how Cognitive Services can help the user improve pictogram recognition by using Azure Functions, the Computer Vision API, and the Translator Text API.

Choosing Cognitive Services was driven by two requirements: we needed an easy integration from Xamarin and also from the backend. Cognitive Services provides REST APIs, which makes it platform-agnostic; therefore, it can be accessed from any kind of application, such as Xamarin or backend websites. Cognitive Services has been easy to implement with Azure Functions, which made our architecture strong and independent. On the client side, Cognitive Services enabled easy integration from both the client app and the backend service.

The two scenarios covered in this case study are:

- **Scenario 1**. A final user (such as a parent) should be able to upload a new image from within the mobile application and then get a result back containing one or more keywords describing this image. The user should be able to validate or delete the image and its results.
- **Scenario 2**. As an administrator, we should be able to upload a ZIP archive from the website that contains several images, and then launch (or schedule) a batch process to proceed with image recognition. An additional required step is to validate the results for each file.
 
## Solution, steps, and delivery

We divided the hackfest into three distinct parts, which involved each member of the team depending on their skills:

- [Developing the Azure function](#azure-functions-and-cognitive-services) in charge of image processing by using the Cognitive Services Computer Vision and Translator Text APIs.
- [Developing the Xamarin frontend](#scenario-1-image-upload-from-the-xamarin-application), which involved user manipulations within the mobile application.
- [Developing the Web App backend](#scenario-2-batch-mode-from-the-website), allowing for scheduled or manual batch mode processing.

<br/>

![Overall architecture]({{ site.baseurl }}/images/2017-03-16-equadexcognitives/overallarchitecture.png) 

<br/>

### Azure Functions and Cognitive Services

We worked on several architectural designs, and had a lot of discussions about the most efficient way to achieve our goal. Because we have two scenarios, one involving a Xamarin application and the other involving a batch mode, we decided to use Azure Functions to call the Cognitive Services REST APIs.  

Azure Functions allows us to mutualize our code, and can be called as a simple REST API from the Xamarin application as well as an asynchronous batch mode from the website. Eventually, Azure Functions will scale on demand if needed.
 
#### Creating the Azure function

Creating the Azure function was pretty straightforward. This function will be called by both the mobile application and the backend website.  

![Azure function architecture white board]({{ site.baseurl }}/images/2017-03-16-equadexcognitives/draft.png)

<br/>

In a nutshell, the Azure function is in charge of:
- Getting the image stream from a staging Blob storage.
- Sending the image stream to the Computer Vision API.
- Trying to get a French translation from within the Translator Text API for each keyword.
- Returning the image name and all the translated keywords, and for each image, the computer vision accuracy score (which should be greater than 90%).

![Azure function architecture diagram]({{ site.baseurl }}/images/2017-03-16-equadexcognitives/azurefunction.png)

<br/>

#### Generating a key for Cognitive Services REST APIs

Using Cognitive Services is simple. If you are new to Cognitive Services, following are some useful links:  
- [Cognitive Services home page](https://www.microsoft.com/cognitive-services/)
- [Computer Vision API](https://www.microsoft.com/cognitive-services/en-us/computer-vision-api)
- [Cognitive Services trial](https://www.microsoft.com/cognitive-services/en-US/subscriptions?mode=NewTrials)

With their subscription, the Helpicto team generated an access key for the Computer Vision API services from the Azure portal. With this key, the team acquired an access token for all subsequent Computer Vision API requests. 

![Cognitive Services API keys]({{ site.baseurl }}/images/2017-03-16-equadexcognitives/cognitive-api-keys.png)

<br/>

#### Adding an external SDK to Azure Functions  

We were using the [Flurl](https://tmenier.github.io/Flurl) NuGet package to simplify every HTTP request. By using the Azure Functions project.json configuration file, adding any NuGet package to Azure Functions was pretty straightforward. 

```js
 {
   "frameworks": {
     "net46":{
       "dependencies": {
         "Flurl.Http": "1.1.2"
       }
     }
   }
 }
```

<br/>

Adding a simple `using` in our code was also easy to do.

```cs
 using Flurl;
 using Flurl.Http;
```

#### Acquiring settings keys from Azure Functions 

Because we needed to work with Azure Blob storage, the Computer Vision API, and the Translator Text API, we decided to store all the settings within the Web App.

![Azure function architecture Web App]({{ site.baseurl }}/images/2017-03-16-equadexcognitives/app-settings.png)

<br/>

Getting those parameters from Azure Functions by using the `ConfigurationManager` object was quite simple.

```cs
 private static string BlobStorageConnectionString = ConfigurationManager.AppSettings["BlobStorageAuthenKey"];
 private static string RecognitionApiTokenConnectionString = ConfigurationManager.AppSettings["RecognitionApiTokenConnectionString"];
 private static string RecognitionApiSubscriptionKey = ConfigurationManager.AppSettings["RecognitionApiSubscriptionKey"];
 private static string RecognitionApiConnectionString = ConfigurationManager.AppSettings["RecognitionApiConnectionString"];
 private static string TranslationApiSubscriptionKey = ConfigurationManager.AppSettings["TranslationApiSubscriptionKey"];
 private static string TranslationApiConnectionString = ConfigurationManager.AppSettings["TranslationApiConnectionString"];
 private const string ContainerName = "images";
```

<br/>

#### Working with Blob storage and the Computer Vision API from Azure Functions

The first step was to get the blob stream. We used the `CloudBlobClient` object to achieve this.  

```cs
 private static async Task<Stream> GetBlobStream(string url)
 {
     CloudStorageAccount storageAccount = CloudStorageAccount.Parse(BlobStorageConnectionString);
     CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();
     CloudBlobContainer container = blobClient.GetContainerReference(ContainerName);
     CloudBlockBlob blob = container.GetBlockBlobReference(url);

     return await blob.OpenReadAsync();
 } 
```

<br/>

The next step, within the blob stream, was to call the Computer Vision API:  

```cs
 private static async Task<IEnumerable<string>> CallImageRecognitionApi(Stream stream)
 {
     double threshold = 0.9;

     try    
     {
         StreamContent content = new StreamContent(stream);
         content.Headers.Add("Content-Type", "application/octet-stream");

         JObject response = await RecognitionApiConnectionString
             .AppendPathSegment("analyze")
             .SetQueryParam("visualFeatures", "Tags")
             .SetQueryParam("maxCandidates", "1")
             .WithHeader("Ocp-Apim-Subscription-Key", RecognitionApiSubscriptionKey)
             .SendAsync(HttpMethod.Post, content)
             .ReceiveJson<JObject>();

```

<br/>

Following are the results of the Computer Vision API call.

```
 {
   "requestId": "3aa882cb-c723-4735-be19-36ef6ff662af",
   "metadata": {
     "height": 294,
     "width": 377,
     "format": "Png"
   },
   "imageType": {
     "clipArtType": 0,
     "lineDrawingType": 0
   },
   "color": {
     "accentColor": "6E4929",
     "dominantColorForeground": "Grey",
     "dominantColorBackground": "Brown",
     "dominantColors": [ "Grey", "White", "Brown" ],
     "isBWImg": false
   },
   "adult": {
     "isAdultContent": false,
     "isRacyContent": false,
     "adultScore": 0.084937386214733124,
     "racyScore": 0.18143002688884735
   },
   "categories": [
     {
       "name": "drink_",
       "score": 0.703125
     },
     {
       "name": "others_",
       "score": 0.046875
     }
   ],
   "faces": [],
   "tags": [
     {
       "name": "cup",
       "confidence": 0.99997806549072266
     },
     {
       "name": "coffee",
       "confidence": 0.999018669128418
     },
     {
       "name": "table",
       "confidence": 0.99179244041442871
     },
     {
       "name": "indoor",
       "confidence": 0.96323132514953613
     },
     {
       "name": "keyboard",
       "confidence": 0.827103853225708
     },
     {
       "name": "food",
       "confidence": 0.76672780513763428
     },
     {
       "name": "beverage",
       "confidence": 0.70872247219085693
     },
     {
       "name": "drink",
       "confidence": 0.65963035821914673
     },
     {
       "name": "coffee cup",
       "confidence": 0.23781305551528931
     },
     {
       "name": "Dixie cup",
       "confidence": 0.16915778815746307
     }
   ],
   "description": {
     "type": 0,
     "captions": [
       {
         "text": "a cup of coffee",
         "confidence": 0.88826113297241294
       }
     ]
   }
 }
```

<br/>

We then took only the tags where `Confidence` was superior to a defined `threshold` (90%).  

```cs
         return response["tags"]
             .Select(t => new { Name = (string)t["name"], Confidence = (double)t["confidence"] })
             .Where(t => t.Confidence >= threshold)
             .Select(t => t.Name);
     }
     finally
     {
         stream.Dispose();
     }
 }
```

<br/>

Finally, using the Translator Text API requires two steps: get the JSON Web token, and then call the Translator Text API by using the `Bearer` authentication mode.

```cs
 private static async Task<string> GetTranslationApiToken()
 {
     return await RecognitionApiTokenConnectionString
         .AppendPathSegments("sts", "v1.0", "issueToken")
         .WithHeader("Ocp-Apim-Subscription-Key", TranslationApiSubscriptionKey)
         .PostJsonAsync(new { })
         .ReceiveString();
 }

 private static async Task<string> CallTranslationApi(string token, string translate)
 {
     string response = await TranslationApiConnectionString
         .SetQueryParam("text", translate)
         .SetQueryParam("from", "en-US")
         .SetQueryParam("to", "fr-FR")
         .WithOAuthBearerToken(token)
         .GetStringAsync();

     return DeserializeXml<string>(response);
 }

 private static T DeserializeXml<T>(string xml)
 {
     using (XmlReader reader = XmlReader.Create(new StringReader(xml)))
     {
         DataContractSerializer formatter = new DataContractSerializer(typeof(T));
         return (T)formatter.ReadObject(reader);
     }
 }
```

<br/>

#### Scenario sample

To demonstrate how the application works, we used a common image (a cup of coffee) that could be used within Helpicto. Helpicto will only use results whose accuracy is greater than 90%.

![cup of coffee image]({{ site.baseurl }}/images/2017-03-16-equadexcognitives/coffeecupanalyze.png)

<br/>

### Scenario 1: Image upload from the Xamarin application

The first scenario is the user scenario from the Xamarin application:  

1. User launches the image uploading process from the mobile application.
2. User chooses a relevant image and sends it to the Helpicto backend.
3. User gets results and chooses the most accurate keywords.
   
   <br/>
   
   ![Xamarin user actions steps 1, 2, 3]({{ site.baseurl }}/images/2017-03-16-equadexcognitives/xamarinstep1.png)
   
   <br/>
   
4. User can optionally add other relevant keywords.
5. User then validates the upload/recognition process. 
6. Both the references and the keywords for the image are saved in Azure SQL Database. 
   
   <br/>
   
   ![Xamarin user actions steps 4, 5, 6]({{ site.baseurl }}/images/2017-03-16-equadexcognitives/xamarinstep2.png)
   
   <br/>
   
Following is the architecture that we used in this scenario.

![Scenario 1: User interaction within Xamarin application]({{ site.baseurl }}/images/2017-03-16-equadexcognitives/schema01.png)

<br/>

### Scenario 2: Batch mode from the website

The second scenario is the batch mode. An administrator can upload a ZIP archive containing several images. The Web API extracts the images from the ZIP archive and sends them to the staging Blob storage.

For each image:
- Azure Functions is called, returning the relevant keywords.
- If the score is inferior to 90%, the image is marked as *not understandable*.
- If the score is superior to 90%, the image is marked as *pending validation*.

A specific website page allows the administrator to validate each image (and then add or remove keywords for the specific image).

From an administrator's point of view, the steps are as follows:

1. Upload the ZIP archive, extract the files, and process the images.
   
   <br/>
   
   ![Scenario 2: Upload ZIP archive and then process]({{ site.baseurl }}/images/2017-03-16-equadexcognitives/batch-upload.png)  
   
   <br/>
   
2. Validate each image with proposed keywords.
   
   <br/>
   
   ![Scenario 2: Validate images and keywords]({{ site.baseurl }}/images/2017-03-16-equadexcognitives/batch-result.png)  
   
   <br/>
   
The following diagram shows the technical steps involved in this scenario.

<br/>

![Scenario 2: Administration interaction within website application and batch mode]({{ site.baseurl }}/images/2017-03-16-equadexcognitives/schema02.png)
 
<br/>
 
## Conclusion

During this three-day hackfest with Equadex, we partnered with the team to help them add a key feature to the Helpicto backend by using platform as a service (PaaS) services such as Azure App Service, Azure Functions, and of course, Cognitive Services.

We had different topics to address, such as how to deal with two kinds of scenarios, how to get the most efficient code, and how to use Azure Functions to execute some workloads outside the application without having to maintain a 24/7 architecture.

According to Mathier Busolin and Anthony Allebee in an [interview with *L'usine digitale*](http://www.usine-digitale.fr/article/helpicto-la-reconnaissance-d-images-au-service-de-personnes-atteintes-de-troubles-du-langage.N516719), a French high tech news website, this three-day hackfest opened great opportunities, helped them work in a more collaborative way, and helped them consider new technical solutions they had not thought of before.   

The hackfest saved Equadex many weeks of work in the development process, and enabled them to announce the commercial distribution of the application by the beginning of July.

The economist website [Touléco](http://www.touleco.fr/) published an [article on the collaboration between Microsoft and Equadex focusing on the Cognitive Services provided by Microsoft](http://www.touleco.fr/Quand-Equadex-travaille-main-dans-la-main-avec-les-Americains-de,21641).

An excerpt from the article: 

> The solution developed by Equadex, which wishes to specialize in the development of healthcare software, has seen a serious acceleration during these three days with the development of the "image recognition" component. "It's about integrating new technologies into the Helpicto application and referencing it in the Cognitive Services suite that puts Microsoft technology at the service of health," says Anthony Allebée. This portal allows developers to integrate their applications dedicated to understanding the language.

<br/>

![Helpicto team]({{ site.baseurl }}/images/2017-03-16-equadexcognitives/team.png)

<br/>

## Additional resources

Last but not least, following are some pointers to additional resources that will help you to more deeply understand the concepts and technologies we discussed in this article:

- [Azure Functions C# script developer reference](https://docs.microsoft.com/en-us/azure/azure-functions/functions-reference-csharp)
- [Try Azure Functions](https://functions.azure.com/try)
- [Get started with Azure Blob storage using .NET](https://docs.microsoft.com/en-us/azure/storage/storage-dotnet-how-to-use-blobs)
