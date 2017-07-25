---
layout: post
title:  "Scomi Engineering moves their monorail monitoring solution to the cloud with Azure IoT Hub"
author: "Aswin C."
author-link: "https://twitter.com/mraswinc"
#author-image: "{{ site.baseurl }}/images/authors/photo.jpg"
date:   2017-07-25
categories: [IoT]
color: "blue"
image: "images/ScomiEngineering/scomi-header.png"
excerpt: Scomi Engineering worked with Microsoft to move their monorail monitoring solution to the cloud by using a combination of open source technologies and .NET on the Microsoft cloud platform. 
language: [English]
verticals: [Hospitality & Travel]
geolocation: [Asia]
---

Microsoft worked together with Scomi Engineering Bhd, a monorail manufacturer based in Malaysia, to develop a proof of concept (PoC) for their monorail monitoring solution by using Azure IoT services. This work would enable their customers to view the telemetry of the trains, including faults, so that issues could be rectified quickly and data could be acquired for future predictive maintenance by using Azure Machine Learning.

### Key technologies

- [Microsoft Azure App Service](https://azure.microsoft.com/en-us/services/app-service/)
- [Azure Cosmos DB](https://azure.microsoft.com/en-us/services/cosmos-db/)
- [Azure IoT Hub](https://azure.microsoft.com/en-us/services/iot-hub/)
- [Azure SQL Database](https://azure.microsoft.com/en-us/services/sql-database/?v=16.50)
- [Azure Stream Analytics](https://azure.microsoft.com/en-us/services/stream-analytics/)
- Bing Maps with [ASP.NET Web Forms](https://www.asp.net/web-forms)
- Proprietary Vehicle Management System (VMS) controller

### Core team
- Peter John Edwards – Vice President, Engineering, Scomi Engineering Berhad
- Foo Yeun Yong – Vehicle Management System Manager, Scomi Engineering Berhad
- [Aswin C.](https://twitter.com/mraswinc) – Senior Technical Evangelist, Microsoft Malaysia
- Tham Cheng Bin – Technical Evangelist, Microsoft Malaysia
- Zalina Halim – Audience Marketing Manager, Microsoft Malaysia

## Customer profile
[Scomi Engineering Bhd](http://www.scomiengineering.com.my) is a subsidiary of Scomi Group Bhd, a global service provider in the oil, gas, and transport solutions industries based in Malaysia.

Scomi Engineering provides a diverse range of public transportation solutions ranging from monorail systems, buses, and special purpose vehicles, which are continuously developed by its research and development project teams. They also deliver management and integration systems to complement these products. Monorail systems are an area of increased focus for Scomi Engineering, one of the few companies in the world that provide integrated monorail solutions.

## Problem statement

Scomi Engineering deployed monorails in several countries, including Malaysia, India, and Brazil. With the experience gained from these deployments came the awareness of how they could create the next generation platform to improve the operation, maintenance, and riding experience for existing or new customers.

Scomi Engineering wanted to explore an automated way of gathering telemetries from their trains into a centralized environment. Foo Yeun Yong, the Vehicle Management System manager and an engineer himself, attended the IoT hackfest in Singapore organized by Microsoft and Intel. From the hackfest, he came up with an idea of how to enhance his current solution, so he connected with Microsoft to bring his idea to life.

Currently, the train captain operating the monorails sends in train status and alert reports manually to the Operation Control Center by using the communication system available on the train. This can cause miscommunication and delays in rectifying issues, and eventually might cause downtime to the monorail service. By using the proposed telemetry, the human error factor could be reduced or eliminated altogether. 

<img alt="Discussion" src="{{ site.baseurl }}/images/ScomiEngineering/Discussion.png" width="660">

<br/>

<img alt="Coding" src="{{ site.baseurl }}/images/ScomiEngineering/Coding.png" width="660">

<br/>

## Solution and steps

With this goal in mind, we needed to determine the best way to:

1. Pull data from a train's Vehicle Management System (VMS) and push it to the cloud.
2. Store and view the data being received in the cloud.
3. Present the data, either with Power BI or the web.

### Pull data from VMS and push to IoT Hub

One of the first key steps in the entire solution is to pull data from the VMS controller and send the telemetry to Azure IoT Hub. Onboard the monorail is a powerful Linux-based machine that powers some of the functionalities in the monorail. Hence, to pull the data, we decided to write a Python-based program to extract the telemetry from the VMS controller because Python is a cross-platform language.

For this proof of concept (PoC), we decided to use the Rockwell automation controller to simulate the controller on the train. However, for the actual production controller, we would use a proprietary controller that conforms to EN50155, an international regulation covering electronic equipment for railway applications.

To push the telemetry data, we experimented with various ideas including using a specialized gateway to push the data into IoT Hub. However,  we decided to use the Linux machine instead because it is both capable of pulling data from the controller and sending the data to IoT Hub. Because the data pull program is written in Python, we decided to also write a Python program to send the data to Azure IoT Hub. In IoT, in terms of a connection protocol, we chose HTTPS because it is secure and we need it to support large file sizes.

In this PoC, we used an Ubuntu 16.04 LTS-based Linux machine to simulate the onboard computer on the train. However, on the train, a Kontron fanless operational computer is used, and the model used is a certified gateway that enables data connectivity to telemetry devices, stations, and train control.

We have it set to push the data every 5 seconds, which meets our needs for the PoC. For the actual production environment, this value can be set to push as often as every second.

<img alt="Architecture" src="{{ site.baseurl }}/images/ScomiEngineering/Architecture.png" width="960">

<br/>

### Store and view the data

On the cloud side, I set up the workflow in which Azure IoT Hub will ingest the data from the VMS controllers and output it through Azure Stream Analytics for near real-time data analysis. Stream Analytics is configured to output its data to Azure Cosmos DB. We chose to use Cosmos DB because it stores the data in JavaScript Object Notation (JSON) format and is schema-free. In addition, Cosmos DB can be used in the future as a repository for machine learning after we have collected enough data.

<img alt="Azure resources" src="{{ site.baseurl }}/images/ScomiEngineering/AzureResourceGroup.png" width="900">

<br/>

<img alt="Cosmos DB" src="{{ site.baseurl }}/images/ScomiEngineering/AzureCosmosDB.png" width="900">

<br/>

### Present the data

For the presentation layer, we decided to go with ASP.NET Web Forms. This is mainly because we need to embed Bing Maps with polylines and show the real-time location of the monorail. I wrote the ASP.NET Web Forms application that is hosted in the Web App on Azure App Service; the web application queries the data from Cosmos DB and populates the data accordingly, including showing the location of the monorail by using Bing Maps. I also used Azure SQL Database to store the user profiles for authentication and authorization for the web application. The web application uses Asynchronous JavaScript And XML (AJAX) to poll Cosmos DB every 5 seconds.

<img alt="Portal Main" src="{{ site.baseurl }}/images/ScomiEngineering/Portal1.png" width="960">

<br/>

<img alt="Portal Detail" src="{{ site.baseurl }}/images/ScomiEngineering/Portal2.png" width="960">

<br/>

## Technical delivery

### Security details

Communication between the Linux machine and Azure IoT Hub is done through HTTPS and authenticated by using a device key that is registered in Azure IoT Hub. Access to Cosmos DB is also authenticated by using a key that is generated in Azure Cosmos DB settings.

The web application access is secured by using ASP.NET Identity, which provides claims-based access control.

### Device messages sent

The message is being sent once every 5 seconds.

```python

MsgSender = D2CMsgSender('HostName={iothubname}.azure-devices.net;SharedAccessKeyName=iothubowner;SharedAccessKey={SharedKey}')
print(MsgSender.sendD2CMsg('RSV21',msgstring))

```

<br/>

### SDKs and languages used

The client or the controller is using the Python SDK for Azure IoT Hub. 

For the library, we're using the [Device to cloud sample for Python](https://github.com/Azure-Samples/iot-hub-python-get-started/blob/master/Python/device/d2cMsgSender.py) in GitHub.

```python
import base64
import hmac
import hashlib
import time
import requests
import urllib

# from flask import Flask # for python 2
# import urllib.parse for python 3

class D2CMsgSender:
    API_VERSION = '2016-02-03'
    TOKEN_VALID_SECS = 10
    TOKEN_FORMAT = 'SharedAccessSignature sig=%s&se=%s&skn=%s&sr=%s'
    def __init__(self, connectionString=None):
        if connectionString != None:
            iotHost, keyName, keyValue = [sub[sub.index('=') + 1:] for sub in connectionString.split(";")]
            self.iotHost = iotHost
            self.keyName = keyName
            self.keyValue = keyValue
    def _buildExpiryOn(self):
        return '%d' % (time.time() + self.TOKEN_VALID_SECS)
    def _buildIoTHubSasToken(self, deviceId):
        resourceUri = '%s/devices/%s' % (self.iotHost, deviceId)
        targetUri = resourceUri.lower()
        expiryTime = self._buildExpiryOn()
        toSign = '%s\n%s' % (targetUri, expiryTime)
        key = base64.b64decode(self.keyValue.encode('utf-8'))
        signature = urllib.quote(
            base64.b64encode(
                hmac.HMAC(key, toSign.encode('utf-8'), hashlib.sha256).digest()
            )
        ).replace('/', '%2F')
        return self.TOKEN_FORMAT % (signature, expiryTime, self.keyName, targetUri)
    def sendD2CMsg(self, deviceId, message):
        sasToken = self._buildIoTHubSasToken(deviceId)
        url = 'https://%s/devices/%s/messages/events?api-version=%s' % (self.iotHost, deviceId, self.API_VERSION)
        r = requests.post(url, headers={'Authorization': sasToken}, data=message)
        return r.text, r.status_code
if __name__ == '__main__':
    connectionString = 'HostName=<iot-hub-name>.azure-devices.net;SharedAccessKeyName=device;SharedAccessKey=<device-policy-key>'
    d2cMsgSender = D2CMsgSender(connectionString)
    deviceId = 'iotdevice1'
    message = 'Hello, IoT Hub'
    print(d2cMsgSender.sendD2CMsg(deviceId, message))

```

<br/>

### Code artifacts

The data sent is formatted in JSON, and the Stream Analytics input has been set to Azure IoT Hub. Here is a sample of how it looks.

```json
{
	"primarypowerstatus": 0,
	"trainid": "RSV 21",
	"lowvoltagestatus": 0,
	"timestamp": 1495614376.731,
	"Alarm": [{
		"timestamp": "2017-05-24 16:26:16",
		"id": 44
	}, {
		"timestamp": "2017-05-24 16:26:16",
		"id": 1121
	}, {
		"timestamp": "2017-05-24 16:26:16",
		"id": 1121
	}, {
		"timestamp": "2017-05-24 16:26:16",
		"id": 1121
	}, {
		"timestamp": "2017-05-24 16:26:16",
		"id": 1121
	}, {
		"timestamp": "2017-05-24 16:26:16",
		"id": 1121
	}, {
		"timestamp": "2017-05-24 16:26:16",
		"id": 1121
	}, {
		"timestamp": "2017-05-24 16:26:16",
		"id": 3156
	}, {
		"timestamp": "2017-05-24 16:26:16",
		"id": 3156
	}, {
		"timestamp": "2017-05-24 16:26:16",
		"id": 3156
	}, {
		"timestamp": "2017-05-24 16:26:16",
		"id": 3156
	}],
	"hvacstatus": 0,
	"brakestatus": 0,
	"direction": 0,
	"longitude": 101.68840026855469,
	"Time_Table": {
		"MR9_Up": "2017-05-24 16:26:16",
		"MR2_Up": "2017-05-24 16:26:16",
		"MR4_Up": "2017-05-24 16:26:16",
		"MR2_Down": "2017-05-24 16:26:16",
		"MR10_Up": "2017-05-24 16:26:16",
		"MR9_Down": "2017-05-24 16:26:16",
		"MR3_Up": "2017-05-24 16:26:16",
		"MR1": "2017-05-24 16:26:16",
		"MR5_Down": "2017-05-24 16:26:16",
		"MR6_Down": "2017-05-24 16:26:16",
		"MR3_Down": "2017-05-24 16:26:16",
		"MR5_Up": "2017-05-24 16:26:16",
		"MR7_Up": "2017-05-24 16:26:16",
		"MR8_Up": "2017-05-24 16:26:16",
		"MR8_Down": "2017-05-24 16:26:16",
		"MR7_Down": "2017-05-24 16:26:16",
		"MR10_Down": "2017-05-24 16:26:16",
		"MR6_Up": "2017-05-24 16:26:16",
		"MR4_Down": "2017-05-24 16:26:16",
		"MR11": "2017-05-24 16:26:16"
	},
	"vmsstatus": 0,
	"auxiliarypowerstatus": 0,
	"latitude": 3.13215708732605,
	"propulsionstatus": 0,
	"guid": "a7f735c0405a11e7ac79005056c00008",
	"passengerdoorstatus": 0,
	"cosstatus": 0
}
```

<br/>

For Stream Analytics, we split the output into two. One is for storing the raw data in the Cosmos DB raw collection for future machine learning and analysis purposes for the web. The other is for filtering out the alarm data for input into the Cosmos DB alarm collection.

Following is the code to get the raw data. The output would be exactly the same as the earlier input.

```sql
SELECT
    *
INTO
    cosmosdboutput
FROM
    scomiiothub
```

<br/>

The following code extracts alarm data from the input.

```sql
SELECT scomiiothub.trainid,
    a.arrayvalue.timestamp,
    a.arrayvalue.id
INTO alarmoutput
FROM scomiiothub
CROSS APPLY GetArrayElements(scomiiothub.Alarm) as a
```

<br/>

This results in a JSON that looks like the following.

```json
[
   {
      "trainid":"RSV 21",
      "timestamp":"2017-05-24 16:26:16",
      "id":44
   },
   {
      "trainid":"RSV 21",
      "timestamp":"2017-05-24 16:26:16",
      "id":1121
   },
   {
      "trainid":"RSV 21",
      "timestamp":"2017-05-24 16:26:16",
      "id":1121
   },
   {
      "trainid":"RSV 21",
      "timestamp":"2017-05-24 16:26:16",
      "id":1121
   },
   {
      "trainid":"RSV 21",
      "timestamp":"2017-05-24 16:26:16",
      "id":1121
   },
   {
      "trainid":"RSV 21",
      "timestamp":"2017-05-24 16:26:16",
      "id":1121
   },
   {
      "trainid":"RSV 21",
      "timestamp":"2017-05-24 16:26:16",
      "id":1121
   },
   {
      "trainid":"RSV 21",
      "timestamp":"2017-05-24 16:26:16",
      "id":3156
   },
   {
      "trainid":"RSV 21",
      "timestamp":"2017-05-24 16:26:16",
      "id":3156
   },
   {
      "trainid":"RSV 21",
      "timestamp":"2017-05-24 16:26:16",
      "id":3156
   },
   {
      "trainid":"RSV 21",
      "timestamp":"2017-05-24 16:26:16",
      "id":3156
   }
]
```

<br/>

For ASP.NET Web Forms, to pull data from Cosmos DB, I used the Cosmos DB SDK for .NET. Following is the sample code to pull the data from Cosmos DB. We will then bind the data pulled to each control in the web application.

```csharp
using (this.client = new DocumentClient(new Uri(EndpointUri), PrimaryKey))
{
trains = this.client.CreateDocumentQuery<TrainData>(UriFactory.CreateDocumentCollectionUri(Database, Collection)).Take(50).ToList();
}
```

<br/>

One of the trickiest parts is the Bing Maps integration because the V8 control now uses the JavaScript library. To generate the polylines that are the path/tracks of the monorail, including showing the train location by using pushpins, I wrote the following code.

```javascript
<script type='text/javascript'>
        function loadMapScenario() {
            var map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
                credentials: '<Your Credentials Here>',
                center: new Microsoft.Maps.Location(3.139003, 101.686855),
                mapTypeId: Microsoft.Maps.MapTypeId.aerial,
                zoom: 15
            });
            var jsonpolylines = '<%=jsonpolylines%>';
            var jsonstations = '<%=stationlist%>';
            var latitude = '<%=latitude%>';
            var longitude = '<%=longitude%>';
            var polylines = JSON.parse(jsonpolylines);
            var stations = JSON.parse(jsonstations);
            var completedpolylines=[];
            var j = 0;
            $.each(polylines, function (j, val) {
                
                var coordinatepin = new Microsoft.Maps.Location(polylines[j].lat, polylines[j].lon);
                
                completedpolylines.push(coordinatepin);
            });
            var trainlocation = new Microsoft.Maps.Location(latitude, longitude);
            var pushpin = new Microsoft.Maps.Pushpin(trainlocation, null);
            console.log(trainlocation);
            map.entities.push(pushpin);
            console.log(completedpolylines);
            var polyline = new Microsoft.Maps.Polyline(completedpolylines, { strokeColor: 'red', strokeThickness: 5 });
            map.entities.push(polyline);
            var pins = new Microsoft.Maps.EntityCollection();
            var k = 0;
            console.log(stations);
            $.each(stations, function (k, val) {

                var coordinatepin = new Microsoft.Maps.Location(stations[k].lat, stations[k].lon);
                var stationcode = stations[k].Code;
                var stationname = stations[k].Name;
                var pin = new Microsoft.Maps.Pushpin(coordinatepin, { text: 'M', title: stationcode, subTitle: stationname });
                pins.push(pin);
            });
            map.entities.push(pins);
        }
</script>

```

<br/>



## Conclusion

The Scomi Engineering team and Microsoft managed to build the PoC together in the span of about four months with no IoT programming background. This PoC will allow them to showcase the solution as part of their add-ons in the product. They will continue to use this PoC for their next phase of providing integration with Dynamics CRM to automate the task assignments sent to the maintenance department. In addition, by collecting data in DocumentDB, they would like to be able to do predictive maintenance by using Azure Machine Learning.

The success of this PoC allows Scomi Engineering to start pitching this solution to their existing and new customers. As a company that provides transportation solutions, they're extending this project to cover other scenarios such as fleet management.

On the technical side, one of the lessons that we learned through this journey is that there are a few ways to ingest data into Azure IoT Hub, and because Python works best for the development and production environments, we chose that path. Besides that, we have to think about the intermittent connection problems that we might face when pushing data into the cloud.

> "The success and completion of this PoC with Microsoft is one step towards a greater public transport experience." —Foo Yeun Yung, Vehicle Management System Manager, Scomi Engineering Bhd

## Additional resources

- Explore [Azure IoT Hub documentation](https://docs.microsoft.com/en-us/azure/iot-hub/)
- Find IoT devices and starter kits: [Azure IoT device catalog](https://catalog.azureiotsuite.com/kits)
- Try any Azure services for free: [Create your free Azure account today](https://azure.microsoft.com/en-us/free/)
- Check out a curated collection of IoT learning resources: [Microsoft Technical Community Content](https://github.com/Microsoft/TechnicalCommunityContent/tree/master/IoT) on GitHub
- Read more IoT-focused [technical case studies](https://microsoft.github.io/techcasestudies/#technology=IoT&sortBy=featured) (like this one)
